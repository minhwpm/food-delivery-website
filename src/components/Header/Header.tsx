import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBox from "../SearchBox/SearchBox";
import { faCartShopping, faUtensils } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo-text">
          {/* @TODO add ./ link (homepage) */}
          <FontAwesomeIcon icon={faUtensils} />
          Foodie
        </div>
        <SearchBox />
        <FontAwesomeIcon className="cart-icon" icon={faCartShopping} />
        <Button onClick={() => console.log("Sign in Button")}>Sign in</Button>
      </div>
    </header>
  )
}

export default Header