import React, {useEffect, useRef, useState} from 'react';
import {View, PanResponder, Animated, StyleSheet, Text} from 'react-native';
import {useOrientation} from '../hooks/useOrientation';
import {getFormattedTime, roundToThousands} from '../helpers/utils';
import {BaseTheme} from '../theme';

const PADDING = 48;
const HEIGHT = 12;

const styles = StyleSheet.create({
  bg: {
    alignSelf: 'center',
    width: '100%',
    padding: PADDING / 2,
    backgroundColor: BaseTheme.colors.text,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bar: {
    height: HEIGHT,
    backgroundColor: BaseTheme.colors.border,
    paddingHorizontal: PADDING / 2,
    marginVertical: PADDING / 2,
    alignSelf: 'center',
    borderRadius: 10,
  },
  trimBarLeft: {
    position: 'absolute',
    left: 0,
    height: HEIGHT,
    backgroundColor: 'black',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  trimBarRight: {
    position: 'absolute',
    right: 0,
    height: HEIGHT,
    backgroundColor: 'black',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  thumbContainer: {
    marginTop: -55,
    width: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbLeft: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 2,
    height: HEIGHT * 2,
    marginTop: -HEIGHT / 2,
    backgroundColor: BaseTheme.colors.border,
  },
  thumbRight: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 2,
    height: HEIGHT * 2,
    marginTop: -HEIGHT / 2,
    backgroundColor: BaseTheme.colors.border,
  },
  playCarette: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 2,
    height: HEIGHT * 2,
    marginTop: -HEIGHT / 2,
    backgroundColor: BaseTheme.colors.background,
  },
  text: {
    color: BaseTheme.colors.background,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 25,
  },
});

const tooltipStyles = StyleSheet.create({
  tooltip: {
    width: 55,
    height: 28,
    backgroundColor: BaseTheme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 6,
  },
  text: {
    fontWeight: '700',
    textAlign: 'center',
  },
});

type TrimmerProps = {
  duration: number;
  start: number;
  finish: number;
  currentPlayback?: number;
  onLeft: (n: number) => void;
  onRight: (n: number) => void;
};

const Tooltip = ({time}: {time: string}) => {
  return (
    <View style={tooltipStyles.tooltip}>
      <Text style={tooltipStyles.text}>{time}</Text>
    </View>
  );
};

const Trimmer = ({
  duration = 10000,
  start = 0,
  finish = 10000,
  onLeft,
  onRight,
  currentPlayback = 1000,
}: TrimmerProps) => {
  const totalTime = useRef<number>(duration).current;
  const [trimStart, setTrimStart] = useState(start);
  const [trimEnd, setTrimEnd] = useState(finish);
  const [startTime, setStartTime] = useState(start);
  const [endTime, setEndTime] = useState(finish);
  const {screenWidth} = useOrientation(PADDING * 2);
  const coefTime = totalTime * 0.1;

  //This effect triggers setting the same position of thumbs on the screen relatively when screen width changes
  useEffect(() => {
    const newTrimStart = (startTime * screenWidth) / totalTime;
    setTrimStart(newTrimStart);
    const newTrimEnd =
      totalTime - ((totalTime - endTime) * screenWidth) / totalTime;
    setTrimEnd(newTrimEnd);
  }, [endTime, screenWidth, startTime, totalTime]);

  const leftThumbPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      //preventing out of bounds thumb start
      if (trimStart + gestureState.dx < 0) {
        setTrimStart(0);
        setStartTime(0);
        return;
      }
      //preventing thumbs overlap start
      const timeDiff = endTime - startTime;
      if (
        roundToThousands(timeDiff) === coefTime ||
        roundToThousands(timeDiff) + 1000 === coefTime ||
        roundToThousands(timeDiff) - 1000 === coefTime
      ) {
        setTrimStart(prev => prev - 5);
      } else {
        setTrimStart(prev => prev + gestureState.dx);
      }
      const newTrimStart = trimStart + gestureState.dx;
      const fromStart = Math.floor((totalTime * newTrimStart) / screenWidth);
      setStartTime(fromStart);
    },
    onPanResponderEnd: (_, gestureState) => {
      if (trimStart + gestureState.dx < 0) {
        setTrimStart(0);
        setStartTime(0);
        onLeft(0);
        return;
      }
      let newTrimStart = trimStart + gestureState.dx;
      let fromStart = Math.floor((totalTime * newTrimStart) / screenWidth);

      if (fromStart >= endTime) {
        fromStart = endTime - 1000;
        newTrimStart = Math.floor((fromStart * screenWidth) / totalTime); // reverse fromStart calc to get newTrimStart based on fromStart
        setTrimStart(newTrimStart);
      }

      onLeft(fromStart);
      setStartTime(fromStart);
    },
  });

  const rightThumbPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      //preventing out of bounds thumb end
      if (trimEnd + gestureState.dx > totalTime) {
        setTrimEnd(totalTime);
        setEndTime(totalTime);
        return;
      }

      //preventing thumbs overlap end
      const timeDiff = endTime - startTime;
      if (
        roundToThousands(timeDiff) === coefTime ||
        roundToThousands(timeDiff) + 1000 === coefTime ||
        roundToThousands(timeDiff) - 1000 === coefTime
      ) {
        setTrimEnd(prev => prev + 5);
      } else {
        setTrimEnd(prev => prev + gestureState.dx);
      }
      const newTrimEnd = trimEnd + gestureState.dx;
      const fromEnd = Math.floor(
        totalTime - (totalTime * (totalTime - newTrimEnd)) / screenWidth,
      );
      setEndTime(fromEnd);
    },
    onPanResponderEnd: (_, gestureState) => {
      if (trimEnd + gestureState.dx > totalTime) {
        setTrimEnd(totalTime);
        setEndTime(totalTime);
        onRight(totalTime);
        return;
      }
      let newTrimEnd = trimEnd + gestureState.dx;
      let fromEnd = Math.floor(
        totalTime - (totalTime * (totalTime - newTrimEnd)) / screenWidth,
      );

      if (fromEnd <= startTime) {
        fromEnd = startTime + 1000;
        newTrimEnd = Math.floor(
          totalTime - (screenWidth * (totalTime - fromEnd)) / totalTime,
        ); // reverse fromEnd calc to get newTrimEnd based on fromEnd

        setTrimEnd(newTrimEnd);
      }

      onRight(fromEnd);
      setEndTime(fromEnd);
    },
  });

  return (
    <View style={styles.bg}>
      <Text style={styles.text}>
        {getFormattedTime(endTime - startTime, 'MM:SS')}
      </Text>
      <View style={[styles.bar, {width: screenWidth}]}>
        <View style={[styles.trimBarLeft, {width: trimStart}]} />
        <View style={[styles.trimBarRight, {width: totalTime - trimEnd}]} />
        <Animated.View
          style={[styles.thumbLeft, {left: new Animated.Value(trimStart)}]}
          {...leftThumbPanResponder.panHandlers}>
          <View
            style={styles.thumbContainer}
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
            <Tooltip time={getFormattedTime(startTime, 'MM:SS')} />
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.thumbRight,
            {right: new Animated.Value(totalTime - trimEnd)},
          ]}
          {...rightThumbPanResponder.panHandlers}>
          <View
            style={styles.thumbContainer}
            hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
            <Tooltip time={getFormattedTime(endTime, 'MM:SS')} />
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.playCarette,
            {
              left: new Animated.Value(
                (currentPlayback * screenWidth) / totalTime,
              ),
            },
          ]}
        />
      </View>
    </View>
  );
};
export default Trimmer;
