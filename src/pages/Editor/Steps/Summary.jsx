import React from 'react';

function Summary({ handleSummaryChange, summary, onNext, onPrev }) {
    return (
        <div className="form-section">
            <h2>Professional Summary</h2>
            <div className="form-group">
                <label>Summary</label>
                <textarea
                    className="form-control"
                    defaultValue={summary || ''}
                    onChange={(e) => handleSummaryChange(e.target.value)}
                    placeholder="Write a professional summary..."
                />
            </div>
            <div className="form-actions">
                <button className="btn btn-secondary" onClick={onPrev}>Previous</button>
                <button className="btn btn-primary" onClick={onNext}>Next</button>
            </div>
        </div>
    );
}

export default Summary;
