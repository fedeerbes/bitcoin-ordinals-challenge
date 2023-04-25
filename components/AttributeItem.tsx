import { StyleSheet, View } from 'react-native';

import { formatAddressForDisplay } from '../utils/address';

import { Text } from './Text';
import { useThemeColor } from './Themed';

interface AttributeItemProps {
  label: string;
  value: string;
  cropValue?: boolean;
  useContainerForValue?: boolean;
}

export const AttributeItem = (props: AttributeItemProps) => {
  const backgroundColor = useThemeColor({}, 'inputBackground');

  return (
    <>
      <Text type="caption" style={styles.caption}>
        {props.label}
      </Text>
      <View
        style={
          props.useContainerForValue && [
            styles.attributeValueContainer,
            { backgroundColor },
          ]
        }>
        <Text>
          {props.cropValue
            ? formatAddressForDisplay({
                currentAddress: props.value,
              })
            : props.value}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  caption: {
    marginTop: 24,
    marginBottom: 8,
  },
  attributeValueContainer: {
    padding: 12,
    borderRadius: 8,
  },
});
