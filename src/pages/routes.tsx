import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomePage } from './HomePage';
import { Formulario } from './Formulario';

export type NativeStackRootStaticParamList = {
  HomePage: undefined;
  Formulario: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
