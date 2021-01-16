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
import {width, height, mainColor} from '../../configs/global';
import Button from '../../Components/Button/Button';
import {connect} from 'react-redux';
import {signUp} from '../../actions/auth';

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
          <TextInput
            style={[styles.input]}
            placeholder="Username"
            // keyboardType="email-address"
            onChangeText={username => setUsername(username)}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="position">
          <TextInput
            style={[styles.input]}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={email => setEmail(email)}
          />
        </KeyboardAvoidingView>
        <KeyboardAvoidingView behavior="position">
          <TextInput
            style={[styles.input, {marginBottom: 36}]}
            secureTextEntry
            placeholder="Password"
            onChangeText={password => setPassword(password)}
          />
        </KeyboardAvoidingView>
        <Button
          text="Register"
          processing={processing}
          action={() => props.signUp(username, email, password)}
        />
        <View style={styles.signUpLinkView}>
          <Text style={styles.text}> Already have an Account ? </Text>
          <Text
            onPress={() => {
              props.navigation.pop();
            }}
            style={styles.textLink}>
            SignIn Now
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height,
  },
  content: {
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderRadius: 10,
    // borderColor: mainColor,
    // borderWidth: 1,
    width: 0.8 * width,
    marginVertical: 0.025 * height,
    paddingHorizontal: 0.05 * width,
    fontFamily: 'Cairo',
    elevation: 2,
    shadowColor: mainColor,
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

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {signUp})(Register);
