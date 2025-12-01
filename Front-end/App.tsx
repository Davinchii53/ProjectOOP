import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './app/screens/SplashScreen';
import UploadScreen from './app/screens/UploadScreen';
import PreferencesScreen from './app/screens/PrefrencesScreen';
import DetectedScreen from './app/screens/DetectedScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
          options={{ animationEnabled: false }}
        />
        <Stack.Screen 
          name="Upload" 
          component={UploadScreen}
        />
        <Stack.Screen 
          name="Preferences" 
          component={PreferencesScreen}
        />
        <Stack.Screen 
          name="Detected" 
          component={DetectedScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
