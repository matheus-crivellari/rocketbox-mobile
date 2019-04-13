import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { distanceInWords } from 'date-fns';
import en from 'date-fns/locale/en';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

import api from '../../services/api';

import styles from './styles';

export default class Box extends Component {
  state = {
    box: {}
  };

  async componentDidMount() {
    const box = await AsyncStorage.getItem('@RocketBox:box');

    const response = await api.get(`boxes/${box}`);

    console.log('Box id: ', box);

    this.setState({box: response.data});

  }

  subscribeToNewFiles = () => {
    const box = this.props.match.params.id;
    const io = socket('https://omnistack-teco.herokuapp.com');

    // Subscribes to box socketio room
    // to receive realtime updates
    io.emit('connectRoom', box);

    // Fired when received a new file from server
    // FIXME: Socketio event not working
    io.on('file', data => {
        alert(data);
        this.setState({
            box : {
                ...this.state.box,
                files : [data, ...this.state.box.files]
            }
        });
    });
  }

  openFile = async (file) => {
    try{
      const filePath = `${RNFS.DocumentDirectoryPath}/${file.title}`;

      await RNFS.downloadFile({
        fromUrl: file.url,
        toFile: filePath,
      });

      console.log('FilePath: ', filePath);

      await FileViewer.open(filePath);
    }catch(e){
      console.log('File not supported.');
    }

  };

  /**
   * Renders each element of FlatList.
   * @param {object} Object that represents a file.
   */
  renderItem = ({item}) => {
    return(
      <TouchableOpacity
        // FIXME escope not working
        onPress={() => {this.openFile(item)}}
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

  // This must me a function if made
  // it a method it won't find state
  handleUpload = () => {
    ImagePicker.launchImageLibrary({}, async upload => {
      if(upload.error){
        console.log('ImagePicker error.');
      }else if(upload.didCancel){
        console.log('Canceled by user.');
      }else{
        const data = new FormData();

        const [filename, extension] = upload.fileName.split('.');
        const ext = extension.toLowerCase() == 'heic' ? 'jpg' : extension;

        data.append('file', {
          uri: upload.uri,
          type: upload.type,
          name: `${filename}.${ext}`,
        });

        api.post(`boxes/${this.state.box._id}/files`, data);
      }
    });
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
