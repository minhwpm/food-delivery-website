import { render, screen } from '@testing-library/react';
import FoodCard, { FoodType, PromotionType } from './FoodCard';

const mockData: FoodType = {
  id: "001",
  index: 0,
  rating: 4,
  promotion: PromotionType.plusOne,
  isNew: true,
  categoryId: "",
  minCookTime: 20,
  maxCookTime: 30,
  restaurant: "Foodie",
  name: "Noodle",
  imageUrl: "https://source.unsplash.com/random/400x400?Noodle"
}

describe('FoodCard component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <FoodCard  {...mockData} />
    )
    const el = screen.getByText(/Noodle/i)
    expect(el).toBeDefined()
    expect(container).toMatchSnapshot()
  })
})