import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    console.log("loginCredentials", email, password)
                    try {
                        const login = await auth().signInWithEmailAndPassword(email, password);
                        console.log("user account signed in", login.user);
                    } catch (error) {
                        if (error.code === 'auth/user-not-found') {
                            console.log(`auth/user-not-found`);
                            Alert.alert(`User not found. Try to login with valid email address.`)
                        }
                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                            Alert.alert(`${email} is an invalid email. Please enter a valid email.`)
                        }
                        if (error.code === 'auth/wrong-password') {
                            console.log('wrong password');
                            Alert.alert('Password is invalid. Please enter a valid password.')
                        }
                        console.log(error);
                    }
                },
                register: async (email, password, displayName) => {
                    console.log("registerCredentials", email, password, displayName);
                    try {
                        const signin = await auth().createUserWithEmailAndPassword(email, password);
                        await signin.user.updateProfile({
                            displayName: displayName
                        });
                        await AsyncStorage.setItem('isNewUser', JSON.stringify(login.additionalUserInfo.isNewUser))

                        // await AsyncStorage.setItem('User', JSON.stringify(login.additionalUserInfo.isNewUser))

                        await firestore()
                            .collection('USERS')
                            .add({
                                type: 2,
                                name: displayName,
                                email: email,
                                uid: signin.user.uid,
                            })
                        console.log("User account created & signed in!", signin, signin.user);

                    } catch (error) {
                        if (error.code === 'auth/email-already-in-use') {
                            console.log(`${email} is already in use! Try to login with some other email address`);
                            Alert.alert(`This email is already in use! Try to login with some other email address.`)
                        }
                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                            Alert.alert(`${email} is an invalid email. Please enter a valid email.`)
                        }
                        if (error.code === 'auth/weak-password') {
                            console.log('weak password');
                            Alert.alert('Please enter a password atleast 6 characters long.')
                        }
                        console.log(error);
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                        console.log("user signout");
                    } catch (e) {
                        console.error(e);
                    }
                }
            }}
        >
            { children}
        </AuthContext.Provider >
    );
};
