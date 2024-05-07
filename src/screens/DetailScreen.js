import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, ToastAndroid, StyleSheet, Image } from 'react-native';


export const DetailScreen = ({ route }) => {

    const { name, phone, email, image } = route.params;

    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            
            <Image source={{ uri: image }} style={styles.image} />

            <Text style={{ color: 'black', fontSize: 20, margin: 10, padding: 10 }}>
                {name} {'\n'}
                {phone} {'\n'}
                {email}
            </Text>

        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#72e6e8',
        padding: 8,
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
        width: '80%',
        height: '60%',
        resizeMode: 'stretch',
    },
}); 