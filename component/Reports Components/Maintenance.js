import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, TextInput, Alert, StyleSheet } from 'react-native';
import { Card, Avatar } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Maintenance = () => {
    const [search, setSearch] = useState("");
    const [maintenanceData, setMaintenanceData] = useState([]);
    const [filteredMaintenance, setFilteredMaintenance] = useState([]);
    const API = 'http://192.168.8.161:5001';

    useEffect(() => {
        const fetchMaintenanceReports = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) {
                    console.error('Invalid token');
                    return;
                }

                const response = await fetch(`${API}/api/get-all-planned-maintenance-reports`, {
                    headers: {
                        'Content-Type': "application/json", 
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! ${response.status}`);
                }

                const maintenanceData = await response.json();
                if(Array.isArray(maintenanceData)){
                    setMaintenanceData(maintenanceData);
                    setFilteredMaintenance(maintenanceData);
                }

            } catch (error) {
                console.error("Error fetching reports", error);
            }
        };

        fetchMaintenanceReports();
    }, []);

    const handleSearch = (query) => {
        setSearch(query);
        if (query) {
            const filtered = maintenanceData.filter((maintenance) =>
                maintenance.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredMaintenance(filtered);
        } else {
            setFilteredMaintenance(maintenanceData);
        }
    };

    const renderMaintenanceItem = ({ item }) => (
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
    )
    return (
    <View>
        <TextInput
            style={styles.searchBar}
            onChangeText={handleSearch}
        />
        <FlatList
            data={filteredMaintenance}
            keyExtractor={(item) => item._id}
            renderItem={renderMaintenanceItem}
            ListEmptyComponent={
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: 200,
                        fontSize: 20
                    }}
                >
                    <Text>No Maintenance Due</Text>
            </View>
            }
            />
    </View>
    )
}

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

export default Maintenance;

