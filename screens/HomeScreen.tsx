// Update your HomeScreen component
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import NoteItem from './NoteItem';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [notes, setNotes] = useState<{ id: string; content: string }[]>([]);

  const loadNotes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      const loadedNotes = result.map(([key, value]) => ({ id: key, content: value ?? '' }));
      setNotes(loadedNotes);
    } catch (error) {
      Alert.alert('Error', 'Failed to load notes.');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadNotes);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NoteItem
            content={item.content}
            onPress={() => navigation.navigate('Note', { noteId: item.id })}
          />
        )}
      />
      <Button
        title="Add Note"
        onPress={() => navigation.navigate('Note', { noteId: null })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default HomeScreen;
