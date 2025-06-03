import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Linking } from 'react-native';
import { Card, ActivityIndicator, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SHEPolicy = () => {
    const [policyDocument, setPolicyDocument] = useState([]);
    const [preloader, setPreloader] = useState(true);
    const [searchDoc, setSearchDoc] = useState('');
    const API = process.env.API_URL || 'http://10.7.22.184:5001';

    const getSHEPolicy = async () => {
        setPreloader(true);
        const token = await AsyncStorage.getItem('token');

        if (!token) {
            console.log("Unauthorized Access");
            setPreloader(false);
            return;
        }

        try {
            const response = await fetch(`${API}/api/get-SHE-policy`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const shePolicyData = await response.json();
            console.log("document", shePolicyData);

            if (Array.isArray(shePolicyData)) {
                setPolicyDocument(shePolicyData);
            }
        } catch (error) {
            console.error('Error fetching data', error)
        }
        finally {
            setPreloader(false);
        }
    }

    useEffect(() => {
        getSHEPolicy();
    }, []);

    if (preloader) {
        return (
            <View style={styles.preloaderContainer}>
                <ActivityIndicator size="large" color='#007bff' />
                <Text style={styles.loaderText}>Loading documents...</Text>
            </View>
        );
    }

    const filteredPolicyDocs = policyDocument.filter((doc) =>
        doc.DocumentName.toLowerCase().includes(searchDoc.toLowerCase())
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={24} color="#6c757d" style={styles.searchIcons} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search documents..."
                    value={searchDoc}
                    onChangeText={setSearchDoc}
                />
            </View>

            {filteredPolicyDocs.map((doc) => (
                <Card key={doc.DocumentNumber} style={styles.card}>
                    <Card.Title title={doc.DocumentName} subtitle={`Type: ${doc.DocumentType}`} />
                    <Card.Content>
                        <Text>Review: Date: {doc.ReviewDate}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button mode="contained" onPress={() => Linking.openURL(doc.downloadLink)}>
                            Download
                        </Button>
                    </Card.Actions>
                </Card>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    preloaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    loaderText: {
        marginTop: 10,
        fontSize: 16,
        color: "#6c757d"
    },
    container: {
        padding: 10
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        padding: 8,
        borderRadius: 10,
        marginBottom: 10,
    },
    searchIcons: {
        marginRight: 8
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: "#333",
    },
    card: {
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 3,
    }
});

export default SHEPolicy; 