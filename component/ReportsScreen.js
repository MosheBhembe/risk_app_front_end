import React, { useState, useEffect } from "react";
import { View, FlatList, TextInput, StyleSheet, Alert } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReportsScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [reportsData, setReportsData] = useState([]);
    const [filteredReports, setFilteredReports] = useState([]);
    const API = process.env.API_URL || 'http://100.105.70.67:5001';

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    Alert.alert("Alert", "Authorization Required");
                    return;
                }
                const response = await fetch(`${API}/api/fetch-incident-report`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const ReportsData = await response.json();
                // console.log('data ', ReportsData)

                if (ReportsData && Array.isArray(ReportsData.data)) {
                    setReportsData(ReportsData.data);
                    setFilteredReports(ReportsData.data);
                } else {
                    console.error('Data format is incorrect');
                }

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
                (report.title && report.title.toLowerCase().includes(query.toLowerCase()))
            );
            setFilteredReports(filtered);
        } else {
            setFilteredReports(reportsData);
        }
    };

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Title
                title={item.selectedOptions}
                subtitle={<Text style={styles.headingText}>Reported by: {item.Names}</Text>}
                left={(props) => <Avatar.Icon {...props} icon="alert" />}
            />
            <Card.Content>
                <Text>{item.Description || item.description}</Text>
                <Text>{item.Place || item.location}</Text>
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
                keyExtractor={(item) => item.id || item.someUniqueField || item.title}
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
    headingText: {
        fontWeight: 'bold'
    }
});

export default ReportsScreen;
