import { useRef } from 'react';
import { Animated, Button, View } from 'react-native';

export default function TelaAnimacao() {
    const transX = useRef(new Animated.Value(0)).current;
    const transY = useRef(new Animated.Value(0)).current;

    const animacao = Animated.sequence([
        // Segmento superior: (0,0) -> (380,0)
        Animated.timing(transX, {
            useNativeDriver: true,
            toValue: 380,
            duration: 500,
        }),
        // Segmento superior direito: (380,0) -> (380,390)
        Animated.timing(transY, {
            useNativeDriver: true,
            toValue: 390,
            duration: 500,
        }),
        // Segmento do meio (ida): (380,390) -> (0,390)
        Animated.timing(transX, {
            useNativeDriver: true,
            toValue: 0,
            duration: 500,
        }),
        // Segmento do meio (volta): (0,390) -> (380,390)
        Animated.timing(transX, {
            useNativeDriver: true,
            toValue: 380,
            duration: 500,
        }),
        // Segmento inferior direito: (380,390) -> (380,780)
        Animated.timing(transY, {
            useNativeDriver: true,
            toValue: 780,
            duration: 500,
        }),
        // Segmento inferior: (380,780) -> (0,780)
        Animated.timing(transX, {
            useNativeDriver: true,
            toValue: 0,
            duration: 500,
        }),
    ]);

    return (
        <View style={{ flex: 1, marginTop: 25, backgroundColor: '#000' }}>
            <View style={{ flex: 1 }}>
                <Button title="Animar" onPress={() => animacao.start()} />
            </View>
            <Animated.View style={{
                flex: 5, marginTop: 50, position: "absolute",
                left: 0, top: 0, width: 50, height: 50,
                backgroundColor: "cyan",
                transform: [{ translateX: transX }, { translateY: transY }]
            }} />
        </View>
    );
}
