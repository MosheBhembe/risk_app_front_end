import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';

const Icon = () => {

    return (
        <>
            <SafeAreaView>
                <View style={{ flexDirection: 'row' }}>
                    {/* <TouchableOpacity>
                        <Entypo name="menu" size={24} color="3e76f8" style={{
                            position: 'absolute',
                            margin: 
                        }} />
                    </TouchableOpacity> */}
                    <Text style={{ fontSize: 20, marginTop: 5, marginLeft: 2, fontWeight: 'bold' }}>Dashboard</Text>
                </View>
            </SafeAreaView>
        </>
    )
}
export default Icon; 