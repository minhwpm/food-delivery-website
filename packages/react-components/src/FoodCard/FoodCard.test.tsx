import { render, screen } from '@testing-library/react';
import FoodCard, { PromotionType } from './FoodCard';
import { FoodItemType } from '@open-foody/types';

const mockData: FoodItemType = {
  id: "001",
  index: 0,
  rating: 4,
  promotion: PromotionType.plusOne,
  isNew: true,
  categoryId: "",
  minCookTime: 20,
  maxCookTime: 30,
  price: 9,
  restaurant: "Foodie",
  name: "Noodle",
  imageUrl: "https://source.unsplash.com/random/400x400?Noodle"
}

describe('FoodCard component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <FoodCard  item={mockData} />
    )
    const el = screen.getByText(/Noodle/i)
    expect(el).toBeDefined()
    expect(container).toMatchSnapshot()
  })
})