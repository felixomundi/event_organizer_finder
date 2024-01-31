import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './../screens/Home'
import About from './../screens/About';
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./../screens/Auth/Login"
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
function TabNavigator() {
  const Tab = createBottomTabNavigator();  
  const Stack = createNativeStackNavigator();
 
  const HomeStack = () => {
    return (
      <Stack.Navigator>
      <Stack.Screen name="Home2" component={Home} />
      <Stack.Screen name="Login" component={Login} screenOptions={{
        headerShown:true,
      }} /> 
    </Stack.Navigator>);
  }

  const getTabVisibility = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home1';   
    if (routeName == 'Login') {
      return 'none'
    } 
    return 'flex'    

  }
  return (
    <Tab.Navigator screenOptions={{
        tabBarShowLabel: true,
          headerShown: false,
          tabBarStyle: {
              backgroundColor: "black",            
          },
          tabBarInactiveTintColor: "#ffff",
          tabBarActiveTintColor:"yellow"
      }}>    
        <Tab.Screen name="Home1" component={HomeStack}
           options={({ navigation, route }) => ({           
            tabBarIcon:({color, size})=>{
               <Ionicons name='home-outline' color="red" size={size} />                  
             },
             tabBarStyle: {
               display: getTabVisibility(route),
               backgroundColor:"black"
             }
              })}
          />
          <Tab.Screen name="About" component={About}      
            options={({ navigation }) => ({
            headerTitle: "About",        
            tabBarIcon:({color,size})=>{
            <Feather name='shopping-bag' color="black" size={size} />                
            }
            })}
          />
      {/* Add more screens as needed */}
    </Tab.Navigator>
  )
}

export default TabNavigator