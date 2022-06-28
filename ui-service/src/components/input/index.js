import React, { useState } from "react";

export const InputPython = ({ handleCode }) => {
    const [inputCode, setInputCode] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        handleCode(inputCode)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <textarea 
                    className="form-control"                        
                    rows="22"                    
                    value={inputCode}
                    name="inputCode"
                    onChange={(e) => setInputCode(e.target.value)}
                >
                </textarea>
            </div>
            <button className="btn btn-primary"> RUN </button>        
        </form>
    )
}