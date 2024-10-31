import { StyleSheet, View } from 'react-native';
import { Container } from '../components/Container';
import { TimePicker } from '../components/TimePicker';
import { useState } from 'react';
import { format } from "date-fns";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Switch, Text, Button, TextInput  } from 'react-native-paper';

interface FormTypes {
  nome: string;
}

const valoresIniciais: FormTypes = {
  nome: ""
};

const SchemaValidacao = Yup.object().shape({
  nome: Yup.string().required('Campo vazio'),
});

export function Formulario() {
  const [alarmTime, setAlarmTime] = useState<Date | undefined>(undefined);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const tempo = format(alarmTime ? alarmTime : new Date(), "HH:mm");

  return (
    <Container>
      <Formik
        initialValues={valoresIniciais}
        onSubmit={values => console.log(values)}
        validationSchema={SchemaValidacao}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <View style={styles.containerTempo}>
              {/* <Text style={styles.tempoLabel}></Text> */}
              <Text variant="displayLarge">{tempo}</Text>
            </View>
            <TimePicker onChange={(event, date) => setAlarmTime(date)} />
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
              <Text variant="bodyLarge">{isEnabled ? "Ativado" : "Desativado"}</Text>
              <Switch
                // trackColor={{false: '#767577', true: '#81b0ff'}}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                // ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
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
