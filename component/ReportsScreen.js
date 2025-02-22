import React, { useState, useEffect } from "react";
import { View, FlatList, TextInput, StyleSheet, Alert } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReportsScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [reportsData, setReportsData] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const API = 'http://192.168.8.161:5001';

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert("Alert", "Authorization Required");
                    return;
                }
                const response = await axios.get(`${API}/api/fetch-all-reports`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setReportsData(response.data);
                setFilteredReports(response.data);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };

        fetchReports();
    }, []);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query) {
            const filtered = reportsData.filter((report) =>
                report.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredReports(filtered);
        } else {
            setFilteredReports(reportsData);
        }
    };

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Title
                title={item.title}
                subtitle={`Reported by: ${item.reporter}`}
                left={(props) => <Avatar.Icon {...props} icon="alert" />}
            />
            <Card.Content>
                <Text>{item.description}</Text>
            </Card.Content>
        </Card>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search reports..."
                value={searchQuery}
                onChangeText={handleSearch}
            />
            <FlatList
                data={filteredReports}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
    },
    searchBar: {
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        elevation: 2,
    },
    card: {
        marginBottom: 10,
        backgroundColor: "#ffffff",
        borderRadius: 8,
        elevation: 4,
    },
});

export default ReportsScreen;
