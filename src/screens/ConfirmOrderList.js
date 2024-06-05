// OrderListScreen.js
import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ConfirmOrderList = () => {

  const orderList = useSelector(state => state.orderList);
  console.log(orderList, orderList);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order List</Text>
      {/* <FlatList
        data={orderList}
        renderItem={({ item }) => (
          <View style={styles.orderItem}>
            <Text>{item.title}</Text>
            <Text>{item.price}</Text>
          </View>
        )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  orderDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: 'black',
  },
});


export default ConfirmOrderList;