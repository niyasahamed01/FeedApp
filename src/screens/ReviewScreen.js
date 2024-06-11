import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToOrderList } from '../redux/orderReducer';

const ReviewScreen = ({ route, navigation }) => {

  const { payment, item, price } = route.params;

  const dispatch = useDispatch();

  const handleConfirmOrder = () => {
    // If price is fetched successfully
    dispatch(addToOrderList({ ...item, price })); // Include price in the order item
    Alert.alert(
      'Order Confirmed',
      `Your Order Item ${'Rs' + price + item.title + ' '} Product Confirmed!`,
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Home') // Navigate to the 'Home' screen
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Your Order</Text>
      <Text style={styles.detail}>Payment Method: {payment.method}</Text>
      {price !== null && (
        <Text style={styles.detail}>Price: Rs.{price} /-</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black'
  },
  detail: {
    fontSize: 16,
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
    fontSize: 18,
  },
});

export default ReviewScreen;