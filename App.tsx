import React from 'react';
import SpaceImageFull from './src/Screens/SpaceImageFull';
import SpaceInfo from './src/Screens/SpaceInfo';
import SpaceImageInfo from './src/type'
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export type MainStackParamsList = { SpaceInfo: undefined;   SpaceImageFull: {spaceImageInfo: SpaceImageInfo}; }

const Stack = createStackNavigator<MainStackParamsList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SpaceInfo" component={SpaceInfo} options={{headerShown: false }}/>
        <Stack.Screen name="SpaceImageFull" component={SpaceImageFull} options={{
          title: '',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: '#fff',
          
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}