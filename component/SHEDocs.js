import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Linking } from "react-native";
import { Card, ActivityIndicator, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SHEDocumentList = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const API = process.env.API_URL || 'http://10.7.22.184:5001';

    const fetchDocuments = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");

        if (!token) {
            console.log("Unauthorized Access");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API}/api/get-SHE-Document`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const SHEDocumentData = await response.json();
            console.log('DOCUMENTS', SHEDocumentData);
            if (Array.isArray(SHEDocumentData)) {
                setDocuments(SHEDocumentData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDocuments();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007bff" />
                <Text style={styles.loadingText}>Loading documents...</Text>
            </View>
        );
    }

    const filteredDocuments = documents.filter((doc) =>
        doc.DocumentName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={24} color="#6c757d" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            {filteredDocuments.map((doc) => (
                <Card key={doc.DocumentNumber} style={styles.card}>
                    <Card.Title title={doc.DocumentName} subtitle={`Type: ${doc.DocumentType}`} />
                    <Card.Content>
                        <Text>Review Date: {doc.ReviewDate}</Text>
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
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        padding: 8,
        borderRadius: 10,
        marginBottom: 10,
    },
    searchIcon: {
        marginRight: 8,
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
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#6c757d",
    },
});

export default SHEDocumentList;
