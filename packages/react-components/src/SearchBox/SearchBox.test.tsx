import { render, screen } from '@testing-library/react';
import { SearchBox } from './SearchBox';
import { Provider } from "react-redux";
import store from '@open-foody/redux-store';

describe('SearchBox component', () => {
  test('renders correctly', () => {
    const { container } = render(
      <Provider store={store}>
        <SearchBox />
      </Provider>
    )

    expect(screen.getByPlaceholderText(/Enter food name.../i)).toBeInTheDocument();
    expect(container).toMatchSnapshot()
  })
  
})
