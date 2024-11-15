import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";


interface Button {
    label?: string;
    onPress: () => void;
    isClicado?: boolean,
    children?: React.ReactNode[]
}

export default function Button({onPress, label, isClicado, children} : Button){
    return(
        <TouchableOpacity style={[styles.button, isClicado && styles.buttonClicado]}onPress={onPress}>
            <Text style={isClicado && {color: "#fff", fontWeight: 600}}>{label}</Text>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        padding: 10,
        borderRadius: 8,
        width: "30%",
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#D1717B'
    },
    buttonClicado:{
       backgroundColor: "#D1717B"
    }
})