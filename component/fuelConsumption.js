import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    Alert,
    SafeAreaView,
    Image,
    TouchableOpacity
} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';

const FuelConsumptionForm = ({ navigation }) => {
    const cameraRef = useRef();
    const [NameSurname, setNameSurname] = useState('');
    const [usersLogged, setUsersLogged] = useState([]);
    const [licenceRegNumber, setLicenceRegNumber] = useState([]);
    const [selectedLicenceReg, setSelectedLicenceReg] = useState("");
    const [assetType, setAssetType] = useState('');
    const [loading, setLoading] = useState(true);
    const [photo, setPhoto] = useState(null);
    const [hasCameraPermissions, setHasCameraPermissions] = useState(null);
    const [hasMediaLibraryPermissions, setHasMediaLibraryPermissions] = useState(null);
    const API = "http://192.168.8.161:5001";

    useEffect(() => {
        (async () => {
            const cameraPermissions = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
            const imagePickerPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasCameraPermissions(cameraPermissions.status === 'granted');
            setHasMediaLibraryPermissions(mediaLibraryPermissions.status === 'granted' && imagePickerPermissions.status === 'granted');
        })();
    }, []);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    console.error(error);
                    return;
                }
                const response = await fetch(`${API}/api/fetch-all-users`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

                const userData = await response.json();

                if (Array.isArray(userData)) {
                    setUsersLogged(userData);
                } else {
                    console.error('error fetching data');
                }
            } catch (err) {
                console.error(err);
                return <Text>Error fetching user</Text>
            }
        }

        fetchUsers();
    }, [])

    useEffect(() => {
        const fetchAssetRegNumber = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    console.error('No Token found');
                    return;
                }

                const response = await fetch(`${API}/api/fetch-all-assets`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                const regData = await response.json();

                if (Array.isArray(regData)) {
                    setLicenceRegNumber(regData);
                } else {
                    Alert.alert("No Data found");
                    console.error('No data found');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchAssetRegNumber();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = {
                quality: 0.5,
                base64: true,
            };
            const newPhoto = await cameraRef.current.takePictureAsync(options);
            setPhoto(newPhoto);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0]);
        }
    };

    const handleSubmission = async () => {
        if (!licenceRegNumber || !photo) {
            Alert.alert("Error", "Please fill in all fields and select or take a picture.");
            return;
        }

        const formData = new FormData();
        formData.append("NameSurname", NameSurname);
        formData.append("regNumber", selectedLicenceReg);
        formData.append("assetType", assetType);
        formData.append("image", {
            uri: photo.uri,
            name: `image_${Date.now()}.jpg`,
            type: "image/jpeg"
        });

        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('token not found');
                return;
            }
            const response = await fetch(`${API}/api/fuel-data`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });
            const data = await response.json();

            if (response.ok) {
                Alert.alert('Success', "Report Submitted");
                navigation.navigate('Dashboard Screen');
            }
            else {
                throw new Error(data.message || 'Failed to upload data');
            }
        } catch (error) {
            Alert.alert('Error', 'Submission Error');
            console.log(error);
        }
    };

    if (hasCameraPermissions === null) {
        return <Text>Requesting Camera Permissions...</Text>;
    }

    if (!hasCameraPermissions) {
        return (
            <View style={styles.container}>
                <Text>Camera permissions are required to use this feature.</Text>
                <Button title="Try Again" onPress={() => Camera.requestCameraPermissionsAsync()} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginBottom: 20 }}>Slips</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={NameSurname}
                            onValueChange={(itemValue) => setNameSurname(itemValue)}
                        >
                            <Picker.Item label="Select Name" value="" />
                            {usersLogged.map((user) => (
                                <Picker.Item key={user._id} label={`${user.Name}  ${user.Surname || ""}`} value={`${user.Name} ${user.Surname || ""}`} />
                            ))}
                        </Picker>
                    </View>
                )}
                {/* <TextInput
                    style={styles.textInput}
                    placeholder='Name and Surname'
                    value={licenceRegNumber}
                    onChangeText={setNameSurname}
                /> */}
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={selectedLicenceReg}
                            onValueChange={(itemValue) => setSelectedLicenceReg(itemValue)}
                        >
                            <Picker.Item label="Licence Registration Number" value="" />
                            {licenceRegNumber.map((reg) => (
                                <Picker.Item key={reg._id} label={reg.AssetReg} value={reg._id} />
                            ))}
                        </Picker>
                    </View>
                )}

                <TextInput
                    style={styles.textInput}
                    placeholder='Asset Type'
                    value={assetType}
                    onChangeText={setAssetType}
                />

                {licenceRegNumber ? (
                    <View style={styles.cameraContainer}>
                        {photo ? (
                            <Image source={{ uri: photo.uri }} style={styles.preview} />
                        ) : (
                            <View>
                                <TouchableOpacity style={styles.button} onPress={pickImage}>
                                    <Text style={styles.buttonText}>Upload from Gallery</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                ) : (
                    <Text style={styles.instructionText}>Please enter the licence registration number first</Text>
                )}

                <View style={styles.buttonContainer}>
                    <Button
                        title="Submit"
                        onPress={handleSubmission}
                        disabled={!licenceRegNumber || !photo}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    container: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
    },
    textInput: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ced4da',
        padding: 12,
        fontSize: 14,
        width: '100%',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    pickerContainer: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    cameraContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    preview: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginTop: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
    },
    instructionText: {
        textAlign: 'center',
        marginTop: 10,
        color: '#6c757d',
        fontSize: 14,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 20,
        textAlign: 'center',
    },
});

export default FuelConsumptionForm;
