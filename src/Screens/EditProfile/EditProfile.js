import React, {Component} from 'react';
import {Text, View, ScrollView, Image} from 'react-native';
import styles from './styles';
import SubHeader from '../../Components/SubHeader/SubHeader';
import I18n from '../../translate';
import {getTheme} from '../../Services/themes';
import {TextInput} from 'react-native';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import {updateUserData} from '../../actions/auth';
import DocumentPicker from 'react-native-document-picker';
import storage from '@react-native-firebase/storage';
import {TouchableOpacity} from 'react-native';
import RNFS from 'react-native-fs';
import MyInput from '../../Components/MyInput';
import Button from '../../Components/Button/Button';
import {client} from '../../queries/queryClient';
import {updateUserMutation} from '../../mutations/user';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.userData.id,
      userName: props.userData.name,
      email: props.userData.email,
      photo: props.userData.photo,
      quote: props.userData.quote,
      submiting: false,
      profileImg: null,
    };

    console.log('edit profile props : ', props);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  chooseImg = async () => {
    try {
      await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })
        .then(async (res) => {
          // let imgName = `${Math.random() * 10000}${res.name}`;
          // let reference = storage().ref(`profilePics/${imgName}`);
          this.setState({
            photo: res.uri,
            profileImg: res,
          });
        })
        .catch((err) => {
          console.log('upload Err : ', err);
          throw err;
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  uploadImg = async () => {
    console.log('try ');
    let {profileImg} = this.state;
    return new Promise(async (resolve, reject) => {
      let imgName = `${Math.random() * 10000}${profileImg.name}`;
      let reference = storage().ref(`profilePics/${imgName}`);
      const data = await RNFS.readFile(profileImg.uri, 'base64');
      await reference
        .putString(data, 'base64')
        .then(async () => {
          let imgURL = await reference.getDownloadURL();
          resolve(imgURL);
        })
        .catch((err) => {
          console.log("Can't upload : ", err);
        });
    });
  };

  checkImgBeforeSubmit() {
    let {profileImg} = this.state;
    this.setState({
      submiting: true,
    });

    // if user change old phone
    if (profileImg) {
      this.uploadImg().then((imgURL) => {
        console.log('Uploaded img url : ', imgURL);
        this.submit(imgURL);
        this.setState({
          profileImg: null,
        });
      });
    } else {
      this.submit();
    }
  }

  submit = async (photo = this.state.photo) => {
    let {id, userName, quote} = this.state;
    this.setState({submiting: true});
    console.log('state before submit : ', this.state , photo);
    await client
      .mutate({
        mutation: updateUserMutation,
        variables: {
          userID: id,
          photo,
          name: userName,
          quote,
        },
      })
      .then((res) => {
        console.log('Update User RES : ', res);
        // updateUserData(id, photo, userName, quote);
        this.props.updateUserData(id, photo, userName, quote);

        this.setState({submiting: false});
        this.goBack();
      })
      .catch((err) => {
        console.log('Update User Err : ', err);
        this.setState({submiting: false});
      });
  };

  render() {
    let style = {
      container: {
        ...styles.container,
        backgroundColor: getTheme().background,
      },
      icon: {
        ...styles.icon,
        backgroundColor: getTheme().background,
      },
    };

    let {userName, email, photo, quote, submiting} = this.state;

    return (
      <ScrollView style={style.container}>
        <SubHeader
          noHeart={true}
          title={I18n.t('editProfile')}
          goBack={() => this.goBack()}
        />
        <View style={styles.form}>
          <TouchableOpacity style={styles.imgCont} onPress={this.chooseImg}>
            <Image
              source={{
                uri: photo,
              }}
              style={styles.img}
            />
            <Icon name="picture" type="AntDesign" style={style.icon} />
          </TouchableOpacity>

          <MyInput
            iconName={'user'}
            iconType={'AntDesign'}
            placeholder={I18n.t('username')}
            value={userName}
            onChangeText={(userName) => this.setState({userName})}
          />

          <MyInput
            iconName={'quote'}
            iconType={'Entypo'}
            placeholder={I18n.t('favQuote')}
            value={quote}
            onChangeText={(quote) => this.setState({quote})}
          />
          <View style={styles.btnCont}>
            <Button
              action={() => this.checkImgBeforeSubmit()}
              processing={submiting}
              text={I18n.t('save')}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapPropsToState = (state) => ({
  userData: state.auth.userData,
  userID: state.auth.userID,
});

export default connect(mapPropsToState, {updateUserData})(EditProfile);
