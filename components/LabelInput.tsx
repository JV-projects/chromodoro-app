import React from "react";

import { Text, View, StyleSheet, TextInput, InputModeOptions } from 'react-native'

type LabelInput = {
    label: string,
    inputMode: InputModeOptions,
    value: string,
    onChange: () => void,
    placeholder: string
}

export default function LabelInput({ label, inputMode, value, onChange, placeholder }: LabelInput) {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.input} inputMode={inputMode}
            value={value}
            onChange={onChange}
            placeholder={placeholder}/>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        paddingLeft: 10,
        backgroundColor: "#ececec",
        borderRadius: 4,
    },
    inputFocus: {
        height: 50,
        paddingLeft: 10,
        backgroundColor: "#ececec",
        borderWidth: 1,
        borderColor: "#c0c0c0",
        borderRadius: 4,
    },
    label:{
        color: "#535353",
        fontWeight: '500'
    }
})