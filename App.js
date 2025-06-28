import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import AnalysisScreen from './src/screens/AnalysisScreen';
import ResultsScreen from './src/screens/ResultsScreen';
import CameraScreen from './src/screens/CameraScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Onboarding"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#fff',
            },
          }}
        >
          <Stack.Screen 
            name="Onboarding" 
            component={OnboardingScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'CHOPPED' }}
          />
          <Stack.Screen 
            name="Camera" 
            component={CameraScreen} 
            options={{ 
              title: 'Take Photo',
              headerShown: true,
              presentation: 'modal'
            }}
          />
          <Stack.Screen 
            name="Analysis" 
            component={AnalysisScreen} 
            options={{ title: 'Analyzing Faces' }}
          />
          <Stack.Screen 
            name="Results" 
            component={ResultsScreen} 
            options={{ title: 'Analysis Results' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App; 