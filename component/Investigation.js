import { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Text,
    Button,
    Image,
    Modal,
    Platform
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native-paper';
import { Camera, CameraView, CameraType, useCameraPermissions } from 'expo-camera';


const IncidentInvestication = ({ navigation }) => {

    const API = process.env.API_URL || 'http://192.168.8.161:5001';

    // Input Fields 
    const [email, setEmail] = useState('');
    const [incidentNumber, setIncidentNumber] = useState('');
    const [investigatorName, setInvestigatorName] = useState('');
    const [investigationTeam, setInvestigationTeam] = useState('');
    const [investigationDate, setInvestigationDate] = useState('');
    const [incidentDate, setIncidentDate] = useState('');
    const [reportedBy, setReportedBy] = useState('');
    // const [incidentType, setIncidentType] = useState('');
    const [incidentDescription, setIncidentDescription] = useState('');
    const [action, setAction] = useState('');
    const [injuredPersonnel, setInjuredPersonnel] = useState('');
    const [witnesses, setWitnesses] = useState('');
    const [immediateCorrectiveAction, setImmediateorrectiveAction] = useState('');
    const [company, setCompany] = useState('');
    const [rootCause, setRootCause] = useState('');
    const [images, setImages] = useState([]);
    const [incidentData, setIncidentData] = useState('');


    // Date Handler
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState("date");
    const [dateTime, setDateTime] = useState(new Date());

    const showMode = (mode) => {
        setPickerMode(mode);
        setShowPicker(true);
    }

    const handleDateTimeChange = (event, selected) => {
        setShowPicker(false);
        if (selected) {
            const currentDate = new Date(selected);

            if (pickerMode === "date") {
                const newDateTime = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate(),
                    currentDate.getHours(),
                    currentDate.getMinutes()

                );

                setDateTime(newDateTime);
            } else {
                const newDateTime = new Date(
                    dateTime.getFullYear(),
                    dateTime.getMonth(),
                    dateTime.getDate(),
                    currentDate.getHours(),
                    currentDate.getMinutes()
                );

                setDateTime(newDateTime);
            }
        }
    };

    const formatDate = (dateformat) => {
        return dateformat.toLocaleString(undefined, {
            dateStyle: 'medium',
        });
    };

    const formatTime = (timeFormat) => {
        return timeFormat.toLocaleString(undefined, {
            timeStyle: 'medium'
        })
    }

    // Data from Incident Report
    useEffect(() => {
        const fetchReportData = async () => {

            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    console.Error(error);
                    return;
                }

                const response = await fetch(`${API}/api/fetch-incident-report`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const incidentReportData = await response.json();

                if (Array.isArray(incidentReportData)) {
                    setIncidentData(incidentReportData);
                } else {
                    console.error('error fetching data')
                }
            } catch (error) {
                console.error(error);
                return <Text>Error fetching user</Text>
            }
        }

        fetchReportData();

    }, [])


    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Media Permissions
    const [hasMediaLibraryPermissions, setHasMediaLibraryPermissions] = useState(null);


    // Camera Handler
    const cameraRef = useRef();
    const [facing, setFacing] = useState < CameraType > ('back');
    const [permissons, requestPermissions] = useCameraPermissions();
    const [showCamera, setShowCamera] = useState(false);

    useEffect(() => {
        if (!permissons) {
            requestPermissions();
        }
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();

            //.... complete the rest of the code ....//

        }
    }

    useEffect(() => {
        (async () => {
            const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
            setHasMediaLibraryPermissions(mediaLibraryPermissions.status === "granted");
        })();
    }, []);

    const handleSubmit = async () => {

    }

    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>+</TouchableOpacity>
            </View>
            <Modal
                visible={isModalVisible}
                animationType='slide'
                presentationStyle='pageSheet'
                onRequestClose={() => setIsModalVisible(false)}
                style={styles.modalStyle}
            >
                <ScrollView style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modelTitle}>Add Item</Text>
                        <View>
                            <Text style={styles.text}>Incident Number</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder='Incident Number'
                                value={incidentNumber}
                                onChangeText={setIncidentNumber}
                            />
                        </View>

                        <View>
                            <Text>Investigator Name</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Investigator Name"
                                value={investigatorName}
                                onChangeText={setInvestigatorName}
                            />
                        </View>
                        <View>
                            <Text>Incident Date</Text>
                            <TextInput
                                value={formatDateTime()}
                                editable={false}
                                style={styles.textInput}
                                onTouchStart={showMode}
                            />
                            {showPicker && (
                                <DateTimePicker
                                    value={dateTime}
                                    mode={pickerMode}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={handleDateTimeChange}
                                />
                            )}
                        </View>
                    </View>
                    <View>
                        <Text>Incident Date</Text>
                        <View>
                            <TextInput
                                value={() => formatDateTime(dateTime)}
                                editable={false}
                                style={styles.textInput}
                                onTouchStart={showMode}
                            />
                        </View>
                        {showPicker && (
                            <DateTimePicker
                                value={dateTime}
                                mode={pickerMode}
                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                onChange={handleDateTimeChange}
                            />
                        )}
                    </View>

                    <View>
                        <Text>Reported By</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Reported By"
                            value={reportedBy}
                            onChangeText={(newVal) => setReportedBy(newVal)}
                        />
                    </View>
                    {/* Incident type */}
                    <View>
                        <Text>Incident Type</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={incidentData}
                                onValueChange={(val) => setIncidentData(val)}
                            >
                                <Picker.Item label="Select Incident Type" value="" />
                                {incidentData.map((incidentType) => (
                                    <Picker.Item
                                        key={incidentType._id}
                                        value={incidentType.selectedOptions}
                                        label={incidentType.selectedOptions}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>
                    <View>
                        <Text>What Acivity was taken Place</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="What Activity was taken Place"
                            value={action}
                            onChangeText={setAction}
                        />
                    </View>
                    <View>
                        <Text>Injured Person</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Injured Person"
                            value={injuredPersonnel}
                            onChangeText={setInjuredPersonnel}
                        />
                    </View>

                    <View>
                        <Text>Witnesses</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Witnesses"
                            value={witnesses}
                            onChangeText={setWitnesses}
                        />
                    </View>
                    <View>
                        <Text>Corrective Action Taken</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Corrective Aaction Taken"
                            value={action}
                            onChangeText={setAction}
                        />
                    </View>
                    <View>
                        <Text>Company</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Company"
                            value={company}
                            onChangeText={setCompany}
                        />
                    </View>
                    <View>
                        <Text>Root Cause</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Root Cause"
                            value={rootCause}
                            onChangeText={setRootCause}
                        />
                    </View>
                    <View>
                        <Button title='Select Images' />
                    </View>
                    <View>
                        <Button title='Submit' onPress={handleSubmit} />
                        <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
                        <Button title="Open Camera" onPress={() => setShowCamera(true)} />

                        {showCamera && (
                            <View style={{ flex: 1 }}>
                                <CameraView style={styles.camera} ref={cameraRef}>
                                    <View style={styles.buttonContainer}>
                                        <Button title="Take Picture" onPress={takePicture} />
                                    </View>
                                </CameraView>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    buttonContainer: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        marginBottom: 20,
    },

    camera: {
        flex: 1,
        justifyContent: 'flex-end',
    },

    imageWrapper: {
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#ccc'
    },
    imagePreview: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    }
});

export default IncidentInvestication;