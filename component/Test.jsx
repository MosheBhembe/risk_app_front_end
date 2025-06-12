import { useState, useRef } from 'react';
import { SafeAreaView, Text, View, Image } from 'react-native';
import SignatureCanvas from 'react-native-signature-canvas';



const LetsTestTheComponent = () => {
    const [Signature, setSignature] = useState(null);
    const ref = useRef();

    const handleSignature = (signature) => {
        console.log(signature);
        setSignature(signature);
    }

    const handleEnd = () => {
        ref.current.readSignature();
    };


    return (
        <SafeAreaView>
            <View>
                {Signature && (
                    <Image
                        resizeMode='contain'
                        style={{ width: 335, height: 114 }}
                        source={{ uri, Signature }}
                    />
                )}
            </View>
            <SignatureCanvas
                ref={ref}
                onEnd={handleEnd}
                onOK={handleSignature}
                autoClear={true}
                descriptionText='Sign here'
                clearText='Clear'
                confirmText='Save'
            />
        </SafeAreaView>
    )
}

export default LetsTestTheComponent;
