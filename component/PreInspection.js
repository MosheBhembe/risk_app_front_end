import { useEffect, useState, useRef } from 'react';
import { Text, TextInput, StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';



const PreTripInspection = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.containerMain}>
            <Text>Pre-Inspection</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerMain: {
        backgroundColor: '#fff'
    }
})

export default PreTripInspection; 