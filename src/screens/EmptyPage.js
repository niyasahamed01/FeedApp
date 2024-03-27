import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet, Animated } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Avatar } from 'react-native-elements';

export const EmptyPage = ({ route, navigation }) => {
  
  const { image } = route.params;

  const onPress = () => {
    navigation.navigate('Input')
  }


  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onPress}>

        <Image source={image} style={style.image} />
        <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={10} />
      </TouchableOpacity>

    </View>
  );
};



const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
