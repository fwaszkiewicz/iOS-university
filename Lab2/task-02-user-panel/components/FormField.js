import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  multiline,
  secureTextEntry,
  rightSlot,
  helperText,
  helperColor,
  theme,
}) {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.muted}
          multiline={!!multiline}
          secureTextEntry={!!secureTextEntry}
          style={[
            styles.input,
            multiline && styles.multiline,
            {
              backgroundColor: theme.inputBg,
              borderColor: theme.border,
              color: theme.text,
            },
          ]}
        />
        {rightSlot ? <View style={styles.rightSlot}>{rightSlot}</View> : null}
      </View>
      {helperText ? (
        <Text style={[styles.helper, { color: helperColor || theme.muted }]}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 14 },
  label: { fontSize: 12, fontWeight: "600", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 },
  inputRow: { flexDirection: "row", alignItems: "stretch" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  multiline: { minHeight: 90, textAlignVertical: "top" },
  rightSlot: { marginLeft: 8, justifyContent: "center" },
  helper: { fontSize: 12, marginTop: 4 },
});
