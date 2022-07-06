import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1
    },
    info: {
        fontSize: 20
    },
    infoKey: {
        fontWeight: 'bold',
        color: 'black'
    },
    request: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    products: {
        marginTop: 20,
        backgroundColor: '#306192',
        padding: 10,
        borderRadius: 10

    },
    productsTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'yellow'
    },
    product: {
        fontSize: 18,
        color: '#CCC',
        textAlign: 'center'
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