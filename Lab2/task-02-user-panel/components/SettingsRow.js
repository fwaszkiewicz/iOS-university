import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function SettingsRow({ icon, title, subtitle, value, onToggle, type = "toggle", danger, theme }) {
  const isToggle = type === "toggle";

  return (
    <Pressable
      onPress={onToggle}
      style={({ pressed }) => [
        styles.row,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <View style={[styles.icon, { backgroundColor: theme.surfaceAlt }]}>
        <Text style={{ fontSize: 18 }}>{icon}</Text>
      </View>
      <View style={styles.middle}>
        <Text style={[styles.title, { color: danger ? theme.danger : theme.text }]}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: theme.muted }]}>{subtitle}</Text>
        ) : null}
      </View>
      {isToggle ? (
        <View
          style={[
            styles.toggle,
            {
              backgroundColor: value ? theme.primary : theme.border,
            },
          ]}
        >
          <View
            style={[
              styles.toggleKnob,
              {
                backgroundColor: theme.surface,
                transform: [{ translateX: value ? 18 : 2 }],
              },
            ]}
          />
        </View>
      ) : (
        <Text style={[styles.chev, { color: theme.muted }]}>›</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 8,
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  middle: { flex: 1 },
  title: { fontSize: 15, fontWeight: "600" },
  subtitle: { fontSize: 12, marginTop: 2 },
  toggle: {
    width: 42,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
  },
  toggleKnob: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  chev: { fontSize: 24, fontWeight: "300" },
});
