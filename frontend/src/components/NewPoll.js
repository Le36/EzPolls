import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import pollService from '../services/pollService'
import QuestionInput from './QuestionInput'
import OptionInputs from './OptionsInput'
import RestrictionSelect from './RestictionSelect'
import SubmitButton from './SubmitButton'
import MultipleChoicesCheckbox from './MultipleChoicesCheckbox'

const NewPoll = () => {
	const navigate = useNavigate()
	const [question, setQuestion] = useState('')
	const [options, setOptions] = useState([''])
	const [restriction, setRestriction] = useState('ONE_VOTE_PER_IP')
	const [multipleChoicesAllowed, setMultipleChoicesAllowed] = useState(false)

	const handleOptionChange = (e, index) => {
		const newOptions = [...options]
		newOptions[index] = e.target.value
		setOptions(newOptions)
	}

	const addOption = () => {
		setOptions([...options, ''])
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		const poll = {
			question,
			options: options.filter((option) => option !== ''),
			votingRestriction: restriction,
			multipleChoicesAllowed,
		}

		const createdPoll = await pollService.createPoll(poll)

		navigate(`/polls/${createdPoll.id}`, {state: {poll: createdPoll}})
	}

	return (
		<form onSubmit={handleSubmit}>
			<h2>New Poll</h2>
			<QuestionInput value={question} onChange={(e) => setQuestion(e.target.value)} />
			<OptionInputs options={options} handleOptionChange={handleOptionChange} addOption={addOption} />
			<RestrictionSelect value={restriction} onChange={(e) => setRestriction(e.target.value)} />
			<MultipleChoicesCheckbox
				checked={multipleChoicesAllowed}
				onChange={(e) => setMultipleChoicesAllowed(e.target.checked)}
			/>
			<SubmitButton type="submit">Submit</SubmitButton>
		</form>
	)
}

export default NewPoll
