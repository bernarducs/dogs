import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";

function Header() {
  return (
    <div className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} to="/">
          <Dogs />
        </Link>
        <Link className={styles.login} to="/login">
          Login/Criar
        </Link>
      </nav>
    </div>
  );
}

export default Header;
