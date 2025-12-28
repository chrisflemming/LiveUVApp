import React, { useEffect, useLayoutEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import SettingsScreen from './screens/SettingsScreen';
import Svg, {Path} from 'react-native-svg';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AboutScreen from './screens/AboutScreen';

export type RootStackParamList = {
  Main: { location: string },
  Settings: undefined,
  About: undefined
};

interface Location {
  name: string;
  state: string;
}

interface LocationsData {
  [key: string]: Location;
}

export const locationsData: LocationsData = {
  adl: { name: 'Adelaide', state: 'SA' },
  ali: { name: 'Alice Springs', state: 'NT' },
  bri: { name: 'Brisbane', state: 'QLD' },
  can: { name: 'Canberra', state: 'ACT' },
  cas: { name: 'Casey', state: 'AAT' },
  dar: { name: 'Darwin', state: 'NT' },
  dav: { name: 'Davis', state: 'AAT' },
  emd: { name: 'Emerald', state: 'QLD' },
  gco: { name: 'Gold Coast', state: 'QLD' },
  kin: { name: 'Hobart', state: 'TAS' },
  mcq: { name: 'Macquarie Is', state: 'TAS' },
  maw: { name: 'Mawson', state: 'AAT' },
  mel: { name: 'Melbourne', state: 'VIC' },
  new: { name: 'Newcastle', state: 'NSW' },
  per: { name: 'Perth', state: 'WA' },
  syd: { name: 'Sydney', state: 'NSW' },
  tow: { name: 'Townsville', state: 'QLD' }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
const hamburgerIcon = <Svg height="24" width="24" viewBox="0 0 448 512"><Path opacity="1" fill="#FFFFFF" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></Svg>

// Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.
const infoIcon = <Svg height="24" width="24" viewBox="0 0 512 512"><Path opacity="1" fill="#FFFFFF" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></Svg>

const NO_LOCATION_SET = "__NO_LOCATION_SET__";

const App = () => {
  let [location, setLocation] = useState('');

  useEffect(() => {
      AsyncStorage.getItem('location').then((value) => {
          if (value) {
              setLocation(value);
          } else {
              setLocation(NO_LOCATION_SET);
          }
      });
  });

  if (!location) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={location === NO_LOCATION_SET ? "Settings" : "Main"}> 
        <Stack.Screen name="Main" component={MainScreen} initialParams={{ location: location }} options={({ route, navigation }) => ({
            headerShadowVisible: false, 
            headerTransparent: false,
            headerTitleStyle: {fontFamily: 'SpaceMono-Regular', fontSize: 32, color: 'white'},
            headerTitleAllowFontScaling: true,
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
                {hamburgerIcon}
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('About')}>
                {infoIcon}
              </TouchableOpacity>
            )}
          )}
          />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{title: 'Select Location', headerTintColor: 'white', headerTransparent: false, headerShadowVisible: false, headerBackButtonDisplayMode: 'minimal', headerTitleStyle: {fontFamily: 'SpaceMono-Regular', fontSize: 28, color: 'white'}, headerStyle: {backgroundColor: 'blue'}}} />
        <Stack.Screen name="About" component={AboutScreen} options={{title: 'About',  headerTintColor: 'white', headerTransparent: false, headerShadowVisible: false, headerBackButtonDisplayMode: 'minimal', headerTitleStyle: {fontFamily: 'SpaceMono-Regular', fontSize: 32, color: 'white'}, headerStyle: {backgroundColor: 'blue'}}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({ 
  settingsButton: { paddingBottom: Platform.OS === 'ios' ? 10 : 0, paddingTop: Platform.OS === 'android' ? 3 : 0}
});

export default App;
