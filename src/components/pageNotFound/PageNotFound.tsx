import { useHistory } from "react-router-dom";
import Logo from "../../assets/img/logo.png";

const PageNotFound = () => {
  const history = useHistory();

  const center: Record<string, string> = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    textAlign: "center",
  };

  return (
    <div style={center}>
      <img src={Logo} alt="Logo" />
      <h1> 404 Error Page</h1>
      <button onClick={() => history.push("/dashboard")}>Dashboard</button>
    </div>
  );
};

export default PageNotFound;
