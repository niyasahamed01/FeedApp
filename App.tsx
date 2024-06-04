
import React, { useEffect, useState, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeList } from './src/screens/Home';
import { SocialMediaFeed } from './src/screens/SocialMediaFeed';
import { EmptyPage } from './src/screens/EmptyPage';
import { Input } from './src/screens/Input';
import { StoreComponent } from './src/screens/StoreComponent';
import { Search } from './src/screens/Search';
import { ProfileComponent } from './src/screens/Profile';
import { DetailScreen } from './src/screens/DetailScreen';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Notification from './src/screens/Notifications';
import Detail from './src/screens/DownloadScreen';
import { Image, Text } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/AuthScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import { ProfileProvider } from './src/screens/ProfileProvider';
import { ProfileContext } from './src/screens/ProfileProvider';
import ProfileIcon from './src/screens/ProfileIcon';
import { ListScreen } from './src/screens/ListScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductDetail from './src/screens/ProductDetail';
import { CartListComponent } from './src/screens/CartListComponent';
import { createTable } from './src/screens/cartdb'; // Import the database helper function

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const [isSplashComplete, setIsSplashComplete] = useState<boolean | null>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    createTable(); // Ensure the table is created when the application starts
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const authStatus = await AsyncStorage.getItem('isAuthenticated');
      setIsAuthenticated(authStatus === 'true');
    };

    if (isSplashComplete) {
      checkAuthStatus();
    }
  }, [isSplashComplete]);

  const handleLogout = async (navigation: any) => {
    try {
      await AsyncStorage.clear();
      setIsAuthenticated(false);
      navigation.navigate('Auth');
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const MainNavigation = () => (
    <ProfileProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </ProfileProvider>
  );

  const RootNavigator = () => (
    <Stack.Navigator>
      {!isSplashComplete ? (
        <Stack.Screen
          name="Splash"
          options={{ headerShown: false }}
          component={(props:any) => <SplashScreen {...props} setIsSplashComplete={setIsSplashComplete} />}
        />
      ) : !isAuthenticated ? (
        <Stack.Screen
          name="Auth"
          options={{ headerShown: false }}
          component={AuthStack}
        />
      ) : (
        <Stack.Screen
          name="Main"
          options={{ headerShown: false }}
          component={TabNavigator}
        />
      )}
    </Stack.Navigator>
  );

  const AuthStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={(props: any) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );

  const TabNavigator = () => (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#000',
        tabBarStyle: { height: 65 },
      }}
    >
      <Tab.Screen
        name="HomeComponent"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="StoreComponent"
        component={StoreStack}
        options={{
          tabBarLabel: 'Store',
          headerShown: false,
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="store" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search Product"
        component={SearchStack}
        options={{
          tabBarLabel: 'Search',
          tabBarLabelStyle: { fontSize: 15 },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={color} size={size} />
          ),
        }}
      />
     
      <Tab.Screen
        name="Notifications"
        component={Notification}
        options={{
          tabBarLabel: 'Notifications',
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />

       <Tab.Screen
        name="Cart"
        component={CartListComponent}
        options={{
          tabBarLabel: 'Cart',
          tabBarLabelStyle: { fontSize: 15 },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile Screen"
        component={SettingStack}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <TabBarLabel focused={focused} color={color} />
          ),
          tabBarLabelStyle: { fontSize: 15 },
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );

  const TabBarLabel: React.FC<{ focused: boolean; color: string }> = ({ focused, color }) => {
    const { profileData } = useContext<any>(ProfileContext); // Access profileData from the context

    return <Text style={{ color }}>{profileData.name ? profileData.name : 'Profile'}</Text>;
  };

  
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeList} />
    <Stack.Screen name="ProductDetail" component={ProductDetail} />
  </Stack.Navigator>
);

const StoreStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Store" component={StoreComponent} />
    <Stack.Screen name="ProductDetail" component={ProductDetail} />
  </Stack.Navigator>
);

  const SettingStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={(props:any) => <ProfileComponent {...props} handleLogout={handleLogout} />}
      />
      <Stack.Screen name="DetailScreen" component={DetailScreen} />
      <Stack.Screen name="ListScreen" component={ListScreen} />
    </Stack.Navigator>
  );

  const SearchStack = () => (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );

  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
};

export default App;


