import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, SafeAreaView, StyleSheet, Alert, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
// import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';


const CameraScreen = () => {
    const cameraRef = useRef()
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const MediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === 'granted');
            setHasMediaLibraryPermission(MediaLibraryPermission.status === 'granted');
        })()
    }, []);

    if (hasCameraPermission === undefined) {
        return Alert.alert('', 'Requesting Permission...')
    } else if (!hasCameraPermission) {
        return Alert.alert("", "Camera permission is required for this app.", [{
            text: "OK"
        }])
    }

    const takePicture = async () => {
        let option = {
            quality: Camera.Constants.Type.high,
            base64: true,
            exif: false,
        }
        let newPhoto = await cameraRef.current.takePictureAsync(option);
        setPhoto(newPhoto);
    }

    if (photo) {
        let sharePic = () => {
            shareAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        let savePicture = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };
        const uploadImage = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('image', photo);

            const result = await axios.post(
                "http://192.168.255.119:5001/fuel-consumption",
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            )
        }
        return (
            <SafeAreaView style={styles.Container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                <View style={styles.btnView}>
                    {hasMediaLibraryPermission ? <Button title='save' onPress={savePicture} /> : undefined}
                    <Button title='upload' onPress={uploadImage} />
                    <Button title='Discard' onPress={() => setPhoto(undefined)} />
                </View>
            </SafeAreaView>
        );
    }
    return (
        <Camera style={styles.Container} ref={cameraRef}>
            <TouchableOpacity style={styles.snapStyle} onPress={takePicture}>
            </TouchableOpacity>
        </Camera>

    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    snapStyle: {
        backgroundColor: '#fff',
        borderRadius: 100,
        width: 90,
        height: 90,
        marginTop: 200,
        marginBottom: -220
    },
    preview: {
        alignSelf: 'stretch',
        flex: 1
    },
    btnView: {
        flexDirection: "row",
        margin: 10,
        justifyContent: 'space-around',

    }
})

export default CameraScreen; 