import React from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Provider,  useSelector } from 'react-redux'
import { store } from './src/redux/store'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import Account from './src/screens/Account';
import Home from './src/screens/Home';
import EventDetail from './src/screens/EventDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import CartScreen from './src/screens/CartScreen';
import Orders from './src/screens/Orders';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PaymentScreen from './src/screens/PaymentScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeScreen(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />       
      <Stack.Screen name="EventDetail" component={EventDetail} options={({route})=>({
      headerShown: true,
        headerTitle: route?.params?.event?.event_name ? route?.params?.event?.event_name : 'EventDetail'
      }
      )} /> 
    </Stack.Navigator>
  );
}

function OrdersScreen() {
  return ( 

    <Stack.Navigator>
     <Stack.Screen name="Orders" component={Orders} options={{ headerShown: true, headerTitle:"My Orders" }} />       
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={({route})=>({
        headerShown: true,
        headerTitle:'Complete Order Payment'
       
      }
      )} /></Stack.Navigator>
  
  );
}


function getTabVisibility (route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomePage';   
  return routeName === 'EventDetail' ? 'none' : 'flex';    
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBarShowLabel={true}
      tabBarStyle={{ backgroundColor: 'black' }}
      tabBarInactiveTintColor="#ffff"
      tabBarActiveTintColor="yellow"
    >    
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ route }) => ({
          headerShown:false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home-outline' color={color} size={size} />
          ),
          tabBarStyle: {
            display: getTabVisibility(route),
            backgroundColor: "black"
          }
        })}
      />
      <Tab.Screen
      name="CartScreen"
      component={CartScreen}      
      options={({ route }) => ({
        headerShown: false,    
        tabBarIcon: ({ color, size }) => (
          <Feather name='shopping-bag' color={color} size={size} />
        ),
        tabBarStyle: {
          display: getTabVisibility(route),
          backgroundColor: "black"
        },
      })}
    />
 
      <Tab.Screen
        name="OrdersScreen"
        component={OrdersScreen}      
        options={({route})=>({
          headerShown: false,       
          tabBarIcon: ({ color, size }) => (
            <Icon name="local-shipping" size={size} color={color} />
          ),
          tabBarStyle: {
            display: getTabVisibility(route),
            backgroundColor: "black"
          }
        })}
      />

        <Tab.Screen
            name="Account"
            component={Account}      
            options={({route})=>({
            headerShown: true,
            headerTitle: "Account Page",        
            tabBarIcon: ({ color, size }) => (
              <Feather name='user' color={color} size={size} />
            ),
            tabBarStyle: {
              display: getTabVisibility(route),
              backgroundColor: "black"
            }
          })}
      />
    </Tab.Navigator>
  );
}

function Instance() {
  const { token } = useSelector(state => state.auth);
 
  return (
    <NavigationContainer>
      {token ? <MainTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}

function App() { 
  return (
    <Provider store={store}>
      <Instance />
    </Provider>
  );
}

export default App;
