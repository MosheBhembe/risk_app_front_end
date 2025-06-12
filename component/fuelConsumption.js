import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    Alert,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Platform,
    Modal,
    Linking,
    ScrollView
} from 'react-native';
import { Camera } from 'expo-camera';
import { ImageContext } from '../context/Context';
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Card } from 'react-native-paper';

const FuelConsumptionForm = ({ navigation }) => {
    // const cameraRef = useRef();
    const API = process.env.API_URL || 'http://192.168.189.119:5001';
    const [NameSurname, setNameSurname] = useState('');
    const [usersLogged, setUsersLogged] = useState([]);
    const [licenceRegNumber, setLicenceRegNumber] = useState([]);
    const [selectedLicenceReg, setSelectedLicenceReg] = useState("");
    const [assetType, setAssetType] = useState('');
    const [loading, setLoading] = useState(true);
    const [photo, setPhoto] = useState(null);
    const [isModalShown, setIsModalShown] = useState(false);
    const [fuelItems, setFuelItems] = useState("");

    // DateTime Picker states
    const [DateAndTime, setDateAndTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [mode, setMode] = useState("date");

    //added state
    const [cost, setCost] = useState('');
    const [odometer, setOdometer] = useState("");

    const [search, setSearch] = useState('');
    const [searchedFuelSlips, setSearchedFuelSlips] = useState([]);

    const [hasCameraPermissions, setHasCameraPermissions] = useState(null);
    const [hasMediaLibraryPermissions, setHasMediaLibraryPermissions] = useState(null);

    const { imageUri, setImageUri } = useContext(ImageContext);

    const showMode = (mode) => {
        setShowPicker(true);
        setMode(mode);
    }


    const handleDateTimeChange = (e, selectedDateTime) => {
        setDateAndTime(selectedDateTime);
        setShowPicker(false);
    }

    // Date and Time Format

    const DateFormat = (dateFormat) => {
        return dateFormat.toLocaleString(undefined, {
            dateStyle: 'medium'
        });
    };

    const TimeFormat = (timeFormat) => {
        return timeFormat.toLocaleString(undefined, {
            timeStyle: 'short'
        });
    };

    useEffect(() => {
        (async () => {
            const cameraPermissions = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
            const imagePickerPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasCameraPermissions(cameraPermissions.status === 'granted');
            setHasMediaLibraryPermissions(mediaLibraryPermissions.status === 'granted' && imagePickerPermissions.status === 'granted');
        })();
    }, []);


    const fetchFuelData = async () => {
        try {
            const accessToken = await AsyncStorage.getItem('token');
            if (!accessToken) {
                console.error("Access Denied");
                return
            }

            const response = await fetch(`${API}/api/fetch-all-fuel-reports`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const fuelslips = await response.json();
            console.log('Fuel Slips: ', fuelslips);

            if (Array.isArray(fuelslips)) {
                setSearchedFuelSlips(fuelslips)
            }
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

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
        fetchFuelData();
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

    const setImagesToNull = () => {
        setPhoto(null);
        setImageUri(null);
    };

    const removeImage = () => {
        Alert.alert(
            "Remove Image",
            "Are your sure you want to remove this Image",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", style: "destructive", onPress: () => setImagesToNull() }
            ]
        )
    }

    const filteredFuelSlips = searchedFuelSlips.filter((slips) =>
        slips.licenceRegNumber.toLowerCase().includes(search.toLowerCase())
    )

    const handleSubmission = async () => {
        if (!licenceRegNumber || !photo) {
            Alert.alert("Error", "Please fill in all fields and select or take a picture.");
            return;
        }

        const formData = new FormData();
        formData.append("NameSurname", NameSurname);
        formData.append("regNumber", selectedLicenceReg);
        formData.append("dateTime", DateAndTime);
        formData.append("fuelType", fuelItems);
        formData.append("cost", cost);
        formData.append("odometer", odometer);
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

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.topContainer}>
                <View style={styles.headerTitleContainer}>
                    <View>
                        <Text style={styles.headerTex}>Fuel Slips</Text>
                    </View>
                    <View style={styles.modalController}>
                        <TouchableOpacity onPress={() => setIsModalShown(true)}>
                            <View style={styles.controllerBtn}>
                                <Ionicons name="add" size={24} color="#f1f1f1" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <View style={styles.searchContainer}>
                        <MaterialIcons name="search" size={24} color="#6c757d" style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search..."
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                </View>
            </View>
            <View>
                <ScrollView contentContainerStyle={styles.ScrollContainer}>
                    {!searchedFuelSlips ? (
                        <Card key={searchedFuelSlips._id} style={styles.card}>
                            <Card.Title title={`${searchedFuelSlips.Registration}`} subtitle={`${searchedFuelSlips.FuelType}`} />
                            <Card.Content>
                                <Text>Date: {searchedFuelSlips.DateTime}</Text>
                                <Text>Fuel Type: {searchedFuelSlips.FuelType}</Text>
                                <Text>Cost: {searchedFuelSlips.Cost}</Text>
                                <Text>Odometer: {searchedFuelSlips.KM}</Text>
                                <TouchableOpacity>
                                    <Text>Image: {searchedFuelSlips.Image}</Text>
                                </TouchableOpacity>
                            </Card.Content>
                        </Card>
                    ) : (
                        <View style={{
                            alignItems: 'center',
                            justifyContent: "center"
                        }}>
                            <Text style={{ fontSize: 24, color: "grey" }}>No Data Loaded</Text>
                        </View>
                    )}
                    {filteredFuelSlips.map((fuelSlips) => (
                        <Card key={fuelSlips._id} style={styles.card}>
                            <Card.Title title={`${fuelSlips.Registration}`} subtitle={`${searchedFuelSlips.FuelType}`} />
                            <Card.Content>
                                <Text>Date: {fuelSlips.DateTime}</Text>
                                <Text>Fuel Type: {fuelSlips.FuelType}</Text>
                                <Text>Cost: {fuelSlips.Cost}</Text>
                                <Text>Odometer: {fuelSlips.KM}</Text>
                                <TouchableOpacity>
                                    <Text>Image: {fuelSlips.Image}</Text>
                                </TouchableOpacity>
                            </Card.Content>
                        </Card>
                    ))}

                </ScrollView>
            </View>

            <Modal
                visible={isModalShown}
                animationType='slide'
                presentationStyle='formSheet'
                onRequestClose={() => setIsModalShown(false)}
                style={styles.modalStyle}
            >
                <ScrollView>
                    <View style={styles.modalHeaderContainer}>
                        <View style={{ marginLeft: 150 }}>
                            <Text style={styles.formTitle}>Add Item</Text>
                        </View>
                        <View style={{ marginRight: 10 }}>
                            <TouchableOpacity onPress={() => setIsModalShown(false)}>
                                <MaterialIcons name='close' size={24} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.mainContainer}>
                        <Text style={styles.titleText}>Name</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={NameSurname}
                                onValueChange={(itemValue) => setNameSurname(itemValue)}
                            >
                                <Picker.Item label='Select Your Name' value="" />
                                {usersLogged.map((users) => (
                                    <Picker.Item key={users._id} label={`${users.Name || ""} ${users.Surname || ""}`} />
                                ))}
                            </Picker>
                        </View>
                        <Text style={styles.titleText}>Registration Number</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={selectedLicenceReg}
                                onValueChange={(item) => setSelectedLicenceReg(item)}
                            >
                                <Picker.Item label="Licence Registration Number" value="" />
                                {licenceRegNumber.map((reg) => (
                                    <Picker.Item key={reg._id} label={reg.AssetReg} value={reg._id} />
                                ))}
                            </Picker>
                        </View>


                        <Text style={styles.titleText}>Date Done</Text>
                        <View style={styles.textInput}>
                            <TouchableOpacity onPress={() => showMode("date")}>
                                <Feather name="calendar" size={18} color="black" style={styles.icon} />
                            </TouchableOpacity>
                            <TextInput
                                value={DateFormat(DateAndTime)}
                                placeholder='Select Date'
                                editable={false}
                                onTouchStart={() => setShowPicker(true)}
                                style={styles.inputStyle}
                            />
                        </View>

                        <Text style={styles.titleText}>Time Done</Text>
                        <View style={styles.textInput}>
                            <TouchableOpacity onPress={() => showMode("time")}>
                                <Feather name="clock" size={18} color="black" style={styles.icon} />
                            </TouchableOpacity>
                            <TextInput
                                value={TimeFormat(DateAndTime)}
                                placeholder='Select Time'
                                editable={false}
                                onTouchStart={() => setShowPicker(true)}
                                style={styles.inputStyle}
                            />
                        </View>
                        {showPicker && (
                            <DateTimePicker
                                value={DateAndTime}
                                mode={mode}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                is24Hour={true}
                                onChange={handleDateTimeChange}
                            />
                        )}

                        <Text style={styles.titleText}>Fuel Type</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={fuelItems} onValueChange={(fuelItem) => setFuelItems(fuelItem)}>
                                <Picker.Item label="Selected Fuel Type" value="" />
                                <Picker.Item label="Petrol" value="Petrol" />
                                <Picker.Item label="Diesel" value="Diesel" />
                            </Picker>
                        </View>
                        <Text style={styles.titleText}>Cost</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder="Cost"
                                value={cost}
                                onChangeText={setCost}
                                style={styles.inputStyle}
                            />
                        </View>

                        <Text style={styles.titleText}>Odometer</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder="Odometer (KM)"
                                value={odometer}
                                onChangeText={setOdometer}
                                style={styles.inputStyle}
                            />
                        </View>

                        <Text style={styles.titleText}>Upload Images</Text>
                        <View style={styles.imageHouser}>
                            {(photo?.uri || imageUri) ? (
                                <View style={{ flexDirection: "row", margin: 6 }}>
                                    <Image source={{ uri: photo.uri || imageUri }} style={styles.imagePreview} />
                                    <TouchableOpacity onPress={removeImage}>
                                        <MaterialIcons name="close" size={12} />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View>
                                    <TouchableOpacity style={styles.button} onPress={pickImage}>
                                        <View style={{ flexDirection: "row" }}>
                                            <MaterialIcons name="photo" color="grey" size={24} style={styles.icon} />
                                            <Text style={{ color: "grey", fontSize: 18 }}>Upload from Gallery</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmission}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonCancel} onPress={() => setIsModalShown(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#fff",
    },

    topContainer: {
        flexDirection: 'column',
        width: "100%",
        height: 147,
        backgroundColor: "#301934"
    },

    headerTex: {
        fontWeight: 'bold',
        color: "#f1f1f1",
        fontSize: 24,
        marginLeft: 20,
    },

    modalController: {
        padding: 16,
        marginLeft: 90,
    },

    controllerBtn: {
        borderRadius: 20,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40
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

    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#f1f1f1",
    },

    searchIcon: {
        marginRight: 8,
        marginLeft: 8,
    },
    controllerBtn: {
        borderRadius: 20,
        backgroundColor: 'grey',
        color: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40
    },

    headerTitleContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'none',
        marginBottom: 7,

    },

    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },

    mainContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,

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
        marginLeft: 9,
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
});

export default FuelConsumptionForm;