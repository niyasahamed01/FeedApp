import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, ToastAndroid, StyleSheet, Image, Button } from 'react-native';


export const DetailScreen = ({ route, navigation }) => {

    const { name, phone, email, address, image } = route.params;


    const onPress = () => {
        navigation.navigate('ListScreen')
    }

    return (

        <View style={styles.container}>
            
            <Image source={{ uri: image }} style={styles.image} />

            <Text style={{ color: 'black', fontSize: 20, margin: 10, padding: 15 }}>
                {name} {'\n'}
                {phone} {'\n'}
                {email} {'\n'}
                {address}
            </Text>

            <Button onPress={onPress} title="Add Item" />

        </View>

    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'pink',
        color: 'white'
    },
    input: {
        color: '#000000',
        padding: 10,
        alignSelf: 'center',
        alignContent: 'center'
    },
    text: {
        margin: 14,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'black',
    },
    image: {
        width: 350,
        height: 350,
        // borderRadius: 100,
        margin: 10,
        resizeMode: 'cover',
    },
}); 