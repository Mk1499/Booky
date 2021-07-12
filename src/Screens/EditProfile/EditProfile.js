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
import dummyProfileImg from '../../../assets/images/avatar.jpg';
import dummyCover from '../../../assets/images/cover.jpg';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.userData.id,
      userName: props.userData.name,
      email: props.userData.email,
      photo: props.userData.photo,
      cover: props.userData.cover,
      quote: props.userData.quote,
      submiting: false,
      profileImg: null,
    };

    // console.log('edit profile props : ', props);
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
          this.setState({
            photo: res.uri,
            profileImg: res,
          });
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  chooseCoverImg = async () => {
    try {
      await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })
        .then(async (res) => {
          this.setState({
            cover: res.uri,
            coverImg: res,
          });
        })
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  uploadImg = async (type) => {
    let {profileImg, coverImg} = this.state;
    return new Promise(async (resolve, reject) => {
      let imgName;
      let reference;
      let data;

      if (type === 'profile') {
        imgName = `${Math.random() * 10000}${profileImg.name}`;
        reference = storage().ref(`profilePics/${imgName}`);
        data = await RNFS.readFile(profileImg.uri, 'base64');
      } else {
        imgName = `${Math.random() * 10000}${coverImg.name}`;
        reference = storage().ref(`coverPics/${imgName}`);
        data = await RNFS.readFile(coverImg.uri, 'base64');
      }
      await reference
        .putString(data, 'base64')
        .then(async () => {
          let imgURL = await reference.getDownloadURL();
          resolve(imgURL);
        })
        .catch((err) => {
          // console.log("Can't upload : ", err);
        });
    });
  };

  checkImgBeforeSubmit() {
    let {profileImg, coverImg} = this.state;
    this.setState({
      submiting: true,
    });

    // if user change old profile
    if (profileImg || coverImg) {
      if (profileImg) {
        this.uploadImg('profile').then((imgURL) => {
          if (coverImg) {
            this.uploadImg('cover').then((coverURL) => {
              this.submit(imgURL, coverURL);
              this.setState({
                profileImg: null,
                coverImg: null,
              });
            });
          } else {
            this.submit(imgURL);
            this.setState({
              profileImg: null,
            });
          }
        });
      } else if (coverImg) {
        this.uploadImg('cover').then((coverURL) => {
          this.submit(this.state.photo, coverURL);
          this.setState({
            coverImg: null,
          });
        });
      }
    } else {
      this.submit();
    }
  }

  submit = async (photo = this.state.photo, cover = this.state.cover) => {
    let {id, userName, quote} = this.state;
    this.setState({submiting: true});
    console.log('cover before submit : ' , cover);

    await client
      .mutate({
        mutation: updateUserMutation,
        variables: {
          userID: id,
          photo,
          name: userName,
          quote,
          cover,
        },
      })
      .then((res) => {
        // console.log('Update User RES : ', res);
        // updateUserData(id, photo, userName, quote);
        this.props.updateUserData(id, photo,cover, userName, quote);

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

    let {userName, cover, photo, quote, submiting} = this.state;

    return (
      <ScrollView style={style.container}>
        <SubHeader
          noHeart={true}
          title={I18n.t('editProfile')}
          goBack={() => this.goBack()}
        />
        <View style={styles.coverCont}>
          <Image
            style={styles.cover}
            source={cover ? {uri: cover} : dummyCover}
            defaultSource={dummyCover}
          />
          <Icon
            name="edit"
            type="Feather"
            style={[style.icon, styles.editCoverBtn]}
            onPress={this.chooseCoverImg}
          />
        </View>
        <View style={styles.form}>
          <TouchableOpacity style={styles.imgCont} onPress={this.chooseImg}>
            <Image
              source={{
                uri: photo,
              }}
              style={styles.img}
              defaultSource={dummyProfileImg}
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
