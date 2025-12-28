import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList, locationsData } from '../App';
import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

const SettingsScreen = ({ route, navigation }: Props) => {
  const locationsListOptions: { id: string, code: string }[] = Object.keys(locationsData).map((key: string) => {
    return { id: `${locationsData[key].name} ${locationsData[key].state}`, code: key };
  });

  let [location, setLocation] = useState('');

  useEffect(() => {
      AsyncStorage.getItem('location').then((value) => {
          if (value) {
              setLocation(value);
          }
      });
  });

  const saveLocation = async (locationCode : string) => {
    setLocation(locationCode);
    await AsyncStorage.setItem('location', locationCode);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Main', params: { location: locationCode } }],
      })
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'blue', alignItems: 'center', paddingTop: 10 }}>
      <FlatList
        data={locationsListOptions}
        scrollEnabled={true}
        contentContainerStyle={{backgroundColor: 'blue', alignItems: "flex-start"}}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => saveLocation(item.code)}>
              <Text style={styles.label}>{item.id}</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.code}
        />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {backgroundColor: 'blue', flex: 1, flexGrow: 1, justifyContent: 'center', alignItems: 'center'},
  label: {fontFamily: 'SpaceMono-Regular', fontSize: 24, color: 'white', paddingStart: 10}
});

export default SettingsScreen;
