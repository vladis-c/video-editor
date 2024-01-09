import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useAppDispatch} from '../store';
import {getVideo} from '../store/video/compressSlice';

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

const FirstScreen = () => {
  const dispatch = useAppDispatch();
  


  return (
    <View style={styles.container}>
      <Text variant="bodyLarge">{'1'}</Text>
      <Button
        onPress={() => {
          dispatch(getVideo());
        }}>
        Get
      </Button>
    </View>
  );
};

export default FirstScreen;
