import React, {Component} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import styles from './style';
import Modal from 'react-native-modal';
import {width} from '../../configs/global';
import {getTheme} from '../../Services/themes';

export default class PickerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      choosen: '',
    };
  }

  toggleModal = () => {
    this.setState({visible: !this.state.visible});
  };

  choose = (item) => {
    this.props.action(item);
    this.setState({
      choosen: item.name,
    });
    this.toggleModal();
  };

  renderItem = ({item}) => {
    let blankPhotoURL =
      'https://discountflooringsupplies.com.au/wp-content/uploads/blank-img.jpg';

    let style = {
      listItem: {
        ...styles.listItem,
        borderColor: getTheme().border,
      },
    };
    return (
      <TouchableOpacity
        style={style.listItem}
        onPress={() => this.choose(item)}>
        <Image
          source={{uri: item.avatarURL || item.photoURL || blankPhotoURL}}
          style={styles.itemImg}
        />
        <Text style={styles.itemName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    let {visible, choosen} = this.state;
    let {label, data} = this.props;
    let style = {
      container: {
        ...styles.container,
        backgroundColor: getTheme().background,
      },
      modalContent: {
        ...styles.modalContent,
        backgroundColor: getTheme().background,
      },
    };
    return (
      <View style={style.container}>
        {choosen ? (
          <View style={styles.chooseCont}>
            <Text style={styles.choosenName}>{choosen}</Text>
            <TouchableOpacity
              style={styles.chooseBtn}
              onPress={this.toggleModal}>
              <Text style={styles.chooseText}>{label}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          //   <Button text={label} action={this.toggleModal} />
          <View style={{width: 0.8 * width, flexDirection: 'row-reverse'}}>
            <TouchableOpacity style={styles.mianBtn} onPress={this.toggleModal}>
              <Text style={styles.mainBtnLabel}>{label}</Text>
            </TouchableOpacity>
          </View>
        )}
        <Modal
          isVisible={visible}
          onBackdropPress={this.toggleModal}
          onBackButtonPress={this.toggleModal}
          useNativeDriver={true}>
          <View style={styles.modalContainer}>
            <View style={style.modalContent}>
              <View style={styles.header}>
                <Text style={styles.headerText}>{label}</Text>
              </View>
              <View style={styles.dataCont}>
                <FlatList
                  style={styles.list}
                  renderItem={this.renderItem}
                  data={data}
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
