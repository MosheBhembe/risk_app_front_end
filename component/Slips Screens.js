import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Card from './NavCards';

const SlipOptions = () => {
    let textDescripion = 'send maintenance your Slips';
    return (
        <View style={styles.container}>
            <ScrollView>
                <View>
                    <Card
                        title='Maintenance Slips'
                        description={textDescripion}
                        screenName='Maintenance Slips'
                    />
                </View>
                <View>
                    <Card
                        title='Fuel Slips'
                        description='Send your fuel slips'
                        screenName='Fuel'
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

export default SlipOptions; 