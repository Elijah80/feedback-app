import { v4 as uuidv4 } from 'uuid'
import { createContext, useState } from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {
	const [feedback, setFeedback] = useState([
		{
			id: 1,
			text: 'This is feedback item 1',
			rating: 10,
		},
		{
			id: 2,
			text: 'This is feedback item 2',
			rating: 8,
		},
		{
			id: 3,
			text: 'This is feedback item 3',
			rating: 6,
		},
	])

	const [feedbackEdit, setFeedbackEdit] = useState({
		item: {},
		edit: false,
	})

	// Add feedback
	const addFeedback = newFeedback => {
		newFeedback.id = uuidv4()
		setFeedback([newFeedback, ...feedback])
	}

	// Delete feedback
	const deleteFeedback = id => {
		if (window.confirm('Are you sure you want to delete?')) {
			setFeedback(feedback.filter(item => item.id !== id))
		}
	}

	// Edit feedback
	const editFeedback = item => {
		setFeedbackEdit({
			item,
			edit: true
		})
	}

	// Update feedback
	const updateFeedback = (id, updatedFeedback) => {
		setFeedback(feedback.map(item => (item.id === id ? {...item, ...updatedFeedback} : item)))
	}

	return (
		<FeedbackContext.Provider
			value={{
				feedback,
				feedbackEdit,
				deleteFeedback,
				addFeedback,
				editFeedback,
				updateFeedback,
			}}
		>
			{children}
		</FeedbackContext.Provider>
	)
}

export default FeedbackContext
