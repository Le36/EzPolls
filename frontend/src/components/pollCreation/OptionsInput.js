import styles from './OptionsInput.module.css'
import CustomInputIcon from '../formElements/CustomInputIcon'
import ToolTip from '../common/ToolTip'
import React from 'react'

const OptionsInputs = ({options, handleOptionChange, addOption, removeOption}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.optionTitle}>
                Answer Options
                <ToolTip tip="Provide potential answers for your question. Make sure options are distinct and non-overlapping to gather accurate feedback." />
            </h2>
            {options.map((option, index) => (
                <div key={index} className={styles.optionInputWrapper}>
                    <CustomInputIcon
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(e, index)}
                        placeholder={`Option ${index + 1}`}
                        onRemove={() => removeOption(index)}
                        showRemove={options.length > 2}
                    />
                </div>
            ))}
            <button type="button" onClick={addOption} className={styles.addButton}>
                Add Option
            </button>
        </div>
    )
}

export default OptionsInputs
