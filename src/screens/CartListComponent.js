import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { getItems, removeItem } from './cartdb';
import { ActivityIndicator } from 'react-native-paper';

import CartEventEmitter from './CartEventEmitter';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartListComponent = ({ navigation }) => {

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();

    const itemAddedListener = () => fetchCartItems();
    const itemRemovedListener = () => fetchCartItems();

    CartEventEmitter.on('itemAdded', itemAddedListener);
    CartEventEmitter.on('itemRemoved', itemRemovedListener);

    return () => {
      CartEventEmitter.off('itemAdded', itemAddedListener);
      CartEventEmitter.off('itemRemoved', itemRemovedListener);
    };
  }, []);

  const fetchCartItems = async () => {
    try {

      setLoading(true);
      const items = await getItems();
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeItem(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleItem = async (item) => {
    console.log(item, "item.............");
    try {
      const profileImageUri = await AsyncStorage.getItem('profileImage');
      const name = await AsyncStorage.getItem('name');
      const phone = await AsyncStorage.getItem('phone');
      const email = await AsyncStorage.getItem('email');
      const address = await AsyncStorage.getItem('address');
      const pin = await AsyncStorage.getItem('pin');
      navigation.navigate('AddressItem', { name, phone, email, address, pin, image: profileImageUri, item: item });
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const renderItem = useCallback(({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.itemDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={{ flex: 5, flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveItem(item.item_id)}>
            <Text style={styles.buttonText}>REMOVE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={() => handleItem(item)}>
            <Text style={styles.buttonText}>BUY NOW</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  ), []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={cartItems}
      keyExtractor={(item) => item.item_id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ListEmptyComponent={<Text style={styles.emptyText}>Cart is empty</Text>}
      initialNumToRender={10}
      windowSize={5}
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      removeClippedSubviews={true}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#f9c2ff',
    padding: 10,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },
  description: {
    fontSize: 12,
    color: 'black'
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },
  removeButton: {
    marginTop: 10,
    backgroundColor: '#ff0000',
    borderRadius: 5,
    padding: 10,
    color: 'black'
  },
  addButton: {
    marginTop: 10,
    backgroundColor: 'orange',
    borderRadius: 5,
    padding: 10,
    color: 'black'
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'black',
    fontWeight:'bold'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});