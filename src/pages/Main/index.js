import React, { Component } from 'react';

import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

import styles from './styles';

// Automatically imports 2x or 3x pngs
// from assets folder based in device density
import logo from '../../assets/logo.png';

export default class Main extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Image style={ styles.logo } source={ logo }></Image>
        <TextInput
          style={styles.input}
          placeholder="Create a box"
          placeholderTextColor="#999"
          autoCapitalize="sentences"
          autoCorrect={false}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity onPress={ () => {} } style= { styles.button }>
         <Text style={ styles.buttonText }>Create</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
