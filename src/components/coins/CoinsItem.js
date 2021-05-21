import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { colors } from './../../res/colors';

const CoinsItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.symbolText}>{item.symbol}</Text> 
                <Text style={styles.nameText}>{item.name}</Text> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    nameText: {
        color: colors.white,
        fontSize: 14,
    },
    symbolText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 12,
    }
})

export default CoinsItem;
