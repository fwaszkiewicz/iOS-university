import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import Header from "./components/Header";
import PostCard from "./components/PostCard";
import NewPostForm from "./components/NewPostForm";
import UserFilter from "./components/UserFilter";
import {
  fetchPosts,
  createPost,
  deletePost,
  fetchComments,
} from "./api/posts";
import { lightTheme, darkTheme } from "./theme";

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeUserId, setActiveUserId] = useState(null);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [serverResponse, setServerResponse] = useState(null);

  const [expandedId, setExpandedId] = useState(null);
  const [comments, setComments] = useState({});
  const [commentsLoading, setCommentsLoading] = useState({});
  const [commentsError, setCommentsError] = useState({});
  const [deletingId, setDeletingId] = useState(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const userIds = useMemo(() => {
    const set = new Set(posts.map((p) => p.userId).filter((u) => u != null));
    return Array.from(set).sort((a, b) => a - b);
  }, [posts]);

  const visiblePosts = useMemo(() => {
    if (activeUserId == null) return posts;
    return posts.filter((p) => p.userId === activeUserId);
  }, [posts, activeUserId]);

  const handleSubmit = async () => {
    setFeedback(null);
    setServerResponse(null);

    if (!title.trim() || !body.trim() || !userId.trim()) {
      setFeedback({ type: "error", message: "All fields are required." });
      return;
    }
    if (Number.isNaN(Number(userId))) {
      setFeedback({ type: "error", message: "User ID must be a number." });
      return;
    }

    setSubmitting(true);
    try {
      const created = await createPost({ title, body, userId });
      setServerResponse(created);
      setFeedback({ type: "success", message: "Post created successfully." });
      setTitle("");
      setBody("");
      setUserId("1");

      if (created && typeof created === "object") {
        setPosts((prev) => [created, ...prev]);
      }
    } catch (e) {
      setFeedback({
        type: "error",
        message: e.message || "Failed to send post.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleComments = async (postId) => {
    if (expandedId === postId) {
      setExpandedId(null);
      return;
    }
    setExpandedId(postId);
    if (comments[postId]) return;

    setCommentsLoading((s) => ({ ...s, [postId]: true }));
    setCommentsError((s) => ({ ...s, [postId]: null }));
    try {
      const data = await fetchComments(postId);
      setComments((s) => ({ ...s, [postId]: Array.isArray(data) ? data : [] }));
    } catch (e) {
      setCommentsError((s) => ({
        ...s,
        [postId]: e.message || "Failed to load comments.",
      }));
    } finally {
      setCommentsLoading((s) => ({ ...s, [postId]: false }));
    }
  };

  const handleDelete = async (postId) => {
    setDeletingId(postId);
    try {
      await deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      if (expandedId === postId) setExpandedId(null);
    } catch (e) {
      setFeedback({
        type: "error",
        message: e.message || "Failed to delete post.",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const renderListHeader = () => (
    <>
      <NewPostForm
        theme={theme}
        title={title}
        body={body}
        userId={userId}
        onChangeTitle={setTitle}
        onChangeBody={setBody}
        onChangeUserId={setUserId}
        onSubmit={handleSubmit}
        submitting={submitting}
        feedback={feedback}
        serverResponse={serverResponse}
      />
      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <UserFilter
        userIds={userIds}
        activeUserId={activeUserId}
        onSelect={setActiveUserId}
        theme={theme}
      />

      <View style={styles.listMeta}>
        <Text style={[styles.listTitle, { color: theme.text }]}>
          Posts {activeUserId != null ? `(user ${activeUserId})` : ""}
        </Text>
        <Text style={[styles.listCount, { color: theme.muted }]}>
          {visiblePosts.length} item{visiblePosts.length === 1 ? "" : "s"}
        </Text>
      </View>
    </>
  );

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.statusText, { color: theme.muted }]}>
            Loading posts from server...
          </Text>
        </View>
      );
    }
    if (error) {
      return (
        <View style={styles.centered}>
          <Text style={[styles.errorTitle, { color: theme.error }]}>
            ⚠ Connection error
          </Text>
          <Text style={[styles.statusText, { color: theme.muted }]}>{error}</Text>
          <Pressable
            onPress={loadPosts}
            style={({ pressed }) => [
              styles.retryBtn,
              {
                backgroundColor: theme.primary,
                opacity: pressed ? 0.8 : 1,
              },
            ]}
          >
            <Text style={[styles.retryBtnText, { color: theme.primaryText }]}>
              Try again
            </Text>
          </Pressable>
        </View>
      );
    }
    return (
      <View style={styles.centered}>
        <Text style={[styles.statusText, { color: theme.muted }]}>
          No posts to display.
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <Header
        theme={theme}
        isDark={isDark}
        onToggleTheme={() => setIsDark((v) => !v)}
        onRefresh={loadPosts}
        refreshing={loading}
      />
      <FlatList
        data={visiblePosts}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            theme={theme}
            expanded={expandedId === item.id}
            comments={comments[item.id]}
            commentsLoading={!!commentsLoading[item.id]}
            commentsError={commentsError[item.id]}
            onToggleComments={handleToggleComments}
            onDelete={handleDelete}
            deleting={deletingId === item.id}
          />
        )}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={{ paddingBottom: 32 }}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  divider: { height: 1, marginHorizontal: 16, marginBottom: 4 },
  listMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
  },
  listTitle: { fontSize: 16, fontWeight: "700" },
  listCount: { fontSize: 13 },
  centered: { alignItems: "center", padding: 32 },
  statusText: { fontSize: 14, marginTop: 8, textAlign: "center" },
  errorTitle: { fontSize: 15, fontWeight: "700" },
  retryBtn: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryBtnText: { fontSize: 14, fontWeight: "700" },
});
