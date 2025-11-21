import Section from "./Section";
const ResumePreview = ({
  data,
  experienceList,
  projectList,
  resumeRef,
}: any) => (
  <div
    ref={resumeRef}
    style={{
      width: "60%",
      padding: "30px",
      background: "white",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    }}
  >
    {" "}
    <div
      style={{
        padding: "25px 30px",
        background: "linear-gradient(135deg, #00A6FF, #004E92)",
        color: "white",
        borderRadius: "6px",
        marginBottom: "20px",
      }}
    >
      {" "}
      <h1 style={{ marginBottom: "5px", fontSize: "32px", fontWeight: 700 }}>
        {data.name}
      </h1>{" "}
      <h3 style={{ marginTop: "0", fontSize: "18px", fontWeight: 500 }}>
        {data.title}
      </h3>{" "}
      <p style={{ marginTop: "10px", fontSize: "14px", lineHeight: "1.6" }}>
        {" "}
        📍 {data.location} &nbsp; | &nbsp; 📞 {data.phone} &nbsp; | &nbsp; ✉️{" "}
        {data.email}
        <br /> 🔗 {data.linkedin}{" "}
      </p>{" "}
    </div>{" "}
    <hr style={{ margin: "20px 0" }} />{" "}
    <Section title="Professional Summary" text={data.summary} />{" "}
    <hr style={{ margin: "20px 0" }} />{" "}
    <Section title="Technical Skills" text={data.skills} />{" "}
    <hr style={{ margin: "20px 0" }} />{" "}
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
        Professional Experience
      </h3>{" "}
      {experienceList.map((exp: any, i: number) => (
        <div key={i} style={{ marginBottom: "12px" }}>
          {" "}
          <strong style={{ display: "block", fontSize: "16px" }}>
            {" "}
            {exp.designation} - {exp.organization} ({exp.startDate} →{" "}
            {exp.isCurrent ? "Present" : exp.endDate}){" "}
          </strong>{" "}
          <ul style={{ margin: "5px 0 0 20px" }}>
            {" "}
            {exp.details.split("\n").map((line: string, idx: number) => (
              <li key={idx} style={{ fontSize: "14px", lineHeight: 1.6 }}>
                {line}
              </li>
            ))}{" "}
          </ul>{" "}
        </div>
      ))}{" "}
    </div>{" "}
    <hr style={{ margin: "20px 0" }} />{" "}
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
        Key Projects
      </h3>{" "}
      {projectList.map((proj: any, index: number) => (
        <div key={index} style={{ marginBottom: "12px" }}>
          {" "}
          <strong style={{ display: "block", fontSize: "16px" }}>
            {proj.title}
          </strong>{" "}
          <ul style={{ margin: "5px 0 0 20px" }}>
            {" "}
            {proj.details.split("\n").map((line: string, idx: number) => (
              <li key={idx} style={{ fontSize: "14px", lineHeight: 1.6 }}>
                {line}
              </li>
            ))}{" "}
          </ul>{" "}
        </div>
      ))}{" "}
    </div>{" "}
    <hr style={{ margin: "20px 0" }} />{" "}
    <Section title="Education" text={data.education} />{" "}
    <hr style={{ margin: "20px 0" }} />{" "}
    <Section title="Certifications & Achievements" text={data.certification} />{" "}
    <div
      style={{
        marginTop: "25px",
        textAlign: "center",
        fontSize: "12px",
        color: "#777",
      }}
    >
      {" "}
      Created by <strong>Sudarshan Ghayal</strong> | Contact: +91 9858165050{" "}
    </div>{" "}
  </div>
);
export default ResumePreview;
