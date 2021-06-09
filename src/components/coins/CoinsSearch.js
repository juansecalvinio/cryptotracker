import React from 'react'
import { View, Text, TextInput, Platform, StyleSheet } from 'react-native';
import { colors } from './../../res/colors';

const CoinsSearch = (props) => {

    const [query, setQuery] = React.useState('');

    const handleText = query => {
        setQuery(query);

        if(props.onChange) {
            props.onChange(query);
        }
    }

    return (
        <View>
            <TextInput
                style={[
                    styles.textInput,
                    Platform.OS == 'ios' ? 
                    styles.textInputIOS : 
                    styles.textInputAndroid
                ]} 
                onChangeText={handleText}
                value={query}
                placeholder="Search coin"
                placeholderTextColor="#FFF"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: colors.charade,
        color: colors.white,
        height: 46,
        paddingLeft: 16,
    },
    textInputAndroid: {
        borderBottomWidth: 2,
        borderBottomColor: colors.zircon,
    },
    textInputIOS: {
        borderRadius: 8,
        margin: 8,
    }
});

export default CoinsSearch;
