import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ReportForm = ({ navigation }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: '',
        equipment: '',
        dateTime: '',
        incidentType: '',
    });

    const API = process.env.API_URL;

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const isValid = Object.values(formData).every(value => value.trim().length > 1);

    const handleSubmit = async () => {
        if (!isValid) {
            return Alert.alert('Error', 'Please fill in all fields correctly.');
        }
        try {
            const response = await fetch(`${API}/report-incident`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok && data.status === 'ok') {
                Alert.alert('Success', 'Report Sent');
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

                <InputField label='Name and Surname' value={formData.name} onChangeText={(value) => handleChange('name', value)} />
                <InputField label='Location of Incident' value={formData.location} onChangeText={(value) => handleChange('location', value)} />
                <InputField label='Email Address' value={formData.email} onChangeText={(value) => handleChange('email', value)} keyboardType='email-address' />
                <InputField label='Equipment/Assets' value={formData.equipment} onChangeText={(value) => handleChange('equipment', value)} />
                <InputField label='Date and Time of Incident' value={formData.dateTime} onChangeText={(value) => handleChange('dateTime', value)} />

                <Text style={styles.textLabel}>Type of Incident</Text>
                <View style={styles.pickerContainer}>
                    <Picker selectedValue={formData.incidentType} onValueChange={(value) => handleChange('incidentType', value)}>
                        <Picker.Item label='Select Incident Type' value='' />
                        <Picker.Item label='Near Miss' value='Near Miss' />
                        <Picker.Item label='First Aid' value='First Aid' />
                        <Picker.Item label='Medical' value='Medical' />
                        <Picker.Item label='Fatal' value='Fatal' />
                        <Picker.Item label='Environmental' value='Environmental' />
                        <Picker.Item label='Illness' value='Illness' />
                        <Picker.Item label='Property Damage' value='Property Damage' />
                        <Picker.Item label="Product Loss" value="Product Loss" />
                        <Picker.Item label='Non-Conformance' value='Non-Conformance' />
                    </Picker>
                </View>

                <View style={styles.buttonContainer}>
                    <Button title='Submit' onPress={handleSubmit} />
                </View>
            </View>
        </ScrollView>
    );
};

const InputField = ({ label, value, onChangeText, keyboardType = 'default' }) => (
    <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>{label}</Text>
        <TextInput style={styles.input} value={value} onChangeText={onChangeText} keyboardType={keyboardType} placeholder={`Enter ${label}`} />
    </View>
);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        padding: 20,
    },
    container: {
        backgroundColor: '#ffffff',
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
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        padding: 10,
        fontSize: 14,
    },
    pickerContainer: {
        backgroundColor: '#ffffff',
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
        borderRadius: 10,
        overflow: 'hidden',
    },
});

export default ReportForm;
