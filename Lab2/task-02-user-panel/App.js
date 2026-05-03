import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import ProfileCard from "./components/ProfileCard";
import FormField from "./components/FormField";
import SettingsRow from "./components/SettingsRow";
import { lightTheme, darkTheme } from "./theme";

const BIO_LIMIT = 160;

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const [profile, setProfile] = useState({
    name: "Fabian Waszkiewicz",
    email: "fabian@example.com",
    city: "Poznan",
    bio: "iOS / RN student exploring mobile development.",
  });

  const [form, setForm] = useState(profile);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const [settings, setSettings] = useState({
    notifications: true,
    privacy: false,
  });

  const updateField = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (feedback) setFeedback(null);
  };

  const validate = () => {
    if (!form.name.trim()) return { ok: false, message: "Name cannot be empty." };
    if (!form.email.includes("@")) return { ok: false, message: "Email must contain '@'." };
    if (form.bio.length > BIO_LIMIT)
      return { ok: false, message: `Bio cannot exceed ${BIO_LIMIT} characters.` };
    return { ok: true };
  };

  const handleSave = () => {
    const result = validate();
    if (!result.ok) {
      setFeedback({ type: "error", message: result.message });
      return;
    }
    setProfile(form);
    setFeedback({ type: "success", message: "Profile updated successfully." });
  };

  const handleLogout = () => {
    Alert.alert("Log out", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log out",
        style: "destructive",
        onPress: () => {
          setForm({ name: "", email: "", city: "", bio: "" });
          setPassword("");
          setProfile({ name: "", email: "", city: "", bio: "" });
          setFeedback({ type: "success", message: "You have been logged out." });
        },
      },
    ]);
  };

  const bioCount = form.bio.length;
  const bioOver = bioCount > BIO_LIMIT;

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.headerTitle, { color: theme.text }]}>User Panel</Text>
            <Text style={[styles.headerSubtitle, { color: theme.muted }]}>
              Manage your profile and preferences.
            </Text>
          </View>
        </View>

        <ProfileCard
          name={profile.name}
          city={profile.city}
          bio={profile.bio}
          theme={theme}
        />

        <View
          style={[
            styles.section,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Edit profile</Text>

          <FormField
            label="Name"
            value={form.name}
            onChangeText={(v) => updateField("name", v)}
            placeholder="Your name"
            theme={theme}
          />
          <FormField
            label="Email"
            value={form.email}
            onChangeText={(v) => updateField("email", v)}
            placeholder="you@example.com"
            theme={theme}
          />
          <FormField
            label="City"
            value={form.city}
            onChangeText={(v) => updateField("city", v)}
            placeholder="Your city"
            theme={theme}
          />
          <FormField
            label="Bio"
            value={form.bio}
            onChangeText={(v) => updateField("bio", v)}
            placeholder="Tell us about yourself"
            multiline
            theme={theme}
            helperText={`${bioCount}/${BIO_LIMIT} characters`}
            helperColor={bioOver ? theme.error : theme.muted}
          />
          <FormField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter new password"
            secureTextEntry={!showPassword}
            theme={theme}
            rightSlot={
              <Pressable
                onPress={() => setShowPassword((v) => !v)}
                style={({ pressed }) => [
                  styles.eyeBtn,
                  {
                    backgroundColor: theme.surfaceAlt,
                    borderColor: theme.border,
                    opacity: pressed ? 0.7 : 1,
                  },
                ]}
              >
                <Text style={{ color: theme.text, fontSize: 12, fontWeight: "600" }}>
                  {showPassword ? "Hide" : "Show"}
                </Text>
              </Pressable>
            }
          />

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
                  fontWeight: "600",
                  fontSize: 13,
                }}
              >
                {feedback.type === "success" ? "✓ " : "⚠ "}
                {feedback.message}
              </Text>
            </View>
          ) : null}

          <Pressable
            onPress={handleSave}
            style={({ pressed }) => [
              styles.saveBtn,
              { backgroundColor: theme.primary, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <Text style={[styles.saveBtnText, { color: theme.primaryText }]}>
              Save changes
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.section,
            { backgroundColor: "transparent", borderWidth: 0, padding: 0, marginTop: 8 },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.text, paddingHorizontal: 16 }]}>
            Settings
          </Text>
          <View style={{ paddingHorizontal: 16 }}>
            <SettingsRow
              icon="🔔"
              title="Notifications"
              subtitle="Receive event and message alerts"
              value={settings.notifications}
              onToggle={() =>
                setSettings((s) => ({ ...s, notifications: !s.notifications }))
              }
              theme={theme}
            />
            <SettingsRow
              icon="🔒"
              title="Privacy"
              subtitle="Hide profile from search results"
              value={settings.privacy}
              onToggle={() => setSettings((s) => ({ ...s, privacy: !s.privacy }))}
              theme={theme}
            />
            <SettingsRow
              icon={isDark ? "🌙" : "☀️"}
              title="Dark theme"
              subtitle="Switch between light and dark"
              value={isDark}
              onToggle={() => setIsDark((v) => !v)}
              theme={theme}
            />
            <SettingsRow
              icon="ℹ️"
              title="About app"
              subtitle="Version 1.0.0"
              type="link"
              onToggle={() =>
                Alert.alert("About", "User Panel — Lab 2, Task 2.\nReact Native demo.")
              }
              theme={theme}
            />
          </View>
        </View>

        <View style={{ paddingHorizontal: 16, marginTop: 16, marginBottom: 32 }}>
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [
              styles.logoutBtn,
              {
                backgroundColor: theme.errorBg,
                borderColor: theme.error,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
          >
            <Text style={[styles.logoutText, { color: theme.error }]}>
              ⎋  Log out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { paddingTop: 16, paddingBottom: 24 },
  headerRow: { flexDirection: "row", paddingHorizontal: 16 },
  headerTitle: { fontSize: 26, fontWeight: "800" },
  headerSubtitle: { fontSize: 13, marginTop: 4 },
  section: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderWidth: 1,
    borderRadius: 16,
  },
  sectionTitle: { fontSize: 17, fontWeight: "700", marginBottom: 12 },
  feedback: {
    padding: 10,
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 8,
  },
  saveBtn: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 6,
  },
  saveBtnText: { fontSize: 15, fontWeight: "700" },
  eyeBtn: {
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
  },
  logoutBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  logoutText: { fontSize: 15, fontWeight: "700" },
});
