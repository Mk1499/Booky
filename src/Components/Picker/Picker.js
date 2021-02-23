import React, {Component} from 'react';

import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {styles} from './styles';
import {mainColor} from '../../configs/global';

export default class PickerCompoents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      data: [],
    };
    console.log('DATA : ', this.props.data);
  }

  componentDidMount() {
    // this.setState({
    //   data: this.props.data,
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <View style={styles.pickerCont}>
          <Picker
            selectedValue={this.state.selectedItem}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            mode="dropdown"
            dropdownIconColor={mainColor}
            onValueChange={(item) => {
              this.setState({
                selectedItem: item,
              });
              this.props.change(item);
            }}>
            {this.props.data.map((item, index) => {
              return (
                <Picker.Item
                  label={item.name}
                  value={item}
                  key={item && item.id ? item.id : index}
                />
              );
            })}
          </Picker>
        </View>
      </View>
    );
  }
}
