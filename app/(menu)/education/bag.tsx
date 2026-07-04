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

// Çanta ekipmanları verisi
const BAG_ITEMS = [
    { id: '1', title: 'Su ve Yemek', desc: 'Vücudun için yakıt!', icon: 'fast-food', color: '#4CC9F0' },
    { id: '2', title: 'Fener', desc: 'Karanlıkta yolunu aydınlatır.', icon: 'flashlight', color: '#FFBE0B' },
    { id: '3', title: 'İlk Yardım Seti', desc: 'Küçük yaraları iyileştirir.', icon: 'medkit', color: '#FF006E' },
    { id: '4', title: 'Düdük', desc: 'Sesini herkese duyurmanı sağlar.', icon: 'megaphone', color: '#8338EC' },
    { id: '5', title: 'Yedek Giysiler', desc: 'Seni sıcak ve kuru tutar.', icon: 'shirt', color: '#3A86FF' },
    { id: '6', title: 'Radyo', desc: 'Önemli haberleri duymamızı sağlar.', icon: 'radio', color: '#FB5607' },
];

export default function BagScreen() {
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
                    <Ionicons name="chevron-back" size={28} color="#FFBE0B" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Süper Çantamda Ne Var?</Text>
                <View style={{ width: 45 }} />
            </View>

            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* GİRİŞ ALANI */}
                <LinearGradient colors={['#FFBE0B', '#FB5607']} style={styles.heroSection}>
                    <Text style={styles.bigEmoji}>🎒</Text>
                    <Text style={styles.heroMainText}>Hazır Ol, Güvende Kal!</Text>
                    <Text style={styles.heroSubText}>Deprem çantası, her an yanımızda olması gereken bir kahraman çantasıdır.</Text>
                </LinearGradient>

                <View style={styles.contentWrapper}>
                    <Text style={styles.sectionTitle}>Çantamızın Olmazsa Olmazları ✨</Text>
                    
                    {/* EKİPMAN LİSTESİ */}
                    <View style={styles.itemsGrid}>
                        {BAG_ITEMS.map((item) => (
                            <View key={item.id} style={styles.itemCard}>
                                <View style={[styles.iconCircle, { backgroundColor: item.color + '20' }]}>
                                    <Ionicons name={item.icon as any} size={32} color={item.color} />
                                </View>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemDesc}>{item.desc}</Text>
                            </View>
                        ))}
                    </View>

                    {/* ÖNEMLİ MESAJ KUTUSU */}
                    <View style={styles.noteBox}>
                        <LinearGradient 
                            colors={['#E0AAFF', '#BDB2FF']} 
                            style={styles.noteGradient}
                        >
                            <Ionicons name="bulb" size={30} color="#480CA8" />
                            <Text style={styles.noteText}>
                                Çantanı hazırlarken ailenle birlikte kontrol etmeyi unutma! Her 6 ayda bir içindekileri yenilemelisin.
                            </Text>
                        </LinearGradient>
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FDFDFD' },
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
        backgroundColor: '#FFF9E5',
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
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 20, textAlign: 'center' },
    
    itemsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    itemCard: {
        width: (width - 60) / 2,
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 10,
    },
    iconCircle: {
        width: 65,
        height: 65,
        borderRadius: 32.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    itemTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', textAlign: 'center' },
    itemDesc: { fontSize: 12, color: '#777', textAlign: 'center', marginTop: 5, lineHeight: 16 },

    noteBox: {
        marginTop: 10,
        borderRadius: 25,
        overflow: 'hidden',
    },
    noteGradient: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    noteText: {
        flex: 1,
        marginLeft: 15,
        color: '#480CA8',
        fontWeight: 'bold',
        fontSize: 14,
        lineHeight: 20,
    },
});