import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native';
import FavoritesEmptyState from './FavoritesEmptyState';
import CoinsItem from './../coins/CoinsItem';
import { colors } from './../../res/colors';
import Storage from './../../libs/storage';

const FavoritesScreen = ({ navigation }) => {

    const [favorites, setFavorites] = React.useState([]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => getFavorites());
        return unsubscribe;
    }, [navigation])

    getFavorites = async () => {
        try {
            const allKeys = await Storage.instance.getAllKeys();

            const favoritesKeys = allKeys.filter((key) => key.includes("favorite-"));

            let favorites = await Storage.instance.multiGet(favoritesKeys);

            const data = favorites.map(item => JSON.parse(item[1]));

            setFavorites(data);

        } catch (error) {
            console.log("Get favorites error", error);
        }
    }

    handlePress = (coin) => {
        navigation.navigate("CoinDetail", { coin });
    }

    return (
        <View style={styles.container}>
            { favorites.length == 0 ? 
                <FavoritesEmptyState /> : 
                <FlatList 
                    data={favorites}
                    renderItem={({ item }) => 
                        <CoinsItem item={item}
                            onPress={() => handlePress(item)}
                        />
                    }
                />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.charade,
        flex: 1
    },
})

export default FavoritesScreen;
