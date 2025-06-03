import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Card from './NavCards';

const Main = () => {
    let textDescripion = 'Share Your Incident: Let Us Know';
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Card
                        title='Report'
                        description={textDescripion}
                        screenName='Report'
                    />
                </View>
                <View>
                    <Card
                        title='Slips'
                        description='Send you slips'
                        screenName='Slip Options'
                    />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Main; 