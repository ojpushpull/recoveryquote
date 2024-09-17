import { Image, StyleSheet, Platform, View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {

  const [Quote, setQuote] = useState('Loading');
  const [Author, setAuthor] = useState('Loading');
  const [isLoading, setIsLoading] = useState(false);

  const randomQuote = () => {
    setIsLoading(true);
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
    console.log(result.content);
    setQuote(result.content);
    setAuthor(result.content);
    setIsLoading(false);
  })
}

  useEffect(() => {
    randomQuote();
  }, []);
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
     <View style={styles.container}>
      <Text style={{ fontSize: 60, marginBottom: -20}}> {Quote} </Text>
      <Text style={{ fontSize: 60, marginBottom: -20}}> {Author} </Text>
      <TouchableOpacity
        onPress={randomQuote}
          style={{
            backgroundColor: '#5372F0',
            padding: 20,
            borderRadius: 30,
            marginVertical: 20,
          }}>
            <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>
              {isLoading ? "Loading..." : "New Quote"}
            </Text>
          </TouchableOpacity>
     </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
});
