import React, { useState, useMemo } from "react";
import { SafeAreaView, View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import EventCard from "./components/EventCard";
import { INITIAL_EVENTS, CATEGORIES } from "./data/events";
import { lightTheme, darkTheme } from "./theme";

export default function App() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const theme = isDark ? darkTheme : lightTheme;

  const visibleEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      const matchesQuery = q === "" || e.title.toLowerCase().includes(q);
      const matchesCategory = activeCategory === "All" || e.category === activeCategory;
      const matchesFavorite = !favoritesOnly || e.favorite;
      return matchesQuery && matchesCategory && matchesFavorite;
    });
  }, [events, query, activeCategory, favoritesOnly]);

  const toggleFavorite = (id) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, favorite: !e.favorite } : e))
    );
  };

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      <Header
        visibleCount={visibleEvents.length}
        theme={theme}
        isDark={isDark}
        onToggleTheme={() => setIsDark((v) => !v)}
      />
      <SearchBar
        value={query}
        onChangeText={setQuery}
        theme={theme}
        favoritesOnly={favoritesOnly}
        onToggleFavoritesOnly={() => setFavoritesOnly((v) => !v)}
      />
      <CategoryFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
        theme={theme}
      />
      <FlatList
        data={visibleEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard {...item} onToggleFavorite={toggleFavorite} theme={theme} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={{ color: theme.muted, fontSize: 14 }}>
              No events match your filters.
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  empty: { alignItems: "center", padding: 32 },
});
