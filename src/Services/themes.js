import AsyncStorage from '@react-native-async-storage/async-storage';

const ligthTheme = {
  name: 'LightTheme',
  primary: '#fe2c54',
  secondary: 'grey',
  background: '#fff',
  card: '#eee',
  text: '#333',
  border: '#eee',
};
const darkTheme = {
  name: 'DarkTheme',
  primary: '#fe2c54',
  secondary: 'grey',
  background: '#1f2933',
  card: '#333',
  text: '#fff',
  border: '#333',
};

let activeTheme = 'light';

export const initializeTheme = () => {
  return new Promise(async (resolve, reject) => {
    activeTheme = await AsyncStorage.getItem('activeTheme') || 'light';
    resolve(true);
  });
};

export const changeTheme = () => {
  if (activeTheme === 'light') {
    activeTheme = 'dark';
    AsyncStorage.setItem('activeTheme', 'dark');
  } else {
    activeTheme = 'light';
    AsyncStorage.setItem('activeTheme', 'light');
  }
};

export const getTheme = () => {
  if (activeTheme === 'light') {
    return ligthTheme;
  } else if (activeTheme === 'dark') {
    return darkTheme;
  }
};

export const themeStyle = () => ({
  backgroundColor: getTheme().background,
  color: getTheme().text,
});
