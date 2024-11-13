import React from "react";

import { Text, View, StyleSheet, Switch } from 'react-native'

type SwitchLabel = {
    label: string,
    value: boolean,
    onChangeToggle: () => void
}

export default function SwitchLabel({ label, value, onChangeToggle }: SwitchLabel) {
    return (
        <View style={styles.viewSwitch}>
            <Text style={{fontWeight: '500',color: "#171717", fontSize: 16}}>{label}</Text>
            <Switch
                trackColor={{ false: '#cccccc', true: '#2BA84A' }}
                thumbColor={'#fff'}
                onValueChange={onChangeToggle}
                value={value}
                style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    viewSwitch:{
       alignItems: 'center',
       justifyContent: 'space-between',
       flexDirection: 'row'
    },
})