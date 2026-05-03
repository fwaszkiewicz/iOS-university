import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function Header({ visibleCount, theme, isDark, onToggleTheme }) {
  return (
    <View style={[styles.wrapper, { borderBottomColor: theme.border }]}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: theme.text }]}>Event Catalog</Text>
          <Text style={[styles.subtitle, { color: theme.muted }]}>
            Discover upcoming events around your campus and city.
          </Text>
        </View>
        <Pressable
          onPress={onToggleTheme}
          style={({ pressed }) => [
            styles.themeBtn,
            {
              backgroundColor: theme.chip,
              borderColor: theme.border,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text style={[styles.themeBtnText, { color: theme.text }]}>
            {isDark ? "Light" : "Dark"}
          </Text>
        </Pressable>
      </View>
      <Text style={[styles.count, { color: theme.muted }]}>
        Visible results: <Text style={{ color: theme.text, fontWeight: "700" }}>{visibleCount}</Text>
      </Text>
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
  row: { flexDirection: "row", alignItems: "flex-start" },
  title: { fontSize: 24, fontWeight: "800" },
  subtitle: { fontSize: 13, marginTop: 4 },
  count: { fontSize: 13, marginTop: 12 },
  themeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  themeBtnText: { fontSize: 13, fontWeight: "600" },
});
