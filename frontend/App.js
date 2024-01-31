import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from "./src/Navigation/TabNavigator";
import AuthStack from './src/Navigation/AuthStack';
export default function App() {
  return (
    <NavigationContainer>
      {/* <TabNavigator/> */}
      <AuthStack/>
  </NavigationContainer>
  );
}

