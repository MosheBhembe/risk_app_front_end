import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image } from 'react-native';

import DashBoardNav from './DashboardComponent';

const DashBoard = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <View>
                        <View>
                            <Text style={styles.textStyle}>Welcome to Dashboard</Text>
                            <View style={styles.welcomeTextStyle}>
                                <Text>Welcome to RiskBT!</Text>
                                <Text> Your trusted partner in managing risks</Text>
                            </View>
                            <Image source={require('../assets/dashboard.png')} style={styles.image} />
                        </View>
                        <View style={{ justifyContent: 'center' }}>
                            <DashBoardNav
                                Title='Report an Incident'
                                Color='#8453fb'
                                description='Tap Report Incident to quickly submit your report. Your feedback helps us resolve issues promptly.'
                                Screen="RiskApp"
                            />
                            <DashBoardNav
                                Title='Previous Reports'
                                Color='#2981f6'
                                description='You can review recent reports. To see your report history, simply select a previous report'
                                Screen='Sent Reports'
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    AccountContainer: {
        flexDirection: 'row',
    },
    text: {
        marginTop: 10,
        margin: 1,
        fontSize: 12,
        marginLeft: 20,
        fontWeight: 'bold'
    },
    textStyle: {
        marginTop: 13,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        alignSelf: 'center'

    },
    image: {
        width: 140,
        height: 100,
        alignSelf: 'center',
        margin: 9
    },
    welcomeTextStyle: {
        color: '#796e6e',
        alignSelf: 'center',
        margin: 10,
        alignItems: 'center',
        marginBottom: 20
    }
})

export default DashBoard; 