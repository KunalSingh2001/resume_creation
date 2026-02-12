import React from 'react';
import './ProfessionalTemplate.css';

const ProfessionalTemplate = ({ data }) => {
    console.log("ProfessionalTemplate page", data);
    const { personalInfo, summary, experience, education, skills } = data;

    return (
        <div className="professional-template">
            <header className="pt-header">
                <h1 className="pt-name">{personalInfo.firstName} {personalInfo.lastName}</h1>
                <p className="pt-title">{personalInfo.jobTitle}</p>
                <div className="pt-contact-info">
                    <span>{personalInfo.email}</span>
                    <span>|</span>
                    <span>{personalInfo.phone}</span>
                    <span>|</span>
                    <span>{personalInfo.address}</span>
                </div>
            </header>

            <div className="pt-content">
                <div className="pt-main-column">
                    <section className="pt-section">
                        <h2 className="pt-section-title">Professional Summary</h2>
                        <hr />
                        <p className="pt-summary">{summary}</p>
                    </section>

                    <section className="pt-section">
                        <h2 className="pt-section-title">Experience</h2>
                        <hr />
                        {experience.map(exp => (
                            <div key={exp.id} className="pt-experience-item">
                                <div className="pt-exp-header">
                                    <h3 className="pt-company">{exp.company}</h3>
                                    <span className="pt-dates">{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <h4 className="pt-role">{exp.title}</h4>
                                <p className="pt-description">{exp.description}</p>
                            </div>
                        ))}
                    </section>

                    <section className="pt-section">
                        <h2 className="pt-section-title">Education</h2>
                        <hr />
                        {education.map(edu => (
                            <div key={edu.id} className="pt-education-item">
                                <div className="pt-edu-header">
                                    <h3 className="pt-school">{edu.school}</h3>
                                    <span className="pt-dates">{edu.startDate} - {edu.endDate}</span>
                                </div>
                                <p className="pt-degree">{edu.degree}</p>
                                <p className="pt-location">{edu.location}</p>
                            </div>
                        ))}
                    </section>
                </div>
                <div className="pt-sidebar">
                    <section className="pt-section">
                        <h2 className="pt-section-title">Skills</h2>
                        <hr />
                        <ul className="pt-skills-list">
                            {skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalTemplate;
