// import React, { useState } from 'react';
// import {
//     View,
//     TextInput,
//     Button,
//     ScrollView,
//     Text,
//     StyleSheet,
//     Alert,
//     SafeAreaView
// } from 'react-native';
// import { NGROK_ACCESS_KEY } from '@env'


// const ngrokUrlConnection = `${NGROK_ACCESS_KEY}/fuel-consumption`;
// const FuelConsumtionForm = ({ navigation }) => {
//     const company = 'Risk Company Management'
//     const [names, setNames] = useState('');
//     const [verifyNames, setVerifyNames] = useState(false);
//     const [regNumber, setRegNumber] = useState('');
//     const [verifyRegNumber, setVerifyRegNumber] = useState(false);
//     const [Amount, setAmount] = useState('');
//     const [verifyAmount, setVerifyAmount] = useState(false);
//     const [Costs, setCosts] = useState('');
//     const [verifyCosts, setVerifyCosts] = useState(false);
//     const [date, setDate] = useState('');
//     const [verifyDate, setVerifyDate] = useState(false);


//     const handleNamesInput = (namesInput) => {
//         setNames(namesInput);
//         if (namesInput.length > 1) {
//             setVerifyNames(true);
//         }
//     }

//     const handleRegNumber = (inputRegNumber) => {
//         setRegNumber(inputRegNumber);
//         if (inputRegNumber.length > 1) {
//             setVerifyRegNumber(true);
//         }
//     }

//     const handleAmount = (inputAmount) => {
//         setAmount(inputAmount);
//         if (inputAmount.length > 1) {
//             setVerifyAmount(true);
//         }
//     }

//     const handleCost = (inputCosts) => {
//         setCosts(inputCosts);
//         if (inputCosts.length > 1) {
//             setVerifyCosts(true);
//         }
//     }
//     const handleDateTime = (inputDate) => {
//         setDate(inputDate);
//         if (inputDate.length > 1) {
//             setVerifyDate(true);
//         }
//     }

//     const takeToCamera = () => {
//         try {
//             Alert.alert('Use Camera', 'Access your camera', [
//                 {
//                     text: 'Yes', onPress: () => {
//                         navigation.navigate('Camera')
//                     }
//                 },

//                 {
//                     text: 'No', onPress: () => {
//                         Alert.alert('Denied', 'Cannot Use Camera :(')
//                     }
//                 }
//             ])
//         } catch (err) {
//             console.log("Error in taking picture ", err);
//             Alert.alert('Error', 'Failed to navigate to Camera screen.');
//         };

//     }

//     // For Now
//     const handleSubmission = () => {
//         const submitData = {
//             name: names,
//             regNumber: regNumber,
//             amount: Amount,
//             cost: Costs,
//             date: date
//         }

//         if (verifyAmount && verifyCosts && verifyDate && verifyNames && verifyRegNumber) {
//             sendFuelData(submitData);
//         } else {
//             Alert.alert('Error', 'Please fill in missing data');
//         }
//     }

//     const sendFuelData = async (Data) => {
//         fetch(ngrokUrlConnection, {
//             method: 'POST',
//             timeout: 5000,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(Data)
//         }).then(response => {
//             if (!response.ok) {
//                 Alert.alert('Network Failed')
//                 throw new Error('Network Failed')
//             }
//             return response.json()
//         }).then(data => {
//             if (data.status == "ok") {
//                 Alert.alert('Success', 'Fuel Data Sent Successfully')
//                 navigation.navigate('Dashboard Screen');
//             }
//         }).catch(error => {
//             Alert.alert('Notice!!', error.message)
//         })
//     }
//     return (
//         <SafeAreaView style={styles.background}>
//             <ScrollView>
//                 <View style={styles.container}>
//                     <Text style={{ fontSize: 25, fontWeight: "bold" }}>Vehicle Details</Text>
//                     <View>
//                         <Text style={styles.displayText}>Names</Text>
//                         <TextInput
//                             style={styles.textInput}
//                             placeholder='Name and Surname'
//                             value={names}
//                             onChangeText={handleNamesInput}
//                         />
//                     </View>
//                     <View>
//                         <Text style={styles.displayText}>Car Registration Number</Text>
//                         <TextInput
//                             style={styles.textInput}
//                             placeholder='Reg Number'
//                             value={regNumber}
//                             onChangeText={handleRegNumber}
//                         />
//                     </View>
//                     <View>
//                         <Text style={styles.displayText}>Amount</Text>
//                         <TextInput
//                             style={styles.textInput}
//                             placeholder='Amount in litres'
//                             value={Amount}
//                             onChangeText={handleAmount}
//                         />
//                     </View>
//                     <View>
//                         <Text style={styles.displayText}>Costs</Text>
//                         <TextInput
//                             style={styles.textInput}
//                             placeholder='Costs'
//                             value={Costs}
//                             onChangeText={handleCost}
//                         />
//                     </View>
//                     <View>
//                         <Text style={styles.displayText}>Date & Time</Text>
//                         <TextInput
//                             style={styles.textInput}
//                             placeholder='Date and Time of Incident'
//                             value={date}
//                             onChangeText={handleDateTime}
//                         />
//                     </View>
//                     <View style={styles.btnContainer}>
//                         <View style={styles.buttonStyles}>
//                             <Button
//                                 title='Submit'
//                                 onPress={handleSubmission}
//                             />
//                         </View>
//                         <View style={styles.buttonStyles}>
//                             <Button
//                                 title=' Send Picture'
//                                 onPress={takeToCamera}
//                             />
//                         </View>
//                     </View>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };


// const styles = StyleSheet.create({
//     container: {
//         margin: 10,
//     },
//     background: {
//         backgroundColor: "#ffffff",
//         flex: 1,
//     },
//     textInput: {
//         backgroundColor: '#ffffff',
//         borderWidth: 1,
//         borderRadius: 8,
//         borderColor: "grey",
//         padding: 7,
//         marginVertical: 2,
//         fontSize: 12,
//         width: 300,
//         marginBottom: 7,
//         margin: 11,
//     },
//     displayText: {
//         margin: 11,
//         fontSize: 15,
//     },
//     buttonStyles: {
//         flex: 1,
//         width: 140,
//         margin: 6,
//         marginTop: 10,
//         borderRadius: 15,
//     },
//     cameraBtnStyle: {
//         flex: 1,
//         width: 140,
//         margin: 10,
//         borderRadius: 15,
//     },
//     btnContainer: {
//         flexDirection: "row",
//         margin: 5,
//         padding: 2,
//         justifyContent: 'center'
//     },
//     background: {
//         flex: 1,
//         backgroundColor: '#ffffff'
//     }
// })

// export default FuelConsumtionForm;


import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TextInput,
    Button,
    ScrollView,
    Text,
    StyleSheet,
    Alert,
    SafeAreaView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { ACCESS_KEY } from '@env';
import axios from 'axios';

const ngrokUrlConnection = `${ACCESS_KEY}/api/fuel-data`;

const FuelConsumptionForm = ({ navigation }) => {
    const cameraRef = useRef();
    const [names, setNames] = useState('');
    const [regNumber, setRegNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [costs, setCosts] = useState('');
    const [date, setDate] = useState('');
    const [photo, setPhoto] = useState(null);
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === 'granted');
            setHasMediaLibraryPermission(mediaLibraryPermission.status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 0.5, base64: true };
            const newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(newPhoto);
        }
    };

    const handleSubmission = async () => {
        if (!names || !regNumber || !amount || !costs || !date) {
            Alert.alert('Error', 'Please fill in all the fields.');
            return;
        }

        const formData = new FormData();
        formData.append('name', names);
        formData.append('regNumber', regNumber);
        formData.append('amount', amount);
        formData.append('cost', costs);
        formData.append('date', date);
        if (photo) {
            formData.append('image', {
                uri: photo.uri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
        }

        try {
            const response = await axios.post(ngrokUrlConnection, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            if (response.status === 200) {
                Alert.alert('Success', 'Data and Image Uploaded Successfully!');
                navigation.navigate('Dashboard Screen');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to upload data.');
            console.error(error);
        }
    };

    if (hasCameraPermission === null) {
        return <Text>Requesting Camera Permissions...</Text>;
    }

    if (!hasCameraPermission) {
        return <Text>Camera permissions are required to use this feature.</Text>;
    }

    return (
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <View style={styles.container}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Vehicle Details</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Name and Surname"
                        value={names}
                        onChangeText={setNames}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Car Registration Number"
                        value={regNumber}
                        onChangeText={setRegNumber}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Amount in Litres"
                        value={amount}
                        onChangeText={setAmount}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Costs"
                        value={costs}
                        onChangeText={setCosts}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Date and Time"
                        value={date}
                        onChangeText={setDate}
                    />
                    {photo ? (
                        <Image source={{ uri: photo.uri }} style={styles.preview} />
                    ) : (
                        <Camera style={styles.camera} ref={cameraRef}>
                            <TouchableOpacity style={styles.snapButton} onPress={takePicture} />
                        </Camera>
                    )}
                    <View style={styles.buttonContainer}>
                        <Button title="Submit" onPress={handleSubmission} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { margin: 10 },
    background: { flex: 1, backgroundColor: '#ffffff' },
    textInput: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'grey',
        padding: 7,
        marginVertical: 2,
        fontSize: 12,
        width: 300,
        marginBottom: 7,
        margin: 11,
    },
    camera: { width: '100%', height: 300, marginVertical: 10 },
    snapButton: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        height: 60,
        width: 60,
        marginTop: 120,
    },
    preview: { width: '100%', height: 300, marginVertical: 10 },
    buttonContainer: { marginTop: 20 },
});

export default FuelConsumptionForm;
