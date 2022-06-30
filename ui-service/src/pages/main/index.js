import React, { useState } from "react"
import { InputPython } from "../../components/input"
import { OutputPython } from "../../components/output"

import './styles.css'

export const Main =  () => {
    const [code, setCode] = useState()
    
    const handleCode = async (inputCode) => {                        
        const URL = `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT_NUMBER}/run`        
        let test = inputCode        
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
