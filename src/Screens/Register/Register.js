import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Header from '../../Components/Header/Header';
import {width, height, mainColor, bgColor} from '../../configs/global';
import Button from '../../Components/Button/Button';
import {connect} from 'react-redux';
import {signUp} from '../../actions/auth';
import I18n, {getActiveLang} from '../../translate';
import MyInput from '../../Components/MyInput';

function Register(props) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);

  function checkMail(e) {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(e).toLowerCase());
  }

  function submitForm() {
    if (!username) {
      alert('Please Insert your Password');
    } else if (!checkMail(email)) {
      alert('Please a vaild email Email');
    } else if (!password) {
      alert('Please Insert your Password');
    } else {
      props.navigation.navigate('Home');
      setProcessing(false);
    }
  }

  let dirStyle = {
    flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
  };

  let inputDirStyle = {
    textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
  };

  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <Image
        source={require('../../../assets/images/logoName.png')}
        resizeMode="contain"
        style={styles.logoImg}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}>
        <KeyboardAvoidingView behavior="position">
          <MyInput
            placeholder={I18n.t('username')}
            onChangeText={(username) => setUsername(username)}
            width={0.8 * width}
            iconName="user"
            iconType="AntDesign"
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="position">
          <MyInput
            placeholder={I18n.t('email')}
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email)}
            width={0.8 * width}
            iconName="email"
            iconType="Entypo"
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="position">
          <MyInput
            placeholder={I18n.t('password')}
            onChangeText={(password) => setPassword(password)}
            width={0.8 * width}
            iconName="lock"
            iconType="Entypo"
            secure={true}
          />
        </KeyboardAvoidingView>
        <Button
          text={I18n.t('register')}
          processing={processing}
          action={() => props.signUp(username, email, password)}
        />
        <View style={[styles.signUpLinkView, dirStyle]}>
          <Text style={styles.text}>{I18n.t('alreadyMember')}</Text>
          <Text
            onPress={() => {
              props.navigation.pop();
            }}
            style={styles.textLink}>
            {I18n.t('signinNow')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
    backgroundColor: bgColor,
  },
  content: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    // borderColor: mainColor,
    // borderWidth: 1,
    width: 0.8 * width,
    marginVertical: 0.025 * height,
    paddingHorizontal: 0.05 * width,
    fontFamily: 'Cairo',
    borderColor: mainColor,
    borderBottomWidth: 1,
    color: mainColor,
  },
  logoImg: {
    width: 0.8 * width,
    height: 0.1 * height,
    alignSelf: 'center',
    marginTop: 0.05 * height,
  },
  signUpLinkView: {
    marginVertical: 0.04 * height,
    flexDirection: 'row',
  },
  text: {
    fontFamily: 'Cairo',
  },
  textLink: {
    fontFamily: 'Cairo',
    color: mainColor,
  },
});

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {signUp})(Register);
