import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, PureComponent, useCallback } from 'react';
import { View, FlatList, Text, ActivityIndicator, TouchableOpacity, ToastAndroid, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNextPage } from '../redux/downloadSlice';


const PureItem = React.memo(({ item, navigation }) => (
  <View style={styles.itemContainer}>
    <ScrollView horizontal>
      {item.images.map((image, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity onPress={() => handleDownload(image,navigation)} style={styles.downloadButton}>
            <Text style={styles.buttonText}>Download</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  </View>
));

const handleDownload = (image,navigation) => {
  navigation.navigate('Detail', { image });
};

export const Download = ({ navigation }) => {
  const dispatch = useDispatch();
  const { products, loading, error, page, hasMore } = useSelector((state) => state.download);

  useEffect(() => {
    dispatch(fetchNextPage());
  }, [dispatch]);


  const handleLoadMore = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(fetchNextPage());
    }
  });

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else if (!hasMore) {
      return <Text style={styles.footerText}>No more data</Text>;
    } else {
      return (
        <TouchableOpacity style={styles.button} onPress={handleLoadMore}>
          <Text style={styles.buttonText}> Load More</Text>
        </TouchableOpacity>
      )
    }
  };

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <PureItem item={item} navigation={navigation} />}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
  );
};


const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
  downloadButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  footerText: {
    alignSelf: 'center',
    fontSize: 15,
    padding: 15,
  },
  button: {
    backgroundColor: '#007bff', // Blue color, you can change it to your preferred color
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff', // White color for text
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',


  },
});
