import React from 'react'

import {View, Text, StyleSheet, } from 'react-native'

import { List } from 'react-native-paper';

import { useState } from 'react';
import TarefaList from './TarefaList';

interface Projeto {
  
}

export default function Projeto(){

    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

  return (
    <List.Section>
      <List.Accordion
        title="Projeto 1"
        left={props => <List.Icon {...props} icon="folder" />}>
          <Text>A</Text>
        {/* <Tarefa tarefas={{}}/> */}
      </List.Accordion>
    </List.Section>
  );
};