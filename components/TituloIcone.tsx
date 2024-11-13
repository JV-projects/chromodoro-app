import React from "react";

import {Text, View, StyleSheet} from 'react-native'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

type TituloIcone = {
    titulo: string,
    icone: string
}

export default function TituloIcone({titulo, icone} : TituloIcone){
    return(
        <View style={styles.view}>
             {icone && <MaterialCommunityIcons name={icone} size={20} color="#535353" />}
            <Text style={styles.titulo}>{titulo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        flexDirection: 'row',
        gap: 2
    },
    titulo:{
        color: "#535353"
    }
})