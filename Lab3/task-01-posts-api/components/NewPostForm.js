import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function NewPostForm({
  theme,
  title,
  body,
  userId,
  onChangeTitle,
  onChangeBody,
  onChangeUserId,
  onSubmit,
  submitting,
  feedback,
  serverResponse,
}) {
  return (
    <View
      style={[
        styles.wrapper,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <Text style={[styles.heading, { color: theme.text }]}>Create new post</Text>
      <Text style={[styles.subheading, { color: theme.muted }]}>
        POST /posts
      </Text>

      <Field
        label="Title"
        value={title}
        onChangeText={onChangeTitle}
        placeholder="Post title"
        theme={theme}
      />
      <Field
        label="Body"
        value={body}
        onChangeText={onChangeBody}
        placeholder="Post content"
        multiline
        theme={theme}
      />
      <Field
        label="User ID"
        value={userId}
        onChangeText={onChangeUserId}
        placeholder="e.g. 1"
        keyboardType="number-pad"
        theme={theme}
      />

      <Pressable
        onPress={onSubmit}
        disabled={submitting}
        style={({ pressed }) => [
          styles.submit,
          {
            backgroundColor: theme.primary,
            opacity: pressed || submitting ? 0.7 : 1,
          },
        ]}
      >
        <Text style={[styles.submitText, { color: theme.primaryText }]}>
          {submitting ? "Sending..." : "Send"}
        </Text>
      </Pressable>

      {feedback ? (
        <View
          style={[
            styles.feedback,
            {
              backgroundColor:
                feedback.type === "success" ? theme.successBg : theme.errorBg,
            },
          ]}
        >
          <Text
            style={{
              color: feedback.type === "success" ? theme.success : theme.error,
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            {feedback.type === "success" ? "✓ " : "⚠ "}
            {feedback.message}
          </Text>
        </View>
      ) : null}

      {serverResponse ? (
        <View
          style={[
            styles.responseBlock,
            { backgroundColor: theme.surfaceAlt, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.responseTitle, { color: theme.muted }]}>
            Server response
          </Text>
          <Text style={[styles.responseBody, { color: theme.text }]}>
            {JSON.stringify(serverResponse, null, 2)}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

function Field({ label, multiline, theme, ...rest }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
      <TextInput
        {...rest}
        multiline={!!multiline}
        placeholderTextColor={theme.muted}
        style={[
          styles.input,
          multiline && styles.multiline,
          {
            backgroundColor: theme.surfaceAlt,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    margin: 16,
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
  },
  heading: { fontSize: 17, fontWeight: "700" },
  subheading: { fontSize: 12, marginTop: 2, marginBottom: 12 },
  label: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  multiline: { minHeight: 80, textAlignVertical: "top" },
  submit: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  submitText: { fontSize: 15, fontWeight: "700" },
  feedback: {
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  responseBlock: {
    marginTop: 12,
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
  },
  responseTitle: {
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  responseBody: {
    fontFamily: "Courier",
    fontSize: 12,
    lineHeight: 16,
  },
});
