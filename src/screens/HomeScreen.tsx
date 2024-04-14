import { useAuth } from '@clerk/clerk-expo';
import { useUser } from "@clerk/clerk-expo";
import React from 'react'
import { Button, Text, View } from 'react-native'

const HomeScreen = () => {

    const { isLoaded, signOut,  } = useAuth();
    const { user } = useUser();
    if (!isLoaded) {
        return null;
    }

    return (
        <View >
                <Text> {user?.primaryEmailAddress?.emailAddress}</Text>
            <Button
                title="Sign Out"
                onPress={() => {
                    signOut();
                }}
            />
        </View>
    )
}

export default HomeScreen