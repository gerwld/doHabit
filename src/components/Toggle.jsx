import React, { useCallback } from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';

const Toggle = React.memo((props) => {
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  // Destructure props
  const { value, toggleColor, backgroundColor, style, onToggle, labelStyle, label } = props;

  // Define the animation for the toggle movement
  const moveToggle = useCallback(animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  }));

  // Handle animation effect when `value` prop changes
  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200, // Duration can be adjusted as needed
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [value, animatedValue]);

  // Determine the color of the toggle container
  const offColor = backgroundColor;
  const color = value ? toggleColor : offColor;

  React.useEffect(() => {
    console.log('updated');
  },[])

  return (
    <View style={styles.container}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <Pressable onPress={typeof onToggle === 'function' ? onToggle : undefined}>
        <View style={[styles.toggleContainer, style, { backgroundColor: color }]}>
          <Animated.View
            style={[
              styles.toggleWheelStyle,
              {
                marginLeft: moveToggle,
              },
            ]}
          />
        </View>
      </Pressable>
    </View>
  );
});

export default Toggle;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleContainer: {
    width: 50,
    height: 30,
    marginLeft: 3,
    paddingLeft: 3,
    paddingLeft: 2.5,
    borderRadius: 15,
    justifyContent: 'center',
  },
  label: {
    marginRight: 2,
  },
  toggleWheelStyle: {
    width: 25,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 12.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});
