function PersonalDetails({ handleChange, resumeData, onNext }) {
    return (
        <div className="form-section">
            <h2>Personal Information</h2>
            <div className="input-row">
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => handleChange("personalInfo", "firstName", e.target.value)}
                        placeholder="First Name"
                        defaultValue={resumeData?.personalInfo?.firstName || ''}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => handleChange("personalInfo", "lastName", e.target.value)}
                        placeholder="Last Name"
                        defaultValue={resumeData?.personalInfo?.lastName || ''}
                    />
                </div>
            </div>
            <div className="form-group">
                <label>Job Title</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => handleChange("personalInfo", "jobTitle", e.target.value)}
                    placeholder="Job Title"
                    defaultValue={resumeData?.personalInfo?.jobTitle || ''}
                />
            </div>
            <div className="input-row">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        onChange={(e) => handleChange("personalInfo", "email", e.target.value)}
                        placeholder="Email"
                        defaultValue={resumeData?.personalInfo?.email || ''}
                    />
                </div>
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => handleChange("personalInfo", "phone", e.target.value)}
                        placeholder="Phone"
                        defaultValue={resumeData?.personalInfo?.phone || ''}
                    />
                </div>
            </div>
            <div className="form-group">
                <label>Address</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => handleChange("personalInfo", "address", e.target.value)}
                    placeholder="Address"
                    defaultValue={resumeData?.personalInfo?.address || ''}
                />
            </div>
            <div className="form-actions" style={{ justifyContent: 'flex-end' }}>
                <button className="btn btn-primary" onClick={onNext}>Next</button>
            </div>
        </div>
    );
}

export default PersonalDetails;
