import "./Header.css";
import { useSessionContext } from "../../context/SessionContext";

export default function Header() {
  const { currentUser } = useSessionContext();

  return (
    <>
      <div className="header">{`${currentUser.name},`} header text</div>
      <div className="intro">intro text</div>
    </>
  )
}