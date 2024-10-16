import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddSongScreen from './screens/AddSongScreen';
import SongListScreen from './screens/SongListScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const ProgramGenerator = () => {
  //console.log("App executed");

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddSong" component={AddSongScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SongList" component={SongListScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ProgramGenerator;