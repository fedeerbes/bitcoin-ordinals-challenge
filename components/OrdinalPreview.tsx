import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';

import { getOrdinalContentById } from '../api';
import { Text } from './Text';
import { useThemeColor } from './Themed';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const OrdinalPreview = ({ id, type }: { id: string; type: string }) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');

  const backgroundColor = useThemeColor({}, 'inputBackground');

  const isTypeImage = type.includes('image');
  console.log(id);

  console.log(isTypeImage);

  useEffect(() => {
    (async () => {
      if (isTypeImage) {
        return;
      }
      setLoading(true);
      const ordinalContent = await getOrdinalContentById(id);
      setText(JSON.stringify(ordinalContent));
      setLoading(false);
    })();
  }, [isTypeImage]);

  return isTypeImage ? (
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: `https://ordinals.com/content/${id}`,
        }}
        style={styles.image}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
    </View>
  ) : loading ? (
    <ActivityIndicator />
  ) : (
    <View style={[{ backgroundColor }, styles.textContainer]}>
      <Text>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '100%',
    maxHeight: 375,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  textContainer: { padding: 16 },
});
