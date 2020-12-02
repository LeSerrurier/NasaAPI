import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamsList } from '../../App';
import { RouteProp } from '@react-navigation/native';
import SpaceImageInfo from '../type'
import LinearGradient from 'react-native-linear-gradient';

type Props = {
    navigation: StackNavigationProp<MainStackParamsList>,
    route: RouteProp<MainStackParamsList, "SpaceImageFull">
}

const Search: React.FC<Props> = ({ navigation, route }) => {

    /*j'aurais voulu m'y prendre autrement (utiliser un component) pour ne pas avoir de la répétition 
    de code, mais j'ai perdu beaucoup de temps à faire fonctionner la navigation
    et j'aurais voulu aussi changer la flèche de retour mais j'ai perdu trop
    de temps à résoudre les problèmes que j'avais entre le système de navigation
    et git.
    */

    const [newSpaceImageInfo, setNewSpaceImageInfo] = useState<SpaceImageInfo>(
        route.params.spaceImageInfo
    );

    return (
        <View style={styles.container}>
            <LinearGradient colors={["black", "#ffffff00"]} style={styles.linearGradientTop} />
            <Image source={{uri:`${newSpaceImageInfo.url}`}} style={styles.image}></Image> 
            <LinearGradient colors={[ "#ffffff00", "black"]} style={styles.linearGradientBottom} />
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 50,
        paddingTop: 10,
        backgroundColor: "black"
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        justifyContent: "center",
    },
    linearGradientTop: {
        height: 250,
        marginBottom: -250,
        zIndex:1,
    },
    linearGradientBottom: {
        height: 120,
        marginTop: -120,
        zIndex:0,
    },
});

export default Search