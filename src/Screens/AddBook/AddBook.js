import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Button from '../../Components/Button/Button';

import {styles} from './style';

export default class AddBook extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
      
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.content}>
          <KeyboardAvoidingView behavior="position">
            <TextInput
              style={[styles.input]}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={(email) => setEmail(email)}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView behavior="position">
            <TextInput
              style={[styles.input, {marginBottom: 36}]}
              secureTextEntry
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
            />
          </KeyboardAvoidingView>
          <Button
            text="Login"
            processing={this.props.processing}
            action={() => {
              props.loginLoading();
              props.login(email, password);
            }}
          />
          <View style={styles.signUpLinkView}>
            <Text style={styles.text}>Don't Have Account ? </Text>
            <Text
              onPress={() => {
                this.props.navigation.navigate('SignUp');
              }}
              style={styles.textLink}>
              SignUp Now
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}
