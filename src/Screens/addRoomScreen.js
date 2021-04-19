import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, FlatList, Pressable } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function AddRoomScreen({ navigation }) {
    const [roomName, setRoomName] = useState('');
    const [users, setUsers] = useState([]);
    const [selectUser, setSelectUser] = useState([])

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = async () => {
        const userCollectionRef = firestore().collection('USERS');
        const registeredUser = userCollectionRef.get();
        const [registeredUserInApp] = await Promise.all([registeredUser]);

        const registeredUserArray = registeredUserInApp.docs;

        const userRegistered = registeredUserArray.map((value) => {
            return { ...value.data() }
        });

        setUsers(userRegistered);
    }

    const onUserSelection = (userId) => {
        console.log("userId ", userId);
        if (selectUser?.includes(userId)) {
            const removeUserIndex = selectUser.indexOf(userId);
            selectUser?.splice(removeUserIndex, 1);
        }
        else {
            selectUser.push(userId)
        }
    }

    function handleButtonPress() {
        if (roomName.length > 0) {
            firestore()
                .collection('GROUPS')
                .add({
                    type: 1,
                    name: roomName,
                    uid: new Date().getTime(),
                    created_at: new Date().getTime(),
                    created_by: auth().currentUser.uid,
                    group_members: selectUser
                })
                .then(() => {
                    navigation.navigate('Home');
                });
        }
    }

    const Divider = () => {
        return (
            <View style={Styles.divider} />
        )
    }

    const List = ({ item }) => {
        return (
            (auth().currentUser.uid !== item.uid) &&
            <Pressable onPress={() => onUserSelection(item.uid)} style={({ pressed }) => [
                {
                    backgroundColor: pressed
                        ? 'green' : 'white'
                }, Styles.listContainer]}>
                <Text style={Styles.listText}>{item.name}</Text>
                <View style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                            ? 'black' : 'red'
                    }, Styles.select]} />
            </Pressable >
        )
    }

    console.warn("selectUser", selectUser)
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
            <View style={{ flex: 1, backgroundColor: 'yellow' }}>
                <FlatList
                    data={users}
                    keyExtractor={(item) => item.uid}
                    ItemSeparatorComponent={() => <Divider />}
                    renderItem={({ item }) => {
                        return (
                            <List item={item} />)
                    }}
                />
            </View>
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
        // alignItems: 'center',
        backgroundColor: 'red',
        paddingTop: 40,
        paddingBottom: 20
    },
    heading: {
        color: 'white',
        fontSize: 30,
        marginBottom: 20,
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
    select: {
        height: 30,
        width: 30,
        borderRadius: 30,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 40,
        backgroundColor: 'white',
    },
    button: {
        marginVertical: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    buttonText: {
        color: 'black',
        fontFamily: "Cochin",
        fontSize: 20,
        fontWeight: 'bold'
    },
    listContainer:
        { justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: 20, marginVertical: 10 },
    listText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 25
    },

})
