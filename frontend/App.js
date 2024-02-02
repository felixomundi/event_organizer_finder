import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./src/Navigation/TabNavigator";
import AuthStack from './src/Navigation/AuthStack';
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

