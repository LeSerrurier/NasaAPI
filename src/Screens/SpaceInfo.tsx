import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Text, Image, ScrollView } from 'react-native';
import axios from 'axios';
import SpaceImageInfo from '../type'
import LinearGradient from 'react-native-linear-gradient';

const defaultSpaceImageInfo: SpaceImageInfo ={
  explanation:'',
  url: '',
  title: '',
}

const SpaceInfo = () => {

  const [newSpaceImageInfo, setSpaceImageInfo] = useState<SpaceImageInfo>(defaultSpaceImageInfo)

  useEffect(() => { 
    fetchSpace()
  });

  const fetchSpace = async ()=> {
    console.log("al")
    //const res = await axios.get(`https://nasa-apod-ynov.herokuapp.com/`)   
    setSpaceImageInfo({explanation: res.data.explanation, url: res.data.url, title: res.data.title})
  }   

  return (
    <View style={styles.container}> 
      <Image source={{uri:`${newSpaceImageInfo.url}`}} style={styles.image}></Image>
      <ScrollView>
        {/* <ImageBackground source={{uri:`${newSpaceImageInfo.url}`}} style={styles.image}>
          <View style={styles.text}>
            <Text style={styles.title}>{newSpaceImageInfo.title}</Text>
            <Text style={styles.explanation}>{newSpaceImageInfo.explanation}</Text>
          </View>
        </ImageBackground> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 400,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 80,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: 40,
    color: "white",
    marginBottom: 10,
    fontWeight: 'bold'
  },
  explanation: {
    fontSize: 20,
    color: "white",
  }
});

export default SpaceInfo