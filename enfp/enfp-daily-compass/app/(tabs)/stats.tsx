import { useCallback, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ENFPColors } from "../../constants/theme";
import { supabase } from "../../supabase";

type RatingLog = {
  rating: number;
  rated_at: string;
  facts: { content: string; category: string } | null;
};

export default function StatsScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const [logs, setLogs] = useState<RatingLog[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "rating-asc" | "rating-desc">(
    "date",
  );
  const bannerHeight = Math.max(160, Math.min(240, Math.round(width * 0.34)));

  const fetchStats = async () => {
    const { data, error } = await supabase
      .from("daily_ratings")
      .select(
        `
    rating, 
    rated_at, 
    facts!daily_ratings_fact_id_fkey (
      content, 
      category
    )
  `,
      )
      .order("rated_at", { ascending: false });

    if (error) {
      console.error("Error fetching stats:", error);
    } else if (data) {
      setLogs(data as unknown as RatingLog[]);
    }
  };

  // Fetch stats when tab is focused
  useFocusEffect(
    useCallback(() => {
      fetchStats();
    }, []),
  );

  const avgRating =
    logs.length > 0
      ? (
          logs.reduce((acc, curr) => acc + curr.rating, 0) / logs.length
        ).toFixed(1)
      : "0";

  const sortedLogs = [...logs].sort((a, b) => {
    if (sortBy === "rating-asc") return a.rating - b.rating;
    if (sortBy === "rating-desc") return b.rating - a.rating;

    return new Date(b.rated_at).getTime() - new Date(a.rated_at).getTime();
  });

  return (
    <ScrollView style={styles.container}>
      <View
        style={[
          styles.headerBanner,
          {
            height: bannerHeight,
            paddingTop: insets.top + 18,
            paddingBottom: 18,
          },
        ]}
      >
        <View style={styles.bannerArt}>
          <View
            style={[styles.bannerDot, { backgroundColor: ENFPColors.coral }]}
          />
          <View
            style={[styles.bannerDot, { backgroundColor: ENFPColors.gold }]}
          />
          <View
            style={[styles.bannerDot, { backgroundColor: ENFPColors.mint }]}
          />
          <View
            style={[styles.bannerDot, { backgroundColor: ENFPColors.violet }]}
          />
        </View>
        <View style={styles.bannerGlowOne} />
        <View style={styles.bannerGlowTwo} />
        <View style={styles.bannerCurve} />
        <View style={styles.bannerCurveSoft} />
        <View style={styles.bannerAccent} />
      </View>
      <View style={styles.sortRow}>
        <TouchableOpacity
          onPress={() => setSortBy("date")}
          style={[styles.sortChip, sortBy === "date" && styles.activeSortChip]}
        >
          <Text
            style={sortBy === "date" ? styles.activeSortText : styles.sortText}
          >
            Date
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSortBy("rating-asc")}
          style={[
            styles.sortChip,
            sortBy === "rating-asc" && styles.activeSortChip,
          ]}
        >
          <Text
            style={
              sortBy === "rating-asc" ? styles.activeSortText : styles.sortText
            }
          >
            Rating Low to High
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSortBy("rating-desc")}
          style={[
            styles.sortChip,
            sortBy === "rating-desc" && styles.activeSortChip,
          ]}
        >
          <Text
            style={
              sortBy === "rating-desc" ? styles.activeSortText : styles.sortText
            }
          >
            Rating High to Low
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statCard}>
        <Text style={styles.statLabel}>Agreement Level</Text>
        <Text style={styles.statValue}>{avgRating}</Text>
        <Text style={styles.statSub}>Based on {logs.length} insights</Text>
      </View>

      {sortedLogs.map((log, i) => (
        <View key={i} style={styles.logItem}>
          <Text style={styles.logContent}>
            {log.facts?.content || "Deleted Insight"}
          </Text>
          <View style={styles.logMeta}>
            <Text style={styles.logRating}>Rating: {log.rating}</Text>
            <Text style={styles.logDate}>
              {new Date(log.rated_at).toLocaleDateString()}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ENFPColors.cream,
    paddingBottom: 20,
  },
  headerBanner: {
    backgroundColor: ENFPColors.coral,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
    marginBottom: 16,
    position: "relative",
  },
  bannerArt: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    zIndex: 2,
  },
  bannerDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    opacity: 0.95,
  },
  bannerGlowOne: {
    position: "absolute",
    right: -30,
    top: -20,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
  },
  bannerGlowTwo: {
    position: "absolute",
    left: -40,
    bottom: -30,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255, 255, 255, 0.09)",
  },
  bannerCurve: {
    position: "absolute",
    right: -20,
    bottom: -28,
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 12,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  bannerCurveSoft: {
    position: "absolute",
    left: 90,
    bottom: -45,
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 10,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  bannerAccent: {
    position: "absolute",
    left: 22,
    top: 18,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  sortRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 4,
  },
  sortChip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderWidth: 1,
    borderColor: "rgba(31,41,55,0.06)",
  },
  activeSortChip: { backgroundColor: ENFPColors.coral },
  sortText: { color: ENFPColors.ink, fontWeight: "600", fontSize: 12 },
  activeSortText: { color: "#FFFFFF", fontWeight: "700", fontSize: 12 },
  statCard: {
    backgroundColor: ENFPColors.paper,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: 20,
    borderLeftWidth: 4,
    borderLeftColor: ENFPColors.coral,
    shadowColor: "#1F2937",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 4,
  },
  statLabel: {
    fontSize: 12,
    color: ENFPColors.muted,
    marginBottom: 8,
    letterSpacing: 1.1,
    textTransform: "uppercase",
  },
  statValue: { fontSize: 36, fontWeight: "bold", color: ENFPColors.ink },
  statSub: { fontSize: 12, color: ENFPColors.muted, marginTop: 4 },
  logItem: {
    backgroundColor: ENFPColors.paper,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 20,
    shadowColor: "#1F2937",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 3,
  },
  logContent: {
    fontSize: 14,
    color: ENFPColors.ink,
    marginBottom: 10,
    lineHeight: 20,
  },
  logMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logRating: { fontSize: 12, fontWeight: "600", color: ENFPColors.coral },
  logDate: { fontSize: 12, color: ENFPColors.muted },
});
