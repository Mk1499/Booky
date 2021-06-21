import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Button from '../../Components/Button/Button';
import {login, checkAutoLogin, loginLoading} from '../../actions/auth';
import connect from 'react-redux/lib/connect/connect';
import I18n, {getActiveLang} from '../../translate';
import {styles} from './styles';
import MyInput from '../../Components/MyInput';
import {width} from '../../configs/global';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function checkMail(e) {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(e).toLowerCase());
  }

  let dirStyle = {
    flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
  };

  let inputDirStyle = {
    textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/logoName.png')}
        resizeMode="contain"
        style={styles.logoImg}
      />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.content}>
        <KeyboardAvoidingView behavior="position">
          {/* <TextInput
            style={[styles.input, inputDirStyle]}
            placeholder={I18n.t('email')}
            keyboardType="email-address"
            onChangeText={(email) => setEmail(email)}
          /> */}
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
          text={I18n.t('login')}
          processing={props.processing}
          action={() => {
            props.loginLoading();
            props.login(email, password);
          }}
        />
        <View style={[styles.signUpLinkView, dirStyle]}>
          <Text style={styles.text}>{I18n.t('notMember')} </Text>
          <Text
            onPress={() => {
              // console.log('Nav : ', props.navigation);
              props.navigation.navigate('SignUp');
            }}
            style={styles.textLink}>
            {I18n.t('registerNow')}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => ({
  processing: state.auth.loginLoading,
});

export default connect(mapStateToProps, {login, checkAutoLogin, loginLoading})(
  Login,
);
