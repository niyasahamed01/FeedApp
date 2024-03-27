import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { VectorImageFlatList } from './src/screens/VectorImageFlatList'
import { SocialMediaFeed } from './src/screens/SocialMediaFeed'
import { EmptyPage } from './src/screens/EmptyPage'
import { Input } from './src/screens/Input'
import { Profile } from './src/screens/Profile'
import { Updates } from './src/screens/index'
import { SettingsComponent } from './src/screens/Settings'
import { NextScreen } from './src/screens/NextScreen'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const SettingStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Settings" component={SettingsComponent} />
      <Stack.Screen name="NextScreen" component={NextScreen} />
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
            component={VectorImageFlatList}
            options={{
              tabBarLabel: 'Home',
              tabBarLabelStyle: { fontSize: 15 },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={30} />
              ),
            }} />
          <Tab.Screen name="Notifications" component={Updates}
            options={{
              tabBarLabel: 'Updates',
              tabBarLabelStyle: { fontSize: 15 },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="bell" color={color} size={30} />
              ),
              tabBarBadge: 3,
            }}
          />
          <Tab.Screen name="Profile" component={Profile}
            options={{
              tabBarLabel: 'Profile',
              tabBarLabelStyle: { fontSize: 15 },

              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={30} />
              ),
            }}
          />
          <Tab.Screen name="Calender" component={Updates}
            options={{
              tabBarLabel: 'Calender',
              tabBarLabelStyle: { fontSize: 15 },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="calendar-minus" color={color} size={30} />
              ),
            }}
          />

          <Tab.Screen name="Settings" component={SettingStack}
            options={{
              tabBarLabel: 'Settings',
                            tabBarLabelStyle: { fontSize: 15 },headerShown: false,
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="cog-outline" color={color} size={30} />
              ),
            }}

          />

        </Tab.Navigator>

      </NavigationContainer>

    </Provider>

  );
};


export default App;