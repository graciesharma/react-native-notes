import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator'; // Import your navigator's type list

type NoteScreenRouteProp = RouteProp<RootStackParamList, 'Note'>;

const NoteScreen: React.FC = () => {
  const [text, setText] = useState('');
  const navigation = useNavigation();
  const route = useRoute<NoteScreenRouteProp>();
  const noteId = route.params?.noteId; // Extract noteId from route params

  // Load the note content when the component mounts or the noteId changes
  useEffect(() => {
    const loadNoteContent = async () => {
      if (noteId) { // Check if noteId is not null
        const noteContent = await AsyncStorage.getItem(noteId);
        if (noteContent !== null) {
          setText(noteContent); // Set the loaded content into the TextInput
        }
      }
    };

    loadNoteContent();
  }, [noteId]); // Depend on noteId to reload content if it changes

  const saveNote = async () => {
    // Your save logic here
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={setText}
        value={text}
        placeholder="Write your note here..."
        multiline
      />
      <Button title="Save Note" onPress={saveNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
});

export default NoteScreen;
