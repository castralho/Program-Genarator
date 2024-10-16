import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SongListScreen = () => {
    const [songs, setSongs] = useState([]);
  
    useEffect(() => {
      const loadSongs = async () => {
        const storedSongs = await AsyncStorage.getItem('songs');
        if (storedSongs) {
          setSongs(JSON.parse(storedSongs));
        }
      };

      loadSongs();
  }, []);

  const renderSong = ({ item }) => (
    <View style={styles.songItem}>
      <Text style={styles.songText}>Número: {item.number}</Text>
      <Text style={styles.songText}>Nome: {item.name}</Text>
      <Text style={styles.songText}>Momento: {item.moment}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={songs}
        renderItem={renderSong}
        keyExtractor={(item) => item.number.toString()}
        style={styles.songList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    songList: {
      width: '100%',
    },
    songItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    songText: {
      fontSize: 16,
    },
  });
  
  export default SongListScreen;