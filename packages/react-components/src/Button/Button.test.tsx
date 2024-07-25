import {cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button component', () => {

  it('renders correctly', () => {
    const handleClick = jest.fn()
    const { container } = render(
      <Button onClick={handleClick}>
        Button
      </Button>
    )
    expect(screen.getByText(/Button/i)).toBeDefined()
    expect(container).toMatchSnapshot()
  })
  it('click-event correctly', () => {
    const handleClick = jest.fn()
    render(
      <Button onClick={handleClick}>
        Button
      </Button>
    )
    fireEvent.click(screen.getByText(/Button/i))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})