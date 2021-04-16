import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from '../Screens/signUp';
import Login from '../Screens/login';

const Stack = createStackNavigator();

export default function AuthStack() {
    // const [isNewUser, setIsNewUser] = useState(false)


    // const retrieveData = async () => {
    //     console.log("retrieve data")
    //     try {
    //         const value = await AsyncStorage.getItem('isNewUser');
    //         console.log("value", value);
    //         setIsNewUser(JSON.parse(value));
    //         // let parsed = JSON.parse(value);
    //         // console.log("parsed", parsed);
    //     } catch (error) {
    //         console.log("error from async", error);
    //         // Error retrieving data
    //     }
    // };

    // useEffect(() => {
    //     retrieveData()
    // }, [])


    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='Login'>
            <Stack.Screen
                name='Login'
                component={Login}
            />
            <Stack.Screen name='Signup' component={Signup} />
        </Stack.Navigator>
    );
}
