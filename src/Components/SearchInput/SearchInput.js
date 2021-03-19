import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {mainColor, width, height} from '../../configs/global';
import {Icon} from 'native-base';
import I18n from '../../translate';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qText: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.qText ? (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              this.setState({
                qText: '',
              });
            }}>
            <Icon name="clear" type="MaterialIcons" style={styles.icon} />
          </TouchableOpacity>
        ) : null}
        <TextInput
          placeholder={I18n.t('searchPlaceholder')}
          style={styles.input}
          onChangeText={(t) => {
            this.setState({qText: t});
          }}
          onSubmitEditing={() => {
            this.props.searchFun(this.state.qText);
          }}
          value={this.state.qText}
        />
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.props.searchFun(this.state.qText)}>
          <Icon name="search1" type="AntDesign" style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // borderWidth: 1,
    borderColor: mainColor,
    borderRadius: 10,
    width: 0.8 * width,
    height: 0.1 * height,
    alignSelf: 'center',
    marginTop: 0.05 * height,
    elevation: 5,
    shadowColor: mainColor,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  input: {
    width: '75%',
    fontSize: 12,
    color: mainColor,
    fontFamily: 'Cairo',
  },
  btn: {
    justifyContent: 'center',
  },
  icon: {
    color: mainColor,
  },
});
