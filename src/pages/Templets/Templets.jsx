import React, { useState, useEffect } from "react";
import "./Templets.css";
import { dummyData } from "../../utils/dummyData";
import { templateRegistry } from "../../config/templateRegistry";
import TEMPLETS_API from "../../api/routes/templatesRoutes";

function Templets() {
    const [templates, setTemplates] = useState([]);
    const [filteredTemplates, setFilteredTemplates] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchTemplates = async () => {
        try {
            const response = await TEMPLETS_API.getAllTemplates();
            setTemplates(response.data.templates);
            setFilteredTemplates(response.data.templates);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await TEMPLETS_API.getAllCategories();
            setCategories(response.data.categories);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTemplates();
        fetchCategories();
    }, []);


    const handleCatChange = (e) => {
        const selectedCategory = e.target.value;
        if (selectedCategory === "all") {
            setFilteredTemplates(templates);
            return;
        }
        const filteredTemplates = templates.filter((template) => (template.category_id == selectedCategory));
        setFilteredTemplates(filteredTemplates);
    }
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
                <div className="filters-container">
                    <div className="filters-left">
                        <div className="filter-item">
                            <label>Category</label>
                            <select className="filter-select" onChange={handleCatChange}>
                                <option value="all">All Categories</option>

                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-item">
                            <label>Sort By</label>
                            <select className="filter-select">
                                <option value="recommended">Recommended</option>
                                <option value="newest">Newest</option>
                                <option value="popular">Most Popular</option>
                            </select>
                        </div>

                        <div className="filter-checkbox">
                            <input type="checkbox" id="premiumOnly" />
                            <label htmlFor="premiumOnly">Premium Only</label>
                        </div>
                    </div>

                    <div className="filters-right">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search templates..."
                        />
                    </div>
                </div>

                <div className="templets-grid">
                    {filteredTemplates.map((template, index) => {
                        const TemplateComponent = templateRegistry[template.slug];
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
