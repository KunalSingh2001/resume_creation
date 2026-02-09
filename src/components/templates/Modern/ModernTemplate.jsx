import React from 'react';
import './ModernTemplate.css';
import { dummyData } from '../../../utils/dummyData';

const ModernTemplate = ({ data = dummyData }) => {
    const { personalInfo, summary, experience, education, skills } = data;

    return (
        <div className="modern-template">
            <header className="mod-header">
                <div className="mod-name-section">
                    <h1 className="mod-name">{personalInfo.firstName} {personalInfo.lastName}</h1>
                    <p className="mod-title">{personalInfo.jobTitle}</p>
                </div>
                <div className="mod-contact-section">
                    <div>{personalInfo.email}</div>
                    <div>{personalInfo.phone}</div>
                    <div>{personalInfo.address}</div>
                    <div>{personalInfo.website}</div>
                </div>
            </header>

            <div className="mod-content">
                <div className="mod-left-col">
                    <section className="mod-section">
                        <h3 className="mod-heading">Profile</h3>
                        <p className="mod-text">{summary}</p>
                    </section>

                    <section className="mod-section">
                        <h3 className="mod-heading">Expertise</h3>
                        <ul className="mod-skills-list">
                            {skills.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </section>

                    <section className="mod-section">
                        <h3 className="mod-heading">Education</h3>
                        {education.map(edu => (
                            <div key={edu.id} className="mod-edu-item">
                                <div className="mod-degree">{edu.degree}</div>
                                <div className="mod-school">{edu.school}</div>
                                <div className="mod-date">{edu.startDate} - {edu.endDate}</div>
                            </div>
                        ))}
                    </section>
                </div>

                <div className="mod-right-col">
                    <section className="mod-section">
                        <h3 className="mod-heading">Experience</h3>
                        {experience.map(exp => (
                            <div key={exp.id} className="mod-exp-item">
                                <h4 className="mod-position">{exp.title}</h4>
                                <div className="mod-company">{exp.company} <span className="mod-date-inline">| {exp.startDate} - {exp.endDate}</span></div>
                                <p className="mod-text">{exp.description}</p>
                            </div>
                        ))}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ModernTemplate;
