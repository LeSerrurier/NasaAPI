import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Image, ScrollView } from 'react-native';
import axios from 'axios';
import SpaceImageInfo from '../type'
import LinearGradient from 'react-native-linear-gradient';

const defaultSpaceImageInfo: SpaceImageInfo = {
  explanation:'',
  url: '',
  title: '',
}

var spaceImageMenu: Array<SpaceImageInfo>; 

const fetchSpace2 = async ()=> {
  const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=WhByMRZJprCuHauxRl3Idr3O6kbE48aq5VbLgeNT`)   
  spaceImageMenu = [{explanation: res.data.explanation, url: res.data.url, title: res.data.title}]
  console.log("al")
}

fetchSpace2()

//https://nasa-apod-ynov.herokuapp.com/?date=2020-11-25
const SpaceInfo = () => {

  const [newSpaceImageInfo, setSpaceImageInfo] = useState<SpaceImageInfo>(defaultSpaceImageInfo)

  useEffect(() => { 
    fetchSpace()
  }, []);

  const fetchSpace = async ()=> {
    const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=WhByMRZJprCuHauxRl3Idr3O6kbE48aq5VbLgeNT`)   
    setSpaceImageInfo({explanation: res.data.explanation, url: res.data.url, title: res.data.title})
  }   

  return (
    <View style={styles.container}> 
      <ScrollView>
        <View style={styles.contrainerFlatlist}>
          <FlatList
            horizontal={true}
            data = {spaceImageMenu}
            renderItem = {({item}) => <Image style={styles.imageMenu} source={{uri:`${item.url}`}} /> }
            keyExtractor = {((item) => item.title + "" + item.url)}
          />
        </View>
        <View style={styles.imageContainer}>
          <Image source={{uri:`${newSpaceImageInfo.url}`}} style={styles.image}></Image> 
        </View>
        <View style={styles.text}>
          <Text style={styles.title}>{newSpaceImageInfo.title}</Text>
          <Text style={styles.explanation}>{newSpaceImageInfo.explanation}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  imageContainer: {
    width: 400,
    height: 650,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    justifyContent: "center",
  },
  imageMenu: {
    width: 75,
    height: 75,
    marginRight: 15,
    borderColor: "#3d2d3d",
    borderWidth: 4,
    borderRadius: 18    
  },
  contrainerFlatlist: {
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  text: {
    marginTop: -350,
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