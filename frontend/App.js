import { Home, Profile, About } from "./src/screens";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from "react-redux";
import { store } from "./src/redux/app/store";

export default function App() {
  const Tab = createBottomTabNavigator();  
  return (   
    <Provider store={store}>
   <NavigationContainer>      
       <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
   </NavigationContainer>
    </Provider>

  );
}

