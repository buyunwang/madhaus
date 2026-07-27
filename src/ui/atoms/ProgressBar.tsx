import React, { useEffect } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { colors, radii } from '../tokens';

interface ProgressBarProps extends ViewProps {
  progress: number; // 0 to 100
  color?: string;
  backgroundColor?: string;
}

export function ProgressBar({
  progress,
  color = colors.brandOrange,
  backgroundColor = colors.borderCard,
  style,
  ...props
}: ProgressBarProps) {
  const initialProgress = Math.max(0, Math.min(100, progress || 0));
  const animatedProgress = useSharedValue(initialProgress);

  useEffect(() => {
    animatedProgress.value = withSpring(Math.max(0, Math.min(100, progress)), {
      mass: 1,
      damping: 15,
      stiffness: 120,
      overshootClamping: true,
    });
  }, [progress, animatedProgress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value}%`,
    };
  });

  return (
    <View style={[styles.container, { backgroundColor }, style]} {...props}>
      <Animated.View style={[styles.fill, { backgroundColor: color }, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    borderRadius: radii.full,
    overflow: 'hidden',
    width: '100%',
  },
  fill: {
    height: '100%',
    borderRadius: radii.full,
  },
});
