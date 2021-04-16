import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function GroupRoom() {
    const [messages, setMessages] = useState('');
    const [threads, setThreads] = useState([]);

    useEffect(() => {
        fetchMessages()
    }, [threads]);

    const fetchMessages = async () => {
        const messages = await firestore()
            .collection('Messages')
            .orderBy('timestamp', 'desc')
            .get()
        setThreads(messages.docs)
    };

    const handleSend = async () => {
        await firestore()
            .collection('Messages')
            .add({
                message: messages,
                timestamp: new Date(),
                userId: auth().currentUser.uid,
                userName: auth().currentUser.displayName
            })
        setMessages('')
    }

    const Message = ({ item }) => {
        return (
            <View style={{
                ...Styles.senderMessage, alignSelf: auth().currentUser.uid === item.userId ? 'flex-end' : 'flex-start',
                backgroundColor: auth().currentUser.uid === item.userId ? 'white' : 'lightgreen'
            }}>
                {(auth().currentUser.uid !== item.userId) && (<Text style={Styles.messageHeading}>{item.userName}</Text>)}
                <Text style={Styles.messageText}>{item.message}</Text>
            </View>
        )
    }
    return (
        <View style={Styles.container}>
            <FlatList
                inverted
                data={threads}
                keyExtractor={function (item) {
                    return item.id
                }}
                renderItem={({ item }) => {
                    return (
                        < Message item={item.data()} />
                    )
                }}
            />
            < View style={Styles.messageBox} >
                <TextInput
                    style={Styles.input}
                    onChangeText={userMessage => setMessages(userMessage)}
                    placeholder="Type your message here"
                    placeholderTextColor="black"
                    value={messages}
                    keyboardType="default"
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <Button title="Send" color="darkgreen" onPress={handleSend} />
            </View >
        </View >
    );
}

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        paddingBottom: 50,
    },
    messageBox: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
        height: 50,
    },
    messageHeading: {
        fontSize: 12,
        color: 'blue'
    },
    input: {
        width: 340,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
    },
    senderMessage: {
        backgroundColor: 'white',
        margin: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: "70%"
    },
    receiverMessage: {
        backgroundColor: 'lightgreen',
        margin: 15,
        padding: 10,
        alignSelf: 'flex-start',
        borderRadius: 10,
    },
    messageText: {
        fontSize: 20
    },
    messageTime: {
        fontSize: 10,
        alignSelf: 'flex-end'
    },

})