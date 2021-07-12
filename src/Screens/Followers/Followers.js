import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import SubHeader from '../../Components/SubHeader/SubHeader';
import ScreenHeader from '../../Components/ScreenHeader/ScreenHeader';
import styles from './styles';
import { getTheme } from '../../Services/themes';

export default class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      userName:' ',
      followers: [1],
    };
  }

  componentDidMount() {
    let {userID, userName} = this.props.route.params;
    this.setState({
      userID,
      userName
    });
    // console.log("Nav : ", this.props);
  }

  renderFollower = ({item}) => {
    return (
      <View>
        <Text>Followe</Text>
      </View>
    );
  };

  goBack = () => {
      this.props.navigation.goBack();
  }

  render() {
    let {userID, followers, userName} = this.state;
    let style = {
        container:{
            ...styles.container,
            backgroundColor: getTheme().background
        }
    }
    return (
      <View style={style.container}>
          <SubHeader
          noHeart={true}
          title={userName}
          goBack={() => this.goBack()}
        />
        <View style={styles.content}>
          <FlatList data={followers} renderItem={this.renderFollower} />
        </View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}
