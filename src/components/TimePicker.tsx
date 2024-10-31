import React, { useState } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-paper';

type TimePickerProps = {
  onChange: (event: any, date: Date | undefined) => void;
};

export const TimePicker: React.FC<TimePickerProps> = ({ onChange }) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showTimepicker = () => {
    setShow(true);
  };

  const handleChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    onChange(event, currentDate);
  };

  return (
    <View>
      <Button mode="contained" onPress={showTimepicker}>
        Selecionar tempo
      </Button>
      {show && (
        <DateTimePicker
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerTempo: {
    alignItems: "center",
    justifyContent: "center",
  },
  tempoLabel: {
    fontSize: 10,
  }
});

