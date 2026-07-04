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

export default function FirstActionScreen() {
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
                    <Ionicons name="chevron-back" size={28} color="#FB5607" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Süper Kahraman Hareketi</Text>
                <View style={{ width: 45 }} />
            </View>

            <ScrollView
                bounces={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* GİRİŞ ALANI */}
                <LinearGradient colors={['#FB5607', '#FF006E']} style={styles.heroSection}>
                    <Text style={styles.bigEmoji}>🛡️</Text>
                    <Text style={styles.heroMainText}>Çök - Kapan - Tutun!</Text>
                    <Text style={styles.heroSubText}>Sarsıntı başladığında bu 3 sihirli adımı uygula ve kendini koru!</Text>
                </LinearGradient>

                <View style={styles.contentWrapper}>
                    
                    {/* ADIM 1: ÇÖK */}
                    <View style={[styles.stepCard, { borderLeftColor: '#FFBE0B' }]}>
                        <View style={styles.stepNumber}><Text style={styles.stepNumberText}>1</Text></View>
                        <View style={styles.stepInfo}>
                            <Text style={styles.stepTitle}>ÇÖK! 🧘‍♂️</Text>
                            <Text style={styles.stepDesc}>Dizlerinin üzerine çök. Bu senin dengeni sağlar ve devrilmeni engeller.</Text>
                        </View>
                        <Text style={styles.stepEmoji}>⬇️</Text>
                    </View>

                    {/* ADIM 2: KAPAN */}
                    <View style={[styles.stepCard, { borderLeftColor: '#4CC9F0' }]}>
                        <View style={styles.stepNumber}><Text style={styles.stepNumberText}>2</Text></View>
                        <View style={styles.stepInfo}>
                            <Text style={styles.stepTitle}>KAPAN! 🐢</Text>
                            <Text style={styles.stepDesc}>Başını ve boynunu kollarınla koru. Eğer varsa sağlam bir masanın altına gir.</Text>
                        </View>
                        <Text style={styles.stepEmoji}>🛡️</Text>
                    </View>

                    {/* ADIM 3: TUTUN */}
                    <View style={[styles.stepCard, { borderLeftColor: '#3A86FF' }]}>
                        <View style={styles.stepNumber}><Text style={styles.stepNumberText}>3</Text></View>
                        <View style={styles.stepInfo}>
                            <Text style={styles.stepTitle}>TUTUN! 🤝</Text>
                            <Text style={styles.stepDesc}>Sarsıntı bitene kadar masanın ayağına veya sağlam bir yere sıkıca tutun.</Text>
                        </View>
                        <Text style={styles.stepEmoji}>✊</Text>
                    </View>

                    {/* ÖNEMLİ UYARI KUTUSU */}
                    <View style={styles.alertBox}>
                        <View style={styles.alertHeader}>
                            <Ionicons name="warning" size={24} color="#FF006E" />
                            <Text style={styles.alertTitle}>DİKKAT KAHRAMAN!</Text>
                        </View>
                        <Text style={styles.alertText}>
                            Sarsıntı sırasında asla merdivenlere koşma, balkona çıkma veya asansörü kullanma! En güvenli yer, olduğun yerdeki sağlam bir eşyanın yanıdır.
                        </Text>
                    </View>

                    {/* BİLGİ NOTU */}
                    <View style={styles.finalNote}>
                        <Text style={styles.finalNoteText}>
                            ✨ Bu hareketi ailenle birlikte evde prova yaparak bir oyun gibi çalışabilirsin!
                        </Text>
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
        backgroundColor: '#FFF1EB',
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
    heroMainText: { fontSize: 26, fontWeight: '900', color: 'white', textAlign: 'center' },
    heroSubText: { fontSize: 14, color: 'white', textAlign: 'center', marginTop: 10, opacity: 0.9, lineHeight: 20 },

    contentWrapper: { padding: 20 },
    
    stepCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 20,
        marginBottom: 15,
        alignItems: 'center',
        borderLeftWidth: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    stepNumber: {
        width: 35,
        height: 35,
        borderRadius: 17.5,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    stepNumberText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
    stepInfo: { flex: 1 },
    stepTitle: { fontSize: 18, fontWeight: '900', color: '#333' },
    stepDesc: { fontSize: 14, color: '#666', marginTop: 4, lineHeight: 18 },
    stepEmoji: { fontSize: 30, marginLeft: 10 },

    alertBox: {
        backgroundColor: '#FFE5EC',
        padding: 20,
        borderRadius: 25,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#FF006E',
        borderStyle: 'dashed',
    },
    alertHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    alertTitle: { color: '#FF006E', fontWeight: '900', marginLeft: 10, fontSize: 16 },
    alertText: {
        color: '#333',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 20,
    },

    finalNote: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#F0F2F5',
        borderRadius: 20,
        alignItems: 'center',
    },
    finalNoteText: {
        color: '#555',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    }
});