import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

function formatHour(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatNumber(value, digits = 1) {
  if (value == null || Number.isNaN(value)) return "—";
  return Number(value).toFixed(digits);
}

export default function HourlyForecast({ theme, hourly, units }) {
  if (!hourly?.length) return null;

  return (
    <View style={styles.wrap}>
      <Text style={[styles.heading, { color: theme.text }]}>Next 24 hours</Text>
      <FlatList
        data={hourly}
        horizontal
        keyExtractor={(item) => item.time}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        renderItem={({ item }) => (
          <View
            style={[
              styles.item,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.hour, { color: theme.muted }]}>
              {formatHour(item.time)}
            </Text>
            <Text style={[styles.temp, { color: theme.text }]}>
              {formatNumber(item.temperature, 0)}
              {units.temperature}
            </Text>
            <Text style={[styles.row, { color: theme.accent }]}>
              ☂ {formatNumber(item.precipitationProbability, 0)}
              {units.precipitationProbability}
            </Text>
            <Text style={[styles.row, { color: theme.muted }]}>
              {formatNumber(item.precipitation, 2)} {units.precipitation}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 20 },
  heading: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginHorizontal: 16,
    marginBottom: 8,
  },
  list: { paddingHorizontal: 16, paddingVertical: 4 },
  item: {
    width: 92,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  hour: { fontSize: 12, fontWeight: "600" },
  temp: { fontSize: 20, fontWeight: "800", marginTop: 4 },
  row: { fontSize: 12, marginTop: 4 },
});
