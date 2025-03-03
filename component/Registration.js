import React, { useState } from 'react';
import { View, Alert, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Registration = ({ navigation }) => {
    const [credentials, setCredentials] = useState('');
    const [verifyCredentials, setVerifyCredentials] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [verifyUserEmail, setVerifyUserEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [verifyPassword, setVerifyPassword] = useState(false);
    const [verifyConfirmPassword, setVerifyConfirmPassword] = useState(false);
    const [surname, setSurname] = useState('');
    const [verifySurname, setVerifySurname] = useState(false);
    const API = process.env.API_URL || 'http://100.105.70.67:5001'; 
    const handleNameInput = (NameVar) => {
        setCredentials(NameVar);
        if (NameVar.length > 1) {
            setVerifyCredentials(true);
        }
    }

    const handleEmailInput = (EmailVar) => {
        setUserEmail(EmailVar);
        if (EmailVar.length > 1) {
            setVerifyUserEmail(true);
        }
    }

    const handlePassword = (PasswordVar) => {
        setPassword(PasswordVar);
        if (PasswordVar.length > 1) {
            setVerifyPassword(true);
        }
    }

    const handleSurnameInput = (SurnameVar) => {
        setSurname(SurnameVar);
        if (SurnameVar.length > 1) {
            setVerifySurname(true);
        }
    }

    const handleConfirmPassword = (ConfirmPasswordVar) => {
        setConfirmPassword(ConfirmPasswordVar);
        if (ConfirmPasswordVar.length > 1) {
            setVerifyConfirmPassword(true);
        }
    }

    const submitHandler = () => {
        const Data = {
            name: credentials,
            surname: surname,
            email: userEmail,
            password: password,
            confirmPassword: confirmPassword
        }

        if (verifyCredentials && verifySurname && verifyUserEmail && verifyPassword && verifyConfirmPassword) {
            fetch(`${API}/api/register-user`, {
                timeout: 5000,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Data),
            }).then(response => {
                if (!response.ok) {
                    Alert.alert('network Failed')
                    throw new Error('network failed')
                }
                return response.json();
            }).then(data => {
                if (data.status === 'ok') {
                    Alert.alert('Notice', 'User Registered');
                    navigation.navigate('login');
                } else {
                    Alert.alert('Notice', 'Account Already exists');
                    console.log('test if this is displayed', data)
                };
            }).catch(error => {
                Alert.alert('error', error.message);
                console.log(error);
            })
        }
        else {
            Alert.alert('Error', 'Please fill in missing Data');
        }
    }

    const LoginNav = () => {
        navigation.navigate('login');
    }

    const ForgotPasswordNav = () => {
        navigation.navigate('Forgot Password')
    }

    return (
        <SafeAreaView style={styles.MainContainer}>
            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.headerText}>Registration</Text>
                    <Text style={{ marginLeft: 30, }}>Name</Text>
                    <TextInput
                        placeholder='John'
                        value={credentials}
                        onChangeText={handleNameInput}
                        style={styles.Input}
                    />
                    <Text style={{ marginLeft: 30, }}>Surname</Text>
                    <TextInput
                        placeholder='Doe'
                        value={surname}
                        onChangeText={handleSurnameInput}
                        style={styles.Input}
                    />
                    <Text style={{ marginLeft: 30, }}>Email Address</Text>
                    <TextInput
                        placeholder='example@email.com'
                        value={userEmail}
                        onChangeText={handleEmailInput}
                        style={styles.Input}
                    />
                    <Text style={{ marginLeft: 30, }}>Enter Password</Text>
                    <TextInput
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={handlePassword}
                        style={styles.Input}
                    />
                    <Text style={{ marginLeft: 30, }}>Confirm Password</Text>
                    <TextInput
                        secureTextEntry={!showPassword}
                        value={confirmPassword}
                        onChangeText={handleConfirmPassword}
                        style={styles.Input}
                    />
                    {password != confirmPassword ? <Text style={{ color: 'red', marginLeft: 10 }}>Passwords do not match.</Text> : null}
                    <TouchableOpacity onPress={submitHandler} style={styles.registerBtn} >
                        <View>
                            <Text style={styles.text}>Register</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.PromptStyle}>
                        <TouchableOpacity onPress={LoginNav}>
                            <View style={{ margin: 11, marginLeft: 40 }}>
                                <Text style={styles.ForgotStyle}>Already have an Account!</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ForgotPasswordNav}>
                            <View style={{ margin: 11, marginLeft: 30 }}>
                                <Text style={styles.ForgotStyle}>Forgot Password</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navstyles}>
                        <TouchableOpacity onPress={() => {
                            // navigate to googlemail login Screen
                            navigation.navigate('login') // -> for now.. still going to write code that links it to gmail 
                        }}>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        backgroundColor: '#ffffff'
    },

    container: {
        padding: 20,
        backgroundColor: '#ffffff',
    },
    headerText: {
        fontSize: 30,
        margin: 4,
        fontWeight: "bold",
        alignSelf: 'center',
        marginBottom: 10,
    },
    Input: {
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: '#d4d1ce',
        alignSelf: 'center',
        width: 250,
        height: 40,
        margin: 10,
        padding: 10
    },
    registerBtn: {
        backgroundColor: "#31A0EB",
        borderRadius: 10,
        width: 250,
        height: 40,
        padding: 10,
        alignSelf: 'center',
        margin: 10
    },
    text: {
        alignSelf: 'center',
        fontWeight: "bold",
        color: 'white'
    },
    ForgotStyle: {
        color: "blue",
        fontSize: 10,

    },
    PromptStyle: {
        flexDirection: 'row'
    }
});

export default Registration; 