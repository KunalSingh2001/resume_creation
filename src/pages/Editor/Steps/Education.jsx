import React from 'react';

function Education({ education, handleListChange, addItem, removeItem, onNext, onPrev }) {
    return (
        <div className="form-section">
            <h2>Education</h2>
            {education && education.map((edu, index) => (
                <div key={edu.id || index} className="list-item">
                    <div className="input-row">
                        <div className="form-group">
                            <label>School/University</label>
                            <input
                                type="text"
                                className="form-control"
                                value={edu.school}
                                onChange={(e) => handleListChange("education", index, "school", e.target.value)}
                                placeholder="School or University"
                            />
                        </div>
                        <div className="form-group">
                            <label>Degree</label>
                            <input
                                type="text"
                                className="form-control"
                                value={edu.degree}
                                onChange={(e) => handleListChange("education", index, "degree", e.target.value)}
                                placeholder="Degree or Certificate"
                            />
                        </div>
                    </div>
                    <div className="input-row">
                        <div className="form-group">
                            <label>Start Date</label>
                            <input
                                type="text"
                                className="form-control"
                                value={edu.startDate}
                                onChange={(e) => handleListChange("education", index, "startDate", e.target.value)}
                                placeholder="MM/YYYY"
                            />
                        </div>
                        <div className="form-group">
                            <label>End Date</label>
                            <input
                                type="text"
                                className="form-control"
                                value={edu.endDate}
                                onChange={(e) => handleListChange("education", index, "endDate", e.target.value)}
                                placeholder="MM/YYYY or Present"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <input
                            type="text"
                            className="form-control"
                            value={edu.location}
                            onChange={(e) => handleListChange("education", index, "location", e.target.value)}
                            placeholder="City, Country"
                        />
                    </div>
                    <div className="item-actions">
                        <button className="btn btn-danger" onClick={() => removeItem("education", index)}>Remove</button>
                    </div>
                </div>
            ))}
            <button className="btn btn-secondary" onClick={() => addItem("education", { school: "", degree: "", startDate: "", endDate: "", location: "" })}>+ Add Education</button>
            <div className="form-actions">
                <button className="btn btn-secondary" onClick={onPrev}>Previous</button>
                <button className="btn btn-primary" onClick={onNext}>Next</button>
            </div>
        </div>
    );
}

export default Education;
