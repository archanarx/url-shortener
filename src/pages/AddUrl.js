import { useState } from "react";

function AddUrl({ user, setUrls }) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const generateShort = () => {
    return Math.random().toString(36).substring(2, 7);
  };

  const addUrl = () => {
    
    // empty fild alert
    if (!title || !url) {
    alert("Please fill all fields");
    return;
    }
    
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const index = users.findIndex((u) => u.email === user.email);

    if (users[index].urls.length >= 5) {
      alert("Only 5 URLs allowed");
      return;
    }

    const shortId = generateShort();
    const shortLink = window.location.origin + "/" + shortId;

    const newUrl = {
      title,
      url,
      shortId,        // unique id
      shortLink,      // actual working short url
      time: new Date().toISOString(),
    };

    
    users[index].urls.push(newUrl);

    localStorage.setItem("users", JSON.stringify(users));

    setUrls([...users[index].urls]);

    setTitle("");
    setUrl("");
  };

  return (
    <div className="card shadow-sm p-4 mb-4 border-0" style={{ borderRadius: "15px" }}>
      <h4 className="mb-3">➕ Add New URL</h4>

      <div className="row">
        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Enter Original URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div className="col-md-2">
          <button className="btn btn-pink w-100" onClick={addUrl}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddUrl;
