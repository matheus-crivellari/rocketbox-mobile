import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container : {
        // React-native works only with flex-box-layout
        felx: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },

    logo:{
        flex: 1,
    },
});

export default styles;