import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import {
    Welcome,
    Walkthrough,
    
    Home,
    Login,

    Banner
} from "./screens";
{/*8번줄 AuthMain,*/}
const Stack = createStackNavigator();

const App = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Welcome'}
            >
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Walkthrough" component={Walkthrough} />

                

                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Banner" component={Banner} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

{/*<Stack.Screen name="AuthMain" component={AuthMain} /> 25번줄쯤 있어야하는애*/}
export default App;