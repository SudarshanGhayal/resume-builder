import React from "react";
interface Experience {
  designation: string;
  organization: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  details: string;
}
interface Props {
  exp: Experience;
  index: number;
  handleChange: (index: number, field: string, value: string | boolean) => void;
}
const ExperienceCard: React.FC<Props> = ({ exp, index, handleChange }) => {
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
      <label>Designation</label>{" "}
      <input
        value={exp.designation}
        onChange={(e) => handleChange(index, "designation", e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />{" "}
      <label>Organization Name</label>{" "}
      <input
        value={exp.organization}
        onChange={(e) => handleChange(index, "organization", e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />{" "}
      <label>Start Date</label>{" "}
      <input
        type="month"
        value={exp.startDate}
        onChange={(e) => handleChange(index, "startDate", e.target.value)}
        style={{ width: "100%", padding: "8px" }}
      />{" "}
      {!exp.isCurrent && (
        <>
          {" "}
          <label>End Date</label>{" "}
          <input
            type="month"
            value={exp.endDate}
            onChange={(e) => handleChange(index, "endDate", e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />{" "}
        </>
      )}{" "}
      <label style={{ marginTop: "10px", display: "block" }}>
        {" "}
        <input
          type="checkbox"
          checked={exp.isCurrent}
          onChange={(e) => handleChange(index, "isCurrent", e.target.checked)}
        />{" "}
        Currently Working Here{" "}
      </label>{" "}
      <label style={{ marginTop: "10px" }}>Responsibilities</label>{" "}
      <textarea
        value={exp.details}
        onChange={(e) => handleChange(index, "details", e.target.value)}
        rows={4}
        placeholder="Describe your contributions, achievements, technologies used..."
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
export default ExperienceCard;
