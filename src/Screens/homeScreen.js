import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Navigation/authProvider';
import { View, Button, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import Loading from '../Components/loader';

const HomeScreen = ({ navigation }) => {
    const { user, logout } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    // const [groupUsers, setGroupUsers] = useState([]);

    const getAllUsers = async () => {

        const userCollectionRef = firestore().collection('USERS');
        // const groupCollectionRef = firestore().collection('THREADS');

        const registeredUser = userCollectionRef.get();
        // const groupRooms = groupCollectionRef.get();

        const [
            registeredUserInApp,
            // groupRoomsInApp,
        ] = await Promise.all([registeredUser,
            // groupRooms
        ]);

        const registeredUserArray = registeredUserInApp.docs;
        // const groupRoomsArray = groupRoomsInApp.docs;

        const userRegistered = registeredUserArray.map((value) => {
            return { ...value.data() }
        });

        // const groupRegistered = groupRoomsArray.map((value) => {
        //     return { ...value.data() }
        // });

        // const allUsersCollection = registeredUserArray.concat(groupRoomsArray);

        // const fetchUsers = allUsersCollection.map((value) => {
        //     return { ...value.data() }
        // });


        setUsers(userRegistered);
        // setGroupUsers(groupRegistered);
    }

    useEffect(() => {
        getAllUsers()
    }, [
        //groupUsers
    ])

    // if (loading) {
    //     return <Loading />;
    // }

    const Divider = () => {
        return (
            <View style={Styles.divider} />
        )
    }

    const List = ({ item }) => {
        return (
            (auth().currentUser.uid !== item.uid) &&
            <TouchableOpacity onPress={() => handleNavigation(item)}
                style={Styles.listContainer}>
                <Text style={Styles.listText}>{item.name}</Text>
            </TouchableOpacity>

        )
    }

    const handleNavigation = (item) => {
        navigation.navigate('Room', { receiverName: item.name, receiverId: item.uid });
    }

    return (
        <View style={Styles.container}>
            <Button
                title="LOGOUT"
                onPress={() => logout()}
            />
            {/* {groupUsers &&
                <View>
                    <Text style={Styles.heading}> Group Rooms </Text>
                    <FlatLis console.log("clicked!!!"); navigation.navigate('Room', { receiverName: item.name, receiverId: item.uid })t
                        data={groupUsers}
                        keyExtractor={(item) => item.uid}
                        ItemSeparatorComponent={() => <Divider />}
                        renderItem={({ item }) => {
                            return (
                                <List item={item} />)
                        }}
                    />
                </View>
            } */}
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
    )
}

export default HomeScreen

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    divider: {
        backgroundColor: 'darkgrey',
        height: 1,
    },
    heading: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: "bold"
    },
    listContainer: {
        backgroundColor: 'white',
        padding: 20,
    },
    listText: {
        color: 'black',
        fontWeight: '500',
        fontSize: 25
    },
    messageBox: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        height: 50,
    },
    input: {
        width: 340,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
    },
    senderMessage: {
        backgroundColor: 'white',
        margin: 15,
        padding: 10,
        alignSelf: 'flex-end',
        borderRadius: 10,
    },
    receiverMessage: {
        backgroundColor: 'lightgreen',
        margin: 15,
        padding: 10,
        alignSelf: 'flex-start',
        borderRadius: 10,
    },
    messageText: {
        fontSize: 20,
        color: 'black'
    },
    messageTime: {
        fontSize: 10,
        alignSelf: 'flex-end'
    },

})