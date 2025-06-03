import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Card, Checkbox, ActivityIndicator } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SHEInspectionList = () => {
    const [inspections, setInspections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedCards, setExpandedCards] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const API_URL = process.env.API_URL || 'http://192.168.8.161:5001';

    const isOverdue = (lastDone, frequency) => {
        const dueDate = moment(lastDone).add(frequency === "Daily" ? 1 : 30, "days");
        return moment().isAfter(dueDate);
    };

    const toggleCheckbox = (id) => {
        setInspections((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    const toggleExpand = (id) => {
        setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const fetchInspections = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");

        if (!token) {
            console.log("Unauthorized Access");
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/get-inspections`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setInspections(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInspections();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#301934" />
                <Text style={styles.loadingText}>Loading inspections...</Text>
            </View>
        );
    }

    const filteredInspections = inspections.filter((inspection) =>
        inspection.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.searchContainer}>
                <MaterialIcons name="search" size={24} color="#6c757d" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search inspections..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>
            {filteredInspections.map((inspection) => {
                const overdue = isOverdue(inspection.lastDone, inspection.frequency);
                const dueDate = moment(inspection.lastDone).add(inspection.frequency === "Daily" ? 1 : 30, "days").format("YYYY-MM-DD");
                return (
                    <Card key={inspection.id} style={styles.card}>
                        <TouchableOpacity onPress={() => toggleExpand(inspection._id)}>
                            <Card.Title
                                title={inspection.name}
                                subtitle={`Responsible: ${inspection.responsible}`}
                            />
                        </TouchableOpacity>
                        <Card.Content>
                            <Text style={[styles.status, overdue ? styles.overdue : styles.complete]}>
                                {overdue ? "Overdue" : "Complete"}
                            </Text>
                            {expandedCards[inspection.id] && (
                                <View>
                                    <Text>Frequency: {inspection.frequency}</Text>
                                    <Text>Last Done: {moment(inspection.lastDone).format("YYYY-MM-DD")}</Text>
                                    <Text>Due Date: {dueDate}</Text>
                                </View>
                            )}
                        </Card.Content>
                        <Card.Actions>
                            <Checkbox
                                status={inspection.completed ? "checked" : "unchecked"}
                                onPress={() => toggleCheckbox(inspection.id)}
                                disabled={overdue}
                            />
                            <Text>{inspection.completed ? "Completed" : "Mark as Complete"}</Text>
                        </Card.Actions>
                    </Card>
                );
            })}
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
    status: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    overdue: {
        color: "red",
    },
    complete: {
        color: "green",
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

export default SHEInspectionList;
