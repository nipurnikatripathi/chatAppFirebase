import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const AddProfilePicture = ({ navigation }) => {
    const [profilePicture, setProfilePicture] = useState('This is my profile picture')

    const handleAddProfilePicture = () => {
        navigation.navigate("Home")
    }

    const handleSkip = () => {
        navigation.navigate("Home")
    }
    return (
        <View style={Styles.container}>
            <Text style={Styles.heading}>Add Profile Picture</Text>
            <TextInput
                style={Styles.input}
                onChangeText={userRoomName => setRoomName(userRoomName)}
                placeholder="Please select your profile picture from gallery"
                placeholderTextColor="black"
                value={profilePicture}
                keyboardType="default"
                autoCapitalize='none'
                autoCorrect={false}
            />
            <TouchableOpacity
                onPress={handleAddProfilePicture}
                style={Styles.button}>
                <Text style={Styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSkip}
                style={Styles.close}>
                <Text style={Styles.buttonText}>Skip</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddProfilePicture;

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
        bottom: 10,
        right: 10,
        height: 50,
        width: 50,
        borderRadius: 25,
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