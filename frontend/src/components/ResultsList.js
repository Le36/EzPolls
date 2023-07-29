import React from 'react'

const ResultsList = ({options}) => {
	return (
		<ul>
			{options
				.sort((a, b) => b.voteCount - a.voteCount)
				.map((option, index) => (
					<li key={index}>
						{option.optionText}: {option.voteCount} votes
					</li>
				))}
		</ul>
	)
}

export default ResultsList
