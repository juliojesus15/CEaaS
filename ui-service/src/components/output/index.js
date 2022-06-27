import React from "react";

export const OutputPython = ({ code }) => {
    return (                    
        <textarea 
            className="form-control"                        
            rows="22"
            disabled
            value={code}>
        </textarea>                                            
    )
}