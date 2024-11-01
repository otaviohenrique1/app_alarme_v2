import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Container } from '../components/Container';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackRootStaticParamList } from './routes';
import { IconButton, MD3Colors, List, Switch } from 'react-native-paper';
import { AlarmeDatabase, useAlarmeDatabase } from "../database/useAlarmeDatabase";
import { useEffect, useState } from 'react';
import { ItemLista } from '../components/ItemLista';

type Props = NativeStackScreenProps<NativeStackRootStaticParamList, "HomePage">;

export function HomePage({ navigation }: Props) {
  const [alarmes, setAlarmes] = useState<AlarmeDatabase[]>([]);
  const alarmeDatabase = useAlarmeDatabase();

  async function buscaTodosAlarmes() {
    setAlarmes(await alarmeDatabase.buscarTodos());
  }

  useEffect(() => {
    buscaTodosAlarmes();
  }, [alarmes]);
  

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
      <FlatList
        data={alarmes}
        keyExtractor={alarme => String(alarme.id)}
        renderItem={({ item }) => (
          <ItemLista
            key={item.id}
            nome={item.nome}
            tempo={item.tempo}
            ativo={item.ativo}
          />
        )}
      />
    </Container>
  );
}


