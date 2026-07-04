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

export default function QuakeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Üst navigasyonu gizle ve özel geri butonu kullan */}
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />

            {/* ÖZEL ÜST BAR */}
            <View style={styles.customHeader}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.backCircle}
                    activeOpacity={0.7}
                >
                    <Ionicons name="chevron-back" size={28} color="#4361EE" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Deprem Nedir?</Text>
                <View style={{ width: 45 }} />
            </View>

            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* GİRİŞ ALANI */}
                <LinearGradient colors={['#4CC9F0', '#4361EE']} style={styles.heroSection}>
                    <Text style={styles.bigEmoji}>🌍</Text>
                    <Text style={styles.heroMainText}>Dünyamız Hareket Ediyor!</Text>
                </LinearGradient>

                <View style={styles.infoWrapper}>
                    {/* BİLGİ 1 */}
                    <View style={[styles.infoCard, { borderLeftColor: '#4CC9F0' }]}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="extension-puzzle" size={26} color="#4CC9F0" />
                            <Text style={styles.cardTitle}>Yapboz Parçaları</Text>
                        </View>
                        <Text style={styles.cardBody}>
                            Üzerinde yaşadığımız yer aslında dev bir yapbozun parçaları gibidir. Bu parçalar her zaman çok yavaşça hareket ederler.
                        </Text>
                    </View>

                    {/* BİLGİ 2 */}
                    <View style={[styles.infoCard, { borderLeftColor: '#FFBE0B' }]}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="flash" size={26} color="#FFBE0B" />
                            <Text style={styles.cardTitle}>Neden Sallanır?</Text>
                        </View>
                        <Text style={styles.cardBody}>
                            Bu dev parçalar bazen birbirine takılır. Biriken enerji aniden boşaldığında yer sallanır. Tıpkı bir yayı bırakmak gibi!
                        </Text>
                    </View>

                    {/* BİLGİ 3 */}
                    <View style={[styles.infoCard, { borderLeftColor: '#FF006E' }]}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="leaf" size={26} color="#FF006E" />
                            <Text style={styles.cardTitle}>Doğal Bir Olay</Text>
                        </View>
                        <Text style={styles.cardBody}>
                            Deprem tıpkı yağmurun yağması veya rüzgarın esmesi gibi doğal bir olaydır. Hazırlıklı olursak korkmamıza gerek kalmaz.
                        </Text>
                    </View>

                    {/* ÖNEMLİ MESAJ */}
                    <View style={styles.messageBox}>
                        <Text style={styles.messageText}>
                            💡 Unutma: Bilgi en büyük süper güçtür! Hazırlıklı olmak bizi her zaman korur.
                        </Text>
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
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
        backgroundColor: '#F0F2F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    scrollContent: { paddingBottom: 20 },

    heroSection: {
        paddingVertical: 40,
        alignItems: 'center',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    bigEmoji: { fontSize: 80, marginBottom: 10 },
    heroMainText: { fontSize: 22, fontWeight: '900', color: 'white' },

    infoWrapper: { padding: 20 },
    infoCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderLeftWidth: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 10, color: '#1A1A1A' },
    cardBody: { fontSize: 15, color: '#666', lineHeight: 22 },

    messageBox: {
        backgroundColor: '#E0AAFF',
        padding: 25,
        borderRadius: 20,
        alignItems: 'center',
        marginVertical: 10,
    },
    messageText: { 
        color: '#480CA8', 
        fontWeight: 'bold', 
        fontSize: 16, 
        textAlign: 'center',
        lineHeight: 24 
    },
});