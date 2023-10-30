import { render, screen } from '@testing-library/react'
import App from './App'

test('renders note sequencer app text', () => {
	render(<App />)
	const linkElement = screen.getByText(/note sequencer app/i)
	expect(linkElement).toBeInTheDocument()
})