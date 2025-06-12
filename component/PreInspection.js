import { useEffect, useState, useRef } from 'react';
import { Text, TextInput, StyleSheet, View, SafeAreaView, ScrollView, Modal, Image, TouchableOpacity, Platform } from 'react-native';
import Checkbox from 'expo-checkbox';
import SignatureCanvas from 'react-native-signature-canvas';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const PreTripInspection = ({ navigation }) => {
    const API = process.env.API_URL || 'http://192.168.8.161:5001';
    const sigRef = useRef();
    const [employeeName, setEmployeeName] = useState("");
    const [lineManager, setLineManager] = useState("");
    const [comments, setComment] = useState("");
    const [inspectionSignature, setInspectionSignature] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [search, setSearch] = useState("");
    const [userData, setUserData] = useState([]);
    const [dateTime, setDateTime] = useState(new Date());
    const [dateTimePicker, setDateTimePicker] = useState(false);
    const [mode, setMode] = useState('date');
    const [currentForm, setCurrentForm] = useState(true);
    const [nextForm, setNextForm] = useState(false);
    const [showSignature, setShowSignature] = useState(false);
    const [checkedOptions, setChecked] = useState({
        water: '',
        engineOil: '',
        clutch: '',
        steering: '',
        windscreenWasher: '',
        noDamage: '',
        cleanWindscreen: '',
        wipers: '',
        lightsReflectors: '',
        cleanLightsRefectors: '',
        tyrePressure: '',
        noLeaks: '',
        mirrors: '',
        orangeDimond: '',
        numberPlates: '',
        chevron: '',
        batteryCover: '',
        wheelNutMarkers: '',
        dustCovers: '',
        valves: '',
        wheelFive: '',
        visualLeaks: '',
        sussi: '',
        airLeaks: '',
        placards: '',
        licenseDisc: '',
        slp: '',
        firePermit: '',
        headLights: '',
        parkLights: '',
        hazardsLights: '',
        tailLights: '',
        numberPlateLights: '',
        brakeLights: '',
        workLights: '',
        reverseLights: '',
        brakes: '',
        reflective: '',
        safetyShoes: '',
        musk: '',
        hardHat: '',
        gloves: '',
        vest: '',
        shocks: '',
        torch: '',
        validExstinguisher: '',
        spill: '',
        firstAid: '',
        selfStanding: '',
        earthCable: '',
        seatBelts: '',
        hooter: '',
        inhouseLights: '',
        dangerousGoods: '',
        tremcard: '',
        steeringwheel: '',
        loadedDocuments: '',
        shipmentLog: '',
        deliverySequence: '',
        journeyPlan: '',
        fan: '',
        bol: '',
        enoughFuel: '',
        tollCard: '',
        testedMeter: '',
        dateTime: '',
        sop: '',
        id: '',
        medicalCert: '',
        routePlan: '',
        handOver: '',
        LOBcheck: '',
    });

    const fetchUsers = async () => {
        try {
            const userToken = await AsyncStorage.getItem('token');
            if (!userToken) {
                console.log('error fetching token' || 'No token found');
            }

            const response = await fetch(`${API}/api/fetch-all-users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                }
            })

            const userInfo = await response.json();

            if (Array.isArray(userInfo)) {
                setUserData(userInfo);
            } else {
                console.log('no information found')
            }
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchUsers();
    }, [])

    const showMode = (mode) => {
        setDateTimePicker(true);
        setMode(mode);
    }

    const optionChooser = (field, option) => {
        setChecked((options) => ({
            ...options,
            [field]: options[field] === option ? '' : option,
        }));
    }

    const dateFormatter = (date) => {
        return date.toLocaleString(undefined, {
            dateStyle: 'medium'
        })
    }

    const timeFormatter = (time) => {
        return time.toLocaleString(undefined, {
            timeStyle: 'short'
        })
    }

    const handleDateTimeChange = (e, chosen) => {
        setDateTime(chosen);
        setDateTimePicker(false)
    }

    const currentHandler = () => {
        setCurrentForm(true);
        setNextForm(false);
    }

    const handleNext = () => {
        setCurrentForm(false)
        setNextForm(true)
    }

    const handleSignature = (signature) => {
        console.log('Signature', signature);
        setInspectionSignature(signature)
    };

    const handleClearSignature = () => {
        setInspectionSignature(null);
    }

    const handleSigEnd = () => {
        sigRef.current.ReadSignature();
    }


    const submitForm = async () => {

    }

    return (
        <SafeAreaView style={styles.containerMain}>
            <View style={styles.container}>
                <View style={styles.headingContainer}>
                    <View>
                        <Text style={styles.headerText}>Pre Trip Inspection</Text>
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
                        <MaterialIcons name="search" size={24} color="#fff" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder='Search...'
                            placeholderTextColor='#f1f1f1'
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                </View>
            </View>
            <Modal
                visible={showModal}
                animationType='slide'
                presentationStyle='formSheet'
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalHeaderContainer}>
                    <View style={{ marginLeft: 150 }}>
                        <Text style={styles.header}>Add Item</Text>
                    </View>
                    <View style={{ marginRight: 10 }}>
                        <TouchableOpacity onPress={() => setShowModal(false)}>
                            <MaterialIcons name='close' size={24} color="black" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.formContainer}>
                        <Text style={styles.titleText}>Line Manager Name</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={lineManager}
                                onValueChange={(value) => setLineManager(value)}
                            >
                                <Picker.Item label='Select Name' value='' />
                                {userData.map((names) => (
                                    <Picker.Item key={names._id} label={names.Name} value={names.Name} />
                                ))}
                            </Picker>
                        </View>
                        <Text style={styles.titleText}>Inspecton Date</Text>
                        <View style={styles.textInput}>
                            <TouchableOpacity onPress={() => showMode('date')}>
                                <Feather name="calendar" size={24} color="black" />
                            </TouchableOpacity>
                            <TextInput
                                value={dateFormatter(dateTime)}
                                editable={false}
                                onTouchStart={() => setDateTimePicker(true)}
                                style={styles.inputStyle}
                            />
                        </View>

                        <Text style={styles.titleText}>Inspection Time</Text>
                        <View style={styles.textInput}>
                            <TouchableOpacity onPress={() => showMode('time')}>
                                <Feather name="clock" size={24} color="black" />
                            </TouchableOpacity>
                            <TextInput
                                value={timeFormatter(dateTime)}
                                editable={false}
                                onTouchStart={() => setDateTimePcker(true)}
                                style={styles.inputStyle}
                            />
                        </View>
                    </View>
                    {dateTimePicker && (
                        <DateTimePicker
                            value={dateTime}
                            mode={mode}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            is24Hour={true}
                            onChange={handleDateTimeChange}
                        />
                    )}

                    {/* checkboxes */}
                    {currentForm && (
                        <View style={{ width: '100%' }}>
                            <View style={styles.titleView}>
                                <Text style={styles.headerTitleText}>The name of the section</Text>
                            </View>

                            <View style={styles.checkboxContainer}>

                                {/* Water Level */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Water Level</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.water === option}
                                                    onValueChange={() => optionChooser('water', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Engine Oil Level */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Engine Oil Level</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.engineOil === option}
                                                    onValueChange={() => optionChooser('engineOil', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Clutch Fluid Level */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Clutch Fluid Level</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.clutch === option}
                                                    onValueChange={() => optionChooser('clutch', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Steering Fluid Level */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Steering Fluid Level</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.steering === option}
                                                    onValueChange={() => optionChooser('steering', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Windscreen Washer Level */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Windscreen Washer Level</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.windscreenWasher === option}
                                                    onValueChange={() => optionChooser('windscreenWasher', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* No Damage To Vehicle */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>No Damage To Vehicle</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.noDamage === option}
                                                    onValueChange={() => optionChooser('noDamage', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Windscreen is Clean */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Windscreen is Clean</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.cleanWindscreen === option}
                                                    onValueChange={() => optionChooser('cleanWindscreen', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Wipers In Good Condition */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Wipers In Good Condition</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.wipers === option}
                                                    onValueChange={() => optionChooser('wipers', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Light And Reflectors */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Light And Reflectors</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.lightsReflectors === option}
                                                    onValueChange={() => optionChooser('lightsReflectors', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Lights And Reflectors are Clean */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Lights And Reflectors are Clean</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.cleanLightsRefectors === option}
                                                    onValueChange={() => optionChooser('cleanLightsRefectors', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Tyre Pressure No Damage */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>No Damage to tyres</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.tyrePressure === option}
                                                    onValueChange={() => optionChooser('tyrePressure', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/*  No Leaks */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>No Leaks</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.noLeaks === option}
                                                    onValueChange={() => optionChooser('noLeaks', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Mirrors */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Mirrors</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.mirrors === option}
                                                    onValueChange={() => optionChooser('mirrors', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Orange Diamond */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Orange Diamond</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.orangeDimond === option}
                                                    onValueChange={() => optionChooser('orangeDimond', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Number Plates */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Number Plates</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.numberPlates === option}
                                                    onValueChange={() => optionChooser('numberPlates', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Chevrons */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Chevrons</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.chevron === option}
                                                    onValueChange={() => optionChooser('chevron', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Battery Cover */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Battery Cover</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.batteryCover === option}
                                                    onValueChange={() => optionChooser('batteryCover', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Wheel Nuts Markers */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Wheel Nuts Markers</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.wheelNutMarkers === option}
                                                    onValueChange={() => optionChooser('wheelNutMarkers', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Dust Covers */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Dust Covers</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.dustCovers === option}
                                                    onValueChange={() => optionChooser('dustCovers', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Valves */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Valves</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.valves === option}
                                                    onValueChange={() => optionChooser('valves', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Fifth Wheel */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Fifth Wheel</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.wheelFive === option}
                                                    onValueChange={() => optionChooser('wheelFive', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Visual Leaks */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Visual Leaks</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.visualLeaks === option}
                                                    onValueChange={() => optionChooser('visualLeaks', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Sussi Pypes */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Sussi Pypes</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.sussi === option}
                                                    onValueChange={() => optionChooser('sussi', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Air Leaks */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Air Leaks</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.airLeaks === option}
                                                    onValueChange={() => optionChooser('airLeaks', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Placards */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Placards</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.placards === option}
                                                    onValueChange={() => optionChooser('placards', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/*  License Disk */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}> License Disc</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.licenseDisc === option}
                                                    onValueChange={() => optionChooser('licenseDisc', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/*  SLP */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>SLP</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.slp === option}
                                                    onValueChange={() => optionChooser('slp', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.buttonCancel} onPress={() => setShowModal(false)}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonSubmit} onPress={handleNext}>
                                    <Text style={styles.buttonText}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {nextForm && (
                        <View style={{ width: '100%' }}>
                            <View style={styles.titleView}>
                                <Text style={styles.headerTitleText}>The name of the section</Text>
                            </View>

                            <View style={styles.checkboxContainer}>

                                {/* Fire Permit */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Fire Permit</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.firePermit === option}
                                                    onValueChange={() => optionChooser('firePermit', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Fire Permit */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Fire Permit</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.firePermit === option}
                                                    onValueChange={() => optionChooser('firePermit', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Head Lights */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Head Lights</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.headLights === option}
                                                    onValueChange={() => optionChooser('headLights', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Park Lights */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Park Lights</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.parkLights === option}
                                                    onValueChange={() => optionChooser('parkLights', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Hazard Lights */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Hazard Lights</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.hazardsLights === option}
                                                    onValueChange={() => optionChooser('hazardsLights', option)}
                                                />

                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Tail Lights */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Tail Lights</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.tailLights === option}
                                                    onValueChange={() => optionChooser('tailLights', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Number Plate Lights */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Number Plate Lights</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.numberPlateLights === option}
                                                    onValueChange={() => optionChooser('numberPlateLights', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Brake Lights */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Brake Lights</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.brakeLights === option}
                                                    onValueChange={() => optionChooser('brakeLights', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Work Lights */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Work Lights</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.workLights === option}
                                                    onValueChange={() => optionChooser('workLights', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/*  Reverse Lights */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Reverse Lights</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.reverseLights === option}
                                                    onValueChange={() => optionChooser('reverseLights', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/*  Brakes */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Brakes</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.brakes === option}
                                                    onValueChange={() => optionChooser('brakes', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Reflective */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Reflective</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.reflective === option}
                                                    onValueChange={() => optionChooser('reflective', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Safety Shoes */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Safety Shoes</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.safetyShoes === option}
                                                    onValueChange={() => optionChooser('safetyShoes', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Musk */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Musk</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.musk === option}
                                                    onValueChange={() => optionChooser('musk', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Hard Hat */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Hard Hat</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.hardHat === option}
                                                    onValueChange={() => optionChooser('hardHat', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Gloves */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Gloves</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.gloves === option}
                                                    onValueChange={() => optionChooser('gloves', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Vest */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Vest</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.vest === option}
                                                    onValueChange={() => optionChooser('vest', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Shocks */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Shocks</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.shocks === option}
                                                    onValueChange={() => optionChooser('shocks', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Torch */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Torch</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.torch === option}
                                                    onValueChange={() => optionChooser('torch', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* ValidFireEx*/}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Valid Fire Extinguisher</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.validExstinguisher === option}
                                                    onValueChange={() => optionChooser('validExstinguisher', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>


                                {/* Spill */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Spill</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.spill === option}
                                                    onValueChange={() => optionChooser('spill', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* FirstAid */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>First Aid</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.firstAid === option}
                                                    onValueChange={() => optionChooser('firstAid', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/*  Self Standing */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Self Standing</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.selfStanding === option}
                                                    onValueChange={() => optionChooser('selfStanding', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/*  Earth Cable */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Earth Cable</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.earthCable === option}
                                                    onValueChange={() => optionChooser('earthCable', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/*  Seat Belts */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Seat Belts</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.seatBelts === option}
                                                    onValueChange={() => optionChooser('seatBelts', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/*  Hooter */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Hooter</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.hooter === option}
                                                    onValueChange={() => optionChooser('hooter', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* In house Lights */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>In House Lights</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.inhouseLights === option}
                                                    onValueChange={() => optionChooser('inhouseLights', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Dangerous Goods */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Dangerous Goods</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.dangerousGoods === option}
                                                    onValueChange={() => optionChooser('dangerousGoods', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/*  Tremcard */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Tremcard</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.tremcard === option}
                                                    onValueChange={() => optionChooser('tremcard', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Wheel Steering */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Steering Wheel</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.steeringwheel === option}
                                                    onValueChange={() => optionChooser('steeringwheel', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Load Documents */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Are all document Present</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.loadedDocuments === option}
                                                    onValueChange={() => optionChooser('loadedDocuments', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>


                                {/* ShipmentLog */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>shipment log</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.shipmentLog === option}
                                                    onValueChange={() => optionChooser('shipmentLog', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/*  Delivery Sequence */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Delivery Sequence</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.deliverySequence === option}
                                                    onValueChange={() => optionChooser('deliverySequence', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* JourneyPlan */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Journey Plan</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.journeyPlan === option}
                                                    onValueChange={() => optionChooser('journeyPlan', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* FAN */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>FAN</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.fan === option}
                                                    onValueChange={() => optionChooser('fan', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>


                                {/* BOL */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>BOL</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.bol === option}
                                                    onValueChange={() => optionChooser('bol', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Enough Fuel */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Is there enough fuel</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.enoughFuel === option}
                                                    onValueChange={() => optionChooser('enoughFuel', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Toll Card */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Toll Card</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.tollCard === option}
                                                    onValueChange={() => optionChooser('tollCard', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Test Meter */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Meter Test</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.testedMeter === option}
                                                    onValueChange={() => optionChooser('testedMeter', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Date And Time */}

                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Date and Time</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.dateTime === option}
                                                    onValueChange={() => optionChooser('dateTime', option)}
                                                />

                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* SOP */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>sop</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.sop === option}
                                                    onValueChange={() => optionChooser('sop', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* ID */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>ID</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.id === option}
                                                    onValueChange={() => optionChooser('id', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Medical Certificate */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Medical Certificate</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.medicalCert === option}
                                                    onValueChange={() => optionChooser('medicalCert', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Route plan */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Route Plan</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.routePlan === option}
                                                    onValueChange={() => optionChooser('routePlan', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* LOB Check */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>LOB Check</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.LOBcheck === option}
                                                    onValueChange={() => optionChooser('LOBcheck', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                {/* Hand Over */}
                                <View style={styles.checkbox}>
                                    <Text style={styles.titleText}>Hand Over</Text>
                                    <View style={styles.optionContainer}>
                                        {['Yes', 'No', 'N/A'].map(option => (
                                            <View key={option} style={styles.optionRowView}>
                                                <Checkbox
                                                    value={checkedOptions.handOver === option}
                                                    onValueChange={() => optionChooser('handOver', option)}
                                                />
                                                <Text style={styles.label}>{option}</Text>
                                            </View>
                                        ))}
                                    </View>
                                </View>

                                <Text style={styles.titleText}>Comments</Text>
                                <View style={styles.textArea}>
                                    <TextInput
                                        style={styles.textArea}
                                        multiline={true}
                                        numberOfLines={5}
                                        value={comments}
                                        onChangeText={setComment}
                                        placeholder="Type something..."
                                    />
                                </View>
                                <Text style={styles.titleText}>Inspector Signature</Text>
                                <View style={styles.SignatureHouser}>

                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.buttonCancel} onPress={() => setShowModal(false)}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonSubmit} onPress={currentHandler}>
                                    <Text style={styles.buttonText}>Previous</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonSubmit} onPress={submitForm}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* all things signature and comments code goes in here!! tomorrow!!!!!!!!! */}
                    {showSignature && (
                        <SignatureCanvas

                        />
                    )}

                </ScrollView>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        backgroundColor: '#fff'
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
        marginLeft: 80,
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

    SignatureHouser: {
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
    headerTitleText: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10
    },

    titleView: {

    },

    textArea: {
        borderRadius: 10,
        backgroundColor: '#E0E0E0',
        height: 120,
        marginBottom: 15,
        width: '90%',
        textAlignVertical: 'top',
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
});

export default PreTripInspection; 