import {ACTIONS} from "./App"
import { StyleSheet, Text } from "react-native"

function DigitButton({dispatch, digit}){
    return( <Text style={ButtonStyle.button} onPress={ () => dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit} }) } >
        {digit}
    </Text>)
}
export default DigitButton

const ButtonStyle = StyleSheet.create({
    button: {
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 50,
        backgroundColor: 'black',
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        width:'25%',
        height: 90,
        paddingVertical: 25,
    }
})