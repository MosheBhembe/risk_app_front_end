import { SafeAreaView, View, StyleSheet, ScrollView } from 'react-native';
import Card from './NavCards';


const InspectionsScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Card
                        title="General Inspections"
                        screenName='S.H.E Inspection'
                    />
                    <Card
                        title="Pre Trip Inspections"
                        screenName='Pre-Inspections'
                    />
                    <Card
                        title='Post Trip Inspections'
                        screenName='Post-Inspection'
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default InspectionsScreen; 