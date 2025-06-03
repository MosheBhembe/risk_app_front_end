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
    TouchableOpacity,
    ScrollView,
    Platform,
    Modal,
    Linking
} from 'react-native';

import { Camera, CameraType, useCameraPermissions, CameraView } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';

const MaintenanceSlips = ({ navigation }) => {
    const cameraRef = useRef();
    const [name, setName] = useState('');
    const [users, SetUsers] = useState([]);
    const [registration, setRegistration] = useState("");
    const [registrationlist, setRegistrationList] = useState([]);

    // Date time State
    const [dateTime, setDateTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState("date");

    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [odometer, setOdometer] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasCameraPermissions, setHasCameraPermissions] = useState(null);
    const [hasMediaLibraryPermissions, setHasMediaLibraryPermissions] = useState(null);
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [showModal, setShowModal] = useState(false);

    const [search, setSearch] = useState("");
    const [maintenanceSlips, setMaintenanceSlips] = useState([]);
    const [showCamera, setShowCamera] = useState(false)
    const API = process.env.API_URL || 'http://192.168.8.161:5001';

    const showMode = (mode) => {
        setShowPicker(true);
        setPickerMode(mode);
    }

    const handleChange = (e, selectedDate) => {
        setDateTime(selectedDate);
        setShowPicker(false);
    }

    const formatDate = (dateformat) => {
        return dateformat.toLocaleString(undefined, {
            dateStyle: 'medium',
        });
    };

    const formatTime = (timeFormat) => {
        return timeFormat.toLocaleString(undefined, {
            timeStyle: 'short'
        });
    };

    useEffect(() => {
        (async () => {
            const cameraPermissions = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermissions(cameraPermissions.status === 'granted');
            setHasMediaLibraryPermissions(mediaLibraryPermissions.status === 'granted');
        })();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    console.Error(error);
                    return;
                }
                const response = await fetch(`${API}/api/fetch-all-users`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const userInformation = await response.json();

                if (Array.isArray(userInformation)) {
                    SetUsers(userInformation)
                } else {
                    console.error('error fetching data');
                }

            } catch (error) {
                console.error(error);
                return <Text>Error fetching user</Text>
            }
        }
        fetchUsers();
    })

    const fetchMaintenanceSlips = async () => {
        try {
            const userToken = await AsyncStorage.getItem('token');
            if (!userToken) {
                console.error('Unautherized Token');
                return;
            }

            const response = await fetch(`${API}/api/get-all-maintenance-slips`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            });

            const slips = await response.json();

            // for debugging 
            console.log('slips', slips);

            if (Array.isArray(slips)) {
                setMaintenanceSlips(slips);
            }
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    useEffect(() => {
        const fetchRegNumber = async () => {
            try {
                const usetoken = await AsyncStorage.getItem('token');
                if (!usetoken) {
                    console.error(error);
                }
                const response = await fetch(`${API}/api/fetch-all-assets`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${usetoken}`
                    }
                })
                const Registration_Data = await response.json();

                if (Array.isArray(Registration_Data)) {
                    setRegistrationList(Registration_Data)
                } else {
                    Alert.alert("No Data found");
                    console.error('No data found');
                }

            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false);
            }
        }
        fetchRegNumber();
        fetchMaintenanceSlips();
    }, []);


    // Filter through the Slips and display them on the screen
    const fileredSlips = maintenanceSlips.filter((slipDocs) =>
        slipDocs.Registration.toLowerCase().includes(search || "".toLowerCase())
    )


    if (!permission) {
        return <View />
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text> We need permission to use the camera </Text>
                <Button onPress={requestPermission} title="Grant permisson" />
            </View>
        )
    }

    const snapPic = async () => {
        if (cameraRef) {
            const serviceOptions = {
                quality: 0.5,
                base64: true
            };
            const newPic = await cameraRef.takePictureAsync(serviceOptions);
            setImage(newPic);
        }
    };

    function toggleCameraFacing() {
        setFacing(current === 'back' ? 'front' : 'back')
    }

    const imagePicker = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
        }
    }

    const removeImage = () => {
        Alert.alert(
            "Remove Image",
            "Are you sure you what to remove this image",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Remove", style: "destructive", onPress: () => setImage(null) }
            ]
        );
    };

    useEffect(() =>{
        if (showModal) {
            setShowCamera(false); 
        }
    },[showModal]); 

    function toggleCameraFacing (){
        setFacing(current => (current === 'back' ? 'front' : 'back')); 
    }
    const handleDataSubmission = async () => {
        if (!name || !date || !registration || !cost || !description || !odometer || !image) {
            Alert.alert("Missing Info!", "Please make sure that all field have been filled in");
            return;
        }

        const Data = new FormData();
        Data.append("name", name);
        Data.append("registration", registration);
        Data.append("date", dateTime);
        Data.append("cost", cost);
        Data.append("description", description);
        Data.append("odometer", odometer);
        Data.append("image", {
            uri: image.uri,
            name: `image_${Date.now()}.jpg`,
            type: "image/jpeg"
        });

        // Api Access. 
        try {
            const accesstoken = await AsyncStorage.getItem('token');
            if (!accesstoken) {
                console.error('no token found');
                return;
            }

            const response = await fetch(`${API}/api/create-maintenance-slip`, {
                method: POST,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accesstoken}`
                },
                body: Data
            });
            const data = await response.json();

            if (response.ok) {
                Alert.alert('Submitted', "Information has been sent successfully");
                navigation.navigate("Dashboard Screen");
            } else {
                throw new Error(data.message || 'Failed to upload data');
            }
        } catch (error) {
            Alert.alert('Error', 'Submission Error');
            console.log(error);
        }

    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.containerwrapper}>
                <View style={styles.headingContainer}>
                    <View>
                        <Text style={styles.headerText}>Maintenance Slips</Text>
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
            </View>
            <View>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Card key={maintenanceSlips._id} style={styles.card}>
                        <Card.Title title={`Registration #: ${maintenanceSlips.Registration}` || ''} subtitle={`Cost: ${maintenanceSlips.Cost}`} />
                        <Card.Content>
                            <Text>Date Submitted: {maintenanceSlips.DateDone}</Text>
                            <TouchableOpacity onPress={() => Linking.openURL(maintenanceSlips.downloadLink)}>
                                <Text>Image: {maintenanceSlips.Image}</Text>
                            </TouchableOpacity>
                        </Card.Content>
                    </Card>
                    {fileredSlips.map((doc) => (
                        <Card key={doc._id} style={styles.card}>
                            <Card.Title title={doc.Registration} subtitle={`Cost: ${doc.Cost}`} />
                            <Card.Content>
                                <Text>Date Submitted: {doc.DateDone}</Text>
                                <TouchableOpacity onPress={() => Linking.openURL(doc.downloadLink)}>
                                    <Text>Image: {doc.Image}</Text>
                                </TouchableOpacity>
                            </Card.Content>
                        </Card>
                    ))}
                </ScrollView>
            </View>

            {/* Modal with the forms */}
            <Modal
                visible={showModal}
                animationType='slide'
                presentationStyle='formSheet'
                onRequestClose={() => setShowModal(false)}
                style={styles.modalStyle}
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
                        <Text style={styles.titleText}>Name</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={name}
                                onValueChange={(valueItem) => setName(valueItem)}
                            >
                                <Picker.Item label="Select Your Name" value="" />
                                {users.map((listedUsers) => (
                                    <Picker.Item key={listedUsers._id} label={`${listedUsers.Name || ""} ${listedUsers.Surname || ""}`} value={`${listedUsers.Name} ${listedUsers.Name || ""} ${listedUsers.Surname || ""}`} />
                                ))}
                            </Picker>
                        </View>
                        <Text style={styles.titleText}>Registration Number</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={registration} onValueChange={(regItem) => { setRegistration(regItem) }} >
                                <Picker.Item label="Select Registration Number" value="" />
                                {registrationlist.map((regNum) => (
                                    <Picker.Item
                                        key={regNum._id}
                                        label={regNum.AssetReg}
                                        value={regNum._id}
                                    />
                                ))}
                            </Picker>
                        </View>

                        {/* Date and Time Picker */}

                        <Text style={styles.titleText}>Date Done</Text>
                        <View style={styles.textInput}>
                            <TouchableOpacity onPress={() => showMode("date")}>
                                <Feather name="calendar" size={18} color="black" style={styles.icon} />
                            </TouchableOpacity>

                            <TextInput
                                value={formatDate(dateTime)}
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
                                value={formatTime(dateTime)}
                                placeholder='Select Time'
                                editable={false}
                                onTouchStart={() => setShowPicker(true)}
                                style={styles.inputStyle}
                            />
                        </View>
                        {showPicker && (
                            <DateTimePicker
                                value={dateTime}
                                mode={pickerMode}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                is24Hour={true}
                                onChange={handleChange}
                            />
                        )}
                        <Text style={styles.titleText}>Cost</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                placeholder="Cost"
                                value={cost}
                                onChangeText={setCost}
                                style={styles.inputStyle}
                            />
                        </View>

                        <Text style={styles.titleText}>Description</Text>
                        <View style={styles.textArea}>
                            <TextInput
                                style={styles.textArea}
                                multiline={true}
                                numberOfLines={5}
                                value={description}
                                onChangeText={setDescription}
                                placeholder="Type something..."
                            />
                        </View>

                        <Text style={styles.titleText}>Odometer</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder='Odometer (KM)'
                                value={odometer}
                                onChangeText={setOdometer}
                            />
                        </View>

                        <Text style={styles.titleText}>Upload Pictures</Text>
                        <View style={styles.imageHouser}>
                            {image ? (
                                <View style={{ flexDirection: "row", margin: 6 }}>
                                    <Image source={{ uri: image.uri }} style={styles.imagePreview} />
                                    <TouchableOpacity onPress={removeImage}>
                                        <MaterialIcons name="close" size={12} />
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View>
                                    <TouchableOpacity style={styles.button} onPress={imagePicker}>
                                        <View style={{ flexDirection: "row" }}>
                                            <MaterialIcons name="photo" color="grey" size={24} style={styles.icon} />
                                            <Text style={{ color: "grey", fontSize: 18 }}>Upload from Gallery</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <View style={styles.buttonContainer}>
                            {!showCamera && (
                                <TouchableOpacity onPress={() => setShowCamera(true)}>
                                    <MaterialIcons name="camera" size={30} />
                                </TouchableOpacity>
    
                            )}
                            {showCamera && (
                                <View style={styles.cameraContainer}>
                                    <CameraView style={styles.camera} facing={facing}>
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                                                <Text style={styles.text}>Flip Camera</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={snapPic}>
                                                <Text style={styles.text}>Take Picture</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => setShowCamera(false)}>
                                                <Text style={styles.text}>Close</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </CameraView>
                                </View>
                            )}

                            <TouchableOpacity style={styles.buttonSubmit} onPress={handleDataSubmission}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonCancel} onPress={() => setShowModal(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

            </Modal>
        </SafeAreaView>
    )

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
        fontSize: 16,
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
        justifyContent: 'center'
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

export default MaintenanceSlips; 