import React from 'react';
import './MinimalistTemplate.css';
import { dummyData } from '../../../utils/dummyData';

const MinimalistTemplate = ({ data = dummyData }) => {
    const { personalInfo, summary, experience, education, skills } = data;
    console.log("bshbshbd sds dsd sdsd", skills);
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
                        <div key={exp._id} className="mt-item">
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
                            <span key={index} className="mt-skill">{skill.skill}</span>
                        ))}
                    </div>
                </section>

                <section className="mt-section">
                    <h3 className="mt-heading">Education</h3>
                    {education.map((edu, index) => (
                        <div key={index} className="mt-item">
                            <div className="mt-item-header">
                                <span className="mt-role">
                                    {edu.degree} ({edu.field})
                                </span>
                                <span className="mt-date">
                                    {edu.startYear} - {edu.endYear}
                                </span>
                            </div>
                            <div className="mt-company">{edu.institute}</div>
                            <p className="mt-text">Score: {edu.score}%</p>
                        </div>
                    ))}
                </section>
            </div>
        </div >
    );
};

export default MinimalistTemplate;
