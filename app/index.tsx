import { useState } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { View } from '../components/Themed';
import { Text } from '../components/Text';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { getOrdinalsList } from '../api';
import { OrdinalDetail } from '../api/types';
import { OrdinalListItem } from '../components/OrdinalListItem';

export default function MainScreen() {
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [ordinals, setOrdinals] = useState<OrdinalDetail[]>([]);

  const insets = useSafeAreaInsets();

  const lookupOrdinals = async () => {
    setLoading(true);
    const ordinalInscriptionList = await getOrdinalsList(address);

    if (!Array.isArray(ordinalInscriptionList)) {
      console.warn('failed to get ordinals');
      return setLoading(false);
    }

    setOrdinals(ordinalInscriptionList);
    setLoading(false);
  };

  const isLookUpDisabled = !address || loading;

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <View style={styles.paddingHorizontal}>
        <Text style={styles.title}>Owner Bitcoin Address:</Text>
        <TextInput value={address} onChangeText={setAddress} />
        <Button
          title="Look up"
          onPress={lookupOrdinals}
          style={styles.button}
          disabled={isLookUpDisabled}
        />
        <Text style={styles.resultsTitle}>Results</Text>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlashList
          data={ordinals}
          renderItem={OrdinalListItem}
          contentContainerStyle={styles.paddingHorizontal}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          keyExtractor={(item) => item.metadata.id}
          estimatedItemSize={200}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 10,
  },
  button: {
    marginTop: 10,
  },
  resultsTitle: {
    marginTop: 16,
    marginBottom: 24,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  separator: { height: 10 },
});
