import React, { useState } from "react"
import { InputPython } from "../../components/input"
import { OutputPython } from "../../components/output"

import './styles.css'

export const Main =  () => {
    const [code, setCode] = useState()

    const handleCode = async (inputCode) => {                        
        //console.log(process.env.REACT_APP_IP_ADDRESS ) 
        //console.log(process.env.REACT_APP_PORT_NUMBER ) 
        //console.log(inputCode)        
        try {
            const URL = `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT_NUMBER}/api-example`        
            const query = await fetch(URL)
            const data = await query.json()
            setCode(data.message)            
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
