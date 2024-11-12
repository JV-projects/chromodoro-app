import React from "react";

import {Text, View, StyleSheet} from 'react-native'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type TituloIcone = {
    titulo: string,
    icone: string
}

export default function TituloIcone({titulo, icone} : TituloIcone){
    return(
        <View>
             {icone && <MaterialCommunityIcons name={icone} size={20} color="#535353" />}
            <Text>{titulo}</Text>
        </View>
    )
}