import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToOrderList } from '../redux/orderReducer';

const ReviewScreen = ({ route ,navigation}) => {
  const { payment, item } = route.params;

  const dispatch = useDispatch();

  const handleConfirmOrder = () => {
    dispatch(addToOrderList(item));
    alert(`${item.title} Order Confirmed!`);
    navigation.navigate('ConfirmOrderList'); // Navigate to the screen displaying the order list
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Your Order</Text>
      <Text style={styles.detail}>Payment Method: {payment.method}</Text>
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
    color: 'black'

  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black'

  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black'

  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    color: 'white',

  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ReviewScreen;