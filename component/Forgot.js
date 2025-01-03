import React, { useState } from 'react';
import {
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    View,
    StyleSheet,
    Alert
} from 'react-native';
import { Zocial } from '@expo/vector-icons';
import { NGROK_ACCESS_KEY } from '@env';

// const connectionNgrokUrl = 'https://5ae5-105-245-120-109.ngrok-free.app/forgot-password'

const ForgotForm = ({ navigation }) => {
    const [sendEmail, setSentEmail] = useState('');
    const [verifySendEmail, setVerifiedSentEmail] = useState(false);

    const handleEmailInput = (emailVar) => {
        setSentEmail(emailVar);

        if (emailVar.length > 1) {
            setVerifiedSentEmail(true);
        }
    };

    function handleSubmit() {
        const emailData = {
            email: sendEmail,
        };

        if (verifySendEmail) {
            //send the reset link
            fetch(`${NGROK_ACCESS_KEY}/forgot-password`, {
                method: 'POST',
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network Failed');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.status === 'ok') {
                        Alert.alert('Notice!', data.message, [
                            {
                                text: 'OK',
                                onPress: () => navigation.navigate('login')
                            }
                        ]);
                    }
                })
                .catch((error) => {
                    Alert.alert('error', error.message);
                });
        } else {
            Alert.alert('Error', 'Please enter your email address');
        }
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.Main}>
                <Text style={styles.mainText}>Request Reset link</Text>
                <View style={styles.inputContainer}>
                    <View style={styles.textInputStyle}>
                        <Zocial name="email" size={18} color="grey" style={{ margin: 7 }} />
                        <TextInput
                            placeholder="email@example.com"
                            onChangeText={handleEmailInput}
                            value={sendEmail}
                        />
                    </View>
                    <TouchableOpacity onPress={handleSubmit} style={styles.touchableBtnStyle}>
                        <View>
                            <Text style={styles.textStyle}>Request</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.AlignItem}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('login');
                            }}
                        >
                            <View>
                                <Text style={{ marginTop: 30 }}>
                                    return to <Text style={{ fontWeight: 'bold', color: 'blue' }}>Login</Text>
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    Main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    textInputStyle: {
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: '#d4d1ce',
        width: 250,
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        paddingHorizontal: 10,
    },
    touchableBtnStyle: {
        backgroundColor: '#31A0EB',
        borderWidth: 0,
        borderRadius: 10,
        width: 120,
        height: 43,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
    },
    AlignItem: {
        flexDirection: 'row',
        margin: 1,
        padding: 8,
        alignItems: 'center',
    },
    mainText: {
        fontSize: 18,
        marginBottom: 22,
    },
});

export default ForgotForm;

