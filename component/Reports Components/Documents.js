import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { Card } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpiredDocumentsView = () => {
    const [Documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const API = 'http://192.168.8.161:5001'; // Replace with your backend API URL

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    console.error('Invalid token');
                    return;
                }

                const response = await fetch(`${API}/api/fetch-asset-licences`, {
                    headers: {
                        'Content-Type': "application/json",
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! ${response.status}`);
                }

                const data = await response.json();
                if (Array.isArray(data)) {
                    setDocuments(data);
                    checkForExpiredDocuments(data);
                }
            } catch (error) {
                setError(error.message);
                console.error("Error fetching documents:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    // Function to check if any document is expired
    const checkForExpiredDocuments = (documents) => {
        const currentDate = new Date();
        documents.forEach(doc => {
            const expiryDate = new Date(doc.ExpiryDate);
            if (expiryDate < currentDate) {
                Alert.alert("Document Expired", `The document "${doc.name}" has expired!`);
            }
        });
    };

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error: {error}</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Documents</Text>
            {Documents.map((doc, index) => (
                <Card key={doc.id} style={[styles.card, { backgroundColor: colors[index % colors.length] }]}>
                    <View style={styles.cardContent}>
                        <Text style={styles.documentName}>{doc.name}</Text>
                        <Text style={styles.expiryDate}>Expired: {doc.expiryDate}</Text>
                        <View style={styles.redDot} />
                    </View>
                </Card>
            ))}
        </ScrollView>
    );
};

const colors = ["#FFB6C1", "#87CEEB", "#FFD700", "#98FB98", "#FFA07A"];

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center",
        color: "#333",
    },
    card: {
        marginBottom: 10,
        borderRadius: 10,
        padding: 15,
        position: "relative",
    },
    cardContent: {
        flexDirection: "column",
    },
    documentName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    expiryDate: {
        fontSize: 16,
        color: "#D32F2F",
        marginTop: 5,
    },
    redDot: {
        width: 12,
        height: 12,
        backgroundColor: "red",
        borderRadius: 6,
        position: "absolute",
        top: 10,
        right: 10,
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 18,
    },
});

export default ExpiredDocumentsView;
