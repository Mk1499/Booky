import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity , Keyboard} from 'react-native';
import styles from './style';
import I18n from '../../translate';
import { getTheme } from '../../Services/themes';

export default class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            body: ''
        }
        this.inputRef = React.createRef();
    }

    submit = () => {
        Keyboard.dismiss(); 
        this.inputRef.current.clear()
        this.props.submit(this.state.body);
        this.setState({body:''});
    }


    render() {
        let style = {
            container: {
                ...styles.container,
                backgroundColor: getTheme().background
            }
        }


        return (
            <View style={style.container}>
                <TextInput
                    style={styles.input}
                    placeholder={I18n.t("addYourComment")}
                    placeholderTextColor={getTheme().text}
                    onChangeText={(body) => { this.setState({ body }) }}
                    ref={this.inputRef}
                    onSubmitEditing={this.submit}
                />
                <TouchableOpacity style={styles.button} onPress={this.submit}>
                    <Text style={styles.btnText} >{I18n.t("send")}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
