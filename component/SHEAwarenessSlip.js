import { MaterialIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure you import this


const SHEAwarenessSlips = ({ navigation }) => {
    const [sheAwareness, setSheAwareness] = useState([]);
    const [search, setSearch] = useState('');
    const [openedDocId, setOpenedDocId] = useState(null);

    const API = process.env.API_URL || 'http://192.168.8.161:5001'

    const fetchAwareness = async () => {
        try {
            const token = await AsyncStorage.getItem('toke');
            if (!token) {
                console.log("Missing token");
                return;
            }

            const response = await fetch(`${API}/api/get-she-awareness-slips`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const awarenessInformation = await response.json();

            if (Array.isArray(awarenessInformation)) {
                setSheAwareness(awarenessInformation);
            } else {
                console.log('Error fetching information');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const filteredAwareness = sheAwareness.filter((aware) =>
        aware.AwarenessType.toLowerCase().includes((search || "").toLowerCase())
    );

    useEffect(() => {
        fetchAwareness();
    }, [])

    const handleSign = (doc) => {
        console.log(`Signing document: ${doc.DocumentName}`);
        // You can launch a signature pad or update state here
    };

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.containerWrapper}>
                <View style={styles.headingContainer}>
                    <Text style={styles.headerText}>New S.H.E Awareness</Text>
                </View>

                <View style={styles.searchContainer}>
                    <MaterialIcons name="search" size={24} color="#fff" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder='Search...'
                        placeholderTextColor="#f1f1f1"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {filteredAwareness.map((doc) => (
                        <Card key={doc._id} style={{ marginVertical: 8, marginHorizontal: 16 }}>
                            <Card.Title title={doc.AwarenessType} />
                            <Card.Content>
                                <Text>Review Date: {doc.ReviewDate}</Text>
                                <Text>Document No: {doc.DocumentNumber}</Text>

                                <TouchableOpacity onPress={() => setOpenedDocId(doc._id)} style={styles.docRow}>
                                    <MaterialIcons name="insert-drive-file" size={20} color="#333" />
                                    <Text style={styles.docText}>{doc.DocumentName}</Text>
                                </TouchableOpacity>

                                {openedDocId === doc._id && (
                                    <View style={styles.signingContainer}>
                                        <Text style={{ marginTop: 10 }}>Ready to sign?</Text>
                                        <TouchableOpacity
                                            style={styles.signButton}
                                            onPress={() => handleSign(doc)}
                                        >
                                            <Text style={styles.signButtonText}>Sign Document</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </Card.Content>
                        </Card>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    containerWrapper: {
        flexDirection: 'column',
        width: "100%",
        paddingBottom: 10,
        backgroundColor: "#301934"
    },
    headingContainer: {
        padding: 16
    },
    headerText: {
        fontWeight: 'bold',
        color: "#fff",
        fontSize: 24,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 10
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f1f1',
        color: '#fff',
        paddingVertical: 4,
        fontSize: 16
    },
    scrollContainer: {
        paddingVertical: 16
    },
    docRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
    },
    docText: {
        marginLeft: 10,
        fontSize: 16,
    },
    signingContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#eee',
        borderRadius: 8,
    },
    signButton: {
        marginTop: 8,
        backgroundColor: '#3f51b5',
        padding: 10,
        borderRadius: 6,
    },
    signButtonText: {
        color: '#fff',
        textAlign: 'center',
    }
});

export default SHEAwarenessSlips;
