import * as ScreenOrientation from 'expo-screen-orientation';
import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {useAppDispatch, useAppSelector} from '../store';
import {setDeviceOrientationValues} from '../store/serviceSlice';

const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');

export const useOrientation = (extra: number = 0) => {
  const dispatch = useAppDispatch();
  const {orientation} = useAppSelector(({service}) => service);

  const handleScreenWidthChange = (
    e: ScreenOrientation.OrientationChangeEvent,
  ) => {
    const orientation = e.orientationInfo.orientation;
    dispatch(
      setDeviceOrientationValues({
        current: orientation,
      }),
    );
    if (
      orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
      orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
    ) {
      const change = Math.abs(HEIGHT / (WIDTH - extra));
      dispatch(
        setDeviceOrientationValues({
          change,
        }),
      );
    } else {
      const change = Math.abs((WIDTH - extra) / HEIGHT);
      dispatch(
        setDeviceOrientationValues({
          change,
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(
      setDeviceOrientationValues({
        width: WIDTH - extra,
      }),
    );
    const sub = ScreenOrientation.addOrientationChangeListener(
      handleScreenWidthChange,
    );
    return () => {
      ScreenOrientation.removeOrientationChangeListener(sub);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {
    screenWidth: orientation.width,
    /**This value represents the change difference in percent (in decimal) when turning from portrait to landscape and back */
    screenChange: orientation.change,
  };
};
