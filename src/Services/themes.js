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

export const changeTheme = () => {
  if (activeTheme === 'light') {
    activeTheme = 'dark';
  } else {
    activeTheme = 'light';
  }
  console.log('New Theme is : ', getTheme());
};

export const getTheme = () => {
  console.log('Get Theme Called : ', activeTheme);
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
