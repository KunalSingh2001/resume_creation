import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { templateRegistry } from "../../config/templateRegistry";
import { dummyData } from "../../utils/dummyData";
import "./Editor.css";

function Editor() {
    const { slug } = useParams();
    const TemplateComponent = templateRegistry[slug];
    const [activeStep, setActiveStep] = useState(1);
    const [templateData, setTemplateData] = useState(dummyData);

    if (!TemplateComponent) {
        return (
            <div className="editor-page">
                <h2>Template Not Found</h2>
            </div>
        );
    }

    function handleDataChange(section, fieldName, data) {
        setTemplateData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [fieldName]: data
            }
        }));
    }

    function handleSummaryChange(data) {
        setTemplateData(prev => ({
            ...prev,
            summary: data
        }));
    }

    const handleNext = () => {
        setActiveStep(prev => prev + 1);
    };

    const handlePrev = () => {
        setActiveStep(prev => prev - 1);
    };

    return (
        <div className="editor-page">

            <div className="editor-preview-container">
                <div className="resume-preview-wrapper">
                    <TemplateComponent data={templateData} />
                </div>
            </div>

            <div className="editor-form-container">

                <div className="form-header">
                    <h2>Resume Builder - Step {activeStep}</h2>
                    <p>Complete the steps to build your resume.</p>
                </div>

                {activeStep === 1 && (
                    <div className="step-container step-1">

                        <div className="step-card">
                            <div className="step-header">
                                <h3>Personal Information</h3>
                            </div>

                            <div className="form-grid">

                                <div className="form-group">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        placeholder="John"
                                        value={templateData?.personalInfo?.firstName || ""}
                                        onChange={(e) =>
                                            handleDataChange("personalInfo", "firstName", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        value={templateData?.personalInfo?.lastName || ""}
                                        onChange={(e) =>
                                            handleDataChange("personalInfo", "lastName", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Job Title</label>
                                    <input
                                        type="text"
                                        placeholder="Software Engineer"
                                        value={templateData?.personalInfo?.jobTitle || ""}
                                        onChange={(e) =>
                                            handleDataChange("personalInfo", "jobTitle", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={templateData?.personalInfo?.email || ""}
                                        onChange={(e) =>
                                            handleDataChange("personalInfo", "email", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        placeholder="+91 9876543210"
                                        value={templateData?.personalInfo?.phone || ""}
                                        onChange={(e) =>
                                            handleDataChange("personalInfo", "phone", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        placeholder="City, Country"
                                        value={templateData?.personalInfo?.address || ""}
                                        onChange={(e) =>
                                            handleDataChange("personalInfo", "address", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label>LinkedIn</label>
                                    <input
                                        type="text"
                                        placeholder="linkedin.com/in/username"
                                        value={templateData?.personalInfo?.linkedin || ""}
                                        onChange={(e) =>
                                            handleDataChange("personalInfo", "linkedin", e.target.value)
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Website</label>
                                    <input
                                        type="text"
                                        placeholder="yourportfolio.com"
                                        value={templateData?.personalInfo?.website || ""}
                                        onChange={(e) =>
                                            handleDataChange("personalInfo", "website", e.target.value)
                                        }
                                    />
                                </div>

                            </div>

                            <div className="step-buttons">
                                <button className="primary-btn" onClick={handleNext}>
                                    Next →
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                {activeStep === 2 && (
                    <div className="step-container step-2">

                        <div className="step-card">
                            <div className="step-header">
                                <h3>Professional Summary</h3>
                                <p>Write a short summary about your experience and skills.</p>
                            </div>

                            <div className="form-group full-width">
                                <label>Summary</label>
                                <textarea
                                    placeholder="Example: Experienced software developer with 3+ years of experience building scalable web applications..."
                                    rows="6"
                                    value={templateData?.summary || ""}
                                    onChange={(e) => handleSummaryChange(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="step-buttons">
                                <button className="secondary-btn" onClick={handlePrev}>
                                    ← Previous
                                </button>
                                <button className="primary-btn" onClick={handleNext}>
                                    Next →
                                </button>
                            </div>

                        </div>
                    </div>
                )}

                {activeStep === 3 && (
                    <div className="step-container step-3">
                        <label>Job Title</label>
                        <input type="text" placeholder="Enter Job Title" />
                        <div className="step-buttons">
                            <button onClick={handlePrev}>Previous</button>
                            <button onClick={handleNext}>Next</button>
                        </div>
                    </div>
                )}

                {activeStep === 4 && (
                    <div className="step-container step-4">
                        <label>Summary</label>
                        <textarea placeholder="Enter Summary"></textarea>
                        <div className="step-buttons">
                            <button onClick={handlePrev}>Previous</button>
                            <button onClick={handleNext}>Next</button>
                        </div>
                    </div>
                )}

                {activeStep === 5 && (
                    <div className="step-container step-5">
                        <label>Skill</label>
                        <input type="text" placeholder="Enter Skill" />
                        <div className="step-buttons">
                            <button onClick={handlePrev}>Previous</button>
                            <button>Submit</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Editor;
