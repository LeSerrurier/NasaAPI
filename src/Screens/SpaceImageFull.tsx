import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainStackParamsList } from '../../App';

type Props = {
    navigation: StackNavigationProp<MainStackParamsList>
}

const Search: React.FC<Props> = ({ navigation }) => {

    return (
        <View>
           <Text>LAAA</Text>
        </View>

    );
}

export default Search