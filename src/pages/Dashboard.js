import { useState, useEffect } from "react";
import AddUrl from "./AddUrl";
import UrlList from "./UrlList";

function Dashboard({ user }) {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find((u) => u.email === user.email);

    if (found) setUrls(found.urls);
  }, [user]);

  return (
    <div>
      <AddUrl user={user} setUrls={setUrls} />
      <UrlList user={user} urls={urls} setUrls={setUrls} />
    </div>
  );
}

export default Dashboard;
