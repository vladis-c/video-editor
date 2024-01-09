import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../store';
import {processVideoCompression} from '../store/video/compressSlice';
import {BaseTheme} from '../theme';

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  activity: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  statusText: {
    textTransform: 'capitalize',
    position: 'absolute',
  },
});

const FirstScreen = () => {
  const dispatch = useAppDispatch();
  const {processing, status} = useAppSelector(
    ({compressVideo}) => compressVideo,
  );

  return (
    <View style={styles.container}>
      {!processing ? (
        <Button
          mode="contained"
          onPress={() => dispatch(processVideoCompression())}>
          Get
        </Button>
      ) : (
        <View style={styles.activity}>
          <Text variant="displayMedium" style={styles.statusText}>
            {status}
          </Text>
          <ActivityIndicator
            size={200}
            theme={{colors: {primary: BaseTheme.colors.card}}}
          />
        </View>
      )}
    </View>
  );
};

export default FirstScreen;
