import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';

export default function AddRoomScreen({ navigation }) {
    const [roomName, setRoomName] = useState('');

    function handleButtonPress() {
        if (roomName.length > 0) {
            firestore()
                .collection('THREADS')
                .add({
                    name: roomName
                })
                .then(() => {
                    navigation.navigate('Home');
                });
        }
    }

    return (
        <View style={Styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}
                style={Styles.close}>
                <Text style={Styles.buttonText}>X</Text>
            </TouchableOpacity>
            <Text style={Styles.heading}>Create a new chat room</Text>
            <TextInput
                style={Styles.input}
                onChangeText={userRoomName => setRoomName(userRoomName)}
                placeholder="Please enter room name"
                placeholderTextColor="black"
                value={roomName}
                keyboardType="default"
                autoCapitalize='none'
                autoCorrect={false}
            />
            <TouchableOpacity onPress={handleButtonPress}
                style={Styles.button}>
                <Text style={Styles.buttonText}>Create</Text>
            </TouchableOpacity>

        </View>
    );
}


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    heading: {
        color: 'white',
        fontSize: 30,
        marginBottom: 20
    },
    close: {
        position: 'absolute',
        top: 10,
        right: 10,
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        height: 50,
        width: 300,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 40,
        backgroundColor: 'white',
    },
    button: {
        width: 100,
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10

    },
    buttonText: {
        color: 'black',
        fontFamily: "Cochin",
        fontSize: 20,
        fontWeight: 'bold'
    }
})