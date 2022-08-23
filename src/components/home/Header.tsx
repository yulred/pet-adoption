import "./Header.css";
import { useSessionContext } from "../../context/SessionContext";

export default function Header() {
  const { currentUser } = useSessionContext();
  const headerText = "header text";

  return (
    <>
      <div className="header">{currentUser.name ? `${currentUser.name}, ${headerText}` : `${headerText}`}</div>
      <div className="intro">intro text</div>
    </>
  )
}