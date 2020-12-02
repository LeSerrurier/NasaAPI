import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView, Image } from 'react-native';
import axios from 'axios';
import SpaceImageInfo from '../type'
import LinearGradient from 'react-native-linear-gradient';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamsList } from '../../App';

const defaultSpaceImageInfo: SpaceImageInfo = {
    explanation:'',
    url: 's',
    title: '',
}

type Props = {
    navigation: StackNavigationProp<MainStackParamsList>
}

var defaultSpaceImageMenu: Array<SpaceImageInfo> = []; 

const SpaceInfo: React.FC<Props> = ({ navigation }) => {

    const [newSpaceImageInfo, setSpaceImageInfo] = useState<SpaceImageInfo>(defaultSpaceImageInfo)
    const [newSpaceImageMenu, setSpaceImageMenu] = useState<Array<SpaceImageInfo>>(defaultSpaceImageMenu)
  
    useEffect(() => { 
      fetchSpaceImageMenu()
      fetchSpace()
    }, []);
  
  
    const fetchSpaceImageMenu = async ()=> {
      var spaceImageMenu : SpaceImageInfo[] = defaultSpaceImageMenu
      for (let i = 0; i < 5; i++) {
        const todayDate = new Date()
        todayDate.setDate(todayDate.getDate() - i)
        const dateAsk = todayDate.getFullYear() + "-" + (todayDate.getMonth() +1 ) + "-" + todayDate.getDate()
        const res = await axios.get(`https://api.nasa.gov/planetary/apod?date=${dateAsk}&api_key=WhByMRZJprCuHauxRl3Idr3O6kbE48aq5VbLgeNT`)   
        spaceImageMenu.push({explanation: res.data.explanation, url: res.data.url, title: res.data.title})
      }
      setSpaceImageMenu([...spaceImageMenu])
    }
  
    const fetchSpace = async ()=> {
      const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=WhByMRZJprCuHauxRl3Idr3O6kbE48aq5VbLgeNT`)   
      setSpaceImageInfo({explanation: res.data.explanation, url: res.data.url, title: res.data.title})
    }   
  
    const changeImage = (spaceImageInfo: SpaceImageInfo) => {
      setSpaceImageInfo(spaceImageInfo)
    }
  
    return (
      <View style={styles.container}> 
        <ScrollView>
          <View style={styles.contrainerFlatlist}>
            <FlatList
              horizontal={true}
              data = {newSpaceImageMenu}
              renderItem = {({item}) => 
                <TouchableOpacity onPress={() => changeImage(item)}>
                  <Image style={styles.imageMenu} source={{uri:`${item.url}`}} /> 
                </TouchableOpacity>
              }
              keyExtractor = {((item) => item.title + "" + item.url)}
            />
          </View>

            <TouchableOpacity onPress={ () => navigation.navigate("SpaceImageFull") }>
                <LinearGradient colors={["black", "#ffffff00"]} style={styles.linearGradientTop} />
                <View style={styles.imageContainer}>
                    <Image source={{uri:`${newSpaceImageInfo.url}`}} style={styles.image}></Image> 
                </View>
            </TouchableOpacity>
        
          <LinearGradient colors={[ "#ffffff00", "black"]} style={styles.linearGradientBottom} />
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
        height: 580,
    },
    //j'ai préféré ne pas détériorer la qualité de l'image 
    //alors elle se retrouve un peu zoomé, on ne voit pas totalement les côtés de l'image mais c'est un choix
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
    linearGradientTop: {
        height: 250,
        marginBottom: -250,
        zIndex:1,
    },
    linearGradientBottom: {
        height: 120,
        marginTop: -120,
        zIndex:0
    },
    contrainerFlatlist: {
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 10
    },
    text: {
        marginTop: -300,
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