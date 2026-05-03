import React from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";

export default function CategoryFilter({ categories, activeCategory, onSelect, theme }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {categories.map((cat) => {
        const active = cat === activeCategory;
        return (
          <Pressable
            key={cat}
            onPress={() => onSelect(cat)}
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
                { color: active ? theme.chipActiveText : theme.chipText, fontWeight: active ? "700" : "500" },
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 8,
  },
  chipText: { fontSize: 13 },
});
