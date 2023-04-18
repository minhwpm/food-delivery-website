import { render, screen } from '@testing-library/react';
import Badge from './Badge';
import { PromotionType } from '../FoodCard/FoodCard';

describe('Badge component', () => {
  it('renders correctly when (promotion) type = 1+1', () => {
    const { container } = render(
      <Badge type={PromotionType.plusOne} />
    )
    expect(screen.getByText("1+1")).toBeDefined()
    expect(container).toMatchSnapshot()
  })

  it('renders correctly when (promotion) type = gift', () => {
    const { container } = render(
      <Badge type={PromotionType.gift} />
    )
    expect(screen.getByTestId("gift")).toBeDefined()
    expect(container).toMatchSnapshot()
  })

  it('renders correctly when (promotion) type = discount', () => {
    const { container } = render(
      <Badge type={PromotionType.discount} />
    )
    expect(screen.getByTestId("discount")).toBeDefined()
    expect(container).toMatchSnapshot()
  })
})
