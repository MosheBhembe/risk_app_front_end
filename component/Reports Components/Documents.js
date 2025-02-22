import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

const ExpiredDocumentsView = () => {
    const expiredDocuments = [
        { id: 1, name: "Safety Policy", expiryDate: "2024-01-15" },
        { id: 2, name: "Fire Drill Procedure", expiryDate: "2024-02-10" },
        { id: 3, name: "Equipment Inspection Report", expiryDate: "2023-12-05" },
        { id: 4, name: "Chemical Handling Guide", expiryDate: "2024-01-25" },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Expired Documents</Text>
            {expiredDocuments.map((doc, index) => (
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
});

export default ExpiredDocumentsView;
