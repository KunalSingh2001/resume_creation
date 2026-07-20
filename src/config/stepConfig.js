export const stepConfig = {
    1: {
        section: "personalInfo",
        getData: (data) => data.personalInfo
    },
    2: {
        section: "summary",
        getData: (data) => data.summary
    },
    3: {
        section: "experience",
        getData: (data) => data.experience
    },
    4: {
        section: "education",
        getData: (data) => data.education
    },
    5: {
        section: "skills",
        getData: (data) => data.skills
    }
};