import { Stack } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Linking,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

/* 🔑 NewsAPI Key */
const NEWS_API_KEY = "ba6e41b472f645d9ab68ba64d0dbbec6";

/* 🎯 Deprem & Afet Anahtar Kelimeleri */
const KEYWORDS = ["deprem", "sarsıntı", "artçı", "fay", "afet", "enkaz", "çökme", "acil"];

/* 🌍 NewsAPI URL */
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=deprem OR afet OR sarsıntı OR artçı OR fay&language=tr&sortBy=publishedAt&pageSize=50&apiKey=${NEWS_API_KEY}`;

export default function News() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [news, setNews] = useState<any[]>([]);

  const fetchNews = async () => {
    try {
      const response = await fetch(NEWS_API_URL);
      const json = await response.json();
      setNews(json.articles || []);
    } catch (error) {
      console.log("Haber çekme hatası:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchNews();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchNews();
  }, []);

  const filteredNews = news.filter((item) =>
    KEYWORDS.some((key) =>
      (item.title + item.description)?.toLowerCase().includes(key)
    )
  );

  const openNews = (url: string) => {
    if (url) Linking.openURL(url);
  };

  const renderItem = ({ item }: { item: any }) => {
    const isBreaking = item.title?.toLowerCase().includes("deprem");

    return (
      <TouchableOpacity
        style={styles.newsCard}
        onPress={() => openNews(item.url)}
        activeOpacity={0.9}
      >
        <View style={styles.imageContainer}>
          {item.urlToImage ? (
            <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
          ) : (
            <View style={styles.noImagePlaceholder}>
              <Text style={styles.noImageText}>Görsel Bulunmuyor</Text>
            </View>
          )}
          {isBreaking && (
            <View style={styles.breakingBadge}>
              <Text style={styles.breakingText}>SON DAKİKA</Text>
            </View>
          )}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.newsSource}>
            {item.source?.name || "Haber Merkezi"}
          </Text>
          <Text style={styles.newsTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.newsDesc} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.newsFooter}>
            <View style={styles.timeDot} />
            <Text style={styles.newsDate}>
              {new Date(item.publishedAt).toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* ✅ Expo Router Stack Screen */}
      <Stack.Screen options={{ title: " Haberler " }} />

      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#D32F2F" />
          <Text style={styles.loadingText}>Güncel bilgiler alınıyor...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredNews}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#D32F2F"]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                Henüz yeni bir haber bulunamadı.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#555",
    fontSize: 14,
    fontWeight: "500",
  },
  listContent: {
    padding: 16,
    paddingTop: 10,
  },
  newsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 200,
  },
  newsImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  noImagePlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E9ECEF",
    justifyContent: "center",
    alignItems: "center",
  },
  noImageText: {
    color: "#ADB5BD",
    fontSize: 14,
  },
  breakingBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#D32F2F",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  breakingText: {
    color: "#FFF",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  textContainer: {
    padding: 16,
  },
  newsSource: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#D32F2F",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  newsTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#212529",
    lineHeight: 24,
    marginBottom: 8,
  },
  newsDesc: {
    fontSize: 14,
    color: "#6C757D",
    lineHeight: 20,
    marginBottom: 12,
  },
  newsFooter: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F1F3F5",
    paddingTop: 10,
  },
  timeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#CED4DA",
    marginRight: 8,
  },
  newsDate: {
    fontSize: 12,
    color: "#ADB5BD",
  },
  emptyState: {
    marginTop: 100,
    alignItems: "center",
  },
  emptyStateText: {
    color: "#6C757D",
    fontSize: 16,
  },
});
