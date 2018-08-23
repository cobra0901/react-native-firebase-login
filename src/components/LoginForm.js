import React, { Component }  from 'react';
import { View, Text, Button, TextInput, TouchableHighlight, TouchableWithoutFeedback, Modal, ScrollView, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'firebase';

import { Card, CardSection, Input } from './common';
import ChromelogoIcon from '../../assets/icons/chromelogo.icon';
import CancelIcon from '../../assets/icons/cancel.icon';
// import { ChromelogoIcon, CancelIcon } from '../../assets/icons/icons.js';


 
export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            email: '',
            password: '',
            loading: false,
            error: '',
            errMessage: 'Unfortunately, we weren\'t able to authorize this account, try again.',
            modalVisible: false,

        };
    }

    renderButton = () => {

        if(this.state.loading) {
            return <Text style={styles.buttonText}>{'Loading...'.toUpperCase()}</Text>;
        }

        return(
            <Text style={styles.buttonText}>
                {'Sign in'.toUpperCase()}
            </Text>
        );
    }

    _onLoginSuccess = () => {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false,
            modalVisible: false,
        });
    }

    _onLoginFailed = (err) => {

        this.setState({
            password: '',
            error: err.code,
            errMessage: err.message,
            loading: false,
            modalVisible: true,
        });
    }
    
    _onSignupButtonPressed = () => {

        const { email, password } = this.state;


        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(this._onLoginSuccess.bind(this))
            .catch(this._onLoginFailed.bind(this))
    }
    
    onLoginButtonPress = () => {

        const { email, password } = this.state;

        this.setState({ error: '', loading: true});

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this._onLoginSuccess.bind(this))
            .catch(this._onLoginFailed.bind(this))
    }

    render() {
        return(
            <KeyboardAwareScrollView
                style={{ backgroundColor: '#4c69a5' }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.kawarecontainer}
                scrollEnabled={true}>

                    <View style={styles.container}>
                    
                        <ScrollView style={styles.scrollviewContainer}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{flexGrow: 1}}>

                            <View style={styles.welcomeContainer}>
                            
                                <View style={styles.logoWrapper}>
                                    <View style={styles.icon}>
                                        <ChromelogoIcon width={75} height={75} />
                                    </View>
                                </View>

                                <View style={styles.welcomeTitleWrapper}>
                                    <Text style={styles.welcomeText}>Welcome to Udemy</Text>
                                </View>

                                <View style={styles.welcomeSubTitleWrapper}>
                                    <Text style={styles.welcomeSubTitleText}>The Complete React Native and Redux Course</Text>
                                </View>
                            </View>


                            <View style={styles.loginContainer}>
                                <View style={styles.usernameField}>
                                    <Text style={styles.usernameLabel}>Email</Text>
                                    <TextInput
                                        style={styles.usernameInput}
                                        autoCorrect={false}
                                        keyboardType={'email-address'}
                                        underlineColorAndroid={'#D2D2D3'}
                                        value={this.state.email}
                                        placeholder="hello@reactcourse.com"
                                        onChangeText={email => this.setState({email})} />
                                </View>
                                <View style={styles.passwordField}>
                                    <Text style={styles.passwordLabel}>Password</Text>
                                    <TextInput
                                        style={styles.passwordInput}
                                        secureTextEntry={true}
                                        value={this.state.password}
                                        underlineColorAndroid={'#D2D2D3'}
                                        onChangeText={password => this.setState({password})} />
                                </View>
                                <View style={styles.signinField}>
                                    <TouchableHighlight onPress={this.onLoginButtonPress.bind(this)} underlayColor="white">
                                        <View style={styles.signinButton}>
                                            {this.renderButton()}
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>

                            
                            <View style={styles.signupContainer}>
                                <TouchableHighlight onPress={this._onSignupButtonPressed.bind(this)} underlayColor="white">
                                    <Text style={styles.signupLabel}>Sign up for an account</Text>
                                </TouchableHighlight>
                                
                            </View>

                        </ScrollView>
                    </View>

                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {this.setState({modalVisible: false})}}>
                        <View style={styles.modalBackground}>
                            <View style={{flex: 1}} />
                            <View style={styles.modalContainer}>

                                <View style={styles.modalTitle}>
                                    <Text style={styles.modalTitleText}>Oops!</Text>
                                </View>

                                <View style={styles.modalBody}>
                                    <View style={styles.modalBodyIcon}>
                                        <CancelIcon width={50} height={50} />
                                    </View>
                                    <View style={styles.modalBodyText}>
                                        <Text style={styles.modalBodyTextStyle}>{this.state.errMessage}</Text>
                                    </View>
                                </View>

                                <View style={styles.modalButton}>
                                    <TouchableWithoutFeedback onPress={() => {this.setState({modalVisible: false})}}>
                                        <View>
                                            <Text style={styles.modalButtonTextStyle}>{'Got it!'.toUpperCase()}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            
                            </View>
                            <View style={{flex: 1}} />
                        </View>
                    </Modal>
                
            </KeyboardAwareScrollView>     
        );
    }
}


const styles = StyleSheet.create({
    kawarecontainer: {
        flex: 1,
    },
    scrollviewContainer: {
        // flex: 1,
        // backgroundColor: 'red',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FCFCFC',
    },
    welcomeContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    logoWrapper: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        padding: 10,
        justifyContent: 'center'
    },
    icon: {
        flex: 1,
        marginTop: 8,
        alignItems: 'center',
    },
    welcomeTitleWrapper: {
        flex: 0.3,
        flexDirection: 'column',
        marginTop: 10,
        alignItems: 'center',
    },
    welcomeSubTitleWrapper: {
        flex: 1,
        marginTop: 5,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 22,
        color: '#4ed589'
    },
    welcomeSubTitleText: {
        color: '#AAAAAA',
        fontSize: 15,
    },
    loginContainer: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 35,
    },
    usernameField: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 35,
        marginRight: 35
    },
    usernameLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#AAAAAA'
    },
    usernameInput: {
        fontSize: 16,
        height: 50,
    },
    passwordField: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 35,
        marginRight: 35
    },
    passwordLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#AAAAAA'
    },
    passwordInput: {
        fontSize: 16,
        height: 50,
    }, 
    signinField: {
        marginTop: 15,
        marginLeft: 35,
        marginRight: 35,
    },
    signinButton: {
        alignItems: 'center',
        borderRadius: 45,
        backgroundColor: '#4ed589',
    },
    buttonText: {
        fontSize: 16,
        padding: 15,
        color: 'white'
    },
    signupContainer: {
        flex: 0.3,
        flexDirection: 'row',
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'blue',
    },
    signupLabel: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        alignItems: 'center',
        color: '#AAA',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: '#00000090',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginRight: 30,
        marginLeft: 30,
        padding: 10,
        borderRadius: 3,
    },
    modalTitle: {
        flex: 1,
    },
    modalTitleText: {
        marginTop: 10,
        marginLeft: 10,
        color: '#EF9391',
        fontSize: 26,
        fontWeight: 'bold',
    },
    modalBody: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    }, 
    modalBodyIcon: {
        marginLeft: 10,
    },
    modalBodyText: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 20,
        marginRight: 15,
    },
    modalBodyTextStyle: {
        color: '#929292',
        fontSize: 16,
    },
    modalButton: {
        flex: 1,
        alignItems: 'flex-end',
    },
    modalButtonTextStyle: {
        color: '#EF9391',
        fontSize: 20,
        marginRight: 15,
        fontWeight: 'bold',
    },
   
});