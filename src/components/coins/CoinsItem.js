import React from 'react'
import { View, Text, Image, StyleSheet, Platform, Pressable } from 'react-native';
import { colors } from './../../res/colors';

const CoinsItem = ({ item, onPress }) => {

    const getImageArrow = () => {
        if(item.percent_change_1h > 0) {
            return require("./../../assets/arrow_up.png");
        } else {
            return require("./../../assets/arrow_down.png");
        }
    }
    
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.symbolText}>{item.symbol}</Text> 
                <Text style={styles.nameText}>{item.name}</Text> 
                <Text style={styles.priceText}>{`$ ${item.price_usd}`}</Text> 
            </View>
            <View style={styles.row}>
                <Text style={styles.percentText}>{item.percent_change_1h}</Text>
                <Image
                    style={styles.imgIcon}
                    source={getImageArrow()}
                />
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomColor: colors.zircon,
        borderBottomWidth: 1,
        paddingLeft: Platform.OS == 'ios' ? 0 : 16,
        marginLeft: Platform.OS == 'ios' ? 16 : 0,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 5,
    },
    symbolText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 12,
    },
    nameText: {
        color: colors.white,
        fontSize: 16,
        marginRight: 16,
    },
    priceText: {
        color: colors.white,
        fontSize: 14,
    },
    percentText: {
        color: colors.white,
        marginRight: 8,
    },
    imgIcon: {
        width: 22,
        height: 22,
    }
})

export default CoinsItem;
