import { ScrollView, StyleSheet, Image, View, Pressable } from 'react-native';
import { Stack, useNavigation, useSearchParams } from 'expo-router';

import { View as ThemedView } from '../components/Themed';
import { Text } from '../components/Text';
import { OrdinalDetail } from '../api/types';
import { AttributeItem } from '../components/AttributeItem';
import { FAIcon } from '../components/FAIcon';
import { OrdinalPreview } from '../components/OrdinalPreview';
import { HIT_SLOP } from '../constants/Pressable';

export default function DetailsScreen() {
  const searchParams = useSearchParams();
  const navigation = useNavigation();
  const { ordinal } = searchParams;
  const ordinalObject = JSON.parse(ordinal as string) as OrdinalDetail;

  console.log(ordinalObject?.metadata.id);

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: () => {
            return (
              <Pressable
                onPress={() => {
                  if (navigation.canGoBack()) {
                    return navigation.goBack();
                  }
                }}
                hitSlop={HIT_SLOP}>
                {({ pressed }) => (
                  <FAIcon
                    name="chevron-left"
                    size={16}
                    style={pressed && { opacity: 0.5 }}
                  />
                )}
              </Pressable>
            );
          },
        }}
      />
      <ThemedView style={[styles.container, styles.flex1]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.flex1}
          contentContainerStyle={styles.flexGrow1}>
          <OrdinalPreview
            id={ordinalObject?.metadata.id}
            type={ordinalObject?.metadata['content type']}
          />
          <View style={styles.detailsContainer}>
            <Text type="headline" style={styles.title}>
              {ordinalObject?.inscriptionNumber}
            </Text>
            <ThemedView
              style={styles.separator}
              lightColor="#eee"
              darkColor="rgba(255,255,255,0.1)"
            />
            <AttributeItem
              label="Inscription ID"
              value={ordinalObject?.metadata.id}
            />
            <AttributeItem
              label="Owner Address"
              value={ordinalObject?.metadata.address}
            />
            <Text type="headline" style={styles.attributes}>
              Attributes
            </Text>
            <AttributeItem
              label="Output Value"
              value={ordinalObject?.metadata['output value']}
              useContainerForValue
            />
            <AttributeItem
              label="Content Type"
              value={ordinalObject?.metadata['content type']}
              useContainerForValue
            />
            <AttributeItem
              label="Content Length"
              value={ordinalObject?.metadata['content length']}
              useContainerForValue
            />
            <AttributeItem
              label="Location"
              value={ordinalObject?.metadata.location}
              useContainerForValue
              cropValue
            />
            <AttributeItem
              label="Genesis Transaction"
              value={
                ordinalObject?.metadata['genesis transaction'].split('/tx/')[1]
              }
              useContainerForValue
              cropValue
            />
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flexGrow1: {
    flexGrow: 1,
  },
  container: {
    paddingBottom: 40,
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  title: {
    marginTop: 24,
    marginBottom: 18,
  },
  separator: {
    height: 1,
  },
  attributes: {
    marginTop: 48,
    marginBottom: 8,
  },
});
