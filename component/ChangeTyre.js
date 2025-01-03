import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View, Button, Alert, StyleSheet } from 'react-native';
import { NGROK_ACCESS_KEY } from '@env';

const TyreChange = () => {
    const [registration, setRegistration] = useState('');
    const [verifyRegistrationInput, setVerifyRegistrationInput] = useState(false);
    const [burstLocation, setBurstLocation] = useState('');
    const [verifyBurstLocation, setVerifyBurstLocation] = useState(false);
    const [timeAndDate, setTimeAndTDate] = useState('');
    const [verifyTimeAndDate, setVerifyTimeAndDate] = useState(false)

    const handleRegistration = (inputRegistration) => {
        setRegistration(inputRegistration);

        if (inputRegistration.length > 1) {
            setVerifyRegistrationInput(true);
        }
    }

    const handleTyreBurst = (inputLocation) => {
        setBurstLocation(inputLocation);

        if (inputLocation.length > 1) {
            setVerifyBurstLocation(true)
        }
    }

    const handleTimeAndDate = (inputTimeAndDate) => {
        setTimeAndTDate(inputTimeAndDate);
        if (inputTimeAndDate.length > 1) {
            setVerifyTimeAndDate(true);
        }
    }

    const handleSubmit = () => {

        if (verifyRegistrationInput && verifyBurstLocation && verifyTimeAndDate) {
            Alert.alert('Error', "Please fill in missing Information");
        }

        const changeTyreData = {
            registrationNumber: registration,
            burstData: burstLocation,
            TimeandDate: timeAndDate
        }

        // Do some research on the fetch api
        fetch(`${NGROK_ACCESS_KEY}/tyre-change-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changeTyreData)
        }).then(response => {
            if (!response.ok) {
                Alert.alert('Error', response.message)
                throw new Error('network failed');
            }
            return response.json()
        }).then(data => {
            if (data.status === 'ok') {
                console.log('data has been sent to management')
            }
        }).catch(error => {
            Alert.alert('Error', error.message)
        })

    }
    return (
        <View style={styles.background}>
            <ScrollView style={styles.container}>
                <View style={styles.background}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, }}>Tyre Change incident</Text>
                    <View>
                        <Text style={styles.textStyle}>Registration Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Registration Number'
                            value={registration}
                            onChange={handleRegistration}
                        />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Location</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Location'
                            value={burstLocation}
                            onChange={handleTyreBurst}
                        />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Time and Date</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Time and Date of incident'
                            value={timeAndDate}
                            onChange={handleTimeAndDate}
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
        </View>
    );

}

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

export default TyreChange; 