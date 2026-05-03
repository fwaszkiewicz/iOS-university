import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileCard({ name, city, bio, theme }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <View style={[styles.avatar, { backgroundColor: theme.avatarBg }]}>
        <Text style={[styles.avatarText, { color: theme.avatarText }]}>
          {initials || "?"}
        </Text>
      </View>
      <Text style={[styles.name, { color: theme.text }]}>{name || "—"}</Text>
      <Text style={[styles.city, { color: theme.muted }]}>📍 {city || "Unknown"}</Text>
      {bio ? (
        <Text style={[styles.bio, { color: theme.text }]}>{bio}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: { fontSize: 28, fontWeight: "800" },
  name: { fontSize: 20, fontWeight: "700" },
  city: { fontSize: 14, marginTop: 4 },
  bio: { fontSize: 14, marginTop: 12, textAlign: "center", lineHeight: 20 },
});
