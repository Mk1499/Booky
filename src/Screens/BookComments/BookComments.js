import React, { Component } from 'react';
import { Text, View, FlatList, RefreshControl,KeyboardAvoidingView,ActivityIndicator } from 'react-native';
import styles from './style';
import SubHeader from '../../Components/SubHeader/SubHeader';
import I18n from '../../translate';
import Comment from '../../Components/Comment/Comment';
import { client } from '../../queries/queryClient';
import { getBookComments } from '../../queries/book';
import {addBookCommentMutation} from '../../mutations/book'
import { connect } from 'react-redux';
import { height, mainColor } from '../../configs/global';
import CommentForm from '../../Components/CommentForm/CommentForm';
import { getTheme } from '../../Services/themes';


class BookComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookComments: [],
      bookName: '',
      book: null,
      refreshing: false,
      loadComments:true
    };
    this.commentsListRef = React.createRef();
  }

  componentDidMount() {
    let { bookName, book } = this.props.route.params;
    this.setState(
      {
        bookName,
        book,
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
        fetchPolicy: 'no-cache'
      })
      .then(({ data }) => {
        console.log('Book Comments Q : ', data);
        let { bookComments } = data;
        this.setState({
          bookComments,
          refreshing: false,
          loadComments:false
        });
      }).catch(()=>{
        this.setState({
          refreshing: false,
          loadComments:false
        })
      })
  };

  renderComment = ({ item }) => {
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
    let { navigation } = this.props;
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

  pushComment = (body) => {
    // alert(body);
    let {userData} = this.props; 
    let newComment = {
      comment:body, 
      user:{
        id: userData.id,
        name:userData.name,
        photo:userData.photo,
      },
      usersLikes:[],
      usersDislikes:[],
    }
    this.setState({
      bookComments:[...this.state.bookComments,newComment]
    })
    this.commentsListRef.current?.scrollToEnd();
  }

  submitComment = async (body) => {
    let userID = this.props.userData.id;
    let bookID = this.state.book.id; 
    let comment = body;   
    try{
      this.pushComment(body);
    } catch(err){
      console.log("Error : ", err);
    }
    client.mutate({
      mutation:addBookCommentMutation, 
      variables:{
        userID,
        bookID,
        comment
      }
    })

  }

  

  render() {
    const { bookName, bookComments, refreshing,loadComments } = this.state;
    
    let style ={
      container :{
        ...styles.container, 
        backgroundColor:getTheme().background,
        //  height:"100%"

      }
    }

    return (
      <View style={style.container}>
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={40}>

        <SubHeader
          noHeart={true}
          title={bookName + ' ' + I18n.t('comments')}
          goBack={() => this.goBack()}
        />
        <View style={styles.content} >

          {/* <Text> textInComponent </Text> */}
          {loadComments ?
             <View style={styles.loadingCont}>
             <ActivityIndicator style={styles.spinner}
             size="large"
             color={mainColor}
             />
             </View>
          : !bookComments.length ? 
            <View style={styles.msgCont} >
              <Text style={styles.msg}>{I18n.t("noComments")}</Text>
            </View>
          :
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
          ref={this.commentsListRef}
          />
        }
        </View>

          <View style={styles.addCommentCont}>
            <CommentForm submit={(body)=>{ this.submitComment(body) }} />
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.auth.userData,
});

export default connect(mapStateToProps, {})(BookComments);
