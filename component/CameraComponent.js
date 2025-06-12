import { useRef, useState, useContext } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ImageContext } from '../context/Context';


const CameraComponent = ({ navigation }) => {
    const cameraRef = useRef(null);
    const { setImageUri } = useContext(ImageContext)
    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState('back');


    if (!permission) {
        return <View />
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text>We need permission to use the camera</Text>
                <Button onPress={requestPermission} title='Grant Permission' />
            </View>
        )
    }

    function toggleCameraFacing() {
        setFacing((current) => (
            current === 'back' ? 'front' : 'back'
        ))
    }

    const takePicture = async () => {
        try {
            if (cameraRef.current) {
                const photo = await cameraRef.current.takePictureAsync({});
                console.log(photo.uri);
                setImageUri(photo.uri);
                navigation.navigate('Maintenance Slips', { imageUri: photo.uri });

            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing={facing}

                />
                <View style={styles.overlay}>
                    <TouchableOpacity style={styles.captureButton} onPress={toggleCameraFacing}>
                        <Text style={styles.buttonText}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                        <Text style={styles.buttonText}>Take Picture</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    captureButton: {
        alignSelf: 'center',
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    closeButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 16,
    },
});


export default CameraComponent; 