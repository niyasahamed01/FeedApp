import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeList } from './src/screens/Home'
import { SocialMediaFeed } from './src/screens/SocialMediaFeed'
import { EmptyPage } from './src/screens/EmptyPage'
import { Input } from './src/screens/Input'
import { Store } from './src/screens/StoreComponent'
import { Download } from './src/screens/index'
import { ProfileComponent } from './src/screens/Profile'
import { DetailScreen } from './src/screens/DetailScreen'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Notification from './src/screens/Notifications';
import Detail from './src/screens/DownloadScreen';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Profile" component={ProfileComponent} />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
    </Stack.Navigator>
  );
};

const DownloadStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Download" component={Download} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};


const App = () => {

  return (
    <Provider store={store}>

      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: '#000',
            tabBarStyle: { height: 65 },
          }}>

          <Tab.Screen name="Home"
            component={HomeList}
            options={{
              tabBarLabel: 'Home',
              tabBarLabelStyle: { fontSize: 15 },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={30} />
              ),
            }} />

          <Tab.Screen name="Store" component={Store}
            options={{
              tabBarLabel: 'Store',
              tabBarLabelStyle: { fontSize: 15 },

              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="store" color={color} size={30} />
              ),
            }}
          />
          <Tab.Screen name="Notifications" component={Notification}
            options={{
              tabBarLabel: 'Notifications',
              tabBarLabelStyle: { fontSize: 15 },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="bell" color={color} size={30} />
              ),
              // tabBarBadge: 3,
            }}
          />
          <Tab.Screen name="Download Image" component={DownloadStack}
            options={{
              tabBarLabel: 'Download',
              tabBarLabelStyle: { fontSize: 15 }, headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="arrow-down-bold-box" color={color} size={30} />
              ),
            }}
          />

          <Tab.Screen name="Profile Screen" component={SettingStack}
            options={{
              tabBarLabel: 'Profile',
              tabBarLabelStyle: { fontSize: 15 }, headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-circle" color={color} size={30} />
              ),
            }}

          />

        </Tab.Navigator>

      </NavigationContainer>

    </Provider>

  );
};


export default App;