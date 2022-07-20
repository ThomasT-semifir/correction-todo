import React from 'react'
import {Button} from "primereact/button"

export const TodoButton = (props) => {

    const handleClick = (event) => {
        props.handleClick(event)
    }

    return (
        <Button onClick={handleClick}>{props.children}</Button>
    )
}
