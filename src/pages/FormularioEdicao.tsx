import { StyleSheet, View, TextInput as TextInput2 } from 'react-native';
import { Container } from '../components/Container';
import { TimePicker } from '../components/TimePicker';
import { useEffect, useState } from 'react';
import { format } from "date-fns";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Switch, Text, Button, TextInput  } from 'react-native-paper';
import { IconButton, MD3Colors } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NativeStackRootStaticParamList } from './routes';
import { AlarmeDatabase, useAlarmeDatabase } from "../database/useAlarmeDatabase";

interface FormTypes {
  nome: string;
}

const SchemaValidacao = Yup.object().shape({
  nome: Yup.string().required('Campo vazio'),
});

type Props = NativeStackScreenProps<NativeStackRootStaticParamList, "FormularioEdicao">;

const alarmeDadosIniciais: AlarmeDatabase = {
  id: 0,
  tempo: '',
  nome: '',
  ativo: false
} ;

const valoresIniciais: FormTypes = {
  nome: ""
};

export function FormularioEdicao({ navigation, route }: Props) {
  const [alarmeTempo, setAlarmeTempo] = useState<Date | undefined>(undefined);
  const [ativo, setAtivo] = useState<boolean>(false);
  const [data, setData] = useState<AlarmeDatabase>(alarmeDadosIniciais);
  const [nome, setNome] = useState<string>("");
  const [initialValues, setInitialValues] = useState<FormTypes>(valoresIniciais);
  const alarmeDatabase = useAlarmeDatabase();
  
  const tempo = format(alarmeTempo ? alarmeTempo : new Date(), "HH:mm");
  
  const toggleSwitch = () => setAtivo(estadoAnterior => !estadoAnterior);

  const { id } = route.params;

  async function busca(id: number) {
    const alarme = await alarmeDatabase.buscarUm(id);
    setData(alarme ? alarme : alarmeDadosIniciais);
    console.log(alarme);
  }
  
  useEffect(() => {
    busca(Number(id));
    setAtivo(data.ativo as boolean);
    setNome(data.nome);
    setInitialValues({ nome: data.nome })
    // data.tempo;
  }, [nome]);

  return (
    <Container>
      <IconButton
        icon="arrow-left"
        iconColor={MD3Colors.tertiary0}
        size={30}
        onPress={() => navigation.goBack()}
      />
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          try {
            await alarmeDatabase.atualizar({
              id: Number(id),
              tempo: tempo,
              nome: values.nome,
              ativo: ativo
            });
            navigation.goBack();
          } catch (error) {
            console.error(error);
          }
        }}
        validationSchema={SchemaValidacao}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <View style={styles.containerTempo}>
              <Text variant="displayLarge">{tempo}</Text>
              <Text variant="displayLarge">{data.tempo}</Text>
              <Text variant="headlineLarge">1: {initialValues.nome}</Text>
              <Text variant="headlineLarge">2: {data.nome}</Text>
              <Text variant="headlineLarge">3: {data.ativo.toString()}</Text>
              <Text variant="headlineLarge">4: {ativo.toString()}</Text>
            </View>
            <TimePicker onChange={(evento, data) => setAlarmeTempo(data)} />
            <View style={{ marginVertical: 20 }}>
              <TextInput
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
                value={values.nome}
                label="Nome do alarme"
              />
              {errors.nome && touched.nome ? (
                <Text variant="titleMedium">{errors.nome}</Text>
              ) : null}
              <TextInput2
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
                value={values.nome}
                placeholder="Nome do alarme"
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
              <Text variant="bodyLarge">{ativo ? "Ativado" : "Desativado"}</Text>
              <Switch
                // trackColor={{false: '#767577', true: '#81b0ff'}}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                // ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={ativo}
              />
            </View>
            <Button mode="contained" onPress={() => handleSubmit()}>
              Salvar
            </Button>
          </View>
        )}
      </Formik>
    </Container>
  );
}

const styles = StyleSheet.create({
  containerTempo: {
    alignItems: "center",
    justifyContent: "center",
  },
  tempoLabel: {
    fontSize: 100,
  }
});
