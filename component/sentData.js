import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

const SentListByReport = () => {
    const [sentEmail, setSentEmail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API = process.env.API_URL || 'http://10.7.22.184:5001' || 'http://10.7.22.184:5001';

    const sentEmails = async () => {
        try {
            const response = await axios.get(`${API}/api/sent-emails`);
            setSentEmail(response.data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        sentEmails();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>

                <AntDesign name={'loading1'} size={35} color='#8453fb' style={{ justifyContent: 'center' }} />
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Image source={require('../assets/error_fetching_data.png')} />
                <Text style={styles.errorText}>Couldn't load Reports</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.headerText}>Sent Reports</Text>
            </View>
            <View>
                <FlatList
                    data={sentEmail}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.emailContainer}>
                            {item ? (
                                <>
                                    <Text style={styles.subjectText}>{item.subject}</Text>
                                    <Text style={styles.bodyText}>{item.text}</Text>
                                    <Text style={styles.dateText}>{new Date(item.sentAt).toLocaleString()}</Text>
                                </>
                            ) : (
                                <Text>No emails</Text>
                            )}
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    emailContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    subjectText: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bodyText: {
        marginBottom: 5,
    },
    dateText: {
        marginTop: 10,
        fontSize: 12,
        color: '#888',
    },
});

export default SentListByReport;
