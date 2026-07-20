import React from 'react';
import { dummyData } from '../../../utils/dummyData';
import './ProfessionalTemplate.css';

const ProfessionalTemplate = ({ data = dummyData }) => {
    const {
        personalInfo = {},
        summary = "",
        experience = [],
        education = [],
        skills = []
    } = data;

    const contactItems = [
        personalInfo.email,
        personalInfo.phone,
        personalInfo.address,
        personalInfo.linkedin
    ].filter(Boolean);

    return (
        <div className="professional-template">
            <header className="pt-header">
                <h1 className="pt-name">{personalInfo.firstName} {personalInfo.lastName}</h1>
                <p className="pt-title">{personalInfo.jobTitle}</p>
                <div className="pt-contact-info">
                    {contactItems.map((item, index) => (
                        <React.Fragment key={`${item}-${index}`}>
                            {index > 0 && <span className="pt-separator">|</span>}
                            <span>{item}</span>
                        </React.Fragment>
                    ))}
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
                        {experience.map((exp, index) => (
                            <div key={index} className="pt-experience-item">

                                <div className="pt-exp-header">
                                    <div>
                                        <h3 className="pt-company">{exp.company}</h3>
                                        <h4 className="pt-role">{exp.role}</h4>
                                    </div>

                                    <span className="pt-dates">
                                        {exp.startDate} - {exp.endDate || "Present"}
                                    </span>
                                </div>

                                {exp.description && (
                                    <p className="pt-description">
                                        {exp.description}
                                    </p>
                                )}

                            </div>
                        ))}
                    </section>

                    <section className="pt-section">
                        <h2 className="pt-section-title">Education</h2>
                        <hr />
                        {education.map((edu, index) => (
                            <div key={index} className="ct-edu-item">
                                <div className="ct-degree">{edu.degree}</div>
                                <div className="ct-field">{edu.field}</div>
                                <div className="ct-school">{edu.institute}</div>
                                <div className="ct-date">
                                    {edu.startYear} - {edu.endYear}
                                </div>
                                <div className="ct-score">
                                    Score: {edu.score}%
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
                <div className="pt-sidebar">
                    <section className="pt-section">
                        <h2 className="pt-section-title">Skills</h2>
                        <hr />
                        <ul className="pt-skills-list">
                            {skills.map((item, index) => (
                                <li key={index}>
                                    {item.skill}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProfessionalTemplate;
