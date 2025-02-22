import React from 'react'
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'



const DashBoardNav = ({ Title, Screen, description, Color }) => {
    const navigation = useNavigation();

    const handleNav = () => {
        navigation.navigate(Screen);
    }

    return (
        <>
            <View>
                <TouchableOpacity onPress={handleNav} style={{
                    backgroundColor: Color,
                    borderRadius: 2,
                    width: 500,
                    height: 50,
                    margin: 10,
                    overflow: 'hidden',
                    alignSelf: 'center'
                }}>
                    <View style={styles.AlignContent}>
                        <Text style={styles.TitleStyle}>{Title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    TitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
        marginBottom: 2,
        color: '#ffffff'
    },
    AlignContent: {
        flexDirection: 'row',
        marginLeft: 10,
        justifyContent: "center"

    },
    DescriptionTextStyle: {
        fontSize: 13,
        marginLeft: 9,
        marginBottom: 15,
        color: 'white',
        padding: 10
    },
})

export default DashBoardNav;