import React from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";

export default function Header({ theme, isDark, onToggleTheme, onRefresh, refreshing }) {
  return (
    <View style={[styles.wrap, { backgroundColor: theme.surface, borderBottomColor: theme.border }]}>
      <View style={styles.titleBlock}>
        <Text style={[styles.title, { color: theme.text }]}>Weather here & now</Text>
        <Text style={[styles.subtitle, { color: theme.muted }]}>
          Open-Meteo · GPS location
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={onRefresh}
          disabled={refreshing}
          style={({ pressed }) => [
            styles.btn,
            {
              backgroundColor: theme.primary,
              opacity: pressed || refreshing ? 0.7 : 1,
            },
          ]}
        >
          {refreshing ? (
            <ActivityIndicator size="small" color={theme.primaryText} />
          ) : (
            <Text style={[styles.btnText, { color: theme.primaryText }]}>
              ↻ Refresh
            </Text>
          )}
        </Pressable>

        <Pressable
          onPress={onToggleTheme}
          style={({ pressed }) => [
            styles.btnGhost,
            {
              borderColor: theme.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text style={[styles.btnGhostText, { color: theme.text }]}>
            {isDark ? "☀︎" : "☾"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleBlock: { flexShrink: 1 },
  title: { fontSize: 20, fontWeight: "800" },
  subtitle: { fontSize: 12, marginTop: 2 },
  actions: { flexDirection: "row", gap: 8 },
  btn: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
    minWidth: 92,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { fontSize: 13, fontWeight: "700" },
  btnGhost: {
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    borderWidth: 1,
    minWidth: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  btnGhostText: { fontSize: 14, fontWeight: "700" },
});
