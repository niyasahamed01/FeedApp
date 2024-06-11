import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { Button, Image } from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';

const paymentMethods = [
  { id: '1', method: 'Cash on Delivery' },
  { id: '2', method: 'Credit/Debit Card' },
  { id: '3', method: 'UPI' },
];

const AddressItem = ({ route, navigation }) => {

  const { name, phone, email, address, pin, item: item, city, state } = route.params;

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [price, setPrice] = useState(parseFloat(item.price * item.count).toFixed(2));
  const [count, setCount] = useState(item.count);

  useEffect(() => {
    setPrice((parseFloat(item.price) * item.count).toFixed(2));
    setCount(item.count);
  }, [item.count]);

  const incrementAmount = parseFloat(item.price).toFixed(2);
  const decrementAmount = parseFloat(item.price).toFixed(2);

  const increasePrice = () => {
    setPrice((prevPrice) => (parseFloat(prevPrice) + parseFloat(incrementAmount)).toFixed(2));
    setCount((prevCount) => prevCount + 1);
  };

  const decreasePrice = () => {
    if (count > 1) {
      setPrice((prevPrice) => (parseFloat(prevPrice) - parseFloat(decrementAmount) >= 0 ? (parseFloat(prevPrice) - parseFloat(decrementAmount)).toFixed(2) : '0.00'));
      setCount((prevCount) => prevCount - 1);
    }
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const proceedToReview = () => {
    if (selectedPayment) {
      if (name) {
        navigation.navigate('Review', { payment: selectedPayment, item: item, price: price });
      } else {
        showToast("Please Add Address in Profile");
      }
    } else {
      alert('Please select a payment method');
    }
  };

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handlePress = () => {
    navigation.navigate('Profile'); // Navigate back when the TouchableOpacity is pressed
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.addressContainer}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={styles.order}>Order Id: {item.item_id}</Text>
            <Text style={styles.order}>Order Name: {item.title}</Text>
            <Text style={styles.order}>Order Price: {item.price} /-</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', margin: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, alignSelf: 'center' }}>
            <TouchableOpacity
              style={[styles.countButton, count === 1 && styles.disabledButton]}
              onPress={decreasePrice}
              disabled={count === 1}
            >
              <Text style={styles.countText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.countValue}>{count}</Text>
            <TouchableOpacity style={styles.countButton} onPress={increasePrice}>
              <Text style={styles.countText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.countValue}>Total Price: {price} /-</Text>
        </View>
        {name ? (
          <View>
            <Text style={styles.title}>Shipping Address</Text>
            <TouchableOpacity style={styles.card} onPress={handlePress}>
              <View style={{ position: 'absolute', right: 0, margin: 5, padding: 5 }}>
                <Feather name={"edit"} color='black' size={22} />
              </View>
              <Text numberOfLines={2} style={styles.text}>{name}</Text>
              <Text numberOfLines={2} style={styles.text}>{phone}</Text>
              <Text numberOfLines={2} style={styles.text}>{email}</Text>
              <Text numberOfLines={2} style={styles.text}>{address}</Text>
              <Text numberOfLines={2} style={styles.text}>{city}</Text>
              <Text numberOfLines={2} style={styles.text}>{state}</Text>
              <Text numberOfLines={2} style={styles.text}>{pin}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          showToast("Please Add Address in Profile")
        )}
      </View>
      <View style={styles.paymentContainer}>
        <Text style={styles.title}>Select Payment Method</Text>
        <FlatList
          data={paymentMethods}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.paymentItem, item.id === selectedPayment?.id && styles.selectedItem]}
              onPress={() => handlePaymentSelect(item)}
            >
              <Text style={styles.paymentText}>{item.method}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity style={styles.proceedButton} onPress={proceedToReview}>
        <Text style={styles.buttonText}>Proceed to Review</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginBottom: 10,
    marginTop: 10,
    color: 'black'
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    color: 'black',
    fontSize: 16,
    marginVertical: 2,
    padding: 3
  },
  paymentItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: '#fff',
  },
  paymentText: {
    fontSize: 17,
    color: 'black',
  },
  selectedItem: {
    borderColor: '#007bff',
    backgroundColor: '#e6f7ff',
  },
  proceedButton: {
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    color: 'black'
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,

  },
  addressContainer: {
    marginBottom: 20,
  },
  paymentContainer: {
    marginBottom: 20,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 15,
  },
  order: {
    color: 'black',
    fontSize: 16,
    marginTop: 5,
    marginLeft: 15,
  },
  count: {
    fontSize: 20,
    margin: 20,
    alignSelf: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  countButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  countText: {
    color: '#fff',
    fontSize: 18,
  },
  countValue: {
    color: 'black',
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
});

export default AddressItem;