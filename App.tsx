import { Formulario } from './src/pages/Formulario';
import { HomePage } from './src/pages/HomePage';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <Formulario />
    </PaperProvider>
  );
}

