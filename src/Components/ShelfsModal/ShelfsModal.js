import React, {Component} from 'react';
import {Text, View, FlatList, StyleSheet, Image} from 'react-native';
import Modal from 'react-native-modal';
import {mainColor, width, height, subColor} from '../../configs/global';
import {Icon} from 'native-base';

export default class ShelfsModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelfs: [
        {
          id: 1,
          name: 'Romance',
          cover: 'https://m.media-amazon.com/images/I/51O+bnIT5uL.jpg',
        },
      ],

      visible: this.props.visible,
    };

    console.log('Shelf props : ', this.props);
  }

  toggleModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  renderShelfItem = ({item, index}) => (
    <View style={styles.shelfRow}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={{uri: item.cover}} style={styles.shelfCover} />
        <Text style={styles.shelfName}>{item.name}</Text>
      </View>
      <Icon
        name="add"
        style={styles.shelfAddIcon}
        onPress={this.props.hideModal}
      />
    </View>
  );

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('Changeeee : ', nextProps.visible, prevState.visible);
    if (nextProps.visible !== prevState.visible) {
      return {
        visible: nextProps.visible,
      };
    }
  }

  render() {
    return (
      <View>
        <Modal
          isVisible={this.state.visible}
          onBackdropPress={this.props.hideModal}
          onBackButtonPress={this.props.hideModal}>
          <View style={styles.container}>
            <View style={styles.content}>
              <View style={styles.headerView}>
                <Text style={styles.header}>Select Book Shelf</Text>
              </View>
              <View style={styles.shelfList}>
                <FlatList
                  data={this.state.shelfs}
                  renderItem={this.renderShelfItem}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 0.85 * width,
    minHeight: 0.75 * height,
    backgroundColor: '#eee',
    borderRadius: 10,
  },
  headerView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0.01 * height,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    width: '80%',
    alignSelf: 'center',
  },
  header: {
    fontFamily: 'Cairo',
    color: mainColor,
  },
  shelfList: {
    marginVertical: 0.05 * height,
    alignItems: 'center',
  },
  shelfRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 0.75 * width,
    // backgroundColor: "#fff",
    alignItems: 'center',
    paddingHorizontal: 0.02 * width,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    height: 0.1 * height,
  },

  shelfCover: {
    width: '30%',
    height: 0.08 * height,
    borderRadius: 7,
    marginHorizontal: 0.02 * width,
  },
  shelfName: {
    color: mainColor,
    fontFamily: 'Cairo',
  },
  shelfAddIcon: {
    color: mainColor,
  },
});
