import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage } from './HomePage';
import { Formulario } from './Formulario';
import { FormularioEdicao } from './FormularioEdicao';

export type NativeStackRootStaticParamList = {
  HomePage: undefined;
  Formulario: undefined;
  FormularioEdicao: {
    id: string;
  };
}

const Stack = createNativeStackNavigator<NativeStackRootStaticParamList>();

export function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomePage" screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Formulario" component={Formulario} />
        <Stack.Screen name="FormularioEdicao" component={FormularioEdicao} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
