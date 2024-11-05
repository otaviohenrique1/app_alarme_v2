import { List, Switch } from 'react-native-paper';
import { AlarmeDatabase, useAlarmeDatabase } from "../database/useAlarmeDatabase";
import { useEffect, useState } from 'react';

interface ItemListaProps  {
  data: AlarmeDatabase
}

export function ItemLista(props: ItemListaProps) {
  const { id, tempo, nome, ativo } = props.data;
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const alarmeDatabase = useAlarmeDatabase();

  const onToggleSwitch = async () => {
    setIsSwitchOn(!isSwitchOn)
    await alarmeDatabase.atualizarAtivo(id, !isSwitchOn);
  };

  useEffect(() => {
    setIsSwitchOn(ativo as boolean);
  }, []);


  return (
    <List.Item
      title={tempo}
      description={nome}
      right={props => (
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      )}
      style={{ marginBottom: 10, borderColor: "black", borderWidth: 1, borderRadius: 10 }}
    />
  );
}


