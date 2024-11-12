import React from "react";

import { Text, View, StyleSheet, Switch } from 'react-native'

type SwitchLabel = {
    label: string,
    value: boolean,
    onChangeToggle: () => void
}

export default function SwitchLabel({ label, value, onChangeToggle }: SwitchLabel) {
    return (
        <View>
            <Text>{label}</Text>
            <Switch
                trackColor={{ false: '#cccccc', true: '#2BA84A' }}
                thumbColor={'#fff'}
                onValueChange={onChangeToggle}
                value={value}
            />
        </View>
    )
}