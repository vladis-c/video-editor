import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {useAppSelector} from '../store';
import {BaseTheme} from '../theme';

const styles = StyleSheet.create({
  scroll: {flexGrow: 1},
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  activity: {height: '10%', justifyContent: 'center', alignItems: 'center'},
  statusText: {
    textTransform: 'capitalize',
    position: 'absolute',
  },
});

const CompressScreen = () => {
  const {status} = useAppSelector(({compressVideo}) => compressVideo);
  const displayActivityIndicator = status === 'compressing';

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
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
    </ScrollView>
  );
};

export default CompressScreen;
