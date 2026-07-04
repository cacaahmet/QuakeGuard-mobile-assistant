import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LESSONS = [
    { id: '1', title: 'Deprem Nedir?', desc: 'Dünyamız neden sallanır?', icon: 'earth', color: '#4CC9F0', emoji: '🌍', path: '/education/quake' },
    { id: '2', title: 'Çanta Hazırla', desc: 'Süper çantanı oluştur!', icon: 'backpack', color: '#FFBE0B', emoji: '🎒', path: '/education/bag' },
    { id: '3', title: 'Çök-Kapan-Tutun', desc: 'En güvenli hareketi öğren.', icon: 'shield-checkmark', color: '#FB5607', emoji: '🛡️', path: '/education/first' },
    { id: '4', title: 'Güvenli Yerler', desc: 'Evdeki gizli kaleleri bul.', icon: 'home', color: '#3A86FF', emoji: '🏠', path: '/education/area' },
];

const VIDEOS = [
    {
        id: 'v1',
        title: 'Depremden Korkmuyorum!',
        sub: 'Eğitici Çizgi Film',
        source: require('@/assets/videos/dprem.mp4'),
        duration: '04:12',
    },
    {
        id: 'v2',
        title: 'Güvende Kalalım',
        sub: 'Kahramanlık Rehberi',
        source: require('@/assets/videos/deprem.mp4'),
        duration: '03:45',
    },
];

export default function EducationScreen() {
    const router = useRouter();
    const videoRef = useRef<Video>(null);
    const [activeVideo, setActiveVideo] = useState<any>(null);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* 🎬 TAM EKRAN VİDEO MODAL */}
            <Modal visible={!!activeVideo} animationType="fade" transparent={false}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={() => setActiveVideo(null)}
                    >
                        <Ionicons name="close-circle" size={40} color="white" />
                    </TouchableOpacity>

                    {activeVideo && (
                        <Video
                            ref={videoRef}
                            source={activeVideo}
                            style={styles.fullVideo}
                            resizeMode={ResizeMode.CONTAIN}
                            useNativeControls
                            shouldPlay
                        />
                    )}
                </View>
            </Modal>

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* 🌈 DİNAMİK ÜST PANEL */}
                <LinearGradient colors={['#8338EC', '#FF006E']} style={styles.header}>
                    <Text style={styles.headerEmoji}>🎓🦸‍♂️</Text>
                    <Text style={styles.headerTitle}>Süper Kahraman Akademisi</Text>
                    <Text style={styles.headerSubtitle}>Depreme karşı hazırlanma vakti!</Text>
                </LinearGradient>

                <View style={styles.content}>
                    {/* 🎓 MİNİ DERSLER */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>🎓 Mini Dersler</Text>
                        <TouchableOpacity><Text style={styles.seeAll}>Tümü</Text></TouchableOpacity>
                    </View>

                    <View style={styles.grid}>
                        {LESSONS.map((lesson) => (
                            <TouchableOpacity
                                key={lesson.id}
                                style={[styles.lessonCard, { borderLeftColor: lesson.color }]}
                                onPress={() => router.push(lesson.path as any)}
                            >
                                <View style={[styles.iconCircle, { backgroundColor: lesson.color + '20' }]}>
                                    <Ionicons name={lesson.icon as any} size={28} color={lesson.color} />
                                </View>
                                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                                <Text style={styles.lessonDesc}>{lesson.desc}</Text>
                                <Text style={styles.lessonEmojiAlt}>{lesson.emoji}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* 🎥 VİDEO EĞİTİMLERİ */}
                    <Text style={styles.sectionTitle}>🎥 Eğitici Videolar</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.videoSlider}>
                        {VIDEOS.map((video) => (
                            <TouchableOpacity
                                key={video.id}
                                style={styles.videoCard}
                                onPress={() => setActiveVideo(video.source)}
                                activeOpacity={0.9}
                            >
                                <View style={styles.videoThumbnail}>
                                    <Video
                                        source={video.source}
                                        style={StyleSheet.absoluteFill}
                                        resizeMode={ResizeMode.COVER}
                                        shouldPlay={false}
                                    />
                                    <View style={styles.playOverlay}>
                                        <Ionicons name="play-circle" size={50} color="rgba(255,255,255,0.9)" />
                                    </View>
                                    <Text style={styles.duration}>{video.duration}</Text>
                                </View>
                                <View style={styles.videoInfo}>
                                    <Text style={styles.videoTitleText}>{video.title}</Text>
                                    <Text style={styles.videoSubText}>{video.sub}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* 🖍️ EĞLENCE VE OYUN ALANI */}
                    <Text style={styles.sectionTitle}>🖍️ Eğlen & Öğren</Text>
                    <View style={styles.funContainer}>
                        <TouchableOpacity 
                            style={[styles.funCard, { backgroundColor: '#E0AAFF' }]}
                            onPress={() => router.push('/coloring' as any)}
                        >
                            <Text style={styles.funEmoji}>🎨</Text>
                            <Text style={styles.funText}>Çantamı Boyuyorum</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.funCard, { backgroundColor: '#BDB2FF' }]}
                            onPress={() => router.push('/game' as any)}
                        >
                            <Text style={styles.funEmoji}>🧠</Text>
                            <Text style={styles.funText}>Hafıza Oyunu</Text>
                        </TouchableOpacity>
                    </View>

                    {/* 🚀 TEST ALANI (SÜPER TEST) */}
                    <TouchableOpacity 
                        style={styles.heroActionCard}
                        onPress={() => router.push('/quiz' as any)}
                    >
                        <LinearGradient
                            colors={['#4CC9F0', '#4361EE', '#7209B7']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.heroGradient}
                        >
                            <View style={styles.heroContent}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.heroTitle}>Süper Test Vakti! ⚡</Text>
                                    <Text style={styles.heroSubTitle}>Bilgini konuştur, deprem canavarını alt et!</Text>
                                </View>
                                <View style={styles.heroEmojiContainer}>
                                    <Text style={styles.heroBigEmoji}>👾</Text>
                                    <Text style={styles.heroVS}>VS</Text>
                                    <Text style={styles.heroBigEmoji}>🦸</Text>
                                </View>
                            </View>

                            <View style={styles.heroButton}>
                                <Text style={styles.heroButtonText}>Maceraya Başla!</Text>
                                <Ionicons name="rocket" size={20} color="#7209B7" />
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F0F2F5' },
    header: {
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        alignItems: 'center',
    },
    headerEmoji: { fontSize: 45, marginBottom: 5 },
    headerTitle: { fontSize: 26, fontWeight: 'bold', color: 'white', textAlign: 'center' },
    headerSubtitle: { fontSize: 16, color: 'rgba(255,255,255,0.9)', marginTop: 5 },

    content: { padding: 20 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A', marginVertical: 15 },
    seeAll: { color: '#8338EC', fontWeight: '600' },

    grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    lessonCard: {
        width: (width - 55) / 2,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        borderLeftWidth: 6,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    iconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
    lessonTitle: { fontSize: 15, fontWeight: 'bold', color: '#333' },
    lessonDesc: { fontSize: 12, color: '#777', marginTop: 4 },
    lessonEmojiAlt: { alignSelf: 'flex-end', fontSize: 20 },

    videoSlider: { marginBottom: 10 },
    videoCard: { width: 240, backgroundColor: 'white', borderRadius: 20, marginRight: 15, overflow: 'hidden', elevation: 3 },
    videoThumbnail: { height: 130, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center', position: 'relative' },
    playOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)' },
    duration: { position: 'absolute', bottom: 10, right: 10, color: 'white', fontSize: 10, backgroundColor: 'rgba(0,0,0,0.6)', padding: 3, borderRadius: 5 },
    videoInfo: { padding: 12 },
    videoTitleText: { fontWeight: 'bold', fontSize: 14, color: '#333' },
    videoSubText: { fontSize: 12, color: '#888', marginTop: 2 },

    funContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    funCard: { width: (width - 55) / 2, padding: 20, borderRadius: 20, alignItems: 'center', elevation: 3 },
    funEmoji: { fontSize: 30, marginBottom: 8 },
    funText: { fontWeight: 'bold', color: '#480CA8', textAlign: 'center' },

    heroActionCard: {
        marginTop: 10,
        borderRadius: 25,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: '#7209B7',
        shadowOpacity: 0.3,
        shadowRadius: 15,
    },
    heroGradient: { padding: 20 },
    heroContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    heroTitle: { fontSize: 22, fontWeight: '900', color: 'white' },
    heroSubTitle: { fontSize: 13, color: 'rgba(255,255,255,0.9)', marginTop: 5 },
    heroEmojiContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', padding: 10, borderRadius: 20 },
    heroBigEmoji: { fontSize: 30 },
    heroVS: { color: 'white', fontWeight: 'bold', marginHorizontal: 5, fontSize: 12 },
    heroButton: { backgroundColor: 'white', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderRadius: 15 },
    heroButtonText: { color: '#7209B7', fontWeight: '900', fontSize: 16, marginRight: 8 },

    modalContainer: { flex: 1, backgroundColor: 'black', justifyContent: 'center' },
    fullVideo: { width: width, height: height * 0.8 },
    closeBtn: { position: 'absolute', top: 50, right: 20, zIndex: 10 },
});