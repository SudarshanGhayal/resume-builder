import React from "react";
import ExperienceCard from "./ExperinceCard";
import ProjectCard from "./ProjectCard";

type ResumeFields = {
  name: string;
  title: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  summary: string;
  skills: string;
  education: string;
  certification: string;
};

interface ResumeFormProps {
  data: ResumeFields;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  experienceList: any[];
  handleExperienceChange: any;
  addExperience: () => void;
  projectList: any[];
  handleProjectChange: any;
  addProject: () => void;
  downloadPDF: () => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({
  data,
  handleChange,
  experienceList,
  handleExperienceChange,
  addExperience,
  projectList,
  handleProjectChange,
  addProject,
  downloadPDF,
}) => {

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 15px",
    margin: "6px 0 12px 0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    transition: "all 0.3s ease",
  };
  const buttonStyle: React.CSSProperties = {
    padding: "12px 20px",
    background: "#0096FF",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: 600,
  };

const renderInput = (
  key: keyof ResumeFields,
  label: string,
  isTextArea = false
) => (
  <div style={{ marginBottom: "15px" }}>
    <label
      style={{
        fontWeight: 600,
        display: "block",
        marginBottom: "5px",
        color: "#004E92",
      }}
    >
      {label}
    </label>

    {isTextArea ? (
      <textarea
        name={key}
        value={data[key]}
        onChange={handleChange}
        rows={4}
        style={inputStyle}
        placeholder={`Enter ${label.toLowerCase()}...`}
      />
    ) : (
      <input
        name={key}
        value={data[key]}
        onChange={handleChange}
        style={inputStyle}
        placeholder={`Enter ${label.toLowerCase()}...`}
      />
    )}
  </div>
);

    return (
        <div
            style={{
                width: "40%",
                padding: "25px",
                background: "#f5f7fa",
                borderRadius: "12px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            }}
        >
            {" "}
            <h2>Resume Builder</h2> {renderInput("name", "Full Name")}{" "}
            {renderInput("title", "Title")} {renderInput("location", "Location")}{" "}
            {renderInput("phone", "Phone")} {renderInput("email", "Email")}{" "}
            {renderInput("linkedin", "LinkedIn")}{" "}
            {renderInput("summary", "Professional Summary", true)}{" "}
            {renderInput("skills", "Technical Skills", true)}{" "}
            <h3 style={{ marginTop: "20px" }}>Professional Experience</h3>{" "}
            {experienceList.map((exp: any, index: number) => (
                <ExperienceCard
                    key={index}
                    exp={exp}
                    index={index}
                    handleChange={handleExperienceChange}
                />
            ))}{" "}
            <button style={buttonStyle} onClick={addExperience}>
                + Add More Experience
            </button>{" "}
            <h3 style={{ marginTop: "20px" }}>Key Projects</h3>{" "}
            {projectList.map((proj: any, index: number) => (
                <ProjectCard
                    key={index}
                    project={proj}
                    index={index}
                    handleChange={handleProjectChange}
                />
            ))}{" "}
            <button style={buttonStyle} onClick={addProject}>
                + Add More Project
            </button>{" "}
            {renderInput("education", "Education", true)}{" "}
            {renderInput("certification", "Certifications & Achievements", true)}{" "}
            <button
                style={{ ...buttonStyle, background: "#004E92", marginTop: "20px" }}
                onClick={downloadPDF}
            >
                Download PDF
            </button>{" "}
            <div style={{ marginTop: "15px", fontSize: "14px", color: "#555" }}>
                {" "}
                Created by <strong>Sudarshan Ghayal</strong> <br /> Contact:{" "}
                <a
                    href="tel:+919858165050"
                    style={{ color: "#007bff", textDecoration: "none" }}
                >
                    +91 9858165050
                </a>{" "}
            </div>{" "}
        </div>
    );
};
export default ResumeForm;
