import React from 'react'
import { InputText } from 'primereact/inputtext'

export const TodoInput = (props) => {

    const handleChange = (event) => {
        props.saveInput(props.item.name, event.target.value)
    }
    return (
        <span className="p-float-label">
            <InputText value={props.todo[props.item.name]} name={props.item.name} id="in" type={props.item.type} onChange={e => handleChange(e)}/>
            <label htmlFor="in">{props.item.text}</label>
        </span>
    )
}
