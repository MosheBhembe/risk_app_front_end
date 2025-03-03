import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ResetPassword = ({ navigation }) => {
    const [newPasswordInput, setNewPasswordInput] = useState();
    const [verifyNewPassword, setVerifyNewPassowrd] = useState(false);
    const [confirmNewPasswordInput, setConfirmNewPassword] = useState();
    const [verifyConfirmNewPassword, setVerifyConfirmNewPassword] = useState(false);
    const API = process.env.API_URL || 'http://100.105.70.67:5001'; 
    const handleNewPasswordText = (newPassVar) => {
        setNewPasswordInput(newPassVar);
        if (newPassVar.length > 1) {
            setVerifyNewPassowrd(true);
        }
    }

    const handleConfirmNewPassword = (confirmNewPasswordVar) => {
        setConfirmNewPassword(confirmNewPasswordVar);

        if (confirmNewPasswordVar.length > 1) {
            setVerifyConfirmNewPassword(true);
        }
    }

    const handleSubmit = () => {

        if (verifyNewPassword && verifyConfirmNewPassword) {
            const newPasswordData = {
                newPassword: newPasswordInput,
                confirmNewPassword: confirmNewPasswordInput
            }

            fetch(`${API}/api/reset-password`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPasswordData),
                timeout: 5000,
                retry: 2,
            }).then(response => {
                if (!response.ok) {
                    Alert.alert('network response failed');
                    throw new Error('network response failed');
                }
            }).then(response => {
                if (response.status === 'ok') {
                    Alert.alert('Notice!!', response.message)
                    navigation.navigate('login');
                }
                return response.json();
            }).catch(error => {
                Alert.alert('notice', error.message)
            });
        }
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>Reset Password</Text>
                    <Text>Enter New Password</Text>
                    <TextInput
                        placeholder='New Password'
                        value={newPasswordInput}
                        onChangeText={handleNewPasswordText}
                    />
                    <Text>Re-enter Password</Text>
                    <TextInput
                        placeholder='Confirm Password'
                        value={confirmNewPasswordInput}
                        onChangeText={handleConfirmNewPassword}
                    />
                    {newPasswordInput === confirmNewPasswordInput ? <Text>{response => response.message}</Text> : null}
                    <TouchableOpacity onPress={handleSubmit}>
                        <View>
                            <Text>Save</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

})

export default ResetPassword; 