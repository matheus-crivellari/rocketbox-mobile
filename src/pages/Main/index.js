import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api'

import styles from './styles';

// Automatically imports 2x or 3x pngs
// from assets folder based in device density
import logo from '../../assets/logo.png';

export default class Main extends Component {
  state = {
    newBox: '',
  };

  async componentDidMount() {
    const box = await AsyncStorage.getItem('@RocketBox:box');

    if(box)
      this.props.navigation.navigate('Box');
  }

  handleSignIn = async () => {
    const response = await api.post('boxes', {
      title: this.state.newBox,
    });

    await AsyncStorage.setItem('@RocketBox:box', response.data._id);

    // Navigates user to Box route
    this.props.navigation.navigate('Box');
  };

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
          value={this.state.newBox}
          onChangeText={text => this.setState({newBox: text})}
        />
        <TouchableOpacity onPress={this.handleSignIn} style= { styles.button }>
         <Text style={ styles.buttonText }>Create</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
