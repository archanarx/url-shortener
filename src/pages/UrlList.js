import { useState } from "react";

function UrlList({ user, urls, setUrls }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const itemsPerPage = 2;

  // DELETE

   const deleteUrl = (index) => {

        const confirmDelete = window.confirm(
        "⚠️ This URL will be permanently deleted.\nDo you want to continue?"
        );

        if (!confirmDelete) return;   // stop if user clicks Cancel

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userIndex = users.findIndex((u) => u.email === user.email);

        users[userIndex].urls.splice(index, 1);

        localStorage.setItem("users", JSON.stringify(users));

        setUrls([...users[userIndex].urls]);
    };


  // START EDIT
  const startEdit = (index) => {
    setEditIndex(index);
    setEditTitle(urls[index].title);
  };

  // SAVE EDIT (ONLY TITLE)
  const saveEdit = (index) => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex((u) => u.email === user.email);

    users[userIndex].urls[index].title = editTitle;

    localStorage.setItem("users", JSON.stringify(users));

    setUrls([...users[userIndex].urls]);

    setEditIndex(null);
  };

  // SEARCH
  const filtered = urls.filter(
    (u) =>
      u.title.toLowerCase().includes(search.toLowerCase()) ||
      u.url.toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION
  const start = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  return (
    <div className="card p-4 shadow-sm border-0" style={{ borderRadius: "15px" }}>
      <h4 className="mb-3">📄 Your URLs</h4>

      <input
        className="form-control mb-3 shadow-sm"
        placeholder="🔍 Search by title or URL..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Original URL</th>
            <th>Short URL</th>
            <th>Added Time</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {paginated.map((u, i) => {
            const realIndex = start + i;

            return (
              <tr key={i}>
                {/* TITLE */}
                <td>
                  {editIndex === realIndex ? (
                    <input
                      className="form-control"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    <span className="fw-semibold">{u.title}</span>
                  )}
                </td>

                {/* ORIGINAL URL */}
                <td>{u.url}</td>

                {/* SHORT URL */}
                <td>
                  <span className="badge bg-info text-dark me-2">
                    {u.short}
                  </span>

                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => navigator.clipboard.writeText(u.short)}
                  >
                    Copy
                  </button>
                </td>

                {/* TIME */}
                <td>{new Date(u.time).toLocaleString()}</td>

                {/* ACTION */}
                <td>
                  {editIndex === realIndex ? (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() => saveEdit(realIndex)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary btn-sm me-2"
                      onClick={() => startEdit(realIndex)}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUrl(realIndex)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-outline-dark me-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <button
          className="btn btn-outline-dark"
          disabled={start + itemsPerPage >= filtered.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UrlList;
