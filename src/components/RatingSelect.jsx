import { useState, useContext, useEffect } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function RatingSelect({ select }) {
	const [selected, setSelected] = useState(10)

  const { feedbackEdit } = useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setSelected(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

	const handleChange = (e) => {
		setSelected(+e.currentTarget.value)
		select(+e.currentTarget.value)
	}

	return (
		<ul className='rating'>
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
        <li key={rating}>
          <input
            type='radio'
            id={`num${rating}`}
            name='rating'
            value={rating}
            checked={selected === rating}
            onChange={handleChange}
          />
          <label htmlFor={`num${rating}`}>{rating}</label>
        </li>
      ))}
		</ul>
	)
}
export default RatingSelect
