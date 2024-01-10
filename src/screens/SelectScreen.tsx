import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../store';
import {processVideoCompression} from '../store/video/compressSlice';

const styles = StyleSheet.create({
  scroll: {flexGrow: 1},
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

const SelectScreen = () => {
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(({compressVideo}) => compressVideo);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Button
        mode="contained"
        onPress={() => dispatch(processVideoCompression())}>
        Select video file
      </Button>
    </ScrollView>
  );
};

export default SelectScreen;
