import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./src/navigation/TabNavigator";
import AuthStack from './src/navigation/AuthStack';
import { Provider } from 'react-redux'
import { store } from './src/redux/store'

export default function App() {
 
  return (
    <Provider store={store}>
       <NavigationContainer>
      <TabNavigator/>
      {/* <AuthStack/> */}
      </NavigationContainer>
   </Provider>
  );
}

