import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ENFPColors } from "../../constants/theme";
import { supabase } from "../../supabase";

type Fact = { id: string; content: string; category: string; sub_type: string };

const ratingColors = [
  ENFPColors.coral,
  ENFPColors.peach,
  ENFPColors.gold,
  ENFPColors.mint,
  ENFPColors.violet,
];

export default function DailyScreen() {
  const [fact, setFact] = useState<Fact | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // --- 1. Fetch Today's Fact ---
  const fetchFact = async () => {
    setFact(null);
    setSubmitted(false);
    const { data, error } = await supabase.rpc("get_daily_facts", {
      limit_count: 1,
    });
    if (error) console.error("Error fetching:", error);
    if (data) setFact(data[0]);
  };

  // --- 2. Submit Rating ---
  const rateFact = async (score: number) => {
    if (!fact) return;
    setIsSubmitting(true);

    const { error } = await supabase
      .from("daily_ratings")
      .insert([{ fact_id: fact.id, rating: score }]);

    if (error) {
      console.error("Error submitting rating:", error);
    } else {
      setSubmitted(true);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    fetchFact();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.blobOne} />
      <View style={styles.blobTwo} />
      <View style={styles.content}>
        <View style={styles.card}>
          <View style={styles.motifRow}>
            <View
              style={[styles.motifDot, { backgroundColor: ENFPColors.coral }]}
            />
            <View
              style={[styles.motifDot, { backgroundColor: ENFPColors.gold }]}
            />
            <View
              style={[styles.motifDot, { backgroundColor: ENFPColors.mint }]}
            />
            <View
              style={[styles.motifDot, { backgroundColor: ENFPColors.violet }]}
            />
          </View>

          {fact ? (
            <>
              <Text style={styles.factText}>{fact.content}</Text>
              <Text style={styles.metaText}>
                {fact.category} • {fact.sub_type.toUpperCase()}
              </Text>

              {!submitted ? (
                <View style={styles.ratingRow}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <TouchableOpacity
                      key={s}
                      style={[
                        styles.rateCircle,
                        {
                          borderColor: ratingColors[s - 1],
                          backgroundColor: `${ratingColors[s - 1]}1A`,
                        },
                      ]}
                      onPress={() => rateFact(s)}
                      disabled={isSubmitting}
                    >
                      <Text
                        style={[
                          styles.scoreText,
                          { color: ratingColors[s - 1] },
                        ]}
                      >
                        {s}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={styles.successContainer}>
                  <Text style={styles.successText}>Logged!</Text>
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={fetchFact}
                  >
                    <Text style={styles.nextButtonText}>Next</Text>
                  </TouchableOpacity>
                </View>
              )}
            </>
          ) : (
            <ActivityIndicator size="large" />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: ENFPColors.cream },
  blobOne: {
    position: "absolute",
    top: -50,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(139, 123, 255, 0.16)",
  },
  blobTwo: {
    position: "absolute",
    bottom: 40,
    left: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(87, 196, 173, 0.14)",
  },
  content: { flex: 1, paddingHorizontal: 20, justifyContent: "center" },
  card: {
    backgroundColor: ENFPColors.paper,
    borderRadius: 32,
    padding: 24,
    shadowColor: "#1F2937",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 28,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
  },
  motifRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 22,
  },
  motifDot: { width: 11, height: 11, borderRadius: 999 },
  factText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    lineHeight: 32,
    color: ENFPColors.ink,
  },
  metaText: {
    fontSize: 12,
    color: ENFPColors.muted,
    textAlign: "center",
    marginBottom: 40,
    letterSpacing: 1,
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 6,
  },
  rateCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: { fontSize: 18, fontWeight: "700" },
  successContainer: { alignItems: "center" },
  successText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: ENFPColors.coral,
  },
  nextButton: {
    backgroundColor: ENFPColors.coral,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 999,
  },
  nextButtonText: { color: "white", fontWeight: "bold" },
});
