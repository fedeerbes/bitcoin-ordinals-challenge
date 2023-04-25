import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleProp, TextStyle } from 'react-native';

import { useThemeColor } from './Themed';

export const FAIcon = ({
  name,
  size,
  style,
}: {
  name: string;
  size: number;
  style?: StyleProp<TextStyle>;
}) => {
  const color = useThemeColor({}, 'text');

  return <FontAwesome name={name} size={size} color={color} style={style} />;
};
