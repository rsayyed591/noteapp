# Simple Note-Taking App with React Native and SQLite

This is a straightforward note-taking application built using React Native and SQLite. It allows users to create, read, update, and delete notes, with data persistence achieved through SQLite database storage.

## Features

- **Database Initialization**: Upon initialization, the app sets up an SQLite database named 'notes.db' and creates a 'notes' table to store note entries, including fields for id, title, and content.
- **State Management**: The component manages state using the useState hook, storing notes in the 'notes' state array and handling input values for note titles and content.
- **CRUD Operations**: Users can perform basic CRUD operations on notes:
  - *Create*: Add a new note by entering a title and content and tapping the "Add Note" button.
  - *Read*: View all existing notes displayed within a ScrollView, showing titles, content, and an option to delete each note.
  - *Update*: Notes can be updated by first deleting the existing note and then adding a new one with modified content.
  - *Delete*: Remove a note by tapping the "Delete" button associated with each note entry.
- **Database Handling**: The app utilizes the expo-sqlite package for database operations:
  - Adding a note involves inserting a new record into the 'notes' table.
  - Fetching notes entails executing a SELECT query to retrieve all entries from the database.
  - Deleting a note is achieved by executing a DELETE query based on the note's id.
- **Styling**: Basic styling using StyleSheet.create defines the appearance of input fields, notes, and their respective containers.

## Installation

To run the app locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/rsayyed591/noteapp.git
   ```
2. Navigate to the project directory:
   ```
   cd noteapp
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the application:
   ```
   npm start
   ```
5. Ensure you have an Expo development environment set up to run the application on your preferred platform.

## Technologies Used

- React Native
- SQLite
- expo-sqlite

## Acknowledgements

Special thanks to the developers of React Native, SQLite, and expo-sqlite for providing the tools necessary to build this application.
