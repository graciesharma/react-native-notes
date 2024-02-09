// In components/NoteItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type NoteItemProps = {
  content: string;
  onPress: () => void;
};

const NoteItem: React.FC<NoteItemProps> = ({ content, onPress }) => {
  // Display only the first line or a summary of the content
  const summary = content.split('\n')[0].substring(0, 100) + '...';

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{summary}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 16,
  },
});

export default NoteItem;
