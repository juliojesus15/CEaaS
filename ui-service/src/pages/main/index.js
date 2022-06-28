import React, { useState } from "react"
import { InputPython } from "../../components/input"
import { OutputPython } from "../../components/output"

import './styles.css'

export const Main =  () => {
    const [code, setCode] = useState()

    //const formData  = new FormData();

    
    const handleCode = async (inputCode) => {                        
        //console.log(process.env.REACT_APP_IP_ADDRESS ) 
        //console.log(process.env.REACT_APP_PORT_NUMBER ) 
        console.log('InputCode: ', inputCode)
        let test = inputCode
        //formData.append('text_code', inputCode)
        //console.log("FormData: ", formData.get('text_code'))
        const URL = `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT_NUMBER}/run`        
        console.log("URL: ", URL);
        try {
            const params = {                
                method: "POST",                
                mode:'cors',                                
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Headers': "*",                    
                    "Content-Type": "application/json"
                },    
                body: JSON.stringify({                     
                    'text_code': test
                })
            }
            const query = await fetch(URL, params)
            const data = await query.json()
            //console.log('Query: ', query)
            setCode(data.output)            
          } catch (error) {
            setCode(error);                        
          }
          
    }
    

    return (
        <div className="container-fluid">
            <h1 className="main-title"> Interprete Python </h1>
            <div className="row">
                <div className="col-6">
                    <InputPython handleCode={handleCode} />
                </div>
                <div className="col-6">
                    <OutputPython code={code}/>
                </div>
            </div>
        </div>
    )
}
