import { StyleSheet, View } from 'react-native';
import { Container } from '../components/Container';
import { TimePicker } from '../components/TimePicker';
import { useState } from 'react';
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

const valoresIniciais: FormTypes = {
  nome: ""
};

const SchemaValidacao = Yup.object().shape({
  nome: Yup.string().required('Campo vazio'),
});

type Props = NativeStackScreenProps<NativeStackRootStaticParamList, "HomePage">;

export function Formulario({ navigation }: Props) {
  const [alarmeTempo, setAlarmeTempo] = useState<Date | undefined>(undefined);
  const [ativo, setAtivo] = useState(false);
  const toggleSwitch = () => setAtivo(estadoAnterior => !estadoAnterior);

  const tempo = format(alarmeTempo ? alarmeTempo : new Date(), "HH:mm");
  const alarmeDatabase = useAlarmeDatabase();

  return (
    <Container>
      <IconButton
        icon="arrow-left"
        iconColor={MD3Colors.tertiary0}
        size={30}
        onPress={() => navigation.goBack()}
      />
      <Formik
        initialValues={valoresIniciais}
        onSubmit={async (values) => {
          try {
            const resposta = await alarmeDatabase.criar({
              tempo: tempo,
              nome: values.nome,
              ativo: ativo
            });
            console.log(resposta.insertedRowId);
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
              {/* <Text style={styles.tempoLabel}></Text> */}
              <Text variant="displayLarge">{tempo}</Text>
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
