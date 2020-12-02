import {createReducer } from "@reduxjs/toolkit"
import * as actionTyps from '../Actions/index'

const initialState ={
  count:0,
  name:'Reeta',
  age:10,
  data:[],
  success:false,
  error:false
}

const formulary = createReducer(initialState, {
  [actionTyps.success.type]: state => Object.assign({...state,data:actionTyps.success,success:true}),
  [actionTyps.failer.type]: state => Object.assign({...state,data:actionTyps.failer,error:true}),
})

export default formulary
