import Link from "next/link";
import styles from "../styles/Home.module.css";

const Header = ({ loggedInUser }) => {
  const hrefLinks = [
    !loggedInUser
      ? { href: "/", text: "" }
      : { href: "/posts/create-post", text: "Create Post" },

    !loggedInUser
      ? { href: "/users/signin", text: "Login" }
      : { href: "#", text: "" },

    !loggedInUser
      ? { href: "/users/signup", text: "Register" }
      : { href: "/users/signout", text: "Logout" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className={styles.navbar_links}>
            <Link href="/">
              <a className={styles.navbar_brand}>Posthub</a>
            </Link>
            {hrefLinks.map(({ href, text }) => (
              <Link href={href} key={href}>
                <a className="nav-link">{text}</a>
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
