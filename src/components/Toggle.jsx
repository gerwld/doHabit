import * as React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  Pressable,
  View,
} from 'react-native';

const Toggle = React.memo((props) => {
  const animatedValue = new Animated.Value(0);

  const moveToggle = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  const {value, toggleColor, backgroundColor, style, onToggle, labelStyle, label} = props;  
  const offColor = backgroundColor;
  const color = value ? toggleColor : offColor;

  animatedValue.setValue(value ? 0 : 1);

  Animated.timing(animatedValue, {
    toValue: value ? 1 : 0,
    duration: 0,
    easing: Easing.linear,
    useNativeDriver: false,
  }).start();

  return (
    <View style={styles.container}>
      {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <Pressable onPress={typeof onToggle === 'function' && onToggle}>
        <View style={[styles.toggleContainer, style, {backgroundColor: color}]}>
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