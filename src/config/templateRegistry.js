import CreativeTemplate from "../components/templates/Creative/CreativeTemplate";
import MinimalistTemplate from "../components/templates/Minimalist/MinimalistTemplate";
import ModernTemplate from "../components/templates/Modern/ModernTemplate";
import ProfessionalTemplate from "../components/templates/Professional/ProfessionalTemplate";

export const templateRegistry = {
    "creative-designer-resume": CreativeTemplate,
    "simple-student-resume": MinimalistTemplate,
    "modern-developer-resume": ModernTemplate,
    "professional-manager-resume": ProfessionalTemplate,
};