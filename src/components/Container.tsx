import { StatusBar } from 'expo-status-bar';
import { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from "expo-constants";

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
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 10,
    paddingBottom: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
