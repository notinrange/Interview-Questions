import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";


function CreateUser() {
    const [name, setName] = useState(""); // Initial state as an empty string
    const [country, setCountry] = useState(""); // Initial state as an empty string
    const [company, setCompany] = useState(""); // Initial state as an empty string
    const [questions, setQuestions] = useState([]); // Initial state as an empty array
    const navigate = useNavigate();

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
        const userData = { 
            userId: uuidv4(), // Generate a unique ID
            name, 
            country, 
            company, 
            questions 
        };
    
        axios.post("http://localhost:3001/createUser", userData)
            .then((result) => {
                console.log("User created:", result.data);
                setName("");
                setCountry("");
                setCompany("");
                setQuestions([]);
                navigate("/");
            })
            .catch(err => {
                console.error("Error creating user:", err.response?.data || err.message);
                alert("Error creating user: " + (err.response?.data?.error || err.message));
            });
    };
    

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={handleSubmit}>
                    <h2>Add User</h2>
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
                    <button className="btn btn-success mt-3">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
