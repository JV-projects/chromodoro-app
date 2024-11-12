import React from "react";

import { Text, View, StyleSheet, TextInput } from 'react-native'

type LabelInput = {
    label: string,
    type: string
}

export default function LabelInput({ label, type }: LabelInput) {
    return (
        <View>
            <Text>{label}</Text>
            <TextInput />
        </View>
    )
}