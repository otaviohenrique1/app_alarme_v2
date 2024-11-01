import { Formulario } from './src/pages/Formulario';
import { HomePage } from './src/pages/HomePage';
import { PaperProvider } from 'react-native-paper';
import { SQLiteProvider } from "expo-sqlite";
import { initializeDatabase } from "./src/database/initializeDatabase";
import { AppRoutes } from './src/pages/routes';

export default function App() {
  return (
    <SQLiteProvider databaseName="database.db" onInit={initializeDatabase}>
      <PaperProvider>
        <AppRoutes />
      </PaperProvider>
    </SQLiteProvider>
  );
}

