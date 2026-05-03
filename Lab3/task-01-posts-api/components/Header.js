import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Header({ theme, isDark, onToggleTheme, onRefresh, refreshing }) {
  return (
    <View style={[styles.wrapper, { borderBottomColor: theme.border }]}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: theme.text }]}>Posts API</Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>
            REST client for jsonplaceholder.dev
          </Text>
        </View>
        <Pressable
          onPress={onRefresh}
          disabled={refreshing}
          style={({ pressed }) => [
            styles.btn,
            {
              backgroundColor: theme.chip,
              borderColor: theme.border,
              opacity: pressed || refreshing ? 0.6 : 1,
            },
          ]}
        >
          <Text style={[styles.btnText, { color: theme.text }]}>
            {refreshing ? "..." : "↻"}
          </Text>
        </Pressable>
        <Pressable
          onPress={onToggleTheme}
          style={({ pressed }) => [
            styles.btn,
            {
              backgroundColor: theme.chip,
              borderColor: theme.border,
              opacity: pressed ? 0.7 : 1,
              marginLeft: 8,
            },
          ]}
        >
          <Text style={[styles.btnText, { color: theme.text }]}>
            {isDark ? "Light" : "Dark"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  row: { flexDirection: "row", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "800" },
  subtitle: { fontSize: 13, marginTop: 4 },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  btnText: { fontSize: 13, fontWeight: "600" },
});
