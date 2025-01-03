import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { NGROK_ACCESS_KEY } from '@env';

// const CONNECTION_Url = 'https://5ae5-105-245-120-109.ngrok-free.app'
const CustomMenu = ({ navigation }) => {
    const [userData, setUserData] = useState('')
    async function getUserData() {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                Alert.alert('Error', 'This user has been logged out')
                navigation.navigate('login');
                return;
            }
            const response = await axios.post(`${NGROK_ACCESS_KEY}/user-data`, { token });
            setUserData(response.data.data);
        } catch (error) {
            console.error('error fetching user data: ', error);
        }
    }

    useEffect(() => {
        getUserData()
    }, []);

    const logout = () => {
        try {
            AsyncStorage.removeItem('token');
            Alert.alert('Logged out', 'user has been logged out');
            navigation.navigate('login');
        } catch (error) {
            Alert.alert('Error Logging Out', error.message);
        }
    }

    const sentItems = () => {
        navigation.navigate('Sent Reports');
    }

    const ReportNavigation = () => {
        navigation.navigate('RiskApp');
    }
    return (
        <DrawerContentScrollView>
            <View style={styles.Alignment}>
                <MaterialIcons name={'account-circle'} size={37} color={'grey'} style={styles.icon} />
                <View>
                    <Text style={styles.textPositioning}>{userData.Names} {userData.Surname}</Text>
                    <Text style={styles.text}>{userData.Email}</Text>
                </View>
            </View>
            <DrawerItem
                label='Sent Reports'
                onPress={sentItems}
                labelStyle={styles.bottomLine}
            />
            <DrawerItem
                label='Create Report'
                onPress={ReportNavigation}
                labelStyle={styles.bottomLine}
            />
            <DrawerItem
                label='Logout'
                onPress={logout}
                labelStyle={styles.ItemStyle}
            />
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    textPositioning: {
        marginTop: 10,
        marginRight: 2,
        fontSize: 17,
        fontWeight: 'bold',
    },

    ItemStyle: {
        backgroundColor: 'purple',
        fontWeight: 'bold',
        color: 'white',
        borderRadius: 6,
        padding: 12,
        alignContent: 'center'
    },
    bottomLine: {
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    },

    text: {
        fontSize: 10,
        marginLeft: 3,
    },
    icon: {
        margin: 9
    },
    Alignment: {
        flexDirection: 'row',
    }

})

export default CustomMenu; 