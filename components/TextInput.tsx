import {
  StyleSheet,
  View,
  TextInput as DefaultTextInput,
  TextInputProps,
} from 'react-native';

import { useThemeColor } from './Themed';

export const TextInput = (props: TextInputProps) => {
  const color = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'inputBackground');
  return (
    <View style={[{ backgroundColor }, styles.container]}>
      <DefaultTextInput
        {...props}
        style={[props.style, { color }, styles.input]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 32,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  input: {
    fontFamily: 'Montserrat',
    flex: 1,
  },
});
