import { StyleSheet, Pressable, View } from 'react-native';
import { Link } from 'expo-router';

import { OrdinalDetail } from '../api/types';

import { Text } from './Text';
import { FAIcon } from './FAIcon';

export const OrdinalListItem = ({ item }: { item: OrdinalDetail }) => {
  return (
    <Link
      href={{
        pathname: '/details',
        params: { ordinal: JSON.stringify(item) },
      }}
      asChild>
      <Pressable>
        {({ pressed }) => (
          <View style={[styles.item, pressed && { opacity: 0.5 }]}>
            <Text>{item.inscriptionNumber}</Text>
            <FAIcon name="chevron-right" size={16} />
          </View>
        )}
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
