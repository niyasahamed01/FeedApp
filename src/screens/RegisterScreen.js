// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (name && email && password) {
            try {
                // Save the credentials to AsyncStorage
                await AsyncStorage.setItem('userName', name);
                await AsyncStorage.setItem('userEmail', email);
                await AsyncStorage.setItem('userPassword', password);
                Alert.alert('Registration Successful', 'You can now log in with your credentials.', [
                    { text: 'OK', onPress: () => navigation.navigate('Login') },
                ]);
            } catch (error) {
                Alert.alert('Registration Failed', 'Something went wrong. Please try again.');
            }
        } else {
            Alert.alert('Validation Error', 'All fields are required.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="blue"

            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="blue"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="blue"
                secureTextEntry
            />
            <View style={styles.button}>
                <Button title="Register" onPress={handleRegister} />
            </View>
            <View style={styles.button}>
                <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color:'black'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingLeft: 8,
        color:'black'
    },
    button: {
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
});

export default RegisterScreen;