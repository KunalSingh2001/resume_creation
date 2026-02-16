import React from 'react';

function Experience({ experience, handleListChange, addItem, removeItem, onNext, onPrev }) {
    return (
        <div className="form-section">
            <h2>Work Experience</h2>
            {experience && experience.map((exp, index) => (
                <div key={exp.id || index} className="list-item">
                    <div className="input-row">
                        <div className="form-group">
                            <label>Company</label>
                            <input
                                type="text"
                                className="form-control"
                                value={exp.company}
                                onChange={(e) => handleListChange("experience", index, "company", e.target.value)}
                                placeholder="Company Name"
                            />
                        </div>
                        <div className="form-group">
                            <label>Job Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={exp.title}
                                onChange={(e) => handleListChange("experience", index, "title", e.target.value)}
                                placeholder="Job Title"
                            />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="text"
                                className="form-control"
                                value={exp.startDate}
                                onChange={(e) => handleListChange("experience", index, "startDate", e.target.value)}
                                placeholder="MM/YYYY"
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="text"
                                className="form-control"
                                value={exp.endDate}
                                onChange={(e) => handleListChange("experience", index, "endDate", e.target.value)}
                                placeholder="MM/YYYY or Present"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            className="form-control"
                            value={exp.description}
                            onChange={(e) => handleListChange("experience", index, "description", e.target.value)}
                            placeholder="Describe your responsibilities and achievements..."
                        />
                    </div>
                    <div className="item-actions">
                        <button className="btn btn-danger" onClick={() => removeItem("experience", index)}>Remove</button>
                    </div>
                </div>
            ))}
            <button className="btn btn-secondary" onClick={() => addItem("experience", { company: "", title: "", startDate: "", endDate: "", description: "" })}>+ Add Experience</button>
            <div className="form-actions">
                <button className="btn btn-secondary" onClick={onPrev}>Previous</button>
                <button className="btn btn-primary" onClick={onNext}>Next</button>
            </div>
        </div>
    );
}

export default Experience;
