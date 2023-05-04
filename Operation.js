import {ACTIONS} from "./App"
import { Text, StyleSheet } from "react-native"

function OperationButton({dispatch, operation}){
    return (
    <Text style={ButtonStyle.Operationbutton} onPress={ () => dispatch({type: ACTIONS.CHOOSE_OPERATION, payload: {operation} }) } >
        {operation}
    </Text>
    )
}
export default OperationButton

const ButtonStyle = StyleSheet.create({
    Operationbutton: {
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 6,
        backgroundColor: 'green',
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        width:'25%',
        height: 90,
        paddingVertical: 25,
    }
})

