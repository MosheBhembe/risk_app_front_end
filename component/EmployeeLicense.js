import React, { useState, useEffect } from 'react';
import {
    TextInput,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Button,
    StyleSheet,
    Modal,
    Alert,
    Platform,
    View
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import Fontisto from '@expo/vector-icons/Fontisto';

const EmployeeLicenseForm = ({ navigation }) => {
    const [name, setName] = useState('');
    const [nameList, setNameList] = useState([]);
    const [status, setStatus] = useState('');
    const [licenseType, setLicenseType] = useState('');
    const [licenseTypeList, setLicenseTypeList] = useState([]);
    const [dateTime, setDateTime] = useState(new Date());
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [licenseFrequecy, setLicenseFrequency] = useState('');
    const [modalVisible, setVisibleModal] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState('date');
    const [isExpiry, setIsExpiry] = useState(false);

    const API = process.env.API_URL || 'http://192.168.8.161:5001';

    const showMode = (mode, expiry = false) => {
        setIsExpiry(expiry);
        setPickerMode(mode);
        setShowPicker(true);
    };

    const DateTimeChange = (event, selected) => {
        setShowPicker(false);
        if (selected) {
            if (isExpiry) {
                setExpiryDate(selected);
            } else {
                setDateTime(selected);
            }
        }
    };

    const formatDateTime = (datetime) => {
        return datetime.toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    };

    const getLicences = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Unknown User');
                return;
            }

            const apiResponse = await fetch(`${API}/api/get-assets`, {
                headers: {
                    "Content-Type": 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const licenses = await apiResponse.json();
            if (Array.isArray(licenses)) {
                setLicenseTypeList(licenses);
            }
        } catch (error) {
            console.error('Error fetching licenses', error);
        }
    };

    const getNames = async () => {
        try {
            const userToken = await AsyncStorage.getItem('token');
            if (!userToken) {
                console.error('Unknown User');
                return;
            }

            const response = await fetch(`${API}/api/fetch-users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });

            const names = await response.json();
            if (Array.isArray(names)) {
                setNameList(names);
            }
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    useEffect(() => {
        getLicences();
        getNames();
    }, []);

    const pickDocument = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
                multiple: false
            });

            if (result.type === 'success') {
                submitForm(result);
            }
        } catch (error) {
            console.error("Couldn't upload Document", error);
        }
    };

    const submitForm = async (doc) => {
        try {
            const backendToken = await AsyncStorage.getItem('token');
            if (!backendToken) {
                console.error('no token found');
                return;
            }

            const formData = new FormData();

            formData.append('document', {
                uri: doc.uri,
                name: doc.name,
                type: doc.mimeType || 'application/octet-stream'
            });

            formData.append('name', name);
            formData.append('status', status);
            formData.append('licenseType', licenseType);
            formData.append('frequency', licenseFrequecy);
            formData.append('registrationDate', dateTime.toISOString());
            formData.append('expiryDate', expiryDate.toISOString());

            const response = await fetch(`${API}/api/employee-documents`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${backendToken}`,
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            });

            const dataResponse = await response.json();
            console.log('Upload response', dataResponse);

            if (response.ok) {
                Alert.alert('Submitted', 'Document uploaded successfully');
                setVisibleModal(false);
            } else {
                Alert.alert('Error', 'Failed to upload document');
            }

        } catch (error) {
            console.error("Network Error", error);
            Alert.alert("Error", "Network Error");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.addButtonWrapper}>
                <TouchableOpacity style={styles.addButton} onPress={() => setVisibleModal(true)}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={modalVisible} animationType="slide" presentationStyle="pageSheet">
                <ScrollView style={styles.modalStyle}>
                    <Text style={styles.header}>Add Item</Text>
                    <Text style={styles.label}>Name</Text>
                    <Picker selectedValue={name} onValueChange={(val) => setName(val)}>
                        <Picker.Item label="Select Your Name" value="" />
                        {nameList.map((registeredName) => (
                            <Picker.Item
                                key={registeredName._id}
                                label={registeredName.Name || ""}
                                value={registeredName.Name || ""}
                            />
                        ))}
                    </Picker>

                    <Text style={styles.label}>Status</Text>
                    <Picker selectedValue={status} onValueChange={(val) => setStatus(val)}>
                        <Picker.Item label="Select a Status" value="" />
                        <Picker.Item label="Active" value="Active" />
                        <Picker.Item label="Inactive" value="Inactive" />
                    </Picker>

                    <Text style={styles.label}>License Type</Text>
                    <Picker selectedValue={licenseType} onValueChange={(val) => setLicenseType(val)}>
                        <Picker.Item label="Select License Type" value="" />
                        {licenseTypeList.map((regLicense) => (
                            <Picker.Item
                                key={regLicense._id}
                                label={regLicense.Name || ""}
                                value={regLicense.Name || ""}
                            />
                        ))}
                    </Picker>

                    <Text style={styles.label}>License Frequency</Text>
                    <TextInput
                        placeholder="License Frequency"
                        value={licenseFrequecy}
                        onChangeText={(value) => setLicenseFrequency(value)}
                        style={styles.textInput}
                    />

                    <Text style={styles.label}>Registration Date</Text>
                    <TouchableOpacity onPress={() => showMode('date', false)}>
                        <View style={styles.dateInputWrapper}>
                            <Fontisto name="date" size={14} color="black" style={styles.icon} />
                            <Text style={styles.textInput}>{formatDateTime(dateTime)}</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.label}>Expiry Date</Text>
                    <TouchableOpacity onPress={() => showMode('date', true)}>
                        <View style={styles.dateInputWrapper}>
                            <Fontisto name="date" size={14} color="black" style={styles.icon} />
                            <Text style={styles.textInput}>{formatDateTime(expiryDate)}</Text>
                        </View>
                    </TouchableOpacity>

                    {showPicker && (
                        <DateTimePicker
                            value={isExpiry ? expiryDate : dateTime}
                            mode={pickerMode}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={DateTimeChange}
                        />
                    )}

                    <Button title="Pick Document" onPress={pickDocument} />
                    <Button title='Submit' onPress={submitForm} />
                    <Button title="Cancel" onPress={() => setVisibleModal(false)} color="red" />
                </ScrollView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    modalStyle: {
        padding: 20
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    label: {
        marginTop: 10,
        marginBottom: 5,
        fontSize: 16
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    dateInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10
    },
    icon: {
        marginRight: 10
    },
    addButtonWrapper: {
        alignItems: 'flex-end',
        padding: 10
    },
    addButton: {
        backgroundColor: '#007bff',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24
    }
});

export default EmployeeLicenseForm;