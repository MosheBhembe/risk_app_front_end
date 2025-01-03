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
                        title='Fuel Consumption'
                        description='Report any and all Near accidents and Feul consumptions'
                        screenName='Fuel'
                    />
                </View>
                <View>
                    <Card
                        title='Change Tyre'
                        description='Report all tyre Changes or Out-Of-Spears'
                        screenName='Change-Tyre'

                    />
                </View>
                <View>
                    <Card
                        title='Near Hit'
                        description='Report Near Hit Incident'
                        screenName='Near-Hit'
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