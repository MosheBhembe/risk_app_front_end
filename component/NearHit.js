import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { NGROK_ACCESS_KEY } from '@env';

// const urlConnection = 'https://5ae5-105-245-120-109.ngrok-free.app'
const NearHitForm = ({ navigation }) => {
    const [names, setNames] = useState('');
    const [verifyNames, setVerifyNames] = useState(false);
    const [location, setLocation] = useState('');
    const [verifyLocation, setVerifyLocation] = useState(false);
    const [description, setDescription] = useState('');
    const [verifyDescription, setVerifyDescription] = useState(false);
    const [assets, setAssets] = useState('');
    const [verifyAssets, setVerifyAssets] = useState(false);
    const [date, setDate] = useState('');
    const [verifyDate, setVerifyDate] = useState(false);

    const handleNameText = (inputNameText) => {
        setNames(inputNameText);

        if (inputNameText.length > 1) {
            setVerifyNames(true);
        }
    }

    const handleLocation = (inputLocation) => {
        setLocation(inputLocation);

        if (inputLocation.length > 1) {
            setVerifyLocation(true);
        }
    }

    const handleDescription = (inputDescription) => {
        setDescription(inputDescription);

        if (inputDescription.length > 1) {
            setVerifyDescription(true);
        }

    }

    const handleAssets = (inputAssets) => {
        setAssets(inputAssets);

        if (inputAssets.length > 1) {
            setVerifyAssets(true);
        }
    }

    const handleDate = (inputDate) => {
        setDate(inputDate);

        if (inputDate.length > 1) {
            setVerifyDate(true);
        }
    }

    const handlePressSubmission = () => {
        const FormData = {
            names,
            location,
            description,
            assets,
            date
        }

        if (verifyNames && verifyLocation && verifyAssets && verifyDate && verifyDescription) {
            sendData(FormData);
        }
        else {
            Alert.alert('Error', 'Please fill in missing information');
        }

    }

    const sendData = async (data) => {
        fetch(`${NGROK_ACCESS_KEY}/Near-Hit`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                Alert.alert('Submitted', 'The data has been submitted successfully', [
                    {
                        text: 'Okay', onPress: () => {
                            navigation.navigate('RiskApp');
                        }
                    }
                ])
            }
        }).catch(error => {
            //Note: See how this runs. If runs as Expected, KEEP! 
            Alert.alert('ERROR', 'failed to send Data', [{
                text: 'Okay', onPress: console.error('fatal error', error)
            }])
        });
    }

    return (
        <ScrollView style={styles.background}>
            <View style={styles.container}>
                <View>
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 15 }}>Report Near Hit</Text>
                        <Text style={styles.textStyle}>Name & Surname</Text>
                        <TextInput
                            placeholder="Enter Name and Surname here:"
                            value={names}
                            style={styles.inputText}
                            onChangeText={handleNameText}
                        />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Location</Text>
                        <TextInput
                            placeholder="Location of incident:"
                            value={location}
                            style={styles.inputText}
                            onChangeText={handleLocation}
                        />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Description</Text>
                        <TextInput
                            placeholder="Describe the nature of Incident:"
                            value={description}
                            style={styles.inputText}
                            onChangeText={handleDescription}
                        />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Assets</Text>
                        <TextInput
                            placeholder="Insert all Assets:"
                            value={assets}
                            style={styles.inputText}
                            onChangeText={handleAssets}
                        />
                    </View>
                    <View>
                        <Text style={styles.textStyle}>Date</Text>
                        <TextInput
                            placeholder="Date of Incident"
                            value={date}
                            style={styles.inputText}
                            onChangeText={handleDate}
                        />
                    </View>
                </View>
                <View>
                    <View style={styles.btnstyle}>
                        <Button
                            title="Submit"
                            onPress={handlePressSubmission}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    inputText: {
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
    container: {
        margin: 10,
    },

    background: {
        backgroundColor: "#ffffff",
        flex: 1,
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
export default NearHitForm; 