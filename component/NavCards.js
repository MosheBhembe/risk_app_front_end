// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';


// const Card = ({ title, description, screenName }) => {

//     const navigation = useNavigation();
//     const handlePress = () => {
//         navigation.navigate(screenName);
//     }
//     return (
//         <TouchableOpacity onPress={handlePress}>
//             <View style={styles.Card}>
//                 <Text style={styles.Title}>{title}</Text>
//                 <Text style={styles.Description}>{description}</Text>
//             </View>
//         </TouchableOpacity>
//     );
// };


// const styles = StyleSheet.create({
//     Card: {
//         backgroundColor: '#ffffff',
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: 'white',
//         margin: 10,
//         width: 300,
//         shadowOffset: { width: 0, height: 1 },
//         shadowColor: 'lightblue',
//         shadowOpacity: 0.1,
//         shadowRadius: 2,
//         elevation: 5,
//         paddingTop: 2,
//         // paddingRight: 200,
//     },
//     Title: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         paddingTop: 10,
//         margin: 10,
//         color: 'black',
//         textAlign: 'left',
//     },
//     Description: {
//         fontSize: 10,
//         marginTop: 5,
//         paddingBottom: 10,
//         margin: 10
//     }

// });

// export default Card; 
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Card = ({ title, description, screenName }) => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate(screenName);
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.85}
            style={styles.touchable}
        >
            <View style={styles.card}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    touchable: {
        marginVertical: 10,
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        marginHorizontal: 50,
        width: '90%',
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 6,
        borderWidth: 0.5,
        borderColor: '#f0f0f0',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
});

export default Card;
