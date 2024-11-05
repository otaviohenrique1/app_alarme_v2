import { View } from "react-native";
import { IconButton, List, MD3Colors, Switch, Modal, Portal, Text } from 'react-native-paper';
import { AlarmeDatabase, useAlarmeDatabase } from "../database/useAlarmeDatabase";
import { useEffect, useState } from 'react';

interface ItemListaProps {
  data: AlarmeDatabase
}

export function ItemLista(props: ItemListaProps) {
  const { id, tempo, nome, ativo } = props.data;
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
            // onPress={() => remover(id)}
          />
          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
              <Text>Example Modal.  Click outside this area to dismiss.</Text>
            </Modal>
          </Portal>
        </View>
      )}
      style={{ marginBottom: 10, borderColor: "black", borderWidth: 1, borderRadius: 10 }}
    />
  );
}


