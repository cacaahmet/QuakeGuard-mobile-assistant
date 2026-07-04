import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const VIDEO_DATA = [
  {
    id: '1',
    title: 'Bir Deprem Anında Yapılması Gerekenler',
    source: 'AFAD',
    // YouTube ID'si kullanılarak kapak fotoğrafı otomatik çekilir
    thumbnail: 'https://img.youtube.com/vi/oZeI0X40EEY/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=oZeI0X40EEY',
    duration: '04:51',
    accent: '#FF3E3E'
  },
  {
    id: '2',
    title: 'Güven Ailesi ile Görevimiz Deprem',
    source: 'AKUT',
    // YouTube ID'si kullanılarak kapak fotoğrafı otomatik çekilir
    thumbnail: 'https://img.youtube.com/vi/G1sHBXX88GI/maxresdefault.jpg',
    videoUrl: 'https://www.youtube.com/watch?v=G1sHBXX88GI',
    duration: '14:15',
    accent: '#00FFAB'
  }
];

export default function VideoScreen() {

  const handlePressVideo = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Link açma hatası", err));
  };

  const renderVideoItem = ({ item }: { item: typeof VIDEO_DATA[0] }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => handlePressVideo(item.videoUrl)}
        activeOpacity={0.95}
      >
        {/* Görsel Alanı */}
        <View style={styles.imageBox}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} resizeMode="cover" />
          <View style={styles.overlay} />
          
          <View style={[styles.categoryTag, { backgroundColor: item.accent }]}>
            <Text style={styles.categoryText}>AKADEMİ</Text>
          </View>

          <View style={styles.playButtonGlass}>
            <Ionicons name="play" size={28} color="#fff" style={{ marginLeft: 4 }} />
          </View>

          <View style={styles.timeTag}>
            <Text style={styles.timeText}>{item.duration}</Text>
          </View>
        </View>

        {/* Bilgi Alanı */}
        <View style={styles.body}>
          <Text style={[styles.sourceText, { color: item.accent }]}>{item.source}</Text>
          <Text style={styles.videoTitle}>{item.title}</Text>
          
          <View style={styles.actionRow}>
            <View style={[styles.customButton, { borderColor: item.accent + '50' }]}>
              <Text style={[styles.buttonLabel, { color: item.accent }]}>EĞİTİMİ BAŞLAT</Text>
              <View style={[styles.buttonCircle, { backgroundColor: item.accent }]}>
                <Ionicons name="arrow-forward" size={14} color="#000" />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen 
        options={{ 
          title: 'VİDEO REHBER',
          headerTitleStyle: { fontWeight: '900', color: '#fff' },
          headerStyle: { backgroundColor: '#070B14' },
          headerShadowVisible: false,
        }} 
      />
      
      <FlatList
        data={VIDEO_DATA}
        keyExtractor={(item) => item.id}
        renderItem={renderVideoItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.titleMain}>Afet Bilinç{"\n"}<Text style={{color: '#00D7FF'}}>Kütüphanesi</Text></Text>
            <View style={styles.accentLine} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B14',
  },
  header: {
    padding: 25,
    marginTop: 10,
  },
  titleMain: {
    fontSize: 34,
    fontWeight: '900',
    color: '#fff',
    lineHeight: 40,
  },
  accentLine: {
    width: 50,
    height: 4,
    backgroundColor: '#00D7FF',
    marginTop: 15,
    borderRadius: 2,
  },
  cardWrapper: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  card: {
    backgroundColor: '#121826',
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#1E2638',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  imageBox: {
    height: 200,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  categoryTag: {
    position: 'absolute',
    top: 15,
    left: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000',
  },
  playButtonGlass: {
    position: 'absolute',
    top: '40%',
    left: '42%',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeTag: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: '#070B14',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  timeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  body: {
    padding: 20,
  },
  sourceText: {
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 5,
  },
  videoTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#F0F3F5',
    lineHeight: 26,
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  customButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1A2133',
    paddingLeft: 18,
    paddingRight: 6,
    paddingVertical: 6,
    borderRadius: 25,
    borderWidth: 1.5,
    minWidth: 160,
  },
  buttonLabel: {
    fontSize: 13,
    fontWeight: '900',
    marginRight: 10,
  },
  buttonCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});