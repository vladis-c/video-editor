import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../store';
import {
  clearVideoCompressSlice,
  processVideoCompression,
} from '../store/video/compressSlice';
import {BaseTheme} from '../theme';

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  activity: {height: '10%', justifyContent: 'center', alignItems: 'center'},
  statusText: {
    textTransform: 'capitalize',
    position: 'absolute',
  },
});

const FirstScreen = () => {
  const dispatch = useAppDispatch();
  const {status} = useAppSelector(({compressVideo}) => compressVideo);
  const displayStatus = status !== 'idle';
  const displayActivityIndicator =
    status === 'getting info' || status === 'compressing';
  const displayCompletedButton = status === 'completed';

  return (
    <View style={styles.container}>
      {!displayStatus ? (
        <Button
          mode="contained"
          onPress={() => dispatch(processVideoCompression())}>
          Select video file
        </Button>
      ) : (
        <View style={styles.activity}>
          <Text variant="displayMedium" style={styles.statusText}>
            {status}
          </Text>
          {displayActivityIndicator ? (
            <ActivityIndicator
              size={200}
              theme={{colors: {primary: BaseTheme.colors.card}}}
            />
          ) : null}
        </View>
      )}
      {displayCompletedButton ? (
        <Button
          mode="contained"
          onPress={() => dispatch(clearVideoCompressSlice())}>
          Start over
        </Button>
      ) : null}
    </View>
  );
};

export default FirstScreen;
