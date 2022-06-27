import React, { useState } from "react"

import { InputPython } from "../../components/input"
import { OutputPython } from "../../components/output"

import './styles.css'

export const Main = () => {
    const [code, setCode] = useState()

    const handleCode = (inputCode) => {                        
        setCode(inputCode)
        //console.log(inputCode)
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
