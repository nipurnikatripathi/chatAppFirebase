import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

export default function GroupRoom({ route }) {
    const [messages, setMessages] = useState('');
    const [threads, setThreads] = useState([]);

    const { receiverName, receiverId } = route.params;

    const getMessages = async () => {

        const messageCollectionRef = firestore().collection('OneToOneMessageThreads');

        const senderOne = messageCollectionRef.where("receiverId", "==", receiverId).where("senderId", "==", auth().currentUser.uid).get();
        const senderTwo = messageCollectionRef.where("senderId", "==", receiverId).where("receiverId", "==", auth().currentUser.uid).get();

        const [
            senderTypeOne,
            senderTypeTwo,
        ] = await Promise.all([senderOne, senderTwo]);

        const senderTypeOneArray = senderTypeOne.docs;
        const senderTypeTwoArray = senderTypeTwo.docs;

        const allMessages = senderTypeOneArray.concat(senderTypeTwoArray);

        const fetchMessage = allMessages.map((value) => {
            return { ...value.data() }
        });

        const sortedMessage = fetchMessage.sort(function (x, y) {
            return y.timestamp - x.timestamp;
        })

        setThreads(sortedMessage)
    }

    useEffect(() => {
        getMessages()
    }, [messages])

    const handleSend = async () => {
        await firestore()
            .collection('OneToOneMessageThreads')
            .add({
                senderName: auth().currentUser.providerData[0].displayName,
                senderId: auth().currentUser.uid,
                receiverName: receiverName,
                receiverId: receiverId,
                message: messages,
                timestamp: new Date().getTime(),
            })
        setMessages('')
    }

    const Message = ({ item }) => {
        return (
            <View style={{
                ...Styles.senderMessage, alignSelf: auth().currentUser.uid === item.senderId ? 'flex-end' : 'flex-start',
                backgroundColor: auth().currentUser.uid === item.senderId ? 'white' : 'lightgreen'
            }}>
                {(auth().currentUser.uid !== item.senderId) && (<Text style={Styles.messageHeading}>{item.senderName}</Text>)}
                <Text style={Styles.messageText}>{item.message}</Text>
                <Text style={Styles.messageTime} >{moment(item.timestamp).format("h:mm A")}</Text>
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
                        <Message item={item} />
                    )
                }}
            />
            <View style={Styles.messageBox} >
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
        flex: 1,
        position: 'absolute',
        flexDirection: 'row',
        bottom: 0,
    },
    messageHeading: {
        fontSize: 12,
        color: 'blue'
    },
    input: {
        flexGrow: 1,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
    },
    senderMessage: {
        backgroundColor: 'white',
        margin: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: "80%"
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
        fontSize: 12,
        alignSelf: 'flex-end',
        color: 'black',
    },
})
