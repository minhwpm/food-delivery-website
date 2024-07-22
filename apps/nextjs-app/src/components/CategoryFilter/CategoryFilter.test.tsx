import { fireEvent, render, screen } from '@testing-library/react';
import CategoryFilter from './CategoryFilter';
import { Provider } from "react-redux";
import store from '../../store';

const MOCK_DATA = [
  {
    id: "001",
    name: "Sushi",
  },
  {
    id: "002",
    name: "Soda"
  }
]

describe('CategoryFilter component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <CategoryFilter categories={MOCK_DATA} />
      </Provider>
    )
    expect(screen.getAllByText(/All/i)).toBeDefined()
    expect(screen.getAllByText(/Sushi/i)).toBeDefined()
    expect(screen.getAllByText(/Soda/i)).toBeDefined()
    expect(container).toMatchSnapshot()
  })

  it('click-event: works correctly', () => {
    render(
      <Provider store={store}>
        <CategoryFilter categories={MOCK_DATA} />
      </Provider>
    )
    const el = screen.getAllByText(/Sushi/i)[0]
    fireEvent.click(el)
    expect(el.className.includes("active")).toBeTruthy()
  })
})
