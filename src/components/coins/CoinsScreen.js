import React from 'react'
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Http from '../../libs/http';

const CoinsScreen = (props) => {

    React.useEffect(() => {
        getCoins();
    }, []);

    const getCoins = async () => {
        const coins = await Http.instance.get('https://api.coinlore.net/api/tickers/');
        console.log('coins', coins);
    }

    const handlePress = () => {
        props.navigation.navigate('CoinDetail');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Coins Screen</Text>
            <Pressable style={styles.btn} onPress={handlePress}>
                <Text style={styles.btnText}>Go to detail</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FDFEFE',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        fontWeight: '600',
    },
    btn: {
        padding: 8,
        backgroundColor: '#5DADE2',
        borderRadius: 8,
        margin: 16,
    },
    btnText: {
        color: '#FDFEFE',
        textAlign: 'center',
    }
})

export default CoinsScreen;
