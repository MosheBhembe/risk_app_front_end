import { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TextInput,
    Alert,
    Platform,
    TouchableOpacity,
    StyleSheet,
    Modal,
    Image
} from 'react-native';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import SignatureCanvas from 'react-native-signature-canvas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons'
// import styles from '../styles/styles.js';

const PostTripInspection = ({ navigation }) => {
    // http://mobiapi.riskbt.co.za
    const API = process.env.API_URL || 'http://192.168.8.161:5001';
    const [vehicleRegistration, setVehicleRegistration] = useState("");
    const [registrationList, setRegistrationList] = useState([]);
    const [dateTime, setDateTime] = useState(new Date());
    const [trailor, setTrailor] = useState("");
    const [checked, setChecked] = useState({
        noLoss: '',
        closedWindows: '',
        fleet: '',
        tailLightsCondition: '',
        parkBrakes: '',
        warnings: '',
        clean: '',
        visualDamage: '',
        documents: '',
        leaks: '',
        productLeaks: '',
        covers: '',
        batteryCover: '',
        mirrors: '',
        visualNewDamage: '',
        tyres: '',
        wheels: '',
        windScreen: '',
        registrationPlate: '',
        chevron: '',
        reflector: '',
        labels: '',
        orangeDimond: '',
        numberPlateLights: '',
        markerLights: '',
        tailLights: '',
        headLights: '',
        fire: '',
        cones: '',
        shockblocks: ''
    });
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [comments, setComments] = useState("");
    const [next, setNext] = useState(false);
    const [mainForm, setMainForm] = useState(true);

    const [showSignature, setShowSignature] = useState(false);
    const [signature, setSignature] = useState(null);

    const [modePicker, setMode] = useState("date");
    const [dateTimePicker, setDateTimePicker] = useState(false);
    const sigRef = useRef();

    const showMode = (mode) => {
        setDateTimePicker(true);
        setMode(mode);
    }

    const nextFormHandler = () => {
        setMainForm(false);
        setNext(true);
    }

    const previousFormHandler = () => {
        setNext(false);
        setMainForm(true);
    }

    const toggledChecks = (field, value) => {
        setChecked((prev) => ({
            ...prev,
            [field]: prev[field] === value ? '' : value,
        }));
    };

    const handleDateTimeChange = (e, selected) => {
        setDateTime(selected);
        setDateTimePicker(false);
    }

    const DateFormatter = (date) => {
        return date.toLocaleString(undefined, {
            dateStyle: "medium"
        });
    }

    const TimeFormatter = (time) => {
        return time.toLocaleString(undefined, {
            timeStyle: 'short'
        })
    }

    const handleOk = (sig) => {
        setSignature(sig);
        setShowModal(false);
    }

    const fetchVehicleReg = async () => {
        try {
            const token = await AsyncStorage.getItem('token')
            if (!token) {
                console.log("no token found");
            }

            const response = await fetch(`${API}/api/fetch-all-assets`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const registration = await response.json();

            if (Array.isArray(registration)) {
                setRegistrationList(registration)
            } else {
                console.log("no users found");
            }

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchVehicleReg();
    }, [])

    const submitform = async () => {
        try {
            const sendInformation = new FormData();
            sendInformation.append('registration', vehicleRegistration);
            sendInformation.append('dateTime', dateTime);
            sendInformation.append('trailor', trailor);
            sendInformation.append('noLoss', checked.noLoss);
            sendInformation.append('fleetAndFuel', checked.fleet);
            sendInformation.append('windowsAreClosed', checked.closedWindows);
            sendInformation.append('clean', checked.clean);
            sendInformation.append('tailLightCondition', checked.tailLightsCondition);
            sendInformation.append('parkingBrake', checked.parkBrakes);
            sendInformation.append('dashboardWarning', checked.warnings);
            sendInformation.append('documentCompleted', checked.documents);
            sendInformation.append('noVisualDamage', checked.visualDamage);
            sendInformation.append('leaks', checked.leaks);
            sendInformation.append('productLeaks', checked.productLeaks);
            sendInformation.append('dustCovers', checked.covers);
            sendInformation.append('batteryCover', checked.batteryCover);
            sendInformation.append('mirrorsAndCovers', checked.mirrors);
            sendInformation.append('newDamage', checked.visualNewDamage);
            sendInformation.append('tyres', checked.tyres);
            sendInformation.append('wheelNuts,', checked.wheels);
            sendInformation.append('windScreen', checked.windScreen);
            sendInformation.append('registrationPlate', checked.registrationPlate);
            sendInformation.append('chevronandPumbers', checked.chevron);
            sendInformation.append('reflectorTapes', checked.reflector);
            sendInformation.append('label', checked.labels);
            sendInformation.append('orangeDimond', checked.orangeDimond);
            sendInformation.append('numberPlateLights', checked.numberPlateLights);
            sendInformation.append('markerLights', checked.markerLights);
            sendInformation.append('tailLights', checked.tailLights);
            sendInformation.append('headLights', checked.headLights);
            sendInformation.append('fire', checked.fire);
            sendInformation.append('cones', checked.cones);
            sendInformation.append('shocksAndBlocks', checked.shockblocks);
            sendInformation.append('comments', comments);
            sendInformation.append('signature', {
                uri: signature.uri,
                name: 'signature',
                type: "image/png"
            });

            const token = await AsyncStorage.getItem('token');

            if (!token) {
                console.log('no token found');
                return;
            }

            const sendData = await fetch(`${API}/api/create-post-inspection`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(sendInformation)
            })

            if (sendData.ok) {
                Alert.alert('Submit')
            }
        } catch (error) {

        }
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <View>
                        <Text style={styles.headerText}>Post Trip Inspections</Text>
                    </View>
                    <View style={styles.modalAccessContainer}>
                        <TouchableOpacity onPress={() => setShowModal(true)}>
                            <View style={styles.openModal}>
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
                            placeholder='Search...'
                            placeholderTextColor="#f1f1f1"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                </View>
            </View>
            <Modal
                visible={showModal}
                animationType="slide"
                presentationStyle='formSheet'
                onRequestClose={() => setShowModal(false)}
                style={styles.modalStyle}
            >
                <View style={styles.modalHeaderContainer}>
                    <View style={{ marginLeft: 150 }}>
                        <Text style={styles.header}>Add Item</Text>
                    </View>
                    <View style={{ marginRight: 10 }}>
                        <TouchableOpacity onPress={() => setShowModal(false)}>
                            <MaterialIcons name='close' size={24} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View>
                        <View style={styles.formContainer}>
                            <Text style={styles.titleText}>Registration Number</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={vehicleRegistration}
                                    onValueChange={(value) => setVehicleRegistration(value)}
                                >
                                    <Picker.Item label="Select Registration Number" value="" />
                                    {registrationList.map((carNumber) => (
                                        <Picker.Item key={carNumber._id} label={`${carNumber.AssetReg}`} value={`${carNumber.AssetReg}`} />
                                    ))}
                                </Picker>
                            </View>
                            <View>

                            </View>
                            <Text style={styles.titleText}>Trailor Registration</Text>
                            <View style={styles.textInput}>
                                <TextInput
                                    value={trailor}
                                    placeholder='Trailor registration Number'
                                    onChangeText={setTrailor}
                                    style={styles.inputStyle}
                                />
                            </View>
                            <Text style={styles.titleText}>Date</Text>
                            <View style={styles.textInput}>
                                <TouchableOpacity onPress={() => showMode("date")}>
                                    <Feather name="calendar" size={18} color="black" style={styles.icon} />
                                </TouchableOpacity>
                                <TextInput
                                    value={DateFormatter(dateTime)}
                                    placeholder="Select Date"
                                    editable={false}
                                    onTouchStart={() => setDateTimePicker(true)}
                                    style={styles.inputStyle}
                                />
                            </View>

                            <Text style={styles.titleText}>Time</Text>
                            <View style={styles.textInput}>
                                <TouchableOpacity onPress={() => showMode("time")}>
                                    <Feather name="clock" size={18} color="black" style={styles.icon} />
                                </TouchableOpacity>

                                <TextInput
                                    value={TimeFormatter(dateTime)}
                                    placeholder='Select Time'
                                    editable={false}
                                    onTouchStart={() => setDateTimePicker(true)}
                                    style={styles.inputStyle}
                                />
                            </View>
                        </View>
                        {dateTimePicker && (
                            <DateTimePicker
                                value={dateTime}
                                mode={modePicker}
                                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                is24Hour={true}
                                onChange={handleDateTimeChange}
                            />
                        )}

                        {/* checkboxes */}
                        {mainForm && (
                            <View style={{ width: '100%' }}>
                                <View style={styles.titleView}>
                                    <Text style={styles.headerTitleText}>While inside the Cab</Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <View style={styles.checkbox}>
                                        <View>
                                            <Text style={styles.titleText}>No loss Items</Text>
                                        </View>
                                        <View style={styles.optionContainer}>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.noLoss === 'Yes'}
                                                    onValueChange={() => toggledChecks('noLoss', 'Yes')}
                                                />
                                                <Text style={styles.label}>Yes</Text>
                                            </View>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.noLoss === "No"}
                                                    onValueChange={() => toggledChecks('noLoss', 'No')}
                                                />
                                                <Text style={styles.label}>No</Text>
                                            </View>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.noLoss === 'N/A'}
                                                    onValueChange={() => toggledChecks('noLoss', 'N/A')}
                                                />
                                                <Text style={styles.label}>N/A</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.checkbox}>
                                        <View>
                                            <Text style={styles.titleText}>Windows are closed</Text>
                                        </View>
                                        <View style={styles.optionContainer}>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.closedWindows === "Yes"}
                                                    onValueChange={() => toggledChecks('closedWindows', 'Yes')}
                                                />
                                                <Text style={styles.label}>Yes</Text>
                                            </View>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.closedWindows === 'No'}
                                                    onValueChange={() => toggledChecks('closedWindows', 'No')}
                                                />
                                                <Text style={styles.label}>No</Text>
                                            </View>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.closedWindows === 'N/A'}
                                                    onValueChange={() => toggledChecks('closedWindows', 'N/A')}
                                                />
                                                <Text style={styles.label}>N/A</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.checkbox}>
                                        <View>
                                            <Text style={styles.titleText}>Dashboard Warnings</Text>
                                        </View>
                                        <View style={styles.optionContainer}>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.warnings === 'Yes'}
                                                    onValueChange={() => toggledChecks('warnings', 'Yes')}
                                                />
                                                <Text style={styles.label}>Yes</Text>
                                            </View>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.warnings === 'No'}
                                                    onValueChange={() => toggledChecks('warnings', 'No')}
                                                />
                                                <Text style={styles.label}>No</Text>
                                            </View>

                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.warnings === "N/A"}
                                                    onValueChange={() => toggledChecks('warnings', 'N/A')}
                                                />
                                                <Text style={styles.label}>N/A</Text>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.checkbox}>
                                        <View>
                                            <Text style={styles.titleText}>Inside Cab is clean</Text>
                                        </View>
                                        <View style={styles.optionContainer}>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.clean === 'Yes'}
                                                    onValueChange={() => toggledChecks('clean', 'Yes')}
                                                />
                                                <Text style={styles.label}>Yes</Text>
                                            </View>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.clean === 'No'}
                                                    onValueChange={() => toggledChecks('clean', 'No')}
                                                />
                                                <Text style={styles.label}>No</Text>
                                            </View>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.clean === 'N/A'}
                                                    onValueChange={() => toggledChecks('clean', 'N/A')}
                                                />
                                                <Text style={styles.label}>N/A</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.checkbox}>
                                        <View>
                                            <Text style={styles.titleText}>Tail Lights no Damange</Text>
                                        </View>
                                        <View style={styles.optionContainer}>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.tailLightsCondition === 'Yes'}
                                                    onValueChange={() => toggledChecks('tailLightsCondition', 'Yes')}
                                                />
                                                <Text style={styles.label}>Yes</Text>
                                            </View>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.tailLightsCondition === 'No'}
                                                    onValueChange={() => toggledChecks('tailLightsCondition', 'No')}
                                                />
                                                <Text style={styles.label}>No</Text>
                                            </View>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.tailLightsCondition === 'N/A'}
                                                    onValueChange={() => toggledChecks('tailLightsCondition', 'N/A')}
                                                />
                                                <Text style={styles.label}>N/A</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.checkbox}>
                                        <View>
                                            <Text style={styles.titleText}>Compleled Documents</Text>
                                        </View>
                                        <View style={styles.optionContainer}>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.documents === 'Yes'}
                                                    onValueChange={() => toggledChecks("documents", 'Yes')}
                                                />
                                                <Text style={styles.label}>Yes</Text>
                                            </View>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.documents === "No"}
                                                    onValueChange={() => toggledChecks('documents', 'No')}
                                                />
                                                <Text style={styles.label}>No</Text>
                                            </View>
                                            <View style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checked.documents === "N/A"}
                                                    onValueChange={() => toggledChecks('documents', 'N/A')}
                                                />
                                                <Text style={styles.label}>N/A</Text>
                                            </View>
                                        </View>
                                        <View style={styles.checkbox}>
                                            <View>
                                                <Text style={styles.titleText}>Fleet and fuel cards</Text>
                                            </View>
                                            <View style={styles.optionContainer}>
                                                <View style={styles.optionRowView}>
                                                    <Checkbox
                                                        value={checked.fleet === 'Yes'}
                                                        onValueChange={() => toggledChecks('fleet', 'Yes')}
                                                    />
                                                    <Text style={styles.label}>Yes</Text>
                                                </View>
                                                <View style={styles.optionRowView}>
                                                    <Checkbox
                                                        value={checked.fleet === "No"}
                                                        onValueChange={() => toggledChecks('fleet', 'No')}
                                                    />
                                                    <Text style={styles.label}>No</Text>
                                                </View>
                                                <View style={styles.optionRowView}>
                                                    <Checkbox
                                                        value={checked.documents}
                                                        onValueChange={() => toggledChecks('fleet', 'N/A')}
                                                    />
                                                    <Text style={styles.label}>N/A</Text>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Parking Brakes</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.parkBrakes === "Yes"}
                                                            onValueChange={() => toggledChecks('parkBrakes', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.parkBrakes === "No"}
                                                            onValueChange={() => toggledChecks('parkBrakes', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.parkBrakes === 'N/A'}
                                                            onValueChange={() => toggledChecks('parkBrakes', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>No Visual Damage</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.visualDamage === 'Yes'}
                                                            onValueChange={() => toggledChecks('visualDamage', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.visualDamage === 'No'}
                                                            onValueChange={() => toggledChecks('visualDamage', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.visualDamage === 'N/A'}
                                                            onValueChange={() => toggledChecks('visualDamage', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity style={styles.buttonCancel} onPress={() => setShowModal(false)}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonSubmit} onPress={nextFormHandler}>
                                        <Text style={styles.buttonText}>Next</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                        {next && (
                            <View>
                                <View>
                                    <View style={styles.titleView}>
                                        <Text style={styles.headerTitleText}>Walk Around</Text>
                                    </View>
                                    <ScrollView>
                                        <View style={styles.checkboxContainer}>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>{`Leaks (Air, Oil, Water)`}</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.leaks === "Yes"}
                                                            onValueChange={() => toggledChecks('leaks', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.leaks === "No"}
                                                            onValueChange={() => toggledChecks('leaks', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.leaks === "N/A"}
                                                            onValueChange={() => toggledChecks('leaks', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Wheel and Nut Markers</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.wheels === 'Yes'}
                                                            onValueChange={() => toggledChecks('wheels', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.wheels === 'No'}
                                                            onValueChange={() => toggledChecks('wheels', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.wheels === 'N/A'}
                                                            onValueChange={() => toggledChecks('wheels', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Number Plate lights</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.numberPlateLights === 'Yes'}
                                                            onValueChange={() => toggledChecks('numberPlateLights', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.numberPlateLights === 'No'}
                                                            onValueChange={() => toggledChecks('numberPlateLights', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.numberPlateLights === 'N/A'}
                                                            onValueChange={() => toggledChecks('numberPlateLights', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Product Leaks</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.productLeaks === 'Yes'}
                                                            onValueChange={() => toggledChecks('productLeaks', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.productLeaks === 'No'}
                                                            onValueChange={() => toggledChecks('productLeaks', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.productLeaks === 'N/A'}
                                                            onValueChange={() => toggledChecks('productLeaks', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Windscreen / Wiper plates</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.windScreen === 'Yes'}
                                                            onValueChange={() => toggledChecks('windScreen', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.windScreen === 'No'}
                                                            onValueChange={() => toggledChecks('windScreen', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.windScreen === 'N/A'}
                                                            onValueChange={() => toggledChecks('windScreen', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Marker Lights</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.markerLights === 'Yes'}
                                                            onValueChange={() => toggledChecks('markerLights', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.markerLights === 'No'}
                                                            onValueChange={() => toggledChecks('markerLights', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.markerLights === 'N/A'}
                                                            onValueChange={() => toggledChecks('markerLights', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Dust Covers</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.covers === 'Yes'}
                                                            onValueChange={() => toggledChecks('covers', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.covers === 'No'}
                                                            onValueChange={() => toggledChecks('covers', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.covers === 'N/A'}
                                                            onValueChange={() => toggledChecks('covers', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Registration Plate</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.registrationPlate === 'Yes'}
                                                            onValueChange={() => toggledChecks('registrationPlate', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.registrationPlate === 'No'}
                                                            onValueChange={() => toggledChecks('registrationPlate', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.registrationPlate === 'N/A'}
                                                            onValueChange={() => toggledChecks('registrationPlate', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Tail Lights No Damage</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.tailLightsCondition === 'Yes'}
                                                            onValueChange={() => toggledChecks('tailLightsCondition', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.tailLightsCondition === 'No'}
                                                            onValueChange={() => toggledChecks('tailLightsCondition', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.tailLightsCondition === 'N/A'}
                                                            onValueChange={() => toggledChecks('tailLightsCondition', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Battery Cover</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.batteryCover === 'Yes'}
                                                            onValueChange={() => toggledChecks('batteryCover', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.batteryCover === 'No'}
                                                            onValueChange={() => toggledChecks('batteryCover', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.batteryCover === 'N/A'}
                                                            onValueChange={() => toggledChecks('batteryCover', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Chevron and Pumbers</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.chevron === 'Yes'}
                                                            onValueChange={() => toggledChecks('chevron', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.chevron === 'No'}
                                                            onValueChange={() => toggledChecks('chevron', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.chevron === 'N/A'}
                                                            onValueChange={() => toggledChecks('chevron', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Headlights No Damage</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.headLights === 'Yes'}
                                                            onValueChange={() => toggledChecks("headLights", 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.headLights === 'No'}
                                                            onValueChange={() => toggledChecks("headLights", 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.headLights === 'N/A'}
                                                            onValueChange={() => toggledChecks("headLights", 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Mirrors and Covers</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.mirrors === 'Yes'}
                                                            onValueChange={() => toggledChecks('mirrors', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.mirrors === 'No'}
                                                            onValueChange={() => toggledChecks('mirrors', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.mirrors === 'N/A'}
                                                            onValueChange={() => toggledChecks('mirrors', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Reflector Tapes/ Placards</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.reflector === 'Yes'}
                                                            onValueChange={() => toggledChecks('reflector', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.reflector === 'No'}
                                                            onValueChange={() => toggledChecks('reflector', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.reflector === 'N/A'}
                                                            onValueChange={() => toggledChecks('reflector', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Fire Extinguisher x4</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.fire === 'Yes'}
                                                            onValueChange={() => toggledChecks('fire', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.fire === 'No'}
                                                            onValueChange={() => toggledChecks('fire', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.fire === 'N/A'}
                                                            onValueChange={() => toggledChecks('fire', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Visual New Damage</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.visualNewDamage === 'Yes'}
                                                            onValueChange={() => toggledChecks('visualNewDamage', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.visualNewDamage === 'No'}
                                                            onValueChange={() => toggledChecks('visualNewDamage', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.visualNewDamage === 'N/A'}
                                                            onValueChange={() => toggledChecks('visualNewDamage', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>{'Labels (Isolation, ext)'}</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.labels === 'Yes'}
                                                            onValueChange={() => toggledChecks('labels', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.labels === 'No'}
                                                            onValueChange={() => toggledChecks('labels', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.labels === 'N/A'}
                                                            onValueChange={() => toggledChecks('labels', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Cones x6</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.cones === 'Yes'}
                                                            onValueChange={() => toggledChecks('cones', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.cones === 'Yes'}
                                                            onValueChange={() => toggledChecks('cones', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.cones === 'Yes'}
                                                            onValueChange={() => toggledChecks('cones', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Tyres for any Damage</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.tyres === 'Yes'}
                                                            onValueChange={() => toggledChecks('tyres', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.tyres === 'No'}
                                                            onValueChange={() => toggledChecks('tyres', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.tyres === 'N/A'}
                                                            onValueChange={() => toggledChecks('tyres', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Orange Dimond</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.orangeDimond === 'Yes'}
                                                            onValueChange={() => toggledChecks('orangeDimond', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.orangeDimond === 'No'}
                                                            onValueChange={() => toggledChecks('orangeDimond', 'No')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.orangeDimond === 'N/A'}
                                                            onValueChange={() => toggledChecks('orangeDimond', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.checkbox}>
                                                <View>
                                                    <Text style={styles.titleText}>Shocks and Blocks</Text>
                                                </View>
                                                <View style={styles.optionContainer}>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.shockblocks === 'Yes'}
                                                            onValueChange={() => toggledChecks('shockblocks', 'Yes')}
                                                        />
                                                        <Text style={styles.label}>Yes</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.shockblocks === 'No'}
                                                            onValueChange={() => toggledChecks('shockblocks', 'No')}
                                                        />
                                                        <Text style={styles.label}>No</Text>
                                                    </View>
                                                    <View style={styles.optionRowView}>
                                                        <Checkbox
                                                            value={checked.shockblocks === 'N/A'}
                                                            onValueChange={() => toggledChecks('shockblocks', 'N/A')}
                                                        />
                                                        <Text style={styles.label}>N/A</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <View>
                                                <Image />
                                            </View>
                                        </View>
                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity style={styles.buttonCancel} onPress={() => setShowModal(false)}>
                                                <Text style={styles.buttonText}>Cancel</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.buttonSubmit} onPress={previousFormHandler}>
                                                <Text style={styles.buttonText}>Previous</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.buttonSubmit} onPress={submitform}>
                                                <Text style={styles.buttonText}>Submit</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        )}

                        {showSignature && (
                            <View style={{ flex: 1 }}>

                            </View>
                        )}
                    </View>
                </ScrollView>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor: "#fff",
    },

    container: {
        flexDirection: 'column',
        wdith: '100%',
        height: 147,
        backgroundColor: '#301934'
    },

    header: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    modalAccessContainer: {
        padding: 16,
        alignSelf: 'flex-end',
        marginLeft: 60,
    },

    titleText: {
        width: "90%",
        margin: 2,
        paddingLeft: 4,
    },

    optionRowView: {
        width: 50,
        margin: 10,
        height: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    checkbox: {
        marginVertical: 10,
    },

    checkboxContainer: {
        margin: 20,
    },

    headerText: {
        fontWeight: 'bold',
        color: "#fff",
        fontSize: 24,
        marginLeft: 20,
    },

    label: {

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

    buttonCancel: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 5,
        borderColor: '#FF0000',
        alignItems: 'center',
        borderWidth: 1,
        backgroundColor: '#FF0000'
    },

    openModal: {
        borderRadius: 20,
        backgroundColor: 'grey',
        color: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40
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

    textInput: {
        flex: 1,
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        backgroundColor: '#E0E0E0',
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    inputStyle: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 10
    },

    pickerContainer: {
        width: '90%',
        borderRadius: 10,
        margin: 10,
        backgroundColor: '#E0E0E0'
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

    headerTitleText: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    },

    titleView: {

    },

    headingContainer: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 'none',
        marginBottom: 7,
    },

    icon: {},

    formContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20,
    },
    optionContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#301934',
        borderRadius: 12,
        width: "90%",
    },
    modalHeaderContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: 'bold'
    },

})

export default PostTripInspection;