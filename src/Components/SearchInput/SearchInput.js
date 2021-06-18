import React, {Component} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import I18n from '../../translate';
import styles from './styles';
import {getTheme} from '../../Services/themes';
import {mainColor} from '../../configs/global';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qText: '',
    };
  }

  render() {
    let style = {
      container: {
        ...styles.container,
        backgroundColor: getTheme().background,
      },
    };

    return (
      <View style={style.container}>
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
          placeholderTextColor={mainColor}
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
