import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { distanceInWords } from 'date-fns';
import en from 'date-fns/locale/en';

import api from '../../services/api';

import styles from './styles';

export default class Box extends Component {
  state = {
    box: {}
  }

  async componentDidMount() {
    const box = await AsyncStorage.getItem('@RocketBox:box');

    const response = await api.get(`boxes/${box}`);

    console.log(box);

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
          <Icon name="insert-drive-file" size={24} color="#a5cfff" />
          <Text style={styles.fileTitle}>{item.title}</Text>
        </View>
        <Text style={styles.fileDate}>
          {distanceInWords(item.createdAt, new Date(), {locale: en})}
          {' '}ago
        </Text>
      </TouchableOpacity>
    );
  }

  handleUpload(){

  }

  render() {
	  return (
      <View style={styles.container}>
        <Text style={styles.boxTitle}>{this.state.box.title}</Text>

        <FlatList
          style={styles.list}
          data={this.state.box.files}
          keyExtractor={file => file._id}
          ItemSeparatorComponent={()=><View style={styles.separator} />}
          renderItem={this.renderItem}
        />
        <TouchableOpacity style={styles.fab} onPress={this.handleUpload}>
          <Icon name='cloud-upload' size={24} color='#fff' />
        </TouchableOpacity>
      </View>
    );
  }
}
