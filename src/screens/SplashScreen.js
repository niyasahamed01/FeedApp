import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const SplashScreen = ({ setIsSplashComplete }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsSplashComplete(true);
        }, 3000); // Simulating a 3-second delay

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <MaterialIcons name="production-quantity-limits" color={'green'} size={150} />

            <Text style={styles.title}>EKART App</Text>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'violet'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: 'blue'
    },
});

export default SplashScreen;