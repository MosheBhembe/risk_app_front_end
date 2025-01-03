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
                    borderRadius: 20,
                    width: 310,
                    height: 110,
                    margin: 10,
                    overflow: 'hidden',
                    alignSelf: 'center'
                }}>
                    <View style={styles.AlignContent}>
                        <AntDesign name='checkcircle' size={15} color='#efe1e1' style={{ margin: 9, top: 7 }} />
                        <Text style={styles.TitleStyle}>{Title}</Text>
                    </View>
                    <View>
                        <Text style={styles.DescriptionTextStyle}>{description}</Text>
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
        color: '#efe1e1'
    },
    AlignContent: {
        flexDirection: 'row',
        marginLeft: 10
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