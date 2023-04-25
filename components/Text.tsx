import { Text as DefaultText, TextProps } from 'react-native';

import { useThemeColor } from './Themed';

interface Props extends TextProps {
  type?: 'normal' | 'headline' | 'caption';
}

export const Text = (props: Props) => {
  const color = useThemeColor({}, 'text');
  const textTypes = {
    headline: {
      fontFamily: 'Montserrat-Bold',
      fontWeight: '600',
      fontSize: 16,
    },
    normal: {
      fontFamily: 'Montserrat-SemiBold',
      fontWeight: '500',
      fontSize: 14,
    },
    caption: {
      fontFamily: 'Montserrat-SemiBold',
      fontWeight: '500',
      fontSize: 12,
      opacity: 0.7,
    },
  } as const;

  const type = props.type ?? 'normal';

  return (
    <DefaultText
      {...props}
      style={[{ color, ...textTypes[type] }, props.style]}
    />
  );
};
