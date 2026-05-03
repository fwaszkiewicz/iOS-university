import React from "react";
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";

export default function UserFilter({ userIds, activeUserId, onSelect, theme }) {
  return (
    <View>
      <Text style={[styles.label, { color: theme.muted }]}>Filter by user ID</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        <Chip
          label="All"
          active={activeUserId === null}
          onPress={() => onSelect(null)}
          theme={theme}
        />
        {userIds.map((uid) => (
          <Chip
            key={uid}
            label={`#${uid}`}
            active={activeUserId === uid}
            onPress={() => onSelect(uid)}
            theme={theme}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function Chip({ label, active, onPress, theme }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: active ? theme.chipActive : theme.chip,
          borderColor: active ? theme.chipActive : theme.border,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.chipText,
          {
            color: active ? theme.chipActiveText : theme.chipText,
            fontWeight: active ? "700" : "500",
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 12,
    marginHorizontal: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  row: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 8,
  },
  chipText: { fontSize: 13 },
});
