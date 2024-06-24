import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { removeFromCart } from "../../store/cartSlice"
import Button from '../Button/Button';
import ImageWithFallback from "../ImageWithFallback/ImageWithFallback";

const CartDropdown = () => {
  const {items} = useAppSelector(s => s.cart)
  const dispatch = useAppDispatch()

  return (
    <div className="cart-dropdown">
      <h3 className="cart-dropdown-title">Cart</h3>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-item-list">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-quantity">
                {item.quantity}x
              </div>

              <div className="cart-thumbnail-wrapper">
                <ImageWithFallback
                  className="thumbnail"
                  src={item.imageUrl}
                  alt={item.name}
                />
              </div>
              <h4 className="cart-item-name">{item.name}</h4>
              <div className="">
                <p>${item.price.toFixed(2)}</p>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <hr />
          <h3>
            Total: $
            {items
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </h3>
          <p>Shipping and taxes calculated at checkout.</p>
          <div className="btn-container">
            <Button onClick={() => console.log("View Cart")}>View Cart</Button>
            <Button onClick={() => console.log("Checkout")}>Checkout</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartDropdown;