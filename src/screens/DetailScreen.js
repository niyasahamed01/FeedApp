import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, ToastAndroid, StyleSheet, Image, Button } from 'react-native';


export const DetailScreen = ({ route, navigation }) => {

    const { name, phone, email, address, pin, type, image } = route.params;

    const onPress = () => {
        navigation.navigate('ListScreen');
    }
    const handleConfirmOrder = () => {
        alert('Order Confirmed!');
    };

    return (

        <View style={styles.container}>

            {type == 0 && (
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                />)}

            <TouchableOpacity style={styles.card} onPress={() => onSelect(address)}>
                <Text numberOfLines={2} style={styles.text}>{name}</Text>
                <Text numberOfLines={2} style={styles.text}>{phone}</Text>
                <Text numberOfLines={2} style={styles.text}>{email}</Text>
                <Text numberOfLines={2} style={styles.text}>{address}</Text>
                <Text numberOfLines={2} style={styles.text}>{pin}</Text>
            </TouchableOpacity>

            {type == 0 && (
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Add Item</Text>
                </TouchableOpacity>)}


            {type != 0 &&
                <View >
                    <Text style={styles.title}>Review Your Order</Text>
                    <Text style={styles.detail}>Address: {address}</Text>
                    <Text style={styles.detail}>Payment Method: Online Payment</Text>
                    <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
                        <Text style={styles.buttonText}>Confirm Order</Text>
                    </TouchableOpacity>
                </View>}
        </View >

    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'pink',
        color: 'white'
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        marginTop: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    image: {
        marginTop: 10,
        width: 300,
        height: 300,
    },
    detail: {
        fontSize: 15,
        marginBottom: 10,
        color: 'black'
    },
    button: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width:"80%",
        elevation: 3,
    },
    text: {
        color: 'black',
        fontSize: 18,
        marginVertical: 2,
    },

});


