import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Text, StyleSheet, StatusBar, View, ToastAndroid, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNextPage } from '../redux/homeSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { createTable, insertItem } from './cartdb'; // Import the database helper functions


export const StoreComponent = ({ navigation }) => {

  const dispatch = useDispatch();
  const { products, loading, error, page, } = useSelector((state) => state.home);

  useEffect(() => {
    dispatch(fetchNextPage());
  }, [dispatch]);


  const handleLoadMore = useCallback(() => {
    if (!loading) {
      dispatch(fetchNextPage());
    }
  });

  const renderFooter = () => {
    if (loading) {
      return (
        <ActivityIndicator size="large" color="#0000ff" />
      );
    } else {
      return (
        <TouchableOpacity style={styles.buttonLoad} onPress={handleLoadMore}>
          <Text style={styles.buttonText}> Load More</Text>
        </TouchableOpacity>
      )
    }
  };

  if (error) {
    return <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
      <Text style={styles.footerText}>Error: {error}</Text>
    </View>
  }

  const handleItemPress = async (item) => {
    try {
      insertItem(item);
      showToast(` ${item?.title} - Added to Cart`);

    } catch (error) {
      showToast('Failed to add item to cart');
    }
  };


  // const handleItemPress = (item) => {
  //   showToast(` ${item?.title} - Added to Cart`)
  // }

  const handleDownload = (item, navigation) => {
    navigation.navigate('ProductDetail', { item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleDownload(item, navigation)}>
      <View style={styles.item}>

        <View style={{ flex: 1, flexDirection: 'row', padding: 5 }}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <View style={{ flex: 1, flexDirection: 'column', padding: 5 }}>
            <Text numberOfLines={2} style={styles.description}>{item.description}</Text>
            <Text numberOfLines={1} style={styles.category}>{`Category: ${capitalizeFirstLetter(item.category)}`}</Text>
          </View>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text numberOfLines={1} style={styles.title}>{capitalizeFirstLetter(item.title)}</Text>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

            <Text numberOfLines={1} style={styles.rating}>{item.rating}</Text>
            
          </View>

        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>

        {[...Array(5)].map((_, index) => (
              <FontAwesome
                key={index}
                name={index < item.rating ? "star" : "star-o"} // Renders filled or outline star based on index and rating
                color='orange'
                size={25}
              />
            ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={() => handleItemPress(item)}>
          <Text style={styles.buttonText}>ADD TO CART</Text>
        </TouchableOpacity>

      </View>
    </TouchableOpacity>

  );

  const capitalizeFirstLetter = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
    />
  );
};



const showToast = (message) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: 10,
    backgroundColor: '#f9c2ff',
    padding: 15,
    borderRadius: 10
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginStart: 20,
    width: '95%'
  },
  category: {
    fontSize: 16,
    marginTop: 1,
    marginStart: 20,
    color: 'blue',
    fontWeight: '400',
    width: '75%'
  },
  title: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    width: '75%'
  },
  rating: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    marginStart: 5
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 10
  },
  button: {
    backgroundColor: '#007bff', // Blue color, you can change it to your preferred color
    borderRadius: 5,
    justifyContent: "flex-start",
    padding: 10,
    marginTop: 10
  },
  buttonLoad: {
    backgroundColor: '#007bff', // Blue color, you can change it to your preferred color
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: 'center',
    padding: 10,
    marginTop: 10
  },
  buttonText: {
    color: '#fff', // White color for text
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerText: {
    alignSelf: 'center',
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    alignItems: 'center'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});