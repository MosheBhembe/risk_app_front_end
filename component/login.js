import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NGROK_ACCESS_KEY } from '@env';

const Login = ({ navigation }) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [verifyLoginEmail, setVerifyLoginEmail] = useState(false);
    const [loginPassword, setLoginPassword] = useState('');
    const [verifyLoginPassword, setVerifyLoginPassword] = useState(false);
    const [makePasswordVisible, setMakePasswordVisible] = useState(false);


    const handleLoginEmail = (loginEmail) => {
        setLoginEmail(loginEmail);
        if (loginEmail.length > 1) {
            setVerifyLoginEmail(true);
        }
    }
    const handleLoginPassword = (passwordLogin) => {
        setLoginPassword(passwordLogin);
        if (passwordLogin.length > 1) {
            setVerifyLoginPassword(true);
        }
    }

    function handleLogin() {
        const accessData = {
            email: loginEmail,
            password: loginPassword
        }

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
        fetch(`${ACCESS_KEY}/api/login-user`, {
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
            if (data.status == "ok") {
                AsyncStorage.setItem('token', data.data);
                navigation.navigate('Dashboard Screen');
            } else {
                Alert.alert('Error', 'Username or password is incorrect');
            }
        }).catch(error => {
            console.log(error.message);
            Alert.alert('Notice!!', error.message)
        })
    }
    return (
        <SafeAreaView style={styles.MAIN}>
            <ScrollView>
                <View>
                    <View style={{ justifyContent: 'center' }}>
                        <Image source={require('../assets/loginImage.png')} style={{ alignSelf: 'center', width: 140, height: 100, marginTop: -2 }} />
                        <Text style={styles.topText}>Welcome Back</Text>
                        <Text style={styles.instructionStyle}>Login to your existing RiskBT app account</Text>
                        <Text style={{ marginLeft: 50 }}>User Email</Text>
                        <View style={styles.TextFields}>
                            <AntDesign name='user' size={18} color='#333' style={styles.userIcon} />
                            <TextInput
                                placeholder='email or username'
                                value={loginEmail}
                                onChangeText={handleLoginEmail}
                            />
                        </View>
                        <Text style={{ marginLeft: 50 }}>Password</Text>
                        <View style={styles.TextFields}>
                            <AntDesign name='unlock' size={18} color='#333' style={styles.userIcon} />
                            <TextInput
                                placeholder='password'
                                secureTextEntry={!makePasswordVisible}
                                onChangeText={handleLoginPassword}
                                multiline={false}
                                numberOfLines={1}
                                value={loginPassword}
                            />
                            <TouchableOpacity onPress={() => {
                                setMakePasswordVisible(!makePasswordVisible);
                            }} style={styles.iconContainer}>
                                <Feather name={makePasswordVisible ? 'eye-off' : 'eye'} size={18} color='grey' style={styles.showPasswordStyle} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={handleLogin} style={styles.LoginBtn}>
                            <View>
                                <Text style={styles.LoginText}>Login</Text>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <TouchableOpacity onPress={handleNavToResetPassword}>
                                <View>
                                    <Text style={{
                                        color: '#2744EA',
                                        fontWeight: 'bold',
                                        fontSize: 15,
                                        textAlign: 'center',
                                        padding: 10
                                    }}>Forgot Password</Text>
                                </View>
                            </TouchableOpacity>
                            <View>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate('Registration');
                                }}>
                                    <Text style={{ fontSize: 10, alignSelf: 'center', color: "#3e76f8" }}>Dont't have an Account? Create a new one</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{
                                alignSelf: 'center',
                                color: '#2744EA',
                                marginTop: 30,
                                fontSize: 10
                            }}>{'\u00A9'} Copyright reserved</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    MAIN: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    topText: {
        fontSize: 30,
        margin: 2,
        fontWeight: 'bold',
        left: 10,
        marginBottom: 4,
        alignSelf: 'center'
    },
    TextFields: {
        flex: 1,
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: '#d4d1ce',
        alignSelf: 'center',
        width: 250,
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        paddingHorizontal: 10
    },
    // #31A0EB
    LoginBtn: {
        backgroundColor: '#31A0EB',
        borderWidth: 0,
        borderRadius: 10,
        width: 250,
        height: 40,
        alignSelf: 'center',
        margin: 10
    },
    contentView: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10
    },
    userIcon: {
        margin: 10,
        marginLeft: 2
    },
    LoginText: {
        color: "white",
        fontWeight: 'bold',
        alignSelf: 'center',
        margin: 10,
    },
    showPasswordStyle: {
        paddingHorizontal: 10,
        margin: 10
    },
    iconContainer: {
        position: 'absolute',
        margin: 10,
        flexDirection: 'row',
        left: 168,
        zIndex: 1,
        overflow: 'hidden'
    },
    instructionStyle: {
        color: '#796e6e',
        alignSelf: 'center',
        marginBottom: 20
    }
});

export default Login;