import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Button, Alert, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const ReportForm = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [nameSurname, setNameSurname] = useState('');
    const [dateTime, setDateTime] = useState(new Date());
    const [incidentType, setIncidentType] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const [equipment, setEquipment] = useState('');
    const [peopleInvolved, setPeopleInvolved] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const API = "http://192.168.8.161:5001";

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            const decodedToken = jwtDecode(token);

            const response = await fetch(`${API}/api/fetch-all-users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error('No users found');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setDateTime(selectedDate);
        }
    };

    const handleSubmit = async () => {
        if (!nameSurname || !incidentType || !place || !description || !equipment || !peopleInvolved) {
            return Alert.alert('Error', 'Please fill in all fields correctly.');
        }

        const token = await AsyncStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        const reportData = {
            nameSurname,
            dateTime,
            incidentType,
            place,
            description,
            equipment,
            peopleInvolved,
        };
        console.log('Report data', reportData);
        try {
            const response = await fetch(`${API}/api/report-incident`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reportData),
            });

            const data = await response.json();
            console.log('received Data', data);
            if (response.ok && data.status === 'ok') {
                Alert.alert('Submitted', 'Report Submitted');
                navigation.navigate('Dashboard Screen');
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <ScrollView style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Report an Incident</Text>

                <Text style={styles.textLabel}>Name and Surname</Text>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={nameSurname} onValueChange={setNameSurname}>
                        <Picker.Item label="Select Name" value="" />
                        {users.map(user => (
                            <Picker.Item key={user._id} label={`${user.Name} ${user.Surname || ''}`} value={`${user.Name} ${user.Surname || ''}`} />
                        ))}
                    </Picker>
                </View>

                <Text style={styles.textLabel}>Date and Time</Text>
                <Button title="Select Date & Time" onPress={() => setShowDatePicker(true)} />
                {showDatePicker && (
                    <DateTimePicker value={dateTime} mode="date" display={Platform.OS === 'ios' ? 'spinner' : 'default'} onChange={handleDateChange} />
                )}
                <Text style={styles.dateTimeText}>{dateTime.toLocaleString()}</Text>

                <Text style={styles.textLabel}>Type of Incident</Text>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={incidentType} onValueChange={(itemValue) => setIncidentType(itemValue)}>
                        <Picker.Item label="Select Incident Type" value="" />
                        <Picker.Item label="Near Miss" value="Near Miss" />
                        <Picker.Item label='Hi-jacking' value="Hi-jacking" />
                        <Picker.Item label="First Aid" value="First Aid" />
                        <Picker.Item label="Medical" value="Medical" />
                        <Picker.Item label="Fatal" value="Fatal" />
                        <Picker.Item label="Environmental" value="Environmental" />
                        <Picker.Item label="Illness" value="Illness" />
                        <Picker.Item label="Property Damage" value="Property Damage" />
                        <Picker.Item label="Product Loss" value="Product Loss" />
                        <Picker.Item label="Non-Conformance" value="Non-Conformance" />
                    </Picker>
                </View>

                <InputField label="Place Where It Happened" value={place} onChangeText={setPlace} />
                <InputField label="Description" value={description} onChangeText={setDescription} multiline />
                <InputField label="Equipment Involved" value={equipment} onChangeText={setEquipment} />
                <InputField label="People Involved" value={peopleInvolved} onChangeText={setPeopleInvolved} />

                <View style={styles.buttonContainer}>
                    <Button title="Submit" onPress={handleSubmit} />
                </View>
            </View>
        </ScrollView>
    );
};

const InputField = ({ label, value, onChangeText, multiline = false }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>{label}</Text>
        <TextInput
            style={[styles.input, multiline && styles.textarea]}
            value={value}
            onChangeText={onChangeText}
            multiline={multiline}
            placeholder={`Enter ${label}`}
        />
    </View>
);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 3,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    textLabel: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
        fontWeight: '500',
    },
    inputContainer: {
        marginBottom: 15,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
    },
    textarea: {
        height: 100,
        textAlignVertical: 'top',
    },
    pickerContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
    },
    buttonContainer: {
        alignSelf: 'center',
        width: 180,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    dateTimeText: {
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 16,
        color: '#333',
    },
});

export default ReportForm;
