import React from 'react'
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import CoinsSearch from './CoinsSearch';
import { colors } from './../../res/colors';

const CoinsScreen = (props) => {

    const [loading, setLoading] = React.useState(false);
    const [allCoins, setAllCoins] = React.useState([]);
    const [coins, setCoins] = React.useState([]);

    React.useEffect(() => {
        setLoading(true);
        getCoins();
    }, []);

    const getCoins = async () => {
        const response = await Http.instance.get('https://api.coinlore.net/api/tickers/');
        console.log('coins', response);
        setAllCoins(response.data);
        setCoins(response.data);
        setLoading(false);
    }

    const handlePress = (coin) => {
        props.navigation.navigate('CoinDetail', { coin });
    }

    const handleSearch = (query) => {
        const coinsFiltered = allCoins.filter(coin => {
            return coin.name.toLowerCase().includes(query.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(query.toLowerCase())
        })
        setCoins(coinsFiltered);
    }

    return (
        <View style={styles.container}>

            <CoinsSearch onChange={handleSearch} />
            
            { loading 
            ?
            <ActivityIndicator 
                style={styles.loader} 
                color={colors.white} 
                size='large' 
            /> 
            : 
            <FlatList
                data={coins}
                renderItem={({ item }) => 
                    <CoinsItem item={item} onPress={() => handlePress(item)} />    
                }
            />
            }
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.charade,
        padding: 10,
    },
    loader: {
        marginTop: 60,
    },
})

export default CoinsScreen;
