import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from '../redux/fetchApiData';

const Notification = () => {

    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.api);

    useEffect(() => {
        dispatch(fetchApiData());
    }, [dispatch]);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.textContainer}>
            <Text style={styles.title}>{`Name: ${item.title}`}</Text>
                <Text style={styles.title}>{`Brand: ${item.brand}`}</Text>
                {/* <Text style={styles.title}>{`Price: Rs.${item.price}`}</Text> */}
                <Text style={styles.title}>{`Discount Percentage: ${item.discountPercentage} %`}</Text>
            </View>
        </View>
    );

    return (
        <FlatList
            data={data.products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
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
    image: {
        width: 75,
        height: 75,
        marginRight: 10,
        alignSelf:'center',
        borderRadius:50
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'black'
    },
    description: {
        fontSize: 16,
    
    },
});

export default Notification;