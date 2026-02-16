import React from 'react';

function Skills({ skills, handleSkillChange, addSkill, removeSkill, onPrev }) {
    return (
        <div className="form-section">
            <h2>Skills</h2>
            {skills && skills.map((skill, index) => (
                <div key={index} className="form-group input-row" style={{ alignItems: 'center' }}>
                    <input
                        type="text"
                        className="form-control"
                        value={skill}
                        onChange={(e) => handleSkillChange(index, e.target.value)}
                        placeholder="Skill (e.g., JavaScript, Project Management)"
                    />
                    <button className="btn btn-danger" onClick={() => removeSkill(index)}>X</button>
                </div>
            ))}
            <button className="btn btn-secondary" onClick={addSkill}>+ Add Skill</button>
            <div className="form-actions">
                <button className="btn btn-secondary" onClick={onPrev}>Previous</button>
                <button className="btn btn-success">Submit</button>
            </div>
        </div>
    );
}

export default Skills;
