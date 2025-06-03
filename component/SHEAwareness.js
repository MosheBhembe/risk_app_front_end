import React, { useState, useEffect, useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    Modal,
    Platform,
    Alert,
    TouchableOpacity,
    Linking,
    StyleSheet
} from 'react-native';


import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

const SHEAwareness = ({ navigation }) => {

    const API = process.env.API_URL || 'http://192.168.8.161:5001';
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [uri, setUri] = useState('');
    const [documentNumber, setDocumentNumber] = useState("");
    const [documentName, setDocumentName] = useState("");
    const [awarenessType, setAwarenessType] = useState("");
    const [date, setDate] = useState(new Date());

    const [documents, setDocuments] = useState(null);
    // Date Handler 

    const [picker, showPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState("date");

    const showMode = (mode) => {
        showPicker(true);
        setPickerMode(mode);
    }

    const handleDateChange = (event, selectedDate) => {
        setDate(selectedDate);
        showPicker(false);
    }


    const dateformat = (df) => {
        return df.toLocaleString(undefined, {
            dateStyle: 'medium',
        });
    };

    // Document handling 
    const handleSelectedDocument = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
            if (result.type !== 'cancel') {
                setUri(result.uri)
                setDocumentName(result.name);
            }
        } catch (error) {

        }
    }

    const Submit = async () => {
        if (!documentNumber || !documentName || !awarenessType) {
            Alert.alert("Missing Information", "Please fill in all  missing Fields")
        }

        const formData = new FormData();
        formData.append("documentNumber", documentNumber);
        formData.append("documentName", documentName);
        formData.append("awarenessType", awarenessType);
        formData.append("reviewDate", date);
        formData.append("document", documents);


        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('no token found');
                return;
            }

            const response = await fetch(`${API}/api/create-she-awareness-document`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Submitted', 'Document has been Submitted');
                navigation.navigate('Dashboard Screen');
            } else {
                throw new Error(data.message || 'Failedto upload Document');
            }

        } catch (error) {
            Alert.alert('Error', 'Network Error');
            console.log(error);
        }

    }
    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.containerwrapper}>
                <View style={styles.headingContainer}>
                    <View>
                        <Text style={styles.headerText}>SHE Awareness</Text>
                    </View>
                    <View style={styles.containerAccess}>
                        <TouchableOpacity onPress={() => setShowModal(true)}>
                            <View style={styles.addButton}>
                                <Ionicons name="add" size={24} color="white" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <View style={styles.searchContainer}>
                        <MaterialIcons name="search" size={24} color="#6c757d" style={styles.searchIcons} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            placeholderTextColor="#f1f1f1"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                </View>
                <Modal
                    visible={showModal}
                    animationType='slide'
                    presentationStyle='formSheet'
                    onRequestClose={() => setShowModal(false)}
                >
                    <ScrollView>
                        <View style={styles.modalHeaderContainer}>
                            <View style={{ marginLeft: 150 }}>
                                <Text style={styles.formTitle}>Add Item</Text>
                            </View>
                            <View style={{ marginRight: 10 }}>
                                <TouchableOpacity onPress={() => setShowModal(false)}>
                                    <MaterialIcons name="close" size={24} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.mainContainer}>
                            <Text style={styles.titleText}>Document Number</Text>
                            <View style={styles.textInput}>
                                <TextInput
                                    value={documentNumber}
                                    placeholder='Example: Awareness-001'
                                    onChangeText={setDocumentNumber}
                                    style={styles.inputStyle}
                                />
                            </View>
                            <Text style={styles.titleText}>Document Name</Text>
                            <View style={styles.textInput}>
                                <TextInput
                                    value={documentName}
                                    placeholder="Document Name"
                                    onChangeText={setDocumentName}
                                    style={styles.inputStyle}
                                />
                            </View>

                            <Text style={styles.titleText}>Awareness Type</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={awarenessType} onValueChange={(value) => setAwarenessType(value)}>
                                    <Picker.Item label="Select Awareness Type" value="" />
                                    <Picker.Item label='Tool Box Talks' value="Tool Box Talks" />
                                </Picker>
                            </View>
                            <Text style={styles.titleText}>Review Date</Text>
                            <View style={styles.textInput}>
                                <TouchableOpacity onPress={() => showMode("date")}>
                                    <Feather name="calendar" size={18} color="black" style={styles.icon} />
                                </TouchableOpacity>
                                <TextInput
                                    value={dateformat(date)}
                                    placeholder='Select Date'
                                    editable={false}
                                    onTouchStart={() => showPicker(true)}
                                    style={styles.inputStyle}
                                />

                                {picker && (
                                    <DateTimePicker
                                        value={date}
                                        mode={pickerMode}
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                        is24Hour={true}
                                        onChange={handleDateChange}
                                    />

                                )}
                            </View>
                            <Text style={styles.titleText}>Document Upload</Text>
                            <View style={styles.textInput}>
                                <TouchableOpacity onPress={handleSelectedDocument}>
                                    <Feather name="file" size={18} color="black" style={styles.icon} />
                                </TouchableOpacity>
                                <TextInput
                                    value={documents}
                                    placeholder="Upload a Document"
                                    editable={false}
                                    style={styles.inputStyle}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.buttonSubmit} onPress={Submit}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonCancel} onPress={() => setShowModal(false)}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        padding: 10
    },

    background: {
        flex: 1,
        backgroundColor: "#ffffff"
    },

    containerwrapper: {
        flexDirection: 'column',
        width: '100%',
        height: 147,
        backgroundColor: '#301934'
    },

    headerText: {
        fontWeight: 'bold',
        color: "#fff",
        fontSize: 24,
        marginLeft: 20,
    },

    containerAccess: {
        padding: 16,
        alignSelf: 'flex-end',
        marginLeft: 90,
    },

    addButton: {
        borderRadius: 20,
        backgroundColor: 'grey',
        color: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40
    },

    formTitle: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },

    mainContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingTop: 50
    },

    pickerContainer: {
        width: '90%',
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#E0E0E0'
    },

    textInput: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    inputStyle: {
        flex: 1,
        fontsize: 16,
        paddingLeft: 10,
    },

    icon: {
        marginRight: 10,
    },

    textArea: {
        borderRadius: 10,
        backgroundColor: '#E0E0E0',
        height: 120,
        marginBottom: 15,
        width: '90%',
        textAlignVertical: 'top',
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        marginTop: 20,
        borderRadius: 10,
        margin: 12,
        border: 1
    },

    buttonSubmit: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 5,
        backgroundColor: "#301934",
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },

    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: 'bold'
    },

    imageHouser: {
        alignItems: 'center',
        width: '90%',
        borderRadius: 10,
        borderStyle: 'dashed',
        borderColor: "#301934",
        borderWidth: 1,
        height: 120,
        justifyContent: 'center',
        padding: 10
    },

    buttonCancel: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 5,
        borderColor: 'lightgrey',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: 'lightgrey'
    },

    imagePreview: {
        width: '20%',
        height: 50,
        borderRadius: 10,
        marginTop: 10
    },

    titleText: {
        width: "90%",
        margin: 2,
        paddingLeft: 4,
    },

    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
    },

    camera: {
        flex: 1,
    },

    card: {
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 3,
    },

    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "none",
        borderWidth: 1,
        borderColor: '#f1f1f1',
        padding: 5,
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10
    },

    searchIcons: {
        marginRight: 8,
        marginLeft: 8,
    },

    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#f1f1f1",
    },

    headingContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'none',
        marginBottom: 7,
    },

    modalHeaderContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    }


})

export default SHEAwareness; 