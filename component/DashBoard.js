import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { MaterialIcons, FontAwesome5, Ionicons, Entypo } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DashBoardNav from './DashboardComponent';

const Dashboard = ({ navigation }) => {

    const [maintenanceCount, setMaintenanceCount] = useState(0);
    const [docExpiring, setDocExpiring] = useState(true);
    const [userInfo, setUserInfo] = useState("");
    const [medicalCount, setMedicalCount] = useState(6);
    const [nearMissesCount, setNearMissesCount] = useState(0);
    const [fatalCount, setFatalCount] = useState(0);
    const [environmentalSpillCount, setEnvironmentalSpillCount] = useState(0);
    const [illnessCount, setIllnessCount] = useState(0);
    const [hijackingCount, setHijackingCount] = useState(0);
    const [productLossCount, setProductLossCount] = useState(0);
    const [theftCount, setTheftCount] = useState(0);
    const [propertyDamageCount, setPropertyDamageCount] = useState(0);
    const [firstAidCount, setFirstAidCount] = useState(0);
    const [NonConformanceCount, setNonConformanceCount] = useState(0);
    const [totalNewReports, setTotalNewReports] = useState(0); 

    const API_URL = process.env.API_URL || 'http://100.105.70.67:5001'  


    async function fetchReport() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert("Error", "This user does not exist or has been logged out");
                return;
            }
            const response = await axios.get(`${API_URL}/api/fetch-incident-report`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            console.log('data', response.data);
            if (response.data && response.data.reports) {
                const reports = response.data.reports;
                setCounts(reports);
            }
        } catch (error) {
            console.error("Error fetching reports", error);
        }
    }

    function setCounts(reports) {
        
        const nearMisses = reports.filter(report => report.selectedOptions === "Near Miss").length; 
        const firstAid = reports.filter(report => report.selectedOptions === "First Aid").length; 
        const medicalCount = reports.filter(report => report.selectedOptions === "Medical").length; 
        const fatal = reports.filter(report => report.selectedOptions === "Fatal").length;
        const environmental = reports.filter(report => report.selectedOptions === "Environmental").length; 
        const illness = reports.filter(report => report.selectedOptions === "Illness").length;
        const propertyDamage = reports.filter(report => report.selectedOptions === "Property Damage").length;
        const theft = reports.filter(report => report.selectedOptions === "Theft").length;
        const productLoss = reports.filter(report => report.selectedOptions === "Product Loss").length;
        const hijacking = reports.filter(report => report.selectedOptions === "Hi-jacking").length;
        const nonConformance = reports.filter(report => report.selectedOptions === "Non Conformance").length;
       
        setNearMissesCount(nearMisses);
        setFirstAidCount(firstAid);
        setMedicalCount(medical);
        setFatalCount(fatal);
        setEnvironmentalSpillCount(environmental);
        setIllnessCount(illness);
        setPropertyDamageCount(propertyDamage);
        setTheftCount(theft);
        setProductLossCount(productLoss);
        setHijackingCount(hijacking);
        setNonConformanceCount(nonConformance);

        // Calculate total reports
        const total = nearMisses + firstAid + medical + fatal + environmental + 
        illness + propertyDamage + theft + productLoss + hijacking + nonConformance;
        setTotalNewReports(total);
    }   
    useEffect(() => {
        fetchReport();
        getUserInfo();
    }, []);

    const handleNav = () => {
        navigation.navigate('Reports');
    }

    async function getUserInfo() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert("Error", "This user does not exist or has been logged out");
                navigation.navigate('login');
                return;
            }
            const response = await axios.post(`${API_URL}/api/user-data`, { token });
            setUserInfo(response.data.data);
        } catch (error) {
            console.error('Error fetching user data: ', error);
        }
    }

    return (
        <View style={styles.container}>

            <View style={styles.profileSection}>
                <MaterialIcons name="account-circle" size={50} color={'#333'} />
                <View style={styles.userInfo}>
                    <Text style={styles.name}>{userInfo.Name} <Text style={styles.bold}>{userInfo.Surname}</Text></Text>
                    <Text style={styles.email}>{userInfo.Email}</Text>
                    <Text style={styles.position}>{userInfo.Role}</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                <Text style={styles.headings}>Documents</Text>

                <View style={styles.gridContainer}>
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Documents')}>
                        <MaterialIcons name="folder" size={30} color="#007bff" />
                        <Text style={styles.cardTitle}>Documents</Text>
                        {docExpiring && <View style={styles.badgeRed} />}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Due Maintenance')}>
                        <FontAwesome5 name="tools" size={30} color="#28a745" />
                        <Text style={styles.cardTitle}>Maintenance</Text>
                        {maintenanceCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{maintenanceCount}</Text></View>}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={handleNav}>
                        <Ionicons name="medkit" size={24} color="#dc3545" />
                        <Text style={styles.cardTitle}>Medical</Text>
                        {medicalCount > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>{medicalCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={handleNav}>
                        <Entypo name="warning" size={24} color="#ff0000" />
                        <Text style={styles.cardTitle}>Fatal</Text>
                        {fatalCount > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>{fatalCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={handleNav}>
                        <FontAwesome5 name="exclamation-circle" size={24} color="#ffc107" />
                        <Text style={styles.cardTitle}>Non Conformance</Text>
                        {NonConformanceCount > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>{NonConformanceCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={handleNav}>
                        <MaterialIcons name="error" size={24} color="#17a2b8" />
                        <Text style={styles.cardTitle}>Near Miss</Text>
                        {nearMissesCount > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>{nearMissesCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={handleEnvironment}>
                        <FontAwesome5 name="recycle" size={24} color="#28a745" />
                        <Text style={styles.cardTitle}>Environmental Spillage</Text>
                        {environmentalSpillCount > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>{environmentalSpillCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={handleNav}>
                        <MaterialIcons name="healing" size={24} color="#ffc107" />
                        <Text style={styles.cardTitle}>Illness</Text>
                        {illnessCount > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>{illnessCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={handleNav}>
                        <Ionicons name="shield" size={24} color="#007bff" />
                        <Text style={styles.cardTitle}>Hi-Jacking</Text>
                        {hijackingCount > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>{hijackingCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={handleNav}>
                        <FontAwesome5 name="box-open" size={24} color="#dc3545" />
                        <Text style={styles.cardTitle}>Product Loss</Text>
                        {productLossCount > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>{productLossCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.card} onPress={handleNav}>
                        <MaterialIcons name="lock" size={24} color="#28a745" />
                        <Text style={styles.cardTitle}>Theft</Text>
                        {theftCount > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>{theftCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={handleNav}>
                        <Ionicons name="home" size={24} color="#ff0000" />
                        <Text style={styles.cardTitle}>Property Damage</Text>
                        {propertyDamageCount > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>{propertyDamageCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card} onPress={handleNav}>
                        <FontAwesome5 name="first-aid" size={24} color="#ffc107" />
                        <Text style={styles.cardTitle}>First Aid</Text>
                        {firstAidCount > 0 && (
                            <View style={styles.notificationBadge}>
                                <Text style={styles.badgeText}>{firstAidCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                <View style={styles.dashboardNavContainer}>
                    <DashBoardNav
                        Title='Incident Report'
                        Color='#454B66'
                        Screen="RiskApp"
                    />
                    <DashBoardNav
                        Title='Pictures'
                        Color='#454B66'
                        Screen='Fuel'
                    />
                    <DashBoardNav
                        Title='SHE Documents'
                        Color='#454B66'
                        Screen='S.H.E Documents'

                    />
                    <DashBoardNav
                        Title='S.H.E Policy'
                        Color='#454B66'
                        Screen='S.H.E Policy'
                    />
                    <DashBoardNav
                        Title='S.H.E Inspection'
                        Color='#454B66'
                        Screen='S.H.E Inspection'
                    />
                </View>
            </ScrollView>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f9fc",
        padding: 20,
    },
    profileSection: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    userInfo: {
        marginLeft: 15,
    },
    name: {
        fontSize: 20,
        fontWeight: "600",
        color: "#333",
    },
    bold: {
        fontWeight: "700",
        color: "#000",
    },
    email: {
        fontSize: 14,
        color: "#666",
    },
    position: {
        fontSize: 14,
        color: "#888",
        marginTop: 4,
    },
    headings: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
        color: "#333",
    },
    scrollView: {
        marginTop: 20,
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },
    card: {
        width: "48%",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 2,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: "600",
        marginTop: 8,
        color: "#444",
        textAlign: "center",
    },
    badge: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "#dc3545",
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        minWidth: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    badgeRed: {
        position: "absolute",
        top: 8,
        right: 8,
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#dc3545",
    },
    badgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "700",
    },
});

export default Dashboard;