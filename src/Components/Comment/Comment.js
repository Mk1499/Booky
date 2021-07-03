import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {Thumbnail, Icon} from 'native-base';
import {getActiveLang} from '../../translate';
import {client} from '../../queries/queryClient';
import {addCommentAction} from '../../mutations/book';

export default class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: null,
      dislikes: null,
      liked: false,
      disliked: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    let {likeState} = this.props;
    console.log('Now : ', likeState);
    console.log('upcoming : ', nextProps.likeState);
    if (nextProps.likeState !== likeState) {
      this.setState({
        liked: nextProps.likeState === 'liked' ? true : false,
        disliked: nextProps.likeState === 'disliked' ? true : false,
        likes: nextProps.commentData.usersLikes.length,
        dislikes: nextProps.commentData.usersDislikes.length,
      });
    }
  }

  componentDidMount() {
    let {commentData, likeState} = this.props;
    this.setState({
      likes: commentData?.usersLikes?.length || 0,
      dislikes: commentData?.usersDislikes?.length || 0,
      liked: likeState === 'liked' ? true : false,
      disliked: likeState === 'disliked' ? true : false,
    });
  }

  likeIconClicked = () => {
    let {liked, likes, dislikes, disliked} = this.state;
    if (liked) {
      this.setState({
        liked: false,
        likes: likes - 1,
      });
      this.sendCommentAction(' ');
    } else {
      this.setState({
        liked: true,
        likes: likes + 1,
        dislikes: disliked ? dislikes - 1 : dislikes,
        disliked: false,
      });
      this.sendCommentAction('like');
    }
  };

  dislikeIconClicked = () => {
    let {liked, likes, dislikes, disliked} = this.state;
    if (disliked) {
      this.setState({
        disliked: false,
        dislikes: dislikes - 1,
      });
      this.sendCommentAction(' ');
    } else {
      this.setState({
        disliked: true,
        dislikes: dislikes + 1,
        likes: liked ? likes - 1 : likes,
        liked: false,
      });
      this.sendCommentAction('dislike');
    }
  };

  sendCommentAction = async (action) => {
    let {userID, commentData} = this.props;
    await client.mutate({
      mutation: addCommentAction,
      variables: {
        userID,
        commentID: commentData.id,
        action,
      },
    });
  };

  render() {
    let {commentData} = this.props;
    let {user, comment} = commentData;
    let {liked, disliked, likes, dislikes} = this.state;
    let dirStyle = {
      flexDirection: getActiveLang() === 'ar' ? 'row-reverse' : 'row',
    };
    let textAlignStyle = {
      textAlign: getActiveLang() === 'ar' ? 'right' : 'left',
    };

    let userImg = user?.photo
      ? {uri: user?.photo}
      : require('../../../assets/images/avatar.jpg');
    return (
      <View style={[styles.container]}>
        <View style={[styles.commentCont, dirStyle]}>
          <Thumbnail style={styles.userImg} source={userImg} />
          <View style={styles.textCont}>
            <Text style={[styles.userName, textAlignStyle]}>{user?.name}</Text>
            <Text
              style={[styles.comment, textAlignStyle]}
              numberOfLines={3}
              ellipsizeMode="tail">
              {comment}
            </Text>
          </View>
        </View>
        <View style={styles.likes}>
          <View style={styles.likesCont}>
            <View style={styles.likeDataCont}>
              <Icon
                name={disliked ? 'dislike1' : 'dislike2'}
                type="AntDesign"
                onPress={this.dislikeIconClicked}
                style={styles.likeIcon}
              />
              <Text style={styles.likesText}>{dislikes}</Text>
            </View>
            <View style={styles.likeDataCont}>
              <Icon
                name={liked ? 'like1' : 'like2'}
                type="AntDesign"
                onPress={this.likeIconClicked}
                style={styles.likeIcon}
              />
              <Text style={styles.likesText}>{likes}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
