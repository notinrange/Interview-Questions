import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Users() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10); // Number of users per page

    useEffect(() => {
        axios
            .get("http://localhost:3001")
            .then((result) => setUsers(result.data))
            .catch((err) => console.error(err));
    }, []);

    const handleDelete = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        // Optionally send a DELETE request to the backend
        axios.delete(`http://localhost:3001/deleteUser/${users[index]._id}`)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.error(err));
    };

    // Get the current users for the page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Total pages calculation
    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header text-center">
                    <h2>Users List</h2>
                    <Link to="/create" className="btn btn-success mt-3">
                        Add User +
                    </Link>
                </div>
                <div className="card-body">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Country</th>
                                <th>Company</th>
                                <th>Questions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.country}</td>
                                    <td>{user.company}</td>
                                    <td>
                                        <ul>
                                            {user.questions.map((question, qIndex) => (
                                                <li key={qIndex}>{question}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <Link
                                            to="/update"
                                            state={{ user, index }}
                                            className="btn btn-warning me-2"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(index)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <nav>
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                                    Previous
                                </button>
                            </li>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => paginate(currentPage + 1)}>
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Users;
