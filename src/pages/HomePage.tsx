import { StyleSheet, Text, View } from 'react-native';
import { Container } from '../components/Container';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackRootStaticParamList } from './routes';
import { IconButton, MD3Colors } from 'react-native-paper';

type Props = NativeStackScreenProps<NativeStackRootStaticParamList, "HomePage">;

export function HomePage({ navigation }: Props) {
  return (
    <Container>
      <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
        <IconButton
          icon="plus"
          iconColor={MD3Colors.tertiary0}
          size={30}
          onPress={() => navigation.navigate("Formulario")}
        />
      </View>
      <Text>Open up App.tsx to start working on your app!</Text>
    </Container>
  );
}


