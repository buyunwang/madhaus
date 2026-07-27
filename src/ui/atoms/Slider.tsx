import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import RNSlider, { SliderProps as RNSliderProps } from '@react-native-community/slider';
import { colors } from '../tokens';

export interface SliderProps extends RNSliderProps {
  containerStyle?: ViewProps['style'];
}

export function Slider({ containerStyle, ...props }: SliderProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <RNSlider
        minimumTrackTintColor={colors.brandOrange}
        maximumTrackTintColor={colors.borderInput}
        thumbTintColor={colors.brandOrangeLight}
        style={styles.slider}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
