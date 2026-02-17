import React from 'react';
import './CreativeTemplate.css';
import { emptyData } from '../../../utils/dummyData';

const CreativeTemplate = ({ data = emptyData }) => {
    console.log("data data data", data);
    const { personalInfo, summary, experience, education, skills } = data;

    return (
        <div className="creative-template">
            <aside className="ct-sidebar">
                <div className="ct-profile-section">
                    <h1 className="ct-name">{personalInfo.firstName}<br />{personalInfo.lastName}</h1>
                    <p className="ct-title">{personalInfo.jobTitle}</p>
                </div>

                <div className="ct-contact-section">
                    <h3 className="ct-sidebar-title">Contact</h3>
                    <div className="ct-contact-item">{personalInfo.email}</div>
                    <div className="ct-contact-item">{personalInfo.phone}</div>
                    <div className="ct-contact-item">{personalInfo.address}</div>
                    <div className="ct-contact-item">{personalInfo.website}</div>
                </div>

                <div className="ct-skills-section">
                    <h3 className="ct-sidebar-title">Skills</h3>
                    <ul className="ct-skills-list">
                        {skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>

                <div className="ct-education-section">
                    <h3 className="ct-sidebar-title">Education</h3>
                    {education.map(edu => (
                        <div key={edu.id} className="ct-edu-item">
                            <div className="ct-degree">{edu.degree}</div>
                            <div className="ct-school">{edu.school}</div>
                            <div className="ct-date">{edu.startDate} - {edu.endDate}</div>
                        </div>
                    ))}
                </div>
            </aside>

            <main className="ct-main-content">
                <section className="ct-section">
                    <h2 className="ct-section-title">About Me</h2>
                    <p className="ct-summary">{summary}</p>
                </section>

                <section className="ct-section">
                    <h2 className="ct-section-title">Experience</h2>
                    {experience.map(exp => (
                        <div key={exp.id} className="ct-experience-item">
                            <h3 className="ct-position">{exp.title}</h3>
                            <div className="ct-company-info">
                                <span className="ct-company">{exp.company}</span>
                                <span className="ct-date"> | {exp.startDate} - {exp.endDate}</span>
                            </div>
                            <p className="ct-description">{exp.description}</p>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default CreativeTemplate;
