import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Navigator/StackNav'


function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default App;