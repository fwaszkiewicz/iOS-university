import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function StatusBanner({ theme, kind = "info", title, message, actionLabel, onAction }) {
  const palette = paletteFor(theme, kind);

  return (
    <View
      style={[
        styles.wrap,
        { backgroundColor: palette.bg, borderColor: palette.border },
      ]}
    >
      <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
      {message ? (
        <Text style={[styles.message, { color: palette.text }]}>{message}</Text>
      ) : null}
      {actionLabel ? (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => [
            styles.btn,
            {
              backgroundColor: palette.btnBg,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <Text style={[styles.btnText, { color: palette.btnText }]}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function paletteFor(theme, kind) {
  switch (kind) {
    case "error":
      return {
        bg: theme.errorBg,
        border: theme.error,
        text: theme.error,
        btnBg: theme.error,
        btnText: "#ffffff",
      };
    case "warning":
      return {
        bg: theme.warningBg,
        border: theme.warning,
        text: theme.warning,
        btnBg: theme.warning,
        btnText: "#ffffff",
      };
    default:
      return {
        bg: theme.surfaceAlt,
        border: theme.border,
        text: theme.text,
        btnBg: theme.primary,
        btnText: theme.primaryText,
      };
  }
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  title: { fontSize: 15, fontWeight: "700" },
  message: { fontSize: 13, marginTop: 6, lineHeight: 18 },
  btn: {
    alignSelf: "flex-start",
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 10,
  },
  btnText: { fontSize: 13, fontWeight: "700" },
});
