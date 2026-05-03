import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function EventCard({ id, title, date, category, location, favorite, badge, onToggleFavorite, theme }) {
  const badgeColor =
    badge === "New" ? theme.badgeNew : badge === "Popular" ? theme.badgePopular : null;

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.category, { color: theme.primary }]}>{category}</Text>
        {badge ? (
          <View style={[styles.badge, { backgroundColor: badgeColor }]}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ) : null}
      </View>
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
        {title}
      </Text>
      <View style={styles.metaRow}>
        <Text style={[styles.meta, { color: theme.muted }]}>📅 {date}</Text>
        <Text style={[styles.meta, { color: theme.muted }]}>📍 {location}</Text>
      </View>
      <Pressable
        onPress={() => onToggleFavorite(id)}
        style={({ pressed }) => [
          styles.favBtn,
          {
            backgroundColor: favorite ? theme.favorite : "transparent",
            borderColor: favorite ? theme.favorite : theme.border,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <Text
          style={[
            styles.favText,
            { color: favorite ? "#fff" : theme.text },
          ]}
        >
          {favorite ? "★ Saved to favorites" : "☆ Add to favorites"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  category: { fontSize: 12, fontWeight: "700", textTransform: "uppercase", letterSpacing: 0.5 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  title: { fontSize: 17, fontWeight: "700", marginBottom: 8 },
  metaRow: { gap: 4, marginBottom: 12 },
  meta: { fontSize: 13 },
  favBtn: {
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
  },
  favText: { fontSize: 13, fontWeight: "600" },
});
