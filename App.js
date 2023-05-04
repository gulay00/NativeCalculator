import { StyleSheet, View,Text } from "react-native";
import { useReducer } from "react";
import DigitButton from "./Digit";
import OperationButton from "./Operation";


// KALKULYATORDA EDİLƏBİLƏCƏK ACTİONLAR
export const ACTIONS ={
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'  
}

function reducer(state, {type,payload}){
  switch(type){
    // rəqəm əlavə etdikdə
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      // BİRDƏN ÇOX 0 ƏLAVƏ EDİLƏBİLMƏSİN İLK BAŞTA
      if(payload.digit === "0" && state.currentOperand ==="0") {return state}
      // İLK BAŞTA . QOYULA BİLMƏSİN
      if(payload.digit === "." && state.currentOperand.includes('.')) {return state}
      // STATE QALSIN RƏQƏMİ YANINA ƏLAVƏ ELƏSİN
      return{
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CHOOSE_OPERATION: 
    // EKRAN BOŞDUSA ƏMƏLİYYAT SEÇİLƏ BİLMƏSİN
      if(state.currentOperand == null && state.previousOperand == null){
        return state
      }

      if(state.currentOperand == null){
        return{
          ...state,
          operation: payload.operation
        }
      }

      if(state.previousOperand == null){
        return{
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }
      }

      return{
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }

    // AC BASANDA EKRANI SİLSİN
    case ACTIONS.CLEAR:
      return {}
    // = BASANDA
    case ACTIONS.EVALUATE:
      // HƏRHANSISA BİRİ BOŞDUSA HESABLAMA EDİLMƏSİN
      if(
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null 
      ){
        return state
      }
      return {
        ...state,
        overwrite: true,
        currentOperand: evaluate(state),
        operation : null,
        previousOperand: null
      }
    case ACTIONS.DELETE_DIGIT:{
     if(state.overwrite){
      return{
        ...state,
        overwrite:false,
        currentOperand: null
      }
     }
    //  CURRENT BOŞDUSA HEÇNƏ ELƏMƏ ƏGƏR 1 ƏDƏD VARSA CURRENTİ NULL ETSİN
     if(state.currentOperand==null) return state
     if(state.currentOperand.length === 1) {
      return {...state, currentOperand:null} 
    }

    // SONDAN 1İ SİLSİN
    return{
      ...state,
      currentOperand: state.currentOperand.slice(0,-1)
    }

    }

  }

}

function evaluate({previousOperand,currentOperand,operation}){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch(operation){
    case "+":
      computation = prev + current
      break
    case "-":
        computation = prev - current
        break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  }
  return computation.toString()
}


export default function App() {

  const[{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer,{})

  return (
      <View style={styles.container}>
        <View style={styles.output}>
          <Text style={styles.previous}>{previousOperand} {operation}</Text>
          <Text style={styles.current}>{currentOperand}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonLong} onPress={() => dispatch({type: ACTIONS.CLEAR})}>AC</Text>
          <Text style={styles.button} onPress={() => dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</Text>
          
           <OperationButton operation="+" dispatch={dispatch} />
           <DigitButton digit="1" dispatch={dispatch} />
           <DigitButton digit="2" dispatch={dispatch} /> 
           <DigitButton digit='3' dispatch={dispatch} />
           <OperationButton operation="*" dispatch={dispatch} />
           <DigitButton digit="4" dispatch={dispatch} />
           <DigitButton digit="5" dispatch={dispatch} />
           <DigitButton digit="6" dispatch={dispatch} />
           <OperationButton operation='÷' dispatch={dispatch} />
           <DigitButton digit="7" dispatch={dispatch} />
           <DigitButton digit="8" dispatch={dispatch} />
           <DigitButton digit="9" dispatch={dispatch} />
           <OperationButton operation="-" dispatch={dispatch} />
           <DigitButton  digit="." dispatch={dispatch} />
           <DigitButton  digit="0" dispatch={dispatch} />
           <Text style={styles.buttonLong}  onPress={() => dispatch({type: ACTIONS.EVALUATE})} >=</Text>
        </View>
       
            <Text style={{fontSize:20, textAlign:'center'}}>
              Gulay Muradli
            </Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#eaeaea',
    height:'100%',
    display: 'flex',
  },
  button: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 6,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    width:'25%',
    height: 90,
    paddingVertical: 25,
  },
  buttonLong: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 6,
    color: 'white',
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight:'bold',
    width:'50%',
    height: 90,
    paddingVertical: 25,
    
  },
  buttonContainer: {
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    display: 'flex',
    // backgroundColor: 'yellow'
  },
  output:{
    marginVertical: 20,
    backgroundColor: '#dedfe4',
    borderRadius: 12
  },
  previous:{
    padding: 15,
    textAlign:'right',
    fontSize: 20
  },  
  current:{
    padding: 15,
    textAlign:'right',
    fontWeight: 'bold',
    fontSize: 35
  }

  
});

