import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    ScrollView,
    Button,
    Alert,
    Platform,
    SafeAreaView,
    Modal,
    Linking,
    TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-paper';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';



const ReportForm = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [incidentNumber, setIncidentNumber] = useState("");
    const [nameSurname, setNameSurname] = useState('');
    const [incidentType, setIncidentType] = useState('');
    const [place, setPlace] = useState('');
    const [description, setDescription] = useState('');
    const [equipment, setEquipment] = useState('');
    const [peopleInvolved, setPeopleInvolved] = useState('');

    // Date and Time
    const [dateTime, setDateTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [mode, setMode] = useState("date");

    const [search, setSearch] = useState("");
    const [reports, setReports] = useState([]);

    // Modal State
    const [isModalActive, setIsModalActive] = useState(false);

    const API = process.env.API_URL || 'http://192.168.8.161:5001';

    useEffect(() => {
        fetchUsers();
        fetchReports();
    }, []);


    const showMode = (mode) => {
        setShowPicker(true);
        setMode(mode);
    }

    const handleChange = (e, selected) => {
        setDateTime(selected);
        setShowPicker(false);
    }

    const DateFormat = (dateFormat) => {
        return dateFormat.toLocaleString(undefined, {
            dateStyle: 'medium'
        })
    };

    const TimeFormat = (timeFormat) => {
        return timeFormat.toLocaleString(undefined, {
            timeStyle: 'short'
        })
    };

    const fetchReports = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('Unautherized Token');
                return;
            }

            const response = await fetch(``, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const report = await response.json();

            // Debugging
            console.log('Reports: ', report);

            if (Array.isArray(report)) {
                setReports(report);
            }
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }

    const fetchUsers = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                console.error('No token found');
                return;
            }
            const decodedToken = jwtDecode(token);

            const response = await fetch(`${API}/api/fetch-all-users`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (Array.isArray(data)) {
                setUsers(data);
            } else {
                console.error('No users found');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDateChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setDateTime(selectedDate);
        }
    };


    const filteredReports = reports.filter((newReports) =>
        newReports.IncidentNumber.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = async () => {
        if (!nameSurname || !incidentType || !place || !description || !equipment || !peopleInvolved) {
            return Alert.alert('Error', 'Please fill in all fields correctly.');
        }

        const token = await AsyncStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
        const reportData = {
            incidentNumber,
            nameSurname,
            dateTime,
            incidentType,
            place,
            description,
            equipment,
            peopleInvolved,
        };
        console.log('Report data', reportData);
        try {
            const response = await fetch(`${API}/api/report-incident`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(reportData),
            });

            const data = await response.json();
            console.log('received Data', data);
            if (response.ok && data.status === 'ok') {
                Alert.alert('Submitted', 'Report Submitted');
                navigation.navigate('Dashboard Screen');
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.containerwrapper}>
                <View style={styles.headingContainer}>
                    <View>
                        <Text style={styles.headerText}>Incident Reporting</Text>
                    </View>
                    <View style={styles.containerAccess}>
                        <TouchableOpacity onPress={() => setIsModalActive(true)}>
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
                            placeholder='Search...'
                            placeholderTextColor="#f1f1f1"
                            value={search}
                            onChangeText={setSearch}
                        />
                    </View>
                </View>
                <View>
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        {!reports ? (
                            <Card key={reports._id} style={styles.card}>
                                <Card.Title title={reports.IncidentNumber} />
                                <Card.Content>
                                    <Text>Date: {reports.DateTime}</Text>
                                    <Text>Incident Type: {reports.selectedOptions}</Text>
                                    <Text>Description: {reports.Description}</Text>
                                </Card.Content>
                            </Card>
                        ) : (
                            <View style={{
                                alignItems: 'center',
                                justifyContent: "center"
                            }}>
                                <Text style={{ fontSize: 24, color: "grey", marginTop: 20 }}>No Data Loaded</Text>
                            </View>
                        )}
                        {filteredReports.map((reportDoc) => (
                            <Card key={reportDoc._id} style={styles.card}>
                                <Card.Title title={reportDoc.IncidentNumber} />
                                <Card.Content>
                                    <Text>Date: {reportDoc.DateTime}</Text>
                                    <Text>Incident Type: {reportDoc.selectedOptions}</Text>
                                    <Text>Description: {reportDoc.Description}</Text>
                                </Card.Content>
                            </Card>
                        ))}
                    </ScrollView>
                </View>

                {/* Modal */}
                <Modal
                    visible={isModalActive}
                    animationType='slide'
                    presentationStyle='formSheet'
                    onRequestClose={() => setIsModalActive(false)}
                    style={styles.modalStyle}
                >
                    <ScrollView>
                        <View style={styles.modalHeaderContainer}>
                            <View style={{ marginLeft: 150 }}>
                                <Text style={styles.formTitle}>Add Item</Text>
                            </View>
                            <View style={{ marginRight: 10 }}>
                                <TouchableOpacity onPress={() => setIsModalActive(false)}>
                                    <MaterialIcons name="close" size={24} style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.mainContainer}>
                            <Text style={styles.titleText}>Incident Number</Text>
                            <View style={styles.textInput}>
                                <TextInput
                                    placeholder='Example: INCI001'
                                    style={styles.inputStyle}
                                    value={incidentNumber}
                                    onChangeText={setIncidentNumber}
                                />
                            </View>
                            <Text style={styles.titleText}>Name and Surname</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={nameSurname}
                                    onValueChange={(valueItem) => setNameSurname(valueItem)}
                                >
                                    <Picker.Item label="Select Your Name" value="" />
                                    {users.map((registeredUsers) => (
                                        <Picker.Item
                                            key={registeredUsers._id}
                                            label={`${registeredUsers.Name || ""} ${registeredUsers.Surname || ""}`}
                                            value={`${registeredUsers.Name} ${registeredUsers.Name || ""} ${registeredUsers.Surname || ""}`} />
                                    ))}
                                </Picker>
                            </View>
                            <Text style={styles.titleText}>Date Done</Text>
                            <View style={styles.textInput}>
                                <TouchableOpacity onPress={() => showMode("date")}>
                                    <Feather name="calendar" size={18} color="black" style={styles.icon} />
                                </TouchableOpacity>

                                <TextInput
                                    value={DateFormat(dateTime)}
                                    placeholder='Select Date'
                                    editable={false}
                                    onTouchStart={() => setShowPicker(true)}
                                    style={styles.inputStyle}
                                />
                            </View>
                            <Text style={styles.titleText}>Time Done</Text>
                            <View style={styles.textInput}>
                                <TouchableOpacity onPress={() => showMode("time")}>
                                    <Feather name="calendar" size={18} color="black" style={styles.icon} />
                                </TouchableOpacity>
                                <TextInput
                                    value={TimeFormat(dateTime)}
                                    placeholder='Select Time'
                                    editable={false}
                                    onTouchStart={() => setShowPicker(true)}
                                    style={styles.inputStyle}
                                />
                            </View>
                            {showPicker && (
                                <DateTimePicker
                                    value={dateTime}
                                    mode={mode}
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    is24Hour={true}
                                    onChange={handleChange}
                                />
                            )}
                            <Text style={styles.titleText}>Type of Incident</Text>
                            <View style={styles.pickerContainer}>
                                <Picker selectedValue={incidentType} onValueChange={(itemValue) => setIncidentType(itemValue)}>
                                    <Picker.Item label="Select Incident Type" value="" />
                                    <Picker.Item label="Near Miss" value="Near Miss" />
                                    <Picker.Item label='Hi-jacking' value="Hi-jacking" />
                                    <Picker.Item label="First Aid" value="First Aid" />
                                    <Picker.Item label="Medical" value="Medical" />
                                    <Picker.Item label="Fatal" value="Fatal" />
                                    <Picker.Item label="Environmental" value="Environmental" />
                                    <Picker.Item label="Illness" value="Illness" />
                                    <Picker.Item label="Property Damage" value="Property Damage" />
                                    <Picker.Item label="Product Loss" value="Product Loss" />
                                    <Picker.Item label="Non-Conformance" value="Non-Conformance" />
                                </Picker>
                            </View>

                            <Text style={styles.titleText}>Place where it happened</Text>
                            <View style={styles.textInput}>
                                <TextInput
                                    style={styles.inputStyle}
                                    value={place}
                                    placeholder='Place'
                                    onChangeText={setPlace}
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
                            <Text style={styles.titleText}>Equipment</Text>
                            <View style={styles.textInput}>
                                <TextInput
                                    style={styles.inputStyle}
                                    value={equipment}
                                    placeholder='Equipment'
                                    onChangeText={setEquipment}
                                />
                            </View>

                            <Text style={styles.titleText}>People Involved</Text>
                            <View style={styles.textInput}>
                                <TextInput
                                    style={styles.inputStyle}
                                    value={peopleInvolved}
                                    placeholder='People Involved'
                                    onChangeText={setPeopleInvolved}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>Submit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonCancel} onPress={() => setIsModalActive(false)}>
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#fff'
    },
    containerwrapper: {
        flexDirection: 'column',
        width: '100%',
        height: 147,
        backgroundColor: '#301934'
    },

    headingContainer: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 'none',
        marginBottom: 7,
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

    searchIcons: {
        marginRight: 8,
        marginLeft: 8,
    },

    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#f1f1f1",
    },
    modalHeaderContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

    formTitle: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },

    mainContainer: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 20
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


    titleText: {
        width: "90%",
        margin: 2,
        paddingLeft: 4,
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

});

export default ReportForm;