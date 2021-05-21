import React from 'react'
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import { colors } from './../../res/colors';

const CoinsScreen = (props) => {

    const [loading, setLoading] = React.useState(false);
    const [coins, setCoins] = React.useState('');

    React.useEffect(() => {
        setLoading(true);
        getCoins();
    }, []);

    const getCoins = async () => {
        const response = await Http.instance.get('https://api.coinlore.net/api/tickers/');
        console.log('coins', response);
        setCoins(response.data);
        setLoading(false);
    }

    const handlePress = () => {
        props.navigation.navigate('CoinDetail');
    }

    return (
        <View style={styles.container}>
            
            { loading 
            ?
            <ActivityIndicator 
                style={styles.loader} 
                color='#222222' 
                size='large' 
            /> 
            : 
            <FlatList
                data={coins}
                renderItem={({ item }) => 
                    <CoinsItem item={item} />    
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
