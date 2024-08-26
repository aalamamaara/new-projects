import React from "react";
import logo from './money.png'
import "./App.css"
import { useState } from "react";
import { useEffect } from "react";
import Axios from 'react'
const App = () =>{
  const [ammount,setammount] = useState(0)
  const [form ,setform] = useState("inr")
  const [to,setto] = useState("usd")
  const [info,setinfo] = useState([])
  const [option,setoption] = useState([])
  const [output,setoutput] = useState()
  useEffect(() => {
    fetchData()
  },[form])
  useEffect(() => {
    setoption(Object.keys(info))
    convert()
  },[info])
  useEffect(() => {
    
    convert()
  },[ammount,to])
  const convert = ()=>{
    const rate = info[to]
    setoutput(ammount*rate)
  }
  const fetchData = async () => {
    try {
        const response = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${form}.json`); // Replace with your API endpoint
        const data = await response.json();
        setinfo(data[form]);
        console.log(data[form]);

        // Log the fetched data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
  return (
    <div className="App">
      <div className="converter">
        <div className="header">
          <h4><img src={logo} alt="" />Currency Converter</h4>
        </div>
        <div className="container">
         <div className="left">
          <h4>Ammount</h4>
          <input type="text"  placeholder="Enter Amount" onChange={(e)=> 
          setammount(e.target.value)
           
          }/>
         </div>
         <div className="middle">
          <h4>From</h4>
          <select  onChange={(e)=> setform(e.target.value)}>
          {option.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
          </select>
         </div>
         <div className="right">
         <h4>To</h4>
          <select  onChange={(e)=> setto(e.target.value)}>
          {option.map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
          </select>
         </div>
         <div className="result">
          <h5>converted Ammount</h5>
          <h5>{ammount} {form} = {output} {to}</h5>
          <button onClick={convert}>Convert</button>
         </div>
       </div>
       </div> 
      <div className="image">
        <img src={logo} alt="" />
      </div>
    </div>
  )
}
export default App
