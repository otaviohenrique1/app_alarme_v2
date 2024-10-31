import { Formulario } from './src/pages/Formulario';
import { HomePage } from './src/pages/HomePage';
import { PaperProvider } from 'react-native-paper';
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "./src/database/initializeDatabase";

export default function App() {
  return (
    <SQLiteProvider databaseName="database.db" onInit={initializeDatabase}>
      <PaperProvider>
        <Formulario />
      </PaperProvider>
    </SQLiteProvider>
  );
}

