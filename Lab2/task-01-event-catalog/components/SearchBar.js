import React from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";

export default function SearchBar({ value, onChangeText, theme, favoritesOnly, onToggleFavoritesOnly }) {
  return (
    <View style={styles.wrapper}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search events by name..."
        placeholderTextColor={theme.muted}
        style={[
          styles.input,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
      />
      <Pressable
        onPress={onToggleFavoritesOnly}
        style={({ pressed }) => [
          styles.favBtn,
          {
            backgroundColor: favoritesOnly ? theme.favorite : theme.chip,
            borderColor: theme.border,
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <Text
          style={[
            styles.favBtnText,
            { color: favoritesOnly ? "#fff" : theme.text },
          ]}
        >
          {favoritesOnly ? "★ Favorites" : "☆ Favorites"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  favBtn: {
    paddingHorizontal: 12,
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  favBtnText: { fontSize: 13, fontWeight: "600" },
});
