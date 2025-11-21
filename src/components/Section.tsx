import React from "react";
interface SectionProps {
  title: string;
  text: string;
}
const Section: React.FC<SectionProps> = ({ title, text }) => {
  if (!text.trim()) return null;
  return (
    <div style={{ marginBottom: "22px" }}>
      {" "}
      <h3
        style={{
          marginBottom: "10px",
          color: "#0096FF",
          fontSize: "20px",
          fontWeight: 700,
          letterSpacing: "0.5px",
        }}
      >
        {" "}
        {title}{" "}
      </h3>{" "}
      <p
        style={{ whiteSpace: "pre-line", lineHeight: "1.6", fontSize: "14px" }}
      >
        {" "}
        {text}{" "}
      </p>{" "}
    </div>
  );
};
export default Section;
