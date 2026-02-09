import React from 'react';
import './Templets.css';
import { dummyData } from '../../utils/dummyData';
import CreativeTemplate from '../../components/templates/Creative/CreativeTemplate';

function Templets() {
    return (
        <div className="templets-page">
            <header className="templets-header">
                <div className="templets-container">
                    <h1>Choose Your Perfect Template</h1>
                    <p>Professional, creative, or simple — find the design that best represents your personal brand.</p>
                </div>
            </header>

            <div className="templets-container">
                <div className="templets-grid">
                    <CreativeTemplate data={dummyData} />
                    {/* {templates.map((template) => (
                        <div key={template.id} className="templet-card">
                            <div className="templet-preview">
                                <div className="resume-skeleton">
                                    <div className="sk-header" style={{ backgroundColor: template.color }}></div>
                                    <div className="sk-row">
                                        <div className="sk-col-left">
                                            <div className="sk-block title"></div>
                                            <div className="sk-block"></div>
                                            <div className="sk-block"></div>
                                        </div>
                                        <div className="sk-col-right">
                                            <div className="sk-block title"></div>
                                            <div className="sk-block"></div>
                                            <div className="sk-block"></div>
                                            <div className="sk-block"></div>
                                            <div className="sk-block title" style={{ marginTop: '1rem' }}></div>
                                            <div className="sk-block"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="use-template-overlay">
                                    <button className="btn-use-template">Use Template</button>
                                </div>
                            </div>
                            <div className="templet-info">
                                <h3>{template.name}</h3>
                                <p>{template.description}</p>
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    )
}

export default Templets