import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { templateRegistry } from "../../config/templateRegistry";
import { dummyData } from "../../utils/dummyData";
import { Eye, EyeOff } from "lucide-react";
import "./Editor.css";

const steps = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'summary', label: 'Summary' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    // { id: 'projects', label: 'Projects' } // Saving for subsequent update if needed
];

function Editor() {
    const { slug } = useParams();
    const [resumeData, setResumeData] = useState(dummyData);
    const [currentStep, setCurrentStep] = useState(0);
    const [showPreview, setShowPreview] = useState(false);

    const TemplateComponent = templateRegistry[slug];

    if (!TemplateComponent) {
        return <h2>Template Not Found</h2>;
    }

    const handleChange = (section, field, value) => {
        setResumeData((prev) => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const handleSummaryChange = (value) => {
        setResumeData(prev => ({ ...prev, summary: value }));
    };

    // Generic list handlers (Experience, Education)
    const handleListChange = (section, index, field, value) => {
        setResumeData(prev => {
            const newList = [...prev[section]];
            newList[index] = { ...newList[index], [field]: value };
            return { ...prev, [section]: newList };
        });
    };

    const addItem = (section, initialData) => {
        setResumeData(prev => ({
            ...prev,
            [section]: [...prev[section], { id: Date.now(), ...initialData }]
        }));
    };

    const removeItem = (section, index) => {
        setResumeData(prev => {
            const newList = [...prev[section]];
            newList.splice(index, 1);
            return { ...prev, [section]: newList };
        });
    };

    // Skills handlers
    const handleSkillChange = (index, value) => {
        setResumeData(prev => {
            const newSkills = [...prev.skills];
            newSkills[index] = value;
            return { ...prev, skills: newSkills };
        });
    };

    const addSkill = () => {
        setResumeData(prev => ({
            ...prev,
            skills: [...prev.skills, ""]
        }));
    };

    const removeSkill = (index) => {
        setResumeData(prev => {
            const newSkills = [...prev.skills];
            newSkills.splice(index, 1);
            return { ...prev, skills: newSkills };
        });
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0: // Personal Info
                return (
                    <div className="form-section">
                        <h2>Personal Information</h2>
                        <div className="input-row">
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={resumeData.personalInfo.firstName}
                                    onChange={(e) => handleChange("personalInfo", "firstName", e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={resumeData.personalInfo.lastName}
                                    onChange={(e) => handleChange("personalInfo", "lastName", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Job Title</label>
                            <input
                                type="text"
                                className="form-control"
                                value={resumeData.personalInfo.jobTitle}
                                onChange={(e) => handleChange("personalInfo", "jobTitle", e.target.value)}
                            />
                        </div>
                        <div className="input-row">
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={resumeData.personalInfo.email}
                                    onChange={(e) => handleChange("personalInfo", "email", e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={resumeData.personalInfo.phone}
                                    onChange={(e) => handleChange("personalInfo", "phone", e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                className="form-control"
                                value={resumeData.personalInfo.address}
                                onChange={(e) => handleChange("personalInfo", "address", e.target.value)}
                            />
                        </div>
                    </div>
                );
            case 1: // Summary
                return (
                    <div className="form-section">
                        <h2>Professional Summary</h2>
                        <div className="form-group">
                            <label>Summary</label>
                            <textarea
                                className="form-control"
                                value={resumeData.summary}
                                onChange={(e) => handleSummaryChange(e.target.value)}
                            />
                        </div>
                    </div>
                );
            case 2: // Experience
                return (
                    <div className="form-section">
                        <h2>Work Experience</h2>
                        {resumeData.experience.map((exp, index) => (
                            <div key={exp.id} className="list-item">
                                <div className="input-row">
                                    <div className="form-group">
                                        <label>Company</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={exp.company}
                                            onChange={(e) => handleListChange("experience", index, "company", e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Job Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={exp.title}
                                            onChange={(e) => handleListChange("experience", index, "title", e.target.value)}
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
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>End Date</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={exp.endDate}
                                            onChange={(e) => handleListChange("experience", index, "endDate", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        className="form-control"
                                        value={exp.description}
                                        onChange={(e) => handleListChange("experience", index, "description", e.target.value)}
                                    />
                                </div>
                                <div className="item-actions">
                                    <button className="btn btn-danger" onClick={() => removeItem("experience", index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-secondary" onClick={() => addItem("experience", { company: "", title: "", startDate: "", endDate: "", description: "" })}>+ Add Experience</button>
                    </div>
                );
            case 3: // Education
                return (
                    <div className="form-section">
                        <h2>Education</h2>
                        {resumeData.education.map((edu, index) => (
                            <div key={edu.id} className="list-item">
                                <div className="input-row">
                                    <div className="form-group">
                                        <label>School/University</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={edu.school}
                                            onChange={(e) => handleListChange("education", index, "school", e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Degree</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={edu.degree}
                                            onChange={(e) => handleListChange("education", index, "degree", e.target.value)}
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
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>End Date</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={edu.endDate}
                                            onChange={(e) => handleListChange("education", index, "endDate", e.target.value)}
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
                                    />
                                </div>
                                <div className="item-actions">
                                    <button className="btn btn-danger" onClick={() => removeItem("education", index)}>Remove</button>
                                </div>
                            </div>
                        ))}
                        <button className="btn btn-secondary" onClick={() => addItem("education", { school: "", degree: "", startDate: "", endDate: "", location: "" })}>+ Add Education</button>
                    </div>
                );
            case 4: // Skills
                return (
                    <div className="form-section">
                        <h2>Skills</h2>
                        {resumeData.skills.map((skill, index) => (
                            <div key={index} className="form-group input-row" style={{ alignItems: 'center' }}>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={skill}
                                    onChange={(e) => handleSkillChange(index, e.target.value)}
                                />
                                <button className="btn btn-danger" onClick={() => removeSkill(index)}>X</button>
                            </div>
                        ))}
                        <button className="btn btn-secondary" onClick={addSkill}>+ Add Skill</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="editor-page">
            <div className={`editor-form-container ${showPreview ? 'hidden-mobile' : ''}`}>
                <div className="step-navigation">
                    {steps.map((step, index) => (
                        <div key={step.id} className={`step-indicator ${index === currentStep ? 'active' : ''}`}>
                            <div className="step-number">{index + 1}</div>
                            <span className="step-label">{step.label}</span>
                        </div>
                    ))}
                </div>

                <div className="form-content">
                    {renderStepContent()}
                </div>

                <div className="form-actions">
                    <button
                        className="btn btn-secondary"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                    >
                        Back
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={nextStep}
                        disabled={currentStep === steps.length - 1}
                    >
                        {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>

            <div className={`editor-preview-container ${showPreview ? 'open' : ''}`}>
                <div className="resume-preview-wrapper">
                    <TemplateComponent data={resumeData} />
                </div>
            </div>

            <button className="preview-toggle" onClick={() => setShowPreview(!showPreview)}>
                {showPreview ? <EyeOff size={24} /> : <Eye size={24} />}
            </button>
        </div>
    );
}

export default Editor;
