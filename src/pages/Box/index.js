import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import styles from './styles';

export default class Box extends Component {
  state = {
    box: {}
  }

  async componentDidMount() {
    const box = await AsyncStorage.getItem('@RocketBox:box');

    const response = await api.get(`boxes/${box}`);

    this.setState({box: response.data});

  }

  /**
   * Renders each element of FlatList.
   * @param {object} Object that represents a file.
   */
  renderItem({item}){
    return(
      <TouchableOpacity
        onPress={() => {}}
        style={styles.file}
      >
        <View style={styles.fileInfo}>
          <Icon name="inser-drive-file" size={24} color="#a5cfff" />
          <Text style={styles.fileTitle}>{item.title}</Text>
        </View>
        <Text style={stytles.fileDate}>
          ago
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
	  return (
      <View style={styles.container}>
        <Text style={styles.boxTitle}>{this.state.box.title}!</Text>

        <FlatList
          style={styles.list}
          data={this.state.box.files}
          keyExtractor={file => file._id}
          ItemSeparatorComponent={()=><View style={styles.separator} />}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
