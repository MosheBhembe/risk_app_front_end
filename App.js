import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './Navigator/StackNav'
import { ImageProvider } from './context/Context.js'


function App() {
  return (
    <ImageProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </ImageProvider>
  );
}

export default App;