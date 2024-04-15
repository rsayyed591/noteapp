import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite/next';

const NotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initDatabase = async () => {
      const database = SQLite.openDatabase('notes.db');
      setDb(database);
      await database.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS notes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT NOT NULL,
          content TEXT NOT NULL
        );
      `);
      fetchNotes();
    };
    initDatabase();
  }, []);

  const addNote = async () => {
    try {
      if (db) {
        const statement = await db.prepareAsync('INSERT INTO notes (title, content) VALUES (?, ?)');
        await statement.executeAsync([title, content]);
        fetchNotes();
        setTitle('');
        setContent('');
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const fetchNotes = async () => {
    try {
      if (db) {
        const statement = await db.prepareAsync('SELECT * FROM notes');
        const results = await statement.executeAsync([]);
        if (results[0].rows._array) {
          setNotes(results[0].rows._array);
        } else {
          setNotes([]);
        }
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      if (db) {
        const statement = await db.prepareAsync('DELETE FROM notes WHERE id = ?');
        await statement.executeAsync([id]);
        fetchNotes();
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter note title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter note content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Add Note" onPress={addNote} />
      <ScrollView style={styles.notesContainer}>
        {notes.map((note) => (
          <View key={note.id} style={styles.note}>
            <Text style={styles.noteTitle}>{note.title}</Text>
            <Text>{note.content}</Text>
            <Button title="Delete" onPress={() => deleteNote(note.id)} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop:20,
    backgroundColor:'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  notesContainer: {
    marginTop: 20,
  },
  note: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  noteTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default NotesApp;
