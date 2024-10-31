import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ContainerProps {
  children: ReactNode;
}

export function Container(props: ContainerProps) {
  const { children } = props;
  return (
    <View style={styles.container}>
      {children}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
    marginHorizontal: 10,
    marginBottom: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
