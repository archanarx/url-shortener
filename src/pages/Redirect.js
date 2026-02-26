import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Redirect() {
  const { shortId } = useParams();

  useEffect(() => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    let foundUrl = null;

    // search through all users
    users.forEach((user) => {
      const match = user.urls.find((u) => u.shortId === shortId);
      if (match) foundUrl = match.url;
    });

    if (foundUrl) {
      window.location.href = foundUrl;
    } else {
      alert("URL not found");
    }
  }, [shortId]);

  return <h3 className="text-center mt-5">Redirecting...</h3>;
}

export default Redirect;