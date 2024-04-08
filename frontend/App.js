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
import OD from "./src/screens/OD"
import Icon from 'react-native-vector-icons/MaterialIcons';
import PaymentScreen from './src/screens/PaymentScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack(){
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
function PaymentStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: 'Enter Payment Details'
        })}
      />
    </Stack.Navigator>
  );
}


function OrdersStack() {
  return ( 

    <Stack.Navigator>
     <Stack.Screen name="Orders" component={Orders} options={{ headerShown: false }} />       
      <Stack.Screen name="OD" component={OD} options={({route})=>({
        headerShown: true,
        // headerTitle: route?.params?.event?.event_name ? route?.params?.event?.event_name : 'EventDetail'
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
        name="HomePage"
        component={HomeStack}
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
      name="CartPage"
      component={PaymentStack}      
      options={({ route }) => ({
        headerShown: false,
        // headerTitle: "Cart Page",        
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
        name="OrdersPage"
        component={Orders}      
        options={({route})=>({
          headerShown: true,
          headerTitle: "Orders Page",        
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
