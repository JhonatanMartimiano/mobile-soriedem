import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    info: {
        fontSize: 20,
        color: 'white'
    },
    infoKey: {
        fontWeight: 'bold',
        color: 'white'
    },
    request: {
        fontSize: 20,
        marginBottom: 20,
        color: 'yellow'
    },
    products: {
        marginTop: 0
    },
    productsTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    product: {
        fontSize: 18
    },
    buttons: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    button: {
        padding: 15,
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    buttonFinalize: {
        backgroundColor: 'green'
    },
    buttonCancel: {
        backgroundColor: 'red'
    }
})