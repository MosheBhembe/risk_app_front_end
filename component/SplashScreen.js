import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
// import splashlogo from '../assets/Splash/splashScreenlogo.JPG';

const SplashScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);

            navigation.replace('login');
        }, 3000)

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            {/* <Image source={splashlogo} style={styles.logo} /> */}
            <Text style={styles.title}>RiskBT</Text>
            <ActivityIndicator size="small" color="#fff" style={{ margin: 10 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#301934'
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
        borderRadius: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'thin',
        color: "#fff"
    }
});
export default SplashScreen; 