import React from "react";
import { View, Text, StyleSheet } from "react-native";

function formatNumber(value, fractionDigits = 1) {
  if (value == null || Number.isNaN(value)) return "—";
  return Number(value).toFixed(fractionDigits);
}

function formatDateTime(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

export default function CurrentWeather({ theme, weather, location, source }) {
  const { current, units } = weather;

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.heading, { color: theme.text }]}>Current weather</Text>
        {source === "cache" ? (
          <View style={[styles.tag, { backgroundColor: theme.warningBg }]}>
            <Text style={[styles.tagText, { color: theme.warning }]}>cached</Text>
          </View>
        ) : (
          <View style={[styles.tag, { backgroundColor: theme.successBg }]}>
            <Text style={[styles.tagText, { color: theme.success }]}>live</Text>
          </View>
        )}
      </View>

      <Text style={[styles.tempBig, { color: theme.text }]}>
        {formatNumber(current.temperature, 1)}
        <Text style={[styles.tempUnit, { color: theme.muted }]}>
          {" "}
          {units.temperature}
        </Text>
      </Text>

      <View style={styles.metrics}>
        <Metric
          theme={theme}
          label="Wind"
          value={`${formatNumber(current.windSpeed, 1)} ${units.windSpeed}`}
        />
        <Metric
          theme={theme}
          label="Precipitation"
          value={`${formatNumber(current.precipitation, 2)} ${units.precipitation}`}
        />
      </View>

      <View style={[styles.divider, { backgroundColor: theme.border }]} />

      <Text style={[styles.meta, { color: theme.muted }]}>
        Location: {formatNumber(location?.latitude, 4)},{" "}
        {formatNumber(location?.longitude, 4)}
      </Text>
      <Text style={[styles.meta, { color: theme.muted }]}>
        Measurement time: {formatDateTime(current.time)}
      </Text>
      <Text style={[styles.meta, { color: theme.muted }]}>
        Fetched: {formatDateTime(weather.fetchedAt)}
      </Text>
    </View>
  );
}

function Metric({ theme, label, value }) {
  return (
    <View style={[styles.metric, { backgroundColor: theme.surfaceAlt, borderColor: theme.border }]}>
      <Text style={[styles.metricLabel, { color: theme.muted }]}>{label}</Text>
      <Text style={[styles.metricValue, { color: theme.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  heading: { fontSize: 14, fontWeight: "700", letterSpacing: 0.5, textTransform: "uppercase" },
  tag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  tagText: { fontSize: 11, fontWeight: "700", textTransform: "uppercase" },
  tempBig: { fontSize: 56, fontWeight: "800", marginTop: 4 },
  tempUnit: { fontSize: 20, fontWeight: "600" },
  metrics: { flexDirection: "row", gap: 10, marginTop: 12 },
  metric: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
  },
  metricLabel: { fontSize: 11, textTransform: "uppercase", letterSpacing: 0.5 },
  metricValue: { fontSize: 16, fontWeight: "700", marginTop: 4 },
  divider: { height: 1, marginVertical: 12 },
  meta: { fontSize: 12, marginTop: 2 },
});
