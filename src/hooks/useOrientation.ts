import * as ScreenOrientation from 'expo-screen-orientation';
import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

export const useOrientation = (extra: number = 0) => {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenChange, setScreenChange] = useState(0);

  const handleScreenWidthChange = (
    e: ScreenOrientation.OrientationChangeEvent,
  ) => {
    const width = Dimensions.get('screen').width - extra;
    const height = Dimensions.get('screen').height - extra;

    const orientation = e.orientationInfo.orientation;
    if (
      orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
    ) {
      const change = height / width;
      setScreenChange(Math.abs(change));
    } else {
      const change = width / height;
      setScreenChange(Math.abs(change));
    }

    setScreenWidth(width);

    // Perform any other actions based on the orientation change
  };

  useEffect(() => {
    setScreenWidth(Dimensions.get('screen').width - extra);
    const sub = ScreenOrientation.addOrientationChangeListener(
      handleScreenWidthChange,
    );
    return () => {
      ScreenOrientation.removeOrientationChangeListener(sub);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    screenWidth,
    /**This value represents the change difference in percent (in decimal) when turning from portrait to landscape and back */
    screenChange,
  };
};
