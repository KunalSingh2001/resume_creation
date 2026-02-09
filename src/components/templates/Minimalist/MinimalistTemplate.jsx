import React from 'react';
import './MinimalistTemplate.css';
import { dummyData } from '../../../utils/dummyData';

const MinimalistTemplate = ({ data = dummyData }) => {
    const { personalInfo, summary, experience, education, skills } = data;

    return (
        <div className="minimalist-template">
            <header className="mt-header">
                <h1 className="mt-name">{personalInfo.firstName} {personalInfo.lastName}</h1>
                <p className="mt-title">{personalInfo.jobTitle}</p>
                <div className="mt-contact">
                    {personalInfo.email} • {personalInfo.phone} • {personalInfo.address}
                </div>
            </header>

            <div className="mt-content">
                <section className="mt-section">
                    <h3 className="mt-heading">Summary</h3>
                    <p className="mt-text">{summary}</p>
                </section>

                <section className="mt-section">
                    <h3 className="mt-heading">Experience</h3>
                    {experience.map(exp => (
                        <div key={exp.id} className="mt-item">
                            <div className="mt-item-header">
                                <span className="mt-role">{exp.title}</span>
                                <span className="mt-date">{exp.startDate} - {exp.endDate}</span>
                            </div>
                            <div className="mt-company">{exp.company}</div>
                            <p className="mt-text">{exp.description}</p>
                        </div>
                    ))}
                </section>

                <section className="mt-section">
                    <h3 className="mt-heading">Skills</h3>
                    <div className="mt-skills-grid">
                        {skills.map((skill, index) => (
                            <span key={index} className="mt-skill">{skill}</span>
                        ))}
                    </div>
                </section>

                <section className="mt-section">
                    <h3 className="mt-heading">Education</h3>
                    {education.map(edu => (
                        <div key={edu.id} className="mt-item">
                            <div className="mt-degree">{edu.degree}</div>
                            <div className="mt-school">{edu.school}, {edu.location}</div>
                            <div className="mt-date">{edu.startDate} - {edu.endDate}</div>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
};

export default MinimalistTemplate;
