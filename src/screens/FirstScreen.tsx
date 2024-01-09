import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

const FirstScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">{'1'}</Text>
    </View>
  );
};

export default FirstScreen;
