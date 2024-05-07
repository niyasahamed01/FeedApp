import React, { useState, useEffect } from 'react';
import { Button, Image, View, PermissionsAndroid, FlatList, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from '../redux/fetchApiData';


export const Store = () => {

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchApiData());
  }, [dispatch]);


  return (
    <FlatList
      data={data?.products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
}



const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.price}>{`Price : Rs.${item.price} /-`}</Text>
        <Text style={styles.stock}>{`Stock:${item.stock}`}</Text>

      </View>
    </View>
  </View>
);


const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imageContainer: {
    marginRight: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginTop: 5
  },
  stock: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 5
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginTop: 5
  },

});