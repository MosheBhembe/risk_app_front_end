import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Button, Alert } from 'react-native';
import { ACCESS_KEY } from '@env';

const ReportForm = ({ navigation }) => {
    const [NameSurname, setNameSurname] = useState('');
    const [Email, setEmail] = useState('');
    const [Location, setLocation] = useState('');
    const [Equipment, setEquipment] = useState('');
    const [DateTime, setDateTime] = useState();
    const [verifyNameAndSurname, setVerifyNameAndSurname] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [verifyLocation, setVerifyLocation] = useState(false);
    const [verifyEquipment, setVerifyEquipment] = useState(false);
    const [verifyDateTime, setVerifyDateTime] = useState(false);

    const handleNameSurname = (nameVar) => {
        setNameSurname(nameVar);
        if (nameVar.length > 1) {
            setVerifyNameAndSurname(true)
        }
    }

    const handleLocation = (locationVar) => {
        setLocation(locationVar);
        if (locationVar.length > 1) {
            setVerifyLocation(true);
        }
    }

    const handleEmailEntry = (EmailVar) => {
        setEmail(EmailVar);
        if (EmailVar.length > 1) {
            setVerifyEmail(true);
        }
    }

    const handleE = (EquipmentVar) => {
        setEquipment(EquipmentVar);
        if (EquipmentVar.length > 1) {
            setVerifyEquipment(true);
        }
    }

    const HandleDateTime = (DateTimeVar) => {
        setDateTime(DateTimeVar);
        if (DateTimeVar.length > 1) {
            setVerifyDateTime(true)
        }
    }
    const handleSubmit = () => {
        const formData = {
            name: NameSurname,
            email: Email,
            location: Location,
            assets: Equipment,
            dateTime: DateTime
        }

        if (verifyNameAndSurname && verifyEmail && verifyLocation && verifyEquipment && verifyDateTime) {
            sendData(formData);
        } else {
            Alert.alert('Error', 'Please fill it the missing data');
        }
    }
    const sendData = async (form) => {
        fetch(`${ACCESS_KEY}/report-incident`, {
            timeout: 5000,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then(response => {
            if (!response.ok) {
                Alert.alert('Network failed');
                throw new Error('network failed');
            }
            return response.json();
        }).then(data => {
            if (data.status === 'ok') {
                Alert.alert('Notice', 'Report Sent');
                navigation.navigate('Dashboard Screen');
            }
        }).catch(error => {
            Alert.alert('Error', error.message);
        })
    }
    return (
        <ScrollView style={styles.background}>
            <View style={styles.container}>
                <Text style={{ fontSize: 24, marginBottom: 15, fontWeight: "bold" }}>Report an incident </Text>
                <View style={styles.spaceView}>
                    <Text style={styles.textStyle}>Name and Surname</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Name and Surname here'
                        value={NameSurname}
                        onChangeText={handleNameSurname}
                    />
                </View>
                <View>
                    <Text style={styles.textStyle}>Location of Incident</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter location here'
                        value={Location}
                        onChangeText={handleLocation}
                    />
                </View>
                <View>
                    <Text style={styles.textStyle}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Your email address:'
                        value={Email}
                        onChangeText={handleEmailEntry}
                    />
                </View>
                <View>
                    <Text style={styles.textStyle}>Equipment/Assets</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Equipment/Assets'
                        value={Equipment}
                        onChangeText={handleE}
                    />
                </View>
                <View>
                    <Text style={styles.textStyle}>Date and Time of Incident</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Date and Time'
                        value={DateTime}
                        onChangeText={HandleDateTime}
                    />
                </View>
                <View style={styles.btnstyle}>
                    <Button
                        title='Submit'
                        onPress={handleSubmit}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    input: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "grey",
        padding: 7,
        marginVertical: 2,
        fontSize: 12,
        width: 300,
        marginBottom: 7,
        margin: 11,
    },

    background: {
        backgroundColor: "#ffffff",
        flex: 1,
    },

    container: {
        margin: 10,
    },
    textStyle: {
        margin: 11,
        fontSize: 15,

    },
    btnstyle: {
        width: 140,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 15,
    },
});

export default ReportForm; 