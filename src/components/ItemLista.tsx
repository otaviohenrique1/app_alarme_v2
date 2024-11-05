import { View } from "react-native";
import { IconButton, List, MD3Colors, Switch, Modal, Portal, Text, Button } from 'react-native-paper';
import { AlarmeDatabase, useAlarmeDatabase } from "../database/useAlarmeDatabase";
import { useEffect, useState } from 'react';

interface ItemListaProps {
  data: AlarmeDatabase;
  navigation: any;
}

export function ItemLista(props: ItemListaProps) {
  const { data, navigation } = props;
  const { id, tempo, nome, ativo } = data;
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [visible, setVisible] = useState(false);
  const alarmeDatabase = useAlarmeDatabase();
  
  const showModal = () => setVisible(true);
  
  const hideModal = () => setVisible(false);

  const onToggleSwitch = async () => {
    setIsSwitchOn(!isSwitchOn)
    await alarmeDatabase.atualizarAtivo(id, !isSwitchOn);
  };

  useEffect(() => {
    setIsSwitchOn(ativo as boolean);
  }, []);

  async function remover(id: number) {
    try {
      await alarmeDatabase.remover(id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <List.Item
      title={tempo}
      description={nome}
      right={props => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
          <IconButton
            icon="delete"
            iconColor={MD3Colors.tertiary0}
            size={30}
            onPress={showModal}
            // 
          />
          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
              <Text variant="titleLarge">Deseja remover o alarme?</Text>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end", marginTop: 10}}>
                <Button mode="contained" style={{ marginEnd: 10 }} onPress={() => remover(id)}>Sim</Button>
                <Button mode="outlined" onPress={hideModal}>Não</Button>
              </View>
            </Modal>
          </Portal>
        </View>
      )}
      style={{ marginBottom: 10, borderColor: "black", borderWidth: 1, borderRadius: 10 }}
      onPress={() => {
        navigation.navigate("FormularioEdicao", { id: id })
      }}
    />
  );
}


