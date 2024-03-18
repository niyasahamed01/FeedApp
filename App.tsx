import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VectorImageFlatList } from './src/screens/VectorImageFlatList'
import { SocialMediaFeed } from './src/screens/SocialMediaFeed'
import { EmptyPage } from './src/screens/EmptyPage'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'

const Stack = createNativeStackNavigator();


const App = () => {

  return (

    <Provider store={store}>

      <NavigationContainer>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="List" component={VectorImageFlatList} />
          <Stack.Screen name="SocialMediaFeed" component={SocialMediaFeed} />
          <Stack.Screen name="EmptyPage" component={EmptyPage} />
        </Stack.Navigator>
      </NavigationContainer>

    </Provider>

  );
};


export default App;