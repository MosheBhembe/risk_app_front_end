import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [verifyLoginEmail, setVerifyLoginEmail] = useState(false);
    const [loginPassword, setLoginPassword] = useState('');
    const [verifyLoginPassword, setVerifyLoginPassword] = useState(false);
    const [makePasswordVisible, setMakePasswordVisible] = useState(false);

    const [isLoading, setIsLoading] = useState(false)

    const API = process.env.API_URL || 'http://192.168.189.119:5001';

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
            setIsLoading(true);
            sendLoginData(accessData);
        } else {
            Alert.alert('Error', 'Please fill in all missing data');
        }
    }

    function handleNavToResetPassword() {
        navigation.navigate('Forgot Password');
    }

    const sendLoginData = async (data) => {
        fetch(`${API}/api/login-user`, {
            method: 'POST',
            timeout: 5000,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => {
            if (!response.ok) {
                setIsLoading(false);
                Alert.alert('Network failed');
                throw new Error('network failed');
            }
            return response.json();
        }).then(data => {
            setIsLoading(false)
            if (data.status === "ok") {
                AsyncStorage.setItem('token', data.data);
                navigation.navigate('Dashboard Screen');

            } else if (data.error === "Invalid Password") {
                Alert.alert('Alert', "Password is incorrect");
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
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={styles.scrollView}>
                        {isLoading && (
                            <View style={styles.loadingOverlay}>
                                <ActivityIndicator size="large" color="#301934" />
                                <Text style={styles.loadingText}>Logging In...</Text>
                            </View>
                        )}
                        <View style={styles.container}>

                            <MaterialIcons name="email" size={98} color="#301934" />
                            {/* <Image source={require('../assets/loginImage.png')} style={styles.logo} /> */}
                            <Text style={styles.topText}>Welcome</Text>
                            <Text style={styles.instructionStyle}>Login to your existing RiskBT app account</Text>

                            <Text style={styles.label}>User Email</Text>
                            <View style={styles.TextFields}>
                                <AntDesign name='user' size={18} color='#301934' style={styles.userIcon} />
                                <TextInput
                                    placeholder='email or username'
                                    value={loginEmail}
                                    onChangeText={handleLoginEmail}
                                    style={styles.input}
                                />
                            </View>

                            <Text style={styles.label}>Password</Text>
                            <View style={styles.TextFields}>
                                <AntDesign name='unlock' size={18} color='#301934' style={styles.userIcon} />
                                <TextInput
                                    placeholder='password'
                                    secureTextEntry={!makePasswordVisible}
                                    onChangeText={handleLoginPassword}
                                    value={loginPassword}
                                    style={styles.input}
                                />
                                <TouchableOpacity onPress={() => setMakePasswordVisible(!makePasswordVisible)} style={styles.iconContainer}>
                                    <Feather name={makePasswordVisible ? 'eye-off' : 'eye'} size={18} color='#301934' />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={handleLogin} style={styles.LoginBtn}>
                                <Text style={styles.LoginText}>Login</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity onPress={() => navigation.navigate('RiskBT Registration')} style={styles.button}>
                                <Text style={styles.title}>Registration</Text>
                            </TouchableOpacity> */}
                            <Text style={styles.footerText}>{'\u00A9'} Risk Barrier Technology</Text>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    MAIN: {
        flex: 1,
        backgroundColor: '#fff',
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
        color: "black",
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    instructionStyle: {
        color: 'black',
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
        fontSize: 12,
        color: '#301934',
        marginTop: 30,
        textAlign: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#fff',
    },
});

export default Login;;