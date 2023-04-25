import {
  StyleSheet,
  Pressable,
  PressableProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import Colors from '../constants/Colors';

import { Text } from './Text';
import { useThemeColor } from './Themed';

interface ButtonProps extends PressableProps {
  title: string;
}

export const Button = (props: ButtonProps) => {
  const backgroundColor = useThemeColor({}, 'buttonPrimary');
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        (pressed || props.disabled) && { opacity: 0.5 },
        props.style && (props.style as StyleProp<ViewStyle>),
        { backgroundColor },
        styles.button,
      ]}>
      <Text style={{ color: Colors.dark.text }}>{props.title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 46,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontFamily: 'Montserrat',
    flex: 1,
  },
});
