import React, { useState, useEffect, useMemo } from "react";
import "./Templets.css";
import { dummyData } from "../../utils/dummyData";
import { templateRegistry } from "../../config/templateRegistry";
import TEMPLETS_API from "../../api/routes/templatesRoutes";
import { useNavigate } from "react-router-dom";

function Templets() {
    const navigate = useNavigate();
    const [templates, setTemplates] = useState([]);
    const [categories, setCategories] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedSort, setSelectedSort] = useState("recommended");
    const [premiumOnly, setPremiumOnly] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchTemplates = async () => {
        try {
            const response = await TEMPLETS_API.getAllTemplates();
            setTemplates(response.data.templates);
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
    };

    useEffect(() => {
        fetchTemplates();
        fetchCategories();
    }, []);

    const filteredTemplates = useMemo(() => {
        let updatedTemplates = [...templates];

        if (selectedCategory !== "all") {
            updatedTemplates = updatedTemplates.filter(
                (template) => template.category_id == selectedCategory
            );
        }

        if (premiumOnly) {
            updatedTemplates = updatedTemplates.filter(
                (template) => template.is_premium == 1
            );
        }

        if (searchTerm) {
            updatedTemplates = updatedTemplates.filter(
                (template) =>
                    template.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        if (selectedSort === "recommended") {
            updatedTemplates.sort((a, b) => b.ats_score - a.ats_score);
        }

        if (selectedSort === "newest") {
            updatedTemplates.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
        }

        if (selectedSort === "popular") {
            updatedTemplates.sort(
                (a, b) => b.popularity_count - a.popularity_count
            );
        }

        return updatedTemplates;

    }, [templates, selectedCategory, premiumOnly, searchTerm, selectedSort]);

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
                            <select
                                className="filter-select"
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
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
                            <select
                                className="filter-select"
                                onChange={(e) => setSelectedSort(e.target.value)}
                            >
                                <option value="recommended">Recommended</option>
                                <option value="newest">Newest</option>
                                <option value="popular">Most Popular</option>
                            </select>
                        </div>

                        <div className="filter-checkbox">
                            <input
                                type="checkbox"
                                id="premiumOnly"
                                checked={premiumOnly}
                                onChange={(e) => setPremiumOnly(e.target.checked)}
                            />
                            <label htmlFor="premiumOnly">Premium Only</label>
                        </div>

                    </div>

                    <div className="filters-right">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search templates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
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
                                        {TemplateComponent && (
                                            <TemplateComponent data={dummyData} />
                                        )}
                                    </div>
                                    <div className="use-template-overlay">
                                        <button
                                            className="btn-use-template"
                                            onClick={() => navigate(`/editor/${template.slug}`)}
                                        >
                                            Use Template
                                        </button>
                                    </div>
                                </div>
                                <div className="templet-info">
                                    <h3>{template.title}</h3>
                                    <p>{template.sub_title}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}

export default Templets;
