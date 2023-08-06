import React from 'react'

const CheckboxComponent = ({label, checked, onChange}) => {
    return (
        <label>
            {label}
            <input type="checkbox" checked={checked} onChange={onChange} />
        </label>
    )
}

export default CheckboxComponent
