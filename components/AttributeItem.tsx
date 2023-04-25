import { StyleSheet, View } from 'react-native';

import { formatAddressForDisplay } from '../utils/address';

import { Text } from './Text';

interface AttributeItemProps {
  label: string;
  value: string;
  cropValue?: boolean;
  useContainerForValue?: boolean;
}

export const AttributeItem = (props: AttributeItemProps) => {
  return (
    <>
      <Text type="caption" style={styles.caption}>
        {props.label}
      </Text>
      <View
        style={props.useContainerForValue && styles.attributeValueContainer}>
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
    backgroundColor: '#24252C',
    padding: 12,
    borderRadius: 8,
  },
});
