import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Pdf from 'react-native-pdf';
import {
  width,
  height,
  mainColor,
  subColor,
} from '../../configs/global';
import {connect} from 'react-redux';
import {setCurrentRead} from '../../actions/book';
import {addBookReadMutation} from '../../mutations/book';
import {client} from '../../queries/queryClient';
import { Icon } from 'native-base';
import I18n , {getActiveLang} from '../../translate'
import { Platform } from 'react-native';

class PDFSCR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noOfPages: 'loading..',
      currentPage: 1,
    };
  }

  async componentDidMount() {
    await client
      .mutate({
        mutation: addBookReadMutation,
        variables: {
          userID: this.props.userID,
          bookID: this.props.currentReadData.book.id,
          lastPage: this.props.currentReadData.lastPage,
        },
      })
      .catch((err) => {
      });
  }

  componentWillUnmount() {
    let newReadData = {
      book: this.props.currentReadData.book,
      lastPage: this.state.currentPage,
    };
    this.props.setCurrentRead(newReadData);
    client
      .mutate({
        mutation: addBookReadMutation,
        variables: {
          userID: this.props.userID,
          bookID: this.props.currentReadData.book.id,
          lastPage: this.state.currentPage,
        },
      })
      .catch((err) => {
      });
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  render() {
    
    let bookName = getActiveLang() === 'en' && this.props.currentReadData.book.enName ? this.props.currentReadData.book.enName : this.props.currentReadData.book.name
   
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <View style={styles.menuItem}>
            <Icon
              name={getActiveLang === 'ar' ? 'chevron-thin-right' : 'chevron-thin-left'}
              type="Entypo"
              style={styles.icon}
              onPress={this.goBack}
            />
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemHead}>{I18n.t('page')}</Text>
            <Text style={styles.menuItemBody}>
              {' '}
              {this.state.currentPage} / {this.state.noOfPages}
            </Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuItemHead}>
              {bookName}
            </Text>
            {/* <Text style={styles.menuItemBody}>
              {' '}
              {this.state.currentPage} / {this.state.noOfPages}
            </Text> */}
          </View>
        </View>
        <Pdf
          page={this.props.currentReadData.lastPage || 1}
          source={{
            uri:
              this.props.route.params.url ||
              'https://books-library.online/files/download-pdf-ebooks.org-1536784094Fw1T2.pdf',
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            // // console.log(`number of pages: ${numberOfPages}`);
            this.setState({
              noOfPages: numberOfPages,
            });
          }}
          onPageChanged={(page, numberOfPages) => {
            // // console.log(`current page: ${page}`);
            this.setState({
              currentPage: page,
            });
          }}
          onError={(error) => {
            // console.log(error);
          }}
          onPressLink={(uri) => {
            // alert(`Link presse: ${uri}`);
          }}
          activityIndicatorProps={{
            color: mainColor,
          }}
          style={styles.pdf}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    width,
    height,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: width,
    backgroundColor: '#fff',
    height: 0.1 * height,
    // borderRadius: 10,
    zIndex: 50,
    elevation: 5,
    borderColor: mainColor,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop:Platform.OS === 'ios' ? 0.03 * height : 0 

  },
  menuItem: {
    alignItems: 'center',
  },
  menuItemHead: {
    color: mainColor,
    // fontWeight: 'bold',
    fontFamily: 'Cairo',
  },
  menuItemBody: {
    color: subColor,
    fontWeight: '100',
    fontFamily: 'Cairo',
    fontSize: 0.03 * width,
  },
  icon:{
    color:mainColor
  }
});

const mapStateToProps = (state) => ({
  currentReadData: state.book.currentReadData,
  userID: state.auth.userID,
});

export default connect(mapStateToProps, {setCurrentRead})(PDFSCR);
