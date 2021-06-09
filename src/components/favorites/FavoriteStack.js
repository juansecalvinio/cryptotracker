import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import FavoriteScreen from './FavoritesScreen';
import { colors } from './../../res/colors';

const Stack = createStackNavigator();

const FavoriteStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ 
                headerStyle: {
                    backgroundColor: colors.blackPearl,
                    shadowOpacity: 0,
                    
                },
                headerTintColor: colors.white
            }}
        >
            <Stack.Screen 
                name="Favorites" 
                component={FavoriteScreen}
            />
        </Stack.Navigator>
    )
}

export default FavoriteStack;
