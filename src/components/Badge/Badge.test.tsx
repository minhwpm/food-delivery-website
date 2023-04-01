import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge component', () => {
  it('renders correctly when (promotion) type = 1+1', () => {
    const { container } = render(
      <Badge type={"1+1"} />
    )
    expect(screen.getByText("1+1")).toBeDefined()
    expect(container).toMatchSnapshot()
  })

  it('renders correctly when (promotion) type = gift', () => {
    const { container } = render(
      <Badge type="gift" />
    )
    expect(screen.getByTestId("gift")).toBeDefined()
    expect(container).toMatchSnapshot()
  })

  it('renders correctly when (promotion) type = discount', () => {
    const { container } = render(
      <Badge type="discount" />
    )
    expect(screen.getByTestId("discount")).toBeDefined()
    expect(container).toMatchSnapshot()
  })
})
