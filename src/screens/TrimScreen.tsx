import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {Video, ResizeMode} from 'expo-av';

import Trimmer from '../components/Trimmer';
import {BaseTheme} from '../theme';
import {useAppDispatch, useAppSelector} from '../store';
import {
  setCurrentVideoTrimPlayback,
  setVideoTrimValues,
} from '../store/video/trimSlice';

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    marginHorizontal: 24,
    marginVertical: 24,
    marginBottom: 120,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  video: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const TrimScreen = () => {
  const dispatch = useAppDispatch();
  const {values} = useAppSelector(({trimVideo}) => trimVideo);
  const [videoLoading, setVideoLoading] = useState(true);

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <Video
        style={styles.video}
        // source={{
        //   uri: videoUri,
        //   headers: !videoUri.startsWith('http') // no need for headers if video is playing in local
        //     ? undefined
        //     : {Authorization: `Bearer ${token}`},
        // }}
        shouldPlay={false}
        useNativeControls={true}
        posterSource={require('../../assets/no_thumbnail.png')}
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        onPlaybackStatusUpdate={status => {
          const {positionMillis} = status as {positionMillis: number};
          dispatch(setCurrentVideoTrimPlayback(positionMillis));
        }}
        onError={e => console.log(e)}
        onLoad={status => {
          const {durationMillis, uri} = status as {
            durationMillis: number;
            uri: string;
          };
          dispatch(
            setVideoTrimValues({
              duration: durationMillis,
              end: durationMillis,
            }),
          );
          setVideoLoading(false);
        }}>
        {videoLoading && (
          <View style={styles.video}>
            <ActivityIndicator
              size={200}
              theme={{colors: {primary: BaseTheme.colors.card}}}
            />
          </View>
        )}
      </Video>
      <Trimmer
        duration={values.duration}
        start={values.start}
        finish={values.end}
        currentPlayback={values.current}
        onLeft={n => {
          dispatch(
            setVideoTrimValues({
              start: n,
            }),
          );
        }}
        onRight={n => {
          dispatch(
            setVideoTrimValues({
              end: n,
            }),
          );
        }}
      />
    </ScrollView>
  );
};

export default TrimScreen;
