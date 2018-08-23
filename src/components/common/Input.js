import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const Input = ({label, value, onChangeText }) => {

    return (
        <View style={styles.containerStyle}>
            <Text style={styles.inputStyle}>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={styles.labelStyle} />
        </View>
    );
 }

 
const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        // height: 40,
        flexDirection: 'row',
        // alignItems: 'center'
    },
    inputStyle : {
        flex: 2,
        color: '#000',
        paddingLeft: 5,
        paddingRight: 5,
        fontSize: 18,
        lineHeight: 23
    },
    labelStyle: {
        flex: 1,
        fontSize: 18,
        paddingLeft: 20,
    }
});

export { Input };