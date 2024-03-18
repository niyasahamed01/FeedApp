import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet, Animated } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Avatar } from 'react-native-elements';

export const EmptyPage = ({ route }) => {
    const { image } = route.params;
  
    return (
      <View style={style.container}>
        <Image source={image} style={style.image} />
        <BlurView style={StyleSheet.absoluteFill} blurType="light" blurAmount={10} />
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
  