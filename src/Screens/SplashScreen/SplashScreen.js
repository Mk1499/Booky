import React, {Component} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {checkAutoLogin} from '../../actions/auth';

class SplashScreen extends Component {
  componentDidMount = async () => {
    // console.log("Called from splash screen");
    try {
      this.props.checkAutoLogin();
    } catch (err) {
      console.log('ERR : ', err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/images/logoName.png')}
          style={styles.img}
          resizeMode="contain"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '40%',
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {checkAutoLogin})(SplashScreen);
