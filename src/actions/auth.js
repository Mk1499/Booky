import Navigation from '../Routes/NavigationServices';
import {
  LOGIN,
  LOGOUT,
  AUTOLOGIN,
  REGISTERATION,
  SETUSERDATA,
  UPDATEUSERIMG,
  LOGINLOADING,
} from './types';
import {
  userLogin,
  userLogout,
  addUser,
  updateUserImgMutation,
  getUserDetailsQuery,
} from '../queries/queries';
import {RNToasty} from 'react-native-toasty';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {baseURL} from '../configs/global';
import {AsyncStorage} from 'react-native';

const client = new ApolloClient({
  uri: baseURL,
  cache: new InMemoryCache(),
});

function checkMail(e) {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return expression.test(String(e).toLowerCase());
}

export const signUp = (name, email, password) => async (dispatch) => {
  console.log('user Data : ', name);
  if (name && email && password) {
    await client
      .mutate({
        mutation: userLogin,
        variables: {
          email,
          password,
        },
      })
      .then(async (res) => {
        if (res.data.loginUser) {
          throw 'Sorry but this email Registered before';
        } else {
          await client
            .mutate({
              mutation: addUser,
              variables: {
                name,
                email,
                password,
              },
            })
            .then((res) => {
              console.log('Reg RES : ', res);
              let userData = {};
              userData.email = res.data.addUser.email;
              userData.name = res.data.addUser.name;
              userData.id = res.data.addUser.id;
              AsyncStorage.setItem('userID', userData.id);
              dispatch({
                type: REGISTERATION,
                payload: userData,
              });
              Navigation.replace('Home');
            })
            .catch((err) => {
              console.log('Reg Error : ', err);
            });
        }
      })
      .catch((err) => {
        console.log('Logout Err : ', err);
        RNToasty.Error({
          title: err,
        });
      });
  } else {
    RNToasty.Error({
      title: 'All fields must be filled',
    });
  }
};

export const loginLoading = () => (dispatch) => {
  dispatch({
    type: LOGINLOADING,
    payload: true,
  });
};

export const login = (email, password) => async (dispatch) => {
  try {
    if (!checkMail(email)) {
      RNToasty.Error({
        title: 'Please Enter a Vaild Email',
      });
      dispatch({
        type: LOGINLOADING,
        payload: false,
      });
    } else if (!password) {
      RNToasty.Error({
        title: 'Please Enter a Vaild Password',
      });
      dispatch({
        type: LOGINLOADING,
        payload: false,
      });
    } else {
      // props.navigation.navigate('Home');
      console.log('Use Query');
      await client
        .mutate({
          mutation: userLogin,
          variables: {
            email,
            password,
          },
        })
        .then((res) => {
          console.log('Login Data : ', res);
          if (res.data.loginUser !== null) {
            let userData = {};
            userData['name'] = res.data.loginUser.name;
            userData['email'] = res.data.loginUser.email;
            userData['photo'] = res.data.loginUser.photo;
            userData['id'] = res.data.loginUser.id;
            dispatch({
              type: LOGIN,
              payload: userData,
            });
            // AsyncStorage.setItem('userData', JSON.stringify(userData));
            AsyncStorage.setItem('userID', userData.id);

            Navigation.replace('Home');
          } else {
            RNToasty.Error({
              title: 'Wrong Email or Password',
            });
            dispatch({
              type: LOGINLOADING,
              payload: false,
            });
          }
        })
        .catch((err) => {
          console.log('ERR : ', err);
        });
    }
  } catch (err) {
    console.log('Catched Err : ', err);
  }
};

export const logout = (userID) => async (dispatch) => {
  console.log('User ID : ', userID);
  await client
    .mutate({
      mutation: userLogout,
      variables: {
        id: userID,
      },
    })
    .then(async (res) => {
      console.log('Logout Res : ', res);
      if (true) {
        AsyncStorage.setItem('userID', '');
        dispatch({
          type: LOGOUT,
        });
        Navigation.replace('Login');
      } else {
        RNToasty.Error({
          title: 'Wrong network',
        });
      }
    })
    .catch((err) => {
      console.log('Logout Error : ', err);
    });
};

export const checkAutoLogin = () => async (dispatch) => {
  // let userData = await AsyncStorage.getItem('userData');
  let userID = await AsyncStorage.getItem('userID');

  if (userID) {
    // userData = JSON.parse(userData);
    dispatch({
      type: AUTOLOGIN,
      payload: userID,
    });
    Navigation.replace('Home');
  } else {
    Navigation.replace('Login');
  }
};

export const updateUserImg = (id, photoURL) => async (dispatch) => {
  client
    .mutate({
      mutation: updateUserImgMutation,
      variables: {
        id,
        photoURL,
      },
    })
    .then((res) => {
      console.log('updated user image res : ', res);
      dispatch({
        type: UPDATEUSERIMG,
        payload: res.data.updateUserImage.photo,
      });
    })
    .catch((err) => {
      console.log('update user image err : ', err);
    });
};

export const getUserDetails = (id) => async (dispatch) => {
  client
    .query({
      query: getUserDetailsQuery,
      variables: {
        id,
      },
    })
    .then((res) => {
      console.log('User Info11 : ', res);
      dispatch({
        type: SETUSERDATA,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      console.log('getting user info err : ', err);
    });
};
