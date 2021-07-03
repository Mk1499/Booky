import React, {Component} from 'react';
import {Text, View, FlatList,RefreshControl} from 'react-native';
import styles from './style';
import SubHeader from '../../Components/SubHeader/SubHeader';
import I18n from '../../translate';
import Comment from '../../Components/Comment/Comment';
import {client} from '../../queries/queryClient';
import {getBookComments} from '../../queries/book';
import {connect} from 'react-redux';
import { mainColor } from '../../configs/global';

class BookComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookComments: [],
      bookName: '',
      book: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    let {bookName, book} = this.props.route.params;
    this.setState(
      {
        bookName,
        book,
        //   comments,
      },
      () => {
        this.getComments();
      },
    );
  }

  getComments = async () => {
    await client
      .query({
        query: getBookComments,
        variables: {
          bookID: this.state.book.id,
        },
        fetchPolicy:'no-cache'
      })
      .then(({data}) => {
        console.log('Book Comments Q : ', data);
        let {bookComments} = data;
        this.setState({
          bookComments,
          refreshing: false,
        });
      });
  };

  renderComment = ({item}) => {
    let userID = this.props.userData.id;
    let userLikedFlag = item?.usersLikes.includes(userID);
    let userDislikedFlag = item?.usersDislikes.includes(userID);
    return (
      <Comment
        likeState={
          userLikedFlag ? 'liked' : userDislikedFlag ? 'disliked' : null
        }
        commentData={item}
        userID={userID}
      />
    );
  };

  goBack = () => {
    let {navigation} = this.props;
    navigation.goBack();
  };

  refreshComments = () => {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        this.getComments();
      },
    );
  };

  render() {
    const {bookName, bookComments, refreshing} = this.state;
    console.log('c : ', bookComments);
    return (
      <View style={styles.container}>
        <SubHeader
          noHeart={true}
          title={bookName + ' ' + I18n.t('comments')}
          goBack={() => this.goBack()}
        />
        {/* <Text> textInComponent </Text> */}
        <FlatList
          data={bookComments}
          renderItem={this.renderComment}
          refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={() => this.refreshComments()}
            colors={[mainColor]}
          />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
});

export default connect(mapStateToProps, {})(BookComments);
