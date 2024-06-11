import React, { useEffect } from 'react';
import { View, Text, ScrollView, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../redux/orderReducer';

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const { orderList, loading } = useSelector(state => state.orderList);

  useEffect(() => {
    // Simulate fetching data (replace with actual fetch operation)
    dispatch(setLoading(true)); // Set loading to true when fetching starts
    setTimeout(() => {
      // Simulate fetching delay
      dispatch(setLoading(false)); // Set loading to false when fetching completes
    }, 2000);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Display ActivityIndicator while loading
      ) : orderList.length > 0 ? (
        <ScrollView>
          <FlatList
            data={orderList}
            renderItem={({ item }) => (
              <OrderItem item={item} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </ScrollView>
      ) : (
        <Text style={styles.noOrderText}>No Order Found</Text>
      )}
    </View>
  );
};

const OrderItem = ({ item }) => {
  return (
    <View key={item.id} style={styles.card}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.orderDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemTitle}>Quantity:{item.count}</Text>
        {/* <Text style={styles.itemTitle}>Total:{item.price}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    borderColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "90%",
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
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
    color: 'black',
    padding: 2
  },
  itemPrice: {
    fontSize: 16,
    color: 'black',
  },
  noOrderText: {
    fontSize: 18,
    alignSelf: 'center',
    alignItems: 'center',
    color: 'red', // Custom styling for the "No Order Found" message
    marginTop: 20, // Additional margin top for better spacing
  },
});

export default OrderListScreen;