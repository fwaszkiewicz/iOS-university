import React from "react";
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";

export default function PostCard({
  post,
  theme,
  expanded,
  comments,
  commentsLoading,
  commentsError,
  onToggleComments,
  onDelete,
  deleting,
}) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.surface, borderColor: theme.border },
      ]}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.idTag, { color: theme.primary }]}>
          #{post.id} · user {post.userId}
        </Text>
        <Pressable
          onPress={() => onDelete(post.id)}
          disabled={deleting}
          style={({ pressed }) => [
            styles.deleteBtn,
            {
              borderColor: theme.danger,
              opacity: pressed || deleting ? 0.5 : 1,
            },
          ]}
        >
          <Text style={[styles.deleteBtnText, { color: theme.danger }]}>
            {deleting ? "..." : "Delete"}
          </Text>
        </Pressable>
      </View>
      <Text style={[styles.title, { color: theme.text }]}>{post.title}</Text>
      <Text style={[styles.body, { color: theme.muted }]}>{post.body}</Text>

      <Pressable
        onPress={() => onToggleComments(post.id)}
        style={({ pressed }) => [
          styles.commentsBtn,
          {
            borderColor: theme.border,
            backgroundColor: expanded ? theme.surfaceAlt : "transparent",
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <Text style={[styles.commentsBtnText, { color: theme.text }]}>
          {expanded ? "Hide comments" : "Show comments"}
        </Text>
      </Pressable>

      {expanded ? (
        <View style={styles.commentsBlock}>
          {commentsLoading ? (
            <ActivityIndicator color={theme.primary} />
          ) : commentsError ? (
            <Text style={{ color: theme.error, fontSize: 13 }}>
              ⚠ {commentsError}
            </Text>
          ) : comments && comments.length > 0 ? (
            comments.map((c) => (
              <View
                key={c.id}
                style={[styles.comment, { borderTopColor: theme.border }]}
              >
                <Text style={[styles.commentName, { color: theme.text }]}>
                  {c.name}
                </Text>
                <Text style={[styles.commentEmail, { color: theme.muted }]}>
                  {c.email}
                </Text>
                <Text style={[styles.commentBody, { color: theme.text }]}>
                  {c.body}
                </Text>
              </View>
            ))
          ) : (
            <Text style={{ color: theme.muted, fontSize: 13 }}>No comments.</Text>
          )}
        </View>
      ) : null}
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
  idTag: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  deleteBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 8,
  },
  deleteBtnText: { fontSize: 12, fontWeight: "600" },
  title: { fontSize: 16, fontWeight: "700", marginBottom: 6 },
  body: { fontSize: 14, lineHeight: 20 },
  commentsBtn: {
    marginTop: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
  },
  commentsBtnText: { fontSize: 13, fontWeight: "600" },
  commentsBlock: { marginTop: 8 },
  comment: {
    paddingTop: 8,
    marginTop: 8,
    borderTopWidth: 1,
  },
  commentName: { fontSize: 13, fontWeight: "700" },
  commentEmail: { fontSize: 12, marginBottom: 4 },
  commentBody: { fontSize: 13, lineHeight: 18 },
});
