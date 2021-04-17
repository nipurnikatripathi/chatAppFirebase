import React, { useContext } from 'react';
import { Button, TouchableOpacity, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../Navigation/authProvider';
import HomeScreen from '../Screens/homeScreen';
import RoomScreen from '../Screens/roomScreen';
import AddRoomScreen from '../Screens/addRoomScreen';
import GroupRoom from '../Screens/groupRoom';
import AddProfilePicture from '../Screens/addProfilePicture';

const Stack = createStackNavigator();
const ChatAppStack = createStackNavigator();
const ModalStack = createStackNavigator();


function ChatApp() {
    const { logout } = useContext(AuthContext);

    return (
        <ChatAppStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'darkgreen',
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontSize: 22,
                },
            }}
            initialRouteName='AddProfilePicture'
        >
            <ChatAppStack.Screen name='AddProfilePicture' component={AddProfilePicture} />
            <ChatAppStack.Screen name='Room' component={RoomScreen} />
            <ChatAppStack.Screen options={({ navigation }) => ({
                headerRight: () => (
                    <Button
                        title="Add Room"
                        color='darkblue'
                        onPress={() => navigation.navigate('AddRoom')}
                    />
                ),
            })}
                name='Home' component={HomeScreen} />
            <ChatAppStack.Screen options={({ navigation }) => ({
                headerRight: () => (
                    <TouchableOpacity style={{
                        backgroundColor: 'darkgreen', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginHorizontal: 10, borderColor: 'white', borderWidth: 2
                    }}
                        onPress={() => logout()}
                    >
                        <Text style={{
                            fontSize: 30, fontWeight: "bold", color: 'white',
                        }}>LO</Text>
                    </TouchableOpacity>
                ),
            })} name='GroupRoom' component={GroupRoom} />

        </ChatAppStack.Navigator>
    );
}

export default function HomeStack() {
    return (
        <ModalStack.Navigator mode='modal' headerMode='none'>
            <ModalStack.Screen name='ChatApp' component={ChatApp} />
            <ModalStack.Screen name='AddRoom' component={AddRoomScreen} />
        </ModalStack.Navigator>
    );
}
