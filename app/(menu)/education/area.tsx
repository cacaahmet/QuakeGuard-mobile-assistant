import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function AreaScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* ÜST BAR */}
            <View style={styles.customHeader}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backCircle}
                    activeOpacity={0.7}
                >
                    <Ionicons name="chevron-back" size={28} color="#3A86FF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Güvenli Kaleleri Bul!</Text>
                <View style={{ width: 45 }} />
            </View>

            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* GİRİŞ ALANI */}
                <LinearGradient colors={['#3A86FF', '#8338EC']} style={styles.heroSection}>
                    <Text style={styles.bigEmoji}>🏠</Text>
                    <Text style={styles.heroMainText}>Evdeki Güvenli Yerler</Text>
                    <Text style={styles.heroSubText}>Deprem anında evimizde bizi koruyacak gizli kalelerimiz var. Hadi onları tanıyalım!</Text>
                </LinearGradient>

                <View style={styles.contentWrapper}>
                    
                    {/* GÜVENLİ BÖLGELER */}
                    <Text style={styles.sectionLabel}>✅ Güvenli Yerler (Kalelerimiz)</Text>
                    
                    <View style={[styles.areaCard, { borderLeftColor: '#4CC9F0' }]}>
                        <View style={styles.iconBox}>
                            <Ionicons name="desktop" size={30} color="#4CC9F0" />
                        </View>
                        <View style={styles.areaInfo}>
                            <Text style={styles.areaTitle}>Sağlam Masaların Altı</Text>
                            <Text style={styles.areaDesc}>Üzerimize bir şey düşmesini engelleyen en iyi kalkan!</Text>
                        </View>
                    </View>

                    <View style={[styles.areaCard, { borderLeftColor: '#4CC9F0' }]}>
                        <View style={styles.iconBox}>
                            <Ionicons name="bed" size={30} color="#4CC9F0" />
                        </View>
                        <View style={styles.areaInfo}>
                            <Text style={styles.areaTitle}>Yatağın Yanı</Text>
                            <Text style={styles.areaDesc}>Eğer yatak sağlam bir bazaysa, hemen yanına çöküp kapanabiliriz.</Text>
                        </View>
                    </View>

                    {/* TEHLİKELİ BÖLGELER */}
                    <Text style={[styles.sectionLabel, { marginTop: 20 }]}>❌ Uzak Durulması Gerekenler</Text>

                    <View style={styles.dangerRow}>
                        <View style={styles.dangerItem}>
                            <View style={styles.dangerIcon}><Text style={styles.dangerEmoji}>🪟</Text></View>
                            <Text style={styles.dangerText}>Pencereler</Text>
                        </View>
                        <View style={styles.dangerItem}>
                            <View style={styles.dangerIcon}><Text style={styles.dangerEmoji}>🖼️</Text></View>
                            <Text style={styles.dangerText}>Ağır Tablolar</Text>
                        </View>
                        <View style={styles.dangerItem}>
                            <View style={styles.dangerIcon}><Text style={styles.dangerEmoji}>🪜</Text></View>
                            <Text style={styles.dangerText}>Kitaplıklar</Text>
                        </View>
                    </View>

                    {/* ÖNEMLİ GÖREV KUTUSU */}
                    <View style={styles.missionBox}>
                        <LinearGradient 
                            colors={['#FFBE0B', '#FFD60A']} 
                            style={styles.missionGradient}
                        >
                            <View style={styles.missionHeader}>
                                <Ionicons name="star" size={24} color="#553C00" />
                                <Text style={styles.missionTitle}>SÜPER KAHRAMAN GÖREVİ</Text>
                            </View>
                            <Text style={styles.missionText}>
                                Bugün ailenle birlikte evin odalarını gez ve her oda için en az bir "Güvenli Kale" belirle!
                            </Text>
                        </LinearGradient>
                    </View>

                    {/* EĞİTİM ANA SAYFASINA DÖNÜŞ (index.tsx in education folder) */}
                    <TouchableOpacity 
                        style={styles.homeBtn}
                        onPress={() => router.push('/education' as any)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.homeBtnText}>Akademiye Dön</Text>
                        <Ionicons name="school" size={24} color="white" />
                    </TouchableOpacity>

                </View>
                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFF' },
    customHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 15,
        backgroundColor: 'white',
    },
    backCircle: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#EBF3FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    scrollContent: { paddingBottom: 20 },

    heroSection: {
        paddingVertical: 40,
        paddingHorizontal: 30,
        alignItems: 'center',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    bigEmoji: { fontSize: 80, marginBottom: 10 },
    heroMainText: { fontSize: 24, fontWeight: '900', color: 'white', textAlign: 'center' },
    heroSubText: { fontSize: 14, color: 'white', textAlign: 'center', marginTop: 10, opacity: 0.9, lineHeight: 20 },

    contentWrapper: { padding: 20 },
    sectionLabel: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
    
    areaCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 15,
        marginBottom: 12,
        alignItems: 'center',
        borderLeftWidth: 6,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    iconBox: {
        width: 50,
        height: 50,
        borderRadius: 12,
        backgroundColor: '#F0F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    areaInfo: { flex: 1 },
    areaTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    areaDesc: { fontSize: 13, color: '#777', marginTop: 2 },

    dangerRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
    dangerItem: { 
        width: (width - 70) / 3, 
        alignItems: 'center',
        backgroundColor: '#FFF0F0',
        padding: 12,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FFDADA',
    },
    dangerIcon: { marginBottom: 5 },
    dangerEmoji: { fontSize: 28 },
    dangerText: { fontSize: 11, fontWeight: 'bold', color: '#C92A2A', textAlign: 'center' },

    missionBox: {
        marginTop: 30,
        borderRadius: 25,
        overflow: 'hidden',
        elevation: 5,
    },
    missionGradient: { padding: 20 },
    missionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    missionTitle: { color: '#553C00', fontWeight: '900', marginLeft: 10, fontSize: 14 },
    missionText: { color: '#553C00', fontSize: 15, fontWeight: '600', lineHeight: 22 },

    homeBtn: {
        backgroundColor: '#8338EC',
        flexDirection: 'row',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    homeBtnText: { color: 'white', fontSize: 18, fontWeight: 'bold', marginRight: 12 },
});