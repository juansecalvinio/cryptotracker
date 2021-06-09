import React from 'react'
import Http from '../../libs/http';
import Storage from '../../libs/storage';
import CoinMarketItem from './CoinMarketItem';
import { 
    ActivityIndicator, 
    Alert, 
    View, 
    Text, 
    Image, 
    Pressable, 
    StyleSheet, 
    FlatList, 
    SectionList
} from 'react-native';
import { colors } from '../../res/colors';

const CoinDetailScreen = (props) => {
    
    const [coin, setCoin] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [markets, setMarkets] = React.useState([]);
    const [isFavorite, setIsFavorite] = React.useState(false);

    React.useEffect(() => {
        setLoading(true);
        const { coin } = props.route.params;
        props.navigation.setOptions({ title: coin.symbol });
        setCoin(coin);
        getMarkets(coin.id);
        getFavorite(coin);
    }, [])

    const getNameIcon = (string) => {
        if(string) {
            const name = string.toLowerCase().replace(" ", "-");
            return `https://c1.coinlore.com/img/25x25/${name}.png`;
        }
    }

    const getSections = (coin) => {
        const sections = [
            {
                title: "Market cap",
                data:  [coin.market_cap_usd]
            },
            {
                title: "Volume 24h",
                data:  [coin.volume24]
            },
            {
                title: "Change 24h",
                data:  [coin.percent_change_24h]
            }
        ]

        return sections;
    }

    const getMarkets = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
        const markets = await Http.instance.get(url);
        setMarkets(markets);
        setLoading(false);
    }

    const toggleFavorite = () => {
         !isFavorite ? addFavorite() : removeFavorite();
    }

    const getFavorite = async (item) => {
        try {
            const key = `favorite-${item.id}`;

            const favorite = await Storage.instance.get(key);

            if(favorite !== null) {
                setIsFavorite(true);
            }

        } catch (error) {
            console.log("Get favorite error", error);
        }
    }

    const addFavorite = async () => {
        const stringCoin = JSON.stringify(coin);
        const key = `favorite-${coin.id}`;
        
        const stored = await Storage.instance.store(key, stringCoin);

        if(stored) setIsFavorite(true);
    }

    const removeFavorite = () => {

        const key = `favorite-${coin.id}`;

        Alert.alert("Remove favorite", "Are you sure?", [
            {
                text: "Cancel",
                onPress: () => {}
            },
            {
                text: "Remove",
                onPress: async () => {
                    if(await Storage.instance.remove(key)) {
                        setIsFavorite(false);
                    }
                },
                style: "destructive"
            }
        ])

    }

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <View style={styles.row}>
                    <Image
                        style={styles.iconImg}
                        source={{ uri: getNameIcon(coin.name) }}
                        />
                    <Text style={styles.titleText}>{ coin.name }</Text>
                </View>

                <Pressable 
                    onPress={toggleFavorite}
                    style={[
                        styles.btnFavorite,
                        isFavorite ? 
                        styles.btnFavoriteRemove : 
                        styles.btnFavoriteAdd,
                    ]}>
                    <Text style={styles.btnFavoriteText}>{ isFavorite ? "Remove favorite" : "Add favorite" }</Text>
                </Pressable>
            </View>

            <SectionList 
                style={styles.section}
                sections={getSections(coin)}
                keyExtractor={(item) => item}
                renderItem={({ item }) => 
                    <View style={styles.sectionItem}>
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                }
                renderSectionHeader={({ section }) => 
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionText}>{section.title}</Text>
                    </View>
                }
            />

            <Text style={styles.marketsTitle}>Markets</Text>

            { loading ? 
            <ActivityIndicator 
                style={styles.loader} 
                color='#fff' 
                size='large' 
            />  :
            <FlatList 
                style={styles.list}
                data={markets}
                horizontal={true}
                renderItem={({ item }) => <CoinMarketItem key={item.id} item={item} />}
            /> }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.charade,
    },
    subHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        padding: 16,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    row: {
        flexDirection: 'row',
    },
    iconImg: {
        width: 25,
        height: 25,
    },
    titleText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 8,
    },
    section: {
        maxHeight: 220,
    },
    sectionHeader: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        padding: 8,
    },
    sectionItem: {
        padding: 8,
    },
    itemText: {
        color: colors.white,
        fontSize: 14,
    },
    sectionText: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    marketsTitle: {
        color: colors.white,
        fontSize: 16,
        marginBottom: 16,
        marginLeft: 16,
        fontWeight: 'bold',
    },
    list: {
        maxHeight: 100,
        paddingLeft: 16,
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8,
    },
    btnFavoriteText: {
        color: colors.white,
    },
    btnFavoriteAdd: {
        backgroundColor: colors.picton,
    },
    btnFavoriteRemove: {
        backgroundColor: colors.carmine,
    }
});

export default CoinDetailScreen;
