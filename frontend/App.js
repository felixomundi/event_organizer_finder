import React, { useEffect } from 'react';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Provider, useDispatch, useSelector } from 'react-redux'
import { store } from './src/redux/store'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import Account from './src/screens/Account';
// import CartScreen from './src/screens/CartScreen';
import Home from './src/screens/Home';
import EventDetail from './src/screens/EventDetail';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import CartScreen from './src/screens/CartScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} screenOptions={{
        headerShown:false
      }} />       
    <Stack.Screen name="EventDetail" component={EventDetail} screenOptions={{
      headerShown:true,
    }} /> 
  </Stack.Navigator>);
}
function getTabVisibility (route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomePage';   
  if (routeName == 'EventDetail') {
    return 'none'
  } 
  return 'flex'    

}
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
function MainTabNavigator() {
  return (
      <Tab.Navigator screenOptions={{
          tabBarShowLabel: true,
          headerShown: false,
          tabBarStyle: {
          backgroundColor: "black",            
          },
          tabBarInactiveTintColor: "#ffff",
          tabBarActiveTintColor:"yellow"
      }}
    >    
      <Tab.Screen name="HomePage" component={HomeStack}
          options={({  route }) => ({    
            
              tabBarIcon:({color, size})=>{
                <Ionicons name='home-outline' color="red" size={size} />                  
              },
              tabBarStyle: {
                display: getTabVisibility(route),
                backgroundColor:"black"
              }
                })}
      />
      <Tab.Screen name="CartScreen" component={CartScreen}      
        options={({route}) => ({
          headerShown:true,
          headerTitle: "Cart Page",        
          tabBarIcon:({size})=>{
          <Feather name='shopping-bag' color="black" size={size} />                
          }
          })}
      />    
      <Tab.Screen name="Account" component={Account}      
        options={() => ({
        headerShown:true,
        headerTitle: "Account Page",        
        tabBarIcon:({color,size})=>{
        <Feather name='shopping-bag' color="black" size={size} />                
        }
        })}
      />
    {/* Add more screens as needed */}
      </Tab.Navigator>
  );
}

function Instance() {
  const { token } = useSelector(state => state.auth);
 
  return (
    <NavigationContainer>
        {token ? (<MainTabNavigator/>) : (<AuthStack/>)}      
    </NavigationContainer>
  )
}
function App() { 
  return (
    <Provider store={store}>
      <Instance />
    </Provider>
  );
}

export default App;

