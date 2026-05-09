import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors, ENFPColors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const insets = useSafeAreaInsets();
  const tabBarBottomPadding = Math.max(insets.bottom, 8);
  const tabBarHeight = 56 + tabBarBottomPadding;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: isDark ? "#C7CDD6" : "#8C7D73",
        tabBarActiveBackgroundColor: "rgba(255,255,255,0.45)",
        tabBarInactiveBackgroundColor: "transparent",
        tabBarStyle: {
          backgroundColor: isDark ? "#111827" : "#FFF9F4",
          borderTopColor: isDark
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,107,107,0.18)",
          borderTopWidth: 1,
          height: tabBarHeight,
          paddingTop: 6,
          paddingBottom: tabBarBottomPadding,
          shadowColor: "#000",
          shadowOpacity: isDark ? 0.18 : 0.08,
          shadowOffset: { width: 0, height: -3 },
          shadowRadius: 14,
          elevation: 18,
        },
        tabBarItemStyle: {
          borderRadius: 18,
          marginHorizontal: 8,
          marginVertical: 0,
          paddingTop: 2,
          paddingBottom: 2,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 0,
        },
        tabBarBackground: () => (
          <View style={styles.tabBarBackground}>
            <View style={styles.coralOrb} />
            <View style={styles.goldOrb} />
            <View style={styles.mintOrb} />
            <View style={styles.violetOrb} />
          </View>
        ),
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="daily"
        options={{
          title: "Daily",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="sparkles" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Stats",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="chart.bar.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: ENFPColors.cream,
    overflow: "hidden",
  },
  coralOrb: {
    position: "absolute",
    left: -18,
    top: -10,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(255, 107, 107, 0.28)",
  },
  goldOrb: {
    position: "absolute",
    left: 90,
    top: -22,
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "rgba(244, 201, 93, 0.26)",
  },
  mintOrb: {
    position: "absolute",
    right: 80,
    top: -18,
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "rgba(87, 196, 173, 0.24)",
  },
  violetOrb: {
    position: "absolute",
    right: -20,
    top: 0,
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(139, 123, 255, 0.22)",
  },
});
