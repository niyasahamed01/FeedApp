import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeList } from './src/screens/Home'
import { SocialMediaFeed } from './src/screens/SocialMediaFeed'
import { EmptyPage } from './src/screens/EmptyPage'
import { Input } from './src/screens/Input'
import { StoreComponent } from './src/screens/StoreComponent'
import { Search } from './src/screens/Search'
import { ProfileComponent } from './src/screens/Profile'
import { DetailScreen } from './src/screens/DetailScreen'
import { Provider } from 'react-redux'
import { store } from './src/redux/store'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Notification from './src/screens/Notifications';
import Detail from './src/screens/DownloadScreen';
import { Image, Text } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import AuthScreen from './src/screens/AuthScreen';
import { ProfileProvider } from './src/screens/ProfileProvider';
import { ProfileContext } from './src/screens/ProfileProvider';
import ProfileIcon from './src/screens/ProfileIcon';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();


const App: React.FC = () => {

  const [isSplashComplete, setIsSplashComplete] = useState<boolean | null>(false);


  useEffect(() => {
    if (isSplashComplete) {
    }
  }, [isSplashComplete]);


  const MainNavigation = () => {

    return (
      <ProfileProvider>

        <NavigationContainer>
          {!isSplashComplete ? (
            <SplashScreen setIsSplashComplete={setIsSplashComplete} />
          ) : (
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
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                  ),
                }} />

              <Tab.Screen name="Store" component={StoreComponent}
                options={{
                  tabBarLabel: 'Store',
                  tabBarLabelStyle: { fontSize: 15 },

                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="store" color={color} size={size} />
                  ),
                }}
              />

              <Tab.Screen name="Search Product" component={SearchStack}
                options={{
                  tabBarLabel: 'Search',
                  tabBarLabelStyle: { fontSize: 15 }, headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="search" color={color} size={size} />
                  ),
                }}
              />

              <Tab.Screen name="Notifications" component={Notification}
                options={{
                  tabBarLabel: 'Notifications',
                  tabBarLabelStyle: { fontSize: 15 },
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="bell" color={color} size={size} />
                  ),
                  // tabBarBadge: 3,
                }}
              />

              <Tab.Screen name="Profile Screen" component={SettingStack}
                options={{
                  tabBarLabel: ({ focused, color }) => (
                    <TabBarLabel focused={focused} color={color} /> // Render a separate component for tabBarLabel
                  ),
                  tabBarLabelStyle: { fontSize: 15 }, headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <ProfileIcon color={color} size={size} />
                  ),
                }}

              />

            </Tab.Navigator>)}

        </NavigationContainer>
      </ProfileProvider>

    );
  };
  const TabBarLabel: React.FC<{ focused: boolean; color: string }> = ({ focused, color }) => {
    const { profileData } = useContext<any>(ProfileContext); // Access profileData from the context

    return (
      <Text style={{ color }}>
        {profileData.name ? profileData.name : 'Profile'}
      </Text>
    );
  }


  const SettingStack = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen name="Profile" component={ProfileComponent} />
        <Stack.Screen name="DetailScreen" component={DetailScreen} />
      </Stack.Navigator>
    );
  };

  const SearchStack = () => {
    return (
      <Stack.Navigator >
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    );
  };


  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};



export default App;






