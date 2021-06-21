import {CommonActions, StackActions} from '@react-navigation/native';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(name, params) {
  _navigator.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
}

function replace(name, params) {
  // console.log('Replace to : ', name);
  _navigator.dispatch(
    StackActions.replace(name),
    // StackActions.reset({
    //   index: 0,
    //   actions: [CommonActions.navigate({name})],
    // }),
  );
}
// add other navigation functions that you need and export them

export default {
  navigate,
  replace,
  setTopLevelNavigator,
};
