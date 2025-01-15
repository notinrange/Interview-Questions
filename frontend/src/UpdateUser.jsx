import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function UpdateUser() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user || {}; // Prepopulate user data if provided

    const [name, setName] = useState(user.name || "");
    const [country, setCountry] = useState(user.country || "");
    const [company, setCompany] = useState(user.company || "");
    const [questions, setQuestions] = useState(user.questions || [""]);

    // Add a new empty question input
    const handleAddQuestion = () => {
        setQuestions([...questions, ""]);
    };

    // Remove a specific question input
    const handleRemoveQuestion = (index) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    // Update a specific question input
    const handleQuestionChange = (index, value) => {
        const updatedQuestions = questions.map((question, i) =>
            i === index ? value : question
        );
        setQuestions(updatedQuestions);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = { name, country, company, questions };

        // Send updated data to the backend
        axios
            .put(`http://localhost:3001/updateUser/${user._id}`, userData)
            .then((result) => {
                console.log("User updated:", result.data);
                navigate("/"); // Navigate back to the user list page
            })
            .catch((err) => console.error("Error updating user:", err));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Update User</h2>
                    <div className="mb-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            placeholder="Enter Country"
                            className="form-control"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="company">Company</label>
                        <input
                            type="text"
                            id="company"
                            placeholder="Enter Company"
                            className="form-control"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label>Questions</label>
                        {questions.map((question, index) => (
                            <div key={index} className="d-flex align-items-center mb-2">
                                <input
                                    type="text"
                                    placeholder={`Question ${index + 1}`}
                                    className="form-control me-2"
                                    value={question}
                                    onChange={(e) =>
                                        handleQuestionChange(index, e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleRemoveQuestion(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleAddQuestion}
                        >
                            Add Question
                        </button>
                    </div>
                    <button className="btn btn-success mt-3">Update</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
