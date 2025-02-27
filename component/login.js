import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [verifyLoginEmail, setVerifyLoginEmail] = useState(false);
    const [loginPassword, setLoginPassword] = useState('');
    const [verifyLoginPassword, setVerifyLoginPassword] = useState(false);
    const [makePasswordVisible, setMakePasswordVisible] = useState(false);

    const API_URL = "http://192.168.8.161:5001";

    // console.log(API_URL);
    const handleLoginEmail = (loginEmail) => {
        setLoginEmail(loginEmail);
        if (loginEmail.length > 1) {
            setVerifyLoginEmail(true);
        }
    };
    const handleLoginPassword = (passwordLogin) => {
        setLoginPassword(passwordLogin);
        if (passwordLogin.length > 1) {
            setVerifyLoginPassword(true);
        }
    };

    function handleLogin() {
        const accessData = {
            email: loginEmail,
            password: loginPassword
        };

        if (verifyLoginEmail && verifyLoginPassword) {
            sendLoginData(accessData);
        } else {
            Alert.alert('Error', 'Please fill in all missing data');
        }
    }

    function handleNavToResetPassword() {
        navigation.navigate('Forgot Password');
    }

    const sendLoginData = async (data) => {
        fetch(`${API_URL}/api/login-user`, {
            method: 'POST',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                Alert.alert('Network failed');
                throw new Error('network failed')
            }
            return response.json();
        }).then(data => {
            if (data.status === "ok") {
                AsyncStorage.setItem('token', data.data);
                navigation.navigate('Dashboard Screen');
            } else {
                Alert.alert('Error', 'Username or password is incorrect');
            }
        }).catch(error => {
            console.log(error.message);
            Alert.alert('Notice!!', error.message)
        });
    };

    return (
        <SafeAreaView style={styles.MAIN}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.container}>
                    <Image source={require('../assets/loginImage.png')} style={styles.logo} />
                    <Text style={styles.topText}>Welcome</Text>
                    <Text style={styles.instructionStyle}>Login to your existing RiskBT app account</Text>

                    <Text style={styles.label}>User Email</Text>
                    <View style={styles.TextFields}>
                        <AntDesign name='user' size={18} color='#333' style={styles.userIcon} />
                        <TextInput
                            placeholder='email or username'
                            value={loginEmail}
                            onChangeText={handleLoginEmail}
                            style={styles.input}
                        />
                    </View>

                    <Text style={styles.label}>Password</Text>
                    <View style={styles.TextFields}>
                        <AntDesign name='unlock' size={18} color='#333' style={styles.userIcon} />
                        <TextInput
                            placeholder='password'
                            secureTextEntry={!makePasswordVisible}
                            onChangeText={handleLoginPassword}
                            value={loginPassword}
                            style={styles.input}
                        />
                        <TouchableOpacity onPress={() => setMakePasswordVisible(!makePasswordVisible)} style={styles.iconContainer}>
                            <Feather name={makePasswordVisible ? 'eye-off' : 'eye'} size={18} color='grey' />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={handleLogin} style={styles.LoginBtn}>
                        <Text style={styles.LoginText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('RiskBT Registration')} style={styles.button}>
                        <Text style={styles.title}>Registration</Text>
                    </TouchableOpacity>
                    <Text style={styles.footerText}>{'\u00A9'} Copyright reserved</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    MAIN: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingBottom: 20,
    },
    container: {
        alignItems: 'center',
        padding: 20,
        width: '100%',
    },
    logo: {
        width: 140,
        height: 100,
        marginBottom: 20,
    },
    topText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    instructionStyle: {
        color: '#796e6e',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        alignSelf: 'flex-start',
        marginLeft: 50,
        marginBottom: 5,
        fontWeight: '600',
    },
    TextFields: {
        width: '80%',
        backgroundColor: '#d4d1ce',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingLeft: 10,
    },
    userIcon: {
        marginRight: 10,
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
    },
    LoginBtn: {
        backgroundColor: '#31A0EB',
        borderRadius: 10,
        width: '80%',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    LoginText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    forgotPassword: {
        marginBottom: 20,
    },
    forgotPasswordText: {
        color: '#2744EA',
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center',
    },
    registerContainer: {
        marginBottom: 20,
    },
    registerText: {
        fontSize: 14,
        color: '#3e76f8',
        textAlign: 'center',
    },
    footerText: {
        fontSize: 10,
        color: '#2744EA',
        marginTop: 30,
        textAlign: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
});

export default Login;