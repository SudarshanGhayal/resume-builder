import React from "react";
interface Project {
  title: string;
  details: string;
}
interface Props {
  project: Project;
  index: number;
  handleChange: (
    index: number,
    field: "title" | "details",
    value: string
  ) => void;
}
const ProjectCard: React.FC<Props> = ({ project, index, handleChange }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "15px",
        background: "white",
      }}
    >
      {" "}
      <label>Project Title</label>{" "}
      <input
        value={project.title}
        onChange={(e) => handleChange(index, "title", e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />{" "}
      <label style={{ marginTop: "10px" }}>Project Details</label>{" "}
      <textarea
        value={project.details}
        onChange={(e) => handleChange(index, "details", e.target.value)}
        rows={4}
        placeholder="Describe your project, technologies, and achievements..."
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "5px",
          fontSize: "14px",
        }}
      />{" "}
    </div>
  );
};
export default ProjectCard;
