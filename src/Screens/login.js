import React, { useState, useContext, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../Navigation/authProvider';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useContext(AuthContext);

    const handleSubmit = useCallback(() => {
        let validationMessage = '';
        if (
            email === '' &&
            password === ''
        ) {
            validationMessage = 'Please enter valid email address';
            Alert.alert(validationMessage);
        } else if (email === '') {
            validationMessage = 'Please enter valid email address';
            Alert.alert(validationMessage);
        } else if (password === '') {
            validationMessage = 'Please enter valid password';
            Alert.alert(validationMessage);
        }
        else {
            login(email, password)
        }
    }, [email, password]);

    return (
        <View style={Styles.container}>
            <Text style={Styles.heading}>Login</Text>
            <TextInput
                style={Styles.input}
                onChangeText={userEmail => setEmail(userEmail)}
                placeholder="Please enter your email"
                placeholderTextColor="black"
                value={email.trim()}
                keyboardType="email-address"
                autoCapitalize='none'
                autoCorrect={false}
            />
            <TextInput
                style={Styles.input}
                onChangeText={userPassword => setPassword(userPassword)}
                value={password.trim()}
                placeholder="Please enter your password"
                placeholderTextColor="black"
                keyboardType="visible-password"
                maxLength={20}
                secureTextEntry={true}
            />
            <Pressable
                style={Styles.buttonContainer}
                onPress={handleSubmit}
            >
                <Text style={Styles.buttonText}>SUBMIT</Text>
            </Pressable>

            <TouchableOpacity
                style={Styles.navButton}
                onPress={() => navigation.navigate('Signup')}
            >
                <Text style={Styles.navButtonText}>New user? Join here</Text>
            </TouchableOpacity>

        </View>
    )
}
export default Login;

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    heading: {
        fontFamily: "Cochin",
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 30,
        color: 'white'
    },
    input: {
        height: 50,
        width: 300,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 40,
        backgroundColor: 'white',
    },
    buttonContainer: {
        width: 100,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'black',
        fontFamily: "Cochin",
        fontSize: 20,
    },
    navButton: {
        marginTop: 30,
    },
    navButtonText: {
        color: 'white'
    }
})