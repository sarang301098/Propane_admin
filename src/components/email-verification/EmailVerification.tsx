import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { authEmailVerification } from "../../services/auth/authService";

const EmailVerification = () => {
  const [success, setSuccess] = useState<number | null>(null);
  const [error, setError] = useState("");
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const getToken = query.get("token");

  /**
   *check token validation
   * @param token
   */
  const checkToken = (token: string | null) => {
    authEmailVerification(token)
      .then((response) => {
        setSuccess(response.status);
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong.");
        }
      });
  };
  useEffect(() => {
    checkToken(getToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
        }}
      >
        <h1 style={{ color: `${success ? "green" : "red"}` }}>
          {success === 200
            ? "Email successfully verified."
            : "Email verification failed."}
        </h1>

        <h2 style={{ color: "red" }}>{error}</h2>
      </div>
    </div>
  );
};

export default EmailVerification;
