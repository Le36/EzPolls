import CheckboxButton from './CheckboxButton'
import RadioButton from './RadioButton'
import styles from './PollOptions.module.css'
import ToolTip from '../common/ToolTip'
import React from 'react'

const PollOptions = ({options, selectedOptions, handleOptionChange, multipleChoicesAllowed}) => {
    return (
        <div className={styles.container}>
            <h2 className={styles.votingTitle}>
                Voting
                <ToolTip tip="This is the main query of the poll. Please read carefully and provide your response accordingly." />
            </h2>
            {options.map((option, index) => {
                const isSelected = selectedOptions.includes(option.optionText)
                return multipleChoicesAllowed ? (
                    <CheckboxButton
                        key={index}
                        id={option.optionText}
                        name="poll"
                        value={option.optionText}
                        checked={isSelected}
                        onChange={handleOptionChange}
                        label={option.optionText}
                    />
                ) : (
                    <RadioButton
                        key={index}
                        id={option.optionText}
                        name="poll"
                        value={option.optionText}
                        checked={isSelected}
                        onChange={handleOptionChange}
                        label={option.optionText}
                    />
                )
            })}
        </div>
    )
}

export default PollOptions
