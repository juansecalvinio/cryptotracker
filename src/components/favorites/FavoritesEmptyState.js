import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const FavoritesEmptyState = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>You dont have any items here</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center",
        justifyContent: 'center',
    },
    text: {
        color: "#FFFFFF",
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: "center"
    }
})

export default FavoritesEmptyState;
