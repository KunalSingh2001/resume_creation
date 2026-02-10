import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Templets.css";
import { dummyData } from "../../utils/dummyData";
import { templateRegistry } from "../../config/templateRegistry";

function Templets() {
    const [templates, setTemplates] = useState([]);

    const fetchTemplates = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/templates");
            setTemplates(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    return (
        <div className="templets-page">
            <header className="templets-header">
                <div className="templets-container">
                    <h1>Choose Your Perfect Template</h1>
                    <p>
                        Professional, creative, or simple — find the design that
                        best represents your personal brand.
                    </p>
                </div>
            </header>
            <div className="templets-container">
                <div className="templets-grid">
                    {templates.map((template, index) => {
                        const TemplateComponent = templateRegistry[template.slug];
                        console.log(index, template);
                        return (
                            <div className="templet-card" key={index}>
                                <div className="templet-preview">
                                    <div className="resume-preview-scale">
                                        {TemplateComponent && <TemplateComponent data={dummyData} />}
                                    </div>
                                    <div className="use-template-overlay">
                                        <button className="btn-use-template">
                                            Use Template
                                        </button>
                                    </div>
                                </div>
                                <div className="templet-info">
                                    <h3>{template.title}</h3>
                                    <p>{template.sub_title}</p>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </div>
    );
}

export default Templets;
