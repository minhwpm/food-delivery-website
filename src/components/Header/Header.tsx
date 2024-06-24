import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faUtensils } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../SearchBox/SearchBox";
import Button from "../Button/Button";
import CartDropdown from "../CartDropdown/CartDropdown";

const Header = () => {
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <nav className="header">
      <div className="logo-text">
        {/* @TODO add ./ link (homepage) */}
        <FontAwesomeIcon icon={faUtensils} />
        Foodie
      </div>
      <SearchBox />
      <div className="cart-container">
        <FontAwesomeIcon
          className="cart-icon"
          icon={faCartShopping}
          onClick={() => setCartOpen(!cartOpen)}
        />
        {cartOpen && (
          <CartDropdown />
        )}
      </div>
      <Button onClick={() => console.log("Sign in Button")}>Sign in</Button>
    </nav>
  );
}

export default Header