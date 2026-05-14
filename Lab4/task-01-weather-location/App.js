import React, { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  Linking,
  Platform,
} from "react-native";
import * as Location from "expo-location";

import Header from "./components/Header";
import CurrentWeather from "./components/CurrentWeather";
import HourlyForecast from "./components/HourlyForecast";
import StatusBanner from "./components/StatusBanner";
import { fetchWeather } from "./api/weather";
import { loadLastWeather, saveLastWeather } from "./storage/cache";
import { lightTheme, darkTheme } from "./theme";

const PERMISSION_STATUS = {
  UNKNOWN: "unknown",
  GRANTED: "granted",
  DENIED: "denied",
};

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? darkTheme : lightTheme;

  const [permission, setPermission] = useState(PERMISSION_STATUS.UNKNOWN);
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [source, setSource] = useState(null); // 'live' | 'cache'
  const [cachedSavedAt, setCachedSavedAt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hydrateFromCache = useCallback(async () => {
    const cached = await loadLastWeather();
    if (cached?.data) {
      setWeather(cached.data);
      setLocation({
        latitude: cached.data.latitude,
        longitude: cached.data.longitude,
      });
      setSource("cache");
      setCachedSavedAt(cached.savedAt);
    }
  }, []);

  const requestAndLoad = useCallback(async () => {
    setError(null);
    setLoading(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermission(PERMISSION_STATUS.DENIED);
        setLoading(false);
        // Try to fall back to cache so the user still sees something.
        await hydrateFromCache();
        return;
      }
      setPermission(PERMISSION_STATUS.GRANTED);

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setLocation(coords);

      const data = await fetchWeather(coords);
      setWeather(data);
      setSource("live");
      setCachedSavedAt(null);
      await saveLastWeather(data);
    } catch (e) {
      setError(e?.message || "Failed to load weather.");
      // If we have nothing on screen yet, try to show the last cached snapshot.
      if (!weather) {
        await hydrateFromCache();
      }
    } finally {
      setLoading(false);
    }
  }, [hydrateFromCache, weather]);

  useEffect(() => {
    (async () => {
      await hydrateFromCache();
      await requestAndLoad();
    })();
    // We intentionally run this once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openSettings = useCallback(() => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      Linking.openSettings?.();
    }
  }, []);

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <Header
        theme={theme}
        isDark={isDark}
        onToggleTheme={() => setIsDark((v) => !v)}
        onRefresh={requestAndLoad}
        refreshing={loading}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {permission === PERMISSION_STATUS.DENIED ? (
          <StatusBanner
            theme={theme}
            kind="warning"
            title="Location access denied"
            message={
              "The app needs your location to show local weather. " +
              "Grant the permission in system settings, then tap Refresh."
            }
            actionLabel="Open settings"
            onAction={openSettings}
          />
        ) : null}

        {error ? (
          <StatusBanner
            theme={theme}
            kind="error"
            title="Couldn't fetch weather"
            message={error}
            actionLabel="Try again"
            onAction={requestAndLoad}
          />
        ) : null}

        {loading && !weather ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.loadingText, { color: theme.muted }]}>
              Getting location and weather…
            </Text>
          </View>
        ) : null}

        {weather ? (
          <>
            <CurrentWeather
              theme={theme}
              weather={weather}
              location={location}
              source={source}
            />
            {source === "cache" && cachedSavedAt ? (
              <Text style={[styles.cacheNote, { color: theme.muted }]}>
                Showing last saved result from{" "}
                {new Date(cachedSavedAt).toLocaleString()}.
              </Text>
            ) : null}
            <HourlyForecast
              theme={theme}
              hourly={weather.hourly}
              units={weather.units}
            />
          </>
        ) : !loading && permission !== PERMISSION_STATUS.DENIED && !error ? (
          <View style={styles.loadingBox}>
            <Text style={[styles.loadingText, { color: theme.muted }]}>
              No data yet. Tap Refresh to try again.
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  loadingBox: { alignItems: "center", marginTop: 48, paddingHorizontal: 16 },
  loadingText: { fontSize: 14, marginTop: 10, textAlign: "center" },
  cacheNote: {
    fontSize: 12,
    marginHorizontal: 16,
    marginTop: 6,
    fontStyle: "italic",
  },
});
