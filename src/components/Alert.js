import React from 'react'

const Alert = (props) => {
    const capitalize = (x) =>{
        if (x==="danger") {
            x = "error"
        }
        return x.charAt(0).toUpperCase() + x.slice(1);
    }
    return (
        <div>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
               <strong>{capitalize(props.alert.type)}</strong> :  {props.alert.msg}
            </div>}
        </div>
    )
}

export default Alert