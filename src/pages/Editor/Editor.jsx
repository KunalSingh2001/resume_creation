import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { templateRegistry } from "../../config/templateRegistry";
import { emptyData, dummyData } from "../../utils/dummyData";
import TEMPLETS_API from "../../api/routes/templatesRoutes";
import { stepConfig } from "../../config/stepConfig";
import { useReducer } from "react";
import "./Editor.css";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
function Editor() {
    const { slug } = useParams();
    const TemplateComponent = templateRegistry[slug];
    const [activeStep, setActiveStep] = useState(1);
    const [resumeData, dispatch] = useReducer(resumeReduser, emptyData);
    const getStepFromData = (data) => {
        if (data.skills?.length) return 5;
        if (data.education?.length) return 4;
        if (data.experience?.length) return 3;
        if (data.summary) return 2;
        if (data.personalInfo?.firstName) return 1;

        return 1;
    };

    async function fetchResumeData() {
        try {
            const res = await TEMPLETS_API.getResume();
            if (res.status === 200 && res.data?.data) {
                dispatch({
                    type: "LOAD_DATA",
                    payload: res.data.data.data,
                });
                setActiveStep(getStepFromData(res.data.data.data));
            }
        } catch (error) {
            if (error.response?.status === 204 || error.response?.status === 404) {
                dispatch({ type: "LOAD_DATA", payload: emptyData });
                setActiveStep(1);
                return;
            }
            console.log(error);
        }
    }

    useEffect(() => {
        fetchResumeData();
    }, []);

    function resumeReduser(state, action) {

        switch (action.type) {
            case "UPDATE_PERSONAL":
                return {
                    ...state,
                    personalInfo: {
                        ...state.personalInfo,
                        [action.field]: action.value
                    }
                }


            case "UPDATE_SUMMARY":
                return {
                    ...state,
                    summary: action.value
                }

            case "ADD_EXPERIENCE":
                return {
                    ...state,
                    experience: [
                        ...(state.experience || []),
                        {
                            company: "",
                            role: "",
                            startDate: "",
                            endDate: "",
                            title: "",
                            discription: ""
                        }
                    ]
                }

            case "UPDATE_EXPERIENCE":
                return {
                    ...state,
                    experience: state.experience.map((exp, index) =>
                        index === action.index
                            ? { ...exp, [action.field]: action.value }
                            : exp
                    )
                }

            case "REMOVE_EXPERIENCE":
                return {
                    ...state,
                    experience: state.experience.filter((_, index) => index !== action.index)
                }

            case "ADD_EDUCATION":
                return {
                    ...state,
                    education: [
                        ...state.education,
                        {
                            institute: "",
                            degree: "",
                            field: "",
                            startYear: "",
                            endYear: "",
                            score: ""
                        }
                    ]
                };

            case "UPDATE_EDUCATION":
                const updatedEducation = [...state.education];
                updatedEducation[action.index][action.field] = action.value;
                return {
                    ...state,
                    education: updatedEducation
                };

            case "REMOVE_EDUCATION":
                return {
                    ...state,
                    education: state.education.filter((_, i) => i !== action.index)
                };


            case "ADD_SKILLS":
                return {
                    ...state,
                    skills: [
                        ...state.skills,
                        {
                            skill: "",
                        }
                    ]
                };

            case "UPDATE_SKILLS":
                const updatedSkills = [...state.skills];
                updatedSkills[action.index][action.field] = action.value;

                return {
                    ...state,
                    skills: updatedSkills
                };

            case "REMOVE_SKILLS":
                return {
                    ...state,
                    skills: state.skills.filter((_, i) => i !== action.index)
                };


            case "LOAD_DATA":
                return {
                    ...state,
                    ...action.payload
                };
        }
    }

    if (!TemplateComponent) {
        return (
            <div className="editor-page">
                <h2>Template Not Found</h2>
            </div>
        );
    }

    const handleNext = async () => {
        try {
            const currentStepConfig = stepConfig[activeStep];

            if (!currentStepConfig) return;

            const formData = {
                section: currentStepConfig.section,
                data: currentStepConfig.getData(resumeData)
            };
            if (activeStep === 1) {
                await TEMPLETS_API.createResume();
            }

            await TEMPLETS_API.saveResume(formData);

        } catch (error) {

            if (error.response && error.response.status === 400) {

                if (activeStep === 1) {
                    await TEMPLETS_API.createResume();
                }

                const currentStepConfig = stepConfig[activeStep];

                const formData = {
                    section: currentStepConfig.section,
                    data: currentStepConfig.getData(resumeData)
                };

                await TEMPLETS_API.saveResume(formData);

            } else {
                console.log(error);
            }
        }


        setActiveStep(prev => prev + 1);
    };

    const handlePrev = () => {
        setActiveStep(prev => prev - 1);
    };

    const isResumeComplete = (data) => {
        if (!data.personalInfo?.firstName) return false;
        if (!data.summary) return false;
        if (!data.experience || data.experience.length === 0) return false;
        if (!data.skills || data.skills.length === 0) return false;
        return true;
    };
    const isCompleted = isResumeComplete(resumeData);


    const submitForm = async () => {
        try {
            const currentStepConfig = stepConfig[activeStep];
            if (!currentStepConfig) return;

            const formData = {
                section: currentStepConfig.section,
                data: currentStepConfig.getData(resumeData)
            };

            await TEMPLETS_API.saveResume(formData);
            alert("Resume submitted successfully!");

        } catch (error) {

            if (error.response && error.response.status === 400) {

                await TEMPLETS_API.createResume();

                const currentStepConfig = stepConfig[activeStep];

                const formData = {
                    section: currentStepConfig.section,
                    data: currentStepConfig.getData(resumeData)
                };

                await TEMPLETS_API.saveResume(formData);
                alert("Resume submitted successfully!");

            } else {
                console.error("Error submitting form: ", error);
                alert("Failed to submit resume.");
            }
        }
    };

    const login = useGoogleAuth(() => {
        console.log("Google Login Success");
    });

    const handleDownload = async () => {
        try {
            const downloadResume = await TEMPLETS_API.downloadResume();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                login();
            } else {
                console.log(error);
            }
        }

        const resumeElement = document.querySelector(".resume-preview-wrapper");

        const canvas = await html2canvas(resumeElement, {
            scale: 2,
            useCORS: true,
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("resume.pdf");
    };

    return (
        <div className="editor-page">

            <div className="editor-preview-container">
                <div className="resume-preview-wrapper">
                    <TemplateComponent data={resumeData} />
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
                                        value={resumeData?.personalInfo?.firstName || ""}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "UPDATE_PERSONAL",
                                                field: "firstName",
                                                value: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        placeholder="Doe"
                                        value={resumeData?.personalInfo?.lastName || ""}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "UPDATE_PERSONAL",
                                                field: "lastName",
                                                value: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Job Title</label>
                                    <input
                                        type="text"
                                        placeholder="Software Engineer"
                                        value={resumeData?.personalInfo?.jobTitle || ""}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "UPDATE_PERSONAL",
                                                field: "jobTitle",
                                                value: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={resumeData?.personalInfo?.email || ""}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "UPDATE_PERSONAL",
                                                field: "email",
                                                value: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        placeholder="+91 9876543210"
                                        value={resumeData?.personalInfo?.phone || ""}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "UPDATE_PERSONAL",
                                                field: "phone",
                                                value: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div className="form-group full-width">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        placeholder="City, Country"
                                        value={resumeData?.personalInfo?.address || ""}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "UPDATE_PERSONAL",
                                                field: "address",
                                                value: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label>LinkedIn</label>
                                    <input
                                        type="text"
                                        placeholder="linkedin.com/in/username"
                                        value={resumeData?.personalInfo?.linkedin || ""}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "UPDATE_PERSONAL",
                                                field: "linkedin",
                                                value: e.target.value
                                            })
                                        }
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Website</label>
                                    <input
                                        type="text"
                                        placeholder="yourportfolio.com"
                                        value={resumeData?.personalInfo?.website || ""}
                                        onChange={(e) =>
                                            dispatch({
                                                type: "UPDATE_PERSONAL",
                                                field: "website",
                                                value: e.target.value
                                            })
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
                                    value={resumeData?.summary || ""}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_SUMMARY",
                                            value: e.target.value
                                        })
                                    }
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

                        <h3>Experience</h3>

                        {resumeData.experience?.map((exp, index) => (
                            <div key={index} className="experience-card">

                                <input
                                    type="text"
                                    placeholder="Company"
                                    value={exp.company}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_EXPERIENCE",
                                            index,
                                            field: "company",
                                            value: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Role"
                                    value={exp.role}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_EXPERIENCE",
                                            index,
                                            field: "role",
                                            value: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Start Date"
                                    value={exp.startDate}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_EXPERIENCE",
                                            index,
                                            field: "startDate",
                                            value: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="End Date"
                                    value={exp.endDate}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_EXPERIENCE",
                                            index,
                                            field: "endDate",
                                            value: e.target.value
                                        })
                                    }
                                />
                                <textarea
                                    placeholder="Describe your work, achievements, responsibilities..."
                                    value={exp.description || ""}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_EXPERIENCE",
                                            index,
                                            field: "description",
                                            value: e.target.value
                                        })
                                    }
                                />

                                <button onClick={() =>
                                    dispatch({ type: "REMOVE_EXPERIENCE", index })
                                }>
                                    Remove
                                </button>

                            </div>
                        ))}

                        <button
                            onClick={() => dispatch({ type: "ADD_EXPERIENCE" })}
                        >
                            + Add Experience
                        </button>

                        <div className="step-buttons">
                            <button onClick={handlePrev}>Previous</button>
                            <button onClick={handleNext}>Next</button>
                        </div>

                    </div>
                )}

                {activeStep === 4 && (
                    <div className="step-container step-4">

                        <h3>Education</h3>

                        {resumeData.education?.map((edu, index) => (
                            <div key={index} className="education-card">

                                <input
                                    type="text"
                                    placeholder="Institute / School"
                                    value={edu.institute}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_EDUCATION",
                                            index,
                                            field: "institute",
                                            value: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Degree (B.Tech, BCA, etc)"
                                    value={edu.degree}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_EDUCATION",
                                            index,
                                            field: "degree",
                                            value: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Field of Study"
                                    value={edu.field}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_EDUCATION",
                                            index,
                                            field: "field",
                                            value: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Start Year"
                                    value={edu.startYear}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_EDUCATION",
                                            index,
                                            field: "startYear",
                                            value: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="End Year"
                                    value={edu.endYear}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_EDUCATION",
                                            index,
                                            field: "endYear",
                                            value: e.target.value
                                        })
                                    }
                                />

                                <input
                                    type="text"
                                    placeholder="Percentage / CGPA"
                                    value={edu.score}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_EDUCATION",
                                            index,
                                            field: "score",
                                            value: e.target.value
                                        })
                                    }
                                />

                                <button
                                    onClick={() =>
                                        dispatch({ type: "REMOVE_EDUCATION", index })
                                    }
                                >
                                    Remove
                                </button>

                            </div>
                        ))}

                        <button
                            onClick={() => dispatch({ type: "ADD_EDUCATION" })}
                        >
                            + Add Education
                        </button>

                        <div className="step-buttons">
                            <button onClick={handlePrev}>Previous</button>
                            <button onClick={handleNext}>Next</button>
                        </div>

                    </div>
                )}

                {activeStep === 5 && (
                    <div className="step-container step-5">
                        <h3>Skills</h3>
                        {resumeData.skills?.map((edu, index) => (
                            <div key={index} className="education-card">
                                <input
                                    type="text"
                                    placeholder="Skills"
                                    value={edu.skill}
                                    onChange={(e) =>
                                        dispatch({
                                            type: "UPDATE_SKILLS",
                                            index,
                                            field: "skill",
                                            value: e.target.value
                                        })
                                    }
                                />
                                <button
                                    onClick={() =>
                                        dispatch({ type: "REMOVE_SKILLS", index })
                                    }
                                >
                                    Remove
                                </button>

                            </div>
                        ))}
                        <button
                            onClick={() => dispatch({ type: "ADD_SKILLS" })}
                        >
                            + Add Skills
                        </button>
                        <div className="step-buttons">
                            <button onClick={handlePrev}>Previous</button>
                            <button onClick={handleNext}>Next</button>
                        </div>
                    </div>
                )}

                {activeStep === 6 && (
                    <div className="step-container step-5">
                        <h3>Download</h3>
                        <div className="step-buttons">
                            <button onClick={handleDownload}>Download</button>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
}


export default Editor;

