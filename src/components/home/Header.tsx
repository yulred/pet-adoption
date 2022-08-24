import "./Header.css";
import { useAuthContext } from "../../context/AuthContext";

export default function Header() {
  const { currentUser } = useAuthContext();
  const headerText = "header text";

  return (
    <>
      <div className="header">{currentUser.name ? `${currentUser.name}, ${headerText}` : `${headerText}`}</div>
      <div className="intro">intro text</div>
    </>
  )
}