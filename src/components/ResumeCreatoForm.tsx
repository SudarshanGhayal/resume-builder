
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface ResumeData {
    name: string;
    title: string;
    location: string;
    phone: string;
    email: string;
    linkedin: string;
    summary: string;
    skills: string;
    experience: string;
    projects: string;
    education: string;
    certification: string;
}

const ResumeCreatorForm: React.FC = () => {
    const [data, setData] = useState<ResumeData>({
        name: "John Doe",
        title: "Full Stack Developer",
        location: "Pune, Maharashtra, India",
        phone: "+91 9876543210",
        email: "johndoe@gmail.com",
        linkedin: "linkedin.com/in/johndoe",
        summary: "",
        skills: "",
        experience: "",
        projects: "",
        education: "",
        certification: "",
    });

    const [experienceList, setExperienceList] = useState([{
        designation: "",
        organization: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        details: "", // NEW FIELD
    },]);

    const [projectList, setProjectList] = useState([{
        title: "",
        details: "",
    },]);

    const resumeRef = useRef<HTMLDivElement>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const downloadPDF = async () => {
        const element = resumeRef.current;
        if (!element) return; const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(`${data.name.replace(/ /g, "_")}_Resume.pdf`);

    };

    const renderInput = (key: keyof ResumeData, label: string, isTextArea = false) => (
        <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: 600, display: "block", marginBottom: "5px", color: "#004E92" }}> {label}
            </label>
            {isTextArea ? (
                <textarea
                    name={key}
                    value={data[key]}
                    onChange={handleChange}
                    rows={4}
                    style={textareaStyle}
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

    const handleExperienceChange = (
        index: number,
        field: string,
        value: string | boolean) => {
        const updated = [...experienceList];
        (updated[index] as any)[field] = value;
        if (field === "isCurrent" && value === true) { updated[index].endDate = ""; }
        (updated[index] as any)[field] = value;
        setExperienceList(updated); // UPDATE data.experience field as formatted text 
        const formatted = updated
            .map((exp) =>
                `${exp.designation} - ${exp.organization} 
  ${exp.startDate} → ${exp.isCurrent ? "Present" : exp.endDate}`
            ).join("\n\n");
        setData({ ...data, experience: formatted });
    };
    const addExperience = () => {
        setExperienceList([...experienceList, {
            designation: "",
            organization: "",
            startDate: "",
            endDate: "",
            isCurrent: false,
            details: ""
        },
        ]);
    };
    const handleProjectChange = (index: number, field: "title" | "details", value: string) => {
        const updated = [...projectList]; updated[index][field] = value; setProjectList(updated);
        // Update data.projects for PDF / Section text 
        const formatted = updated.map((p) => `${p.title}\n${p.details}`).join("\n\n");
        setData({ ...data, projects: formatted });
    };
    const addProject = () => {
        setProjectList([...projectList, { title: "", details: "" }]);
    };
    const containerStyle: React.CSSProperties = { width: "40%", padding: "25px", background: "#f5f7fa", borderRadius: "12px", boxShadow: "0 8px 20px rgba(0,0,0,0.1)", fontFamily: "Arial, sans-serif" };
    const inputStyle: React.CSSProperties = { width: "100%", padding: "12px 15px", margin: "6px 0 12px 0", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px", transition: "all 0.3s ease" };
    const textareaStyle: React.CSSProperties = { width: "100%", padding: "12px 15px", margin: "6px 0 12px 0", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px", transition: "all 0.3s ease" };
    const buttonStyle: React.CSSProperties = { padding: "12px 20px", background: "#0096FF", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", marginTop: "10px", fontWeight: 600, transition: "all 0.3s ease" };
    const cardStyle: React.CSSProperties = { border: "1px solid #ddd", padding: "15px", borderRadius: "10px", marginBottom: "15px", background: "white", boxShadow: "0 4px 8px rgba(0,0,0,0.05)" };


    return (
        <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
            {/* LEFT SIDE – FORM */}
            {/* <div style={{ width: "40%" }}> */}
            <div style={containerStyle}> <h2>Resume Builder</h2>
                {renderInput("name", "Full Name")}
                {renderInput("title", "Title")}
                {renderInput("location", "Location")}
                {renderInput("phone", "Phone")}
                {renderInput("email", "Email")}
                {renderInput("linkedin", "LinkedIn")}
                {renderInput("summary", "Professional Summary", true)}
                {renderInput("skills", "Technical Skills", true)}
                {/* {renderInput("experience", "Professional Experience", true)} */}
                <h3 style={{ marginTop: "20px" }}>Professional Experience</h3>
                {experienceList.map((exp, index) => (
                    <div key={index} style={cardStyle}> <label>Designation</label>
                        <input value={exp.designation} onChange={(e) => handleExperienceChange(index, "designation", e.target.value)}
                            style={{ width: "100%", padding: "8px" }} />
                        <label>Organization Name</label>
                        <input value={exp.organization}
                            onChange={(e) => handleExperienceChange(index, "organization", e.target.value)}
                            style={{ width: "100%", padding: "8px" }} />
                        <label>Start Date</label>
                        <input type="month" value={exp.startDate}
                            onChange={(e) => handleExperienceChange(index, "startDate", e.target.value)}
                            style={{ width: "100%", padding: "8px" }} />
                        {!exp.isCurrent && (<> <label>End Date</label>
                            <input type="month" value={exp.endDate}
                                onChange={(e) => handleExperienceChange(index, "endDate", e.target.value)}
                                style={{ width: "100%", padding: "8px" }} /> </>)}
                        <label style={{ marginTop: "10px", display: "block" }}>
                            <input type="checkbox" checked={exp.isCurrent}
                                onChange={(e) => handleExperienceChange(index, "isCurrent", e.target.checked)} />
                            {" "} Currently Working Here </label>
                        <label style={{ marginTop: "10px" }}>Responsibilities</label>
                        <textarea value={exp.details} onChange={(e) => handleExperienceChange(index, "details", e.target.value)} rows={4} placeholder="Describe your contributions, achievements, technologies used..." style={{ width: "100%", padding: "10px", marginTop: "5px", fontSize: "14px", }} ></textarea> </div>))} <button style={buttonStyle} onClick={addExperience}>+ Add More Experience</button> <h3 style={{ marginTop: "20px" }}>Key Projects</h3> {projectList.map((proj, index) => (<div key={index} style={cardStyle}> <label>Project Title</label> <input value={proj.title} onChange={(e) => handleProjectChange(index, "title", e.target.value)} style={{ width: "100%", padding: "8px" }} /> <label style={{ marginTop: "10px" }}>Project Details</label> <textarea value={proj.details} onChange={(e) => handleProjectChange(index, "details", e.target.value)} rows={4} placeholder="Describe your project, technologies, and achievements..." style={{ width: "100%", padding: "10px", marginTop: "5px", fontSize: "14px" }} ></textarea> </div>))} <button style={buttonStyle} onClick={addProject}>+ Add More Project</button> {renderInput("education", "Education", true)} {renderInput("certification", "Certifications & Achievements", true)} <button style={{ ...buttonStyle, background: "#004E92", marginTop: "20px" }} onClick={downloadPDF}>Download PDF</button> <div style={{ marginTop: "15px", fontSize: "14px", color: "#555" }}> Created by <strong>Sudarshan Ghayal</strong> <br /> Contact: <a href="tel:+919858165050" style={{ color: "#007bff", textDecoration: "none" }}>+91 9858165050</a> </div> </div>
            {/* RIGHT SIDE – LIVE RESUME PREVIEW */}
            <div ref={resumeRef} style={{ width: "60%", padding: "30px", background: "white", boxShadow: "0 0 10px rgba(0,0,0,0.1)", fontFamily: "Arial", textAlign: "left", }} > <div style={{
                padding: "25px 30px", background: "linear-gradient(135deg, #00A6FF, #004E92)",
                // sky blue → dark blue 
                color: "white", borderRadius: "6px", marginBottom: "20px",
            }} > <h1 style={{ marginBottom: "5px", fontSize: "32px", fontWeight: 700 }}> {data.name} </h1> <h3 style={{ marginTop: "0", fontSize: "18px", fontWeight: 500 }}> {data.title} </h3> <p style={{ marginTop: "10px", fontSize: "14px", lineHeight: "1.6" }}> 📍 {data.location} &nbsp; | &nbsp; 📞 {data.phone} &nbsp; | &nbsp; ✉️ {data.email} <br /> 🔗 {data.linkedin} </p> </div> <hr style={{ margin: "20px 0" }} /> {/* Section Template */}
                <Section title="Professional Summary" text={data.summary} /> <hr style={{ margin: "20px 0" }} />
                <Section title="Technical Skills" text={data.skills} /> <hr style={{ margin: "20px 0" }} />
                <div style={{ marginBottom: "22px" }}>
                    <h3 style={{ marginBottom: "10px", color: "#0096FF", fontSize: "20px", fontWeight: 700, letterSpacing: "0.5px", }} > Professional Experience </h3>
                    {experienceList.map((exp, i) => (<div key={i} style={{ marginBottom: "12px" }}> <strong style={{ display: "block", fontSize: "16px" }}> {exp.designation} - {exp.organization} ({exp.startDate} → {exp.isCurrent ? "Present" : exp.endDate}) </strong> <ul style={{ margin: "5px 0 0 20px" }}> {exp.details.split("\n").map((line, idx) => (<li key={idx} style={{ fontSize: "14px", lineHeight: 1.6 }}> {line} </li>))} </ul> </div>))} </div> <hr style={{ margin: "20px 0" }} /> <div style={{ marginBottom: "22px" }}> <h3 style={{ marginBottom: "10px", color: "#0096FF", fontSize: "20px", fontWeight: 700, letterSpacing: "0.5px", }} > Key Projects </h3> {projectList.map((proj, index) => (<div key={index} style={{ marginBottom: "12px" }}> <strong style={{ display: "block", fontSize: "16px" }}>{proj.title}</strong> <ul style={{ margin: "5px 0 0 20px" }}> {proj.details.split("\n").map((line, idx) => (<li key={idx} style={{ fontSize: "14px", lineHeight: 1.6 }}> {line} </li>))} </ul> </div>))} </div> <hr style={{ margin: "20px 0" }} />
                <Section title="Education" text={data.education} /> <hr style={{ margin: "20px 0" }} />
                <Section title="Certifications & Achievements" text={data.certification} />
            </div>
        </div>
    );
};

// Section Component
const Section: React.FC<{ title: string; text: string }> = ({
    title,
    text,
}) => {
    if (!text.trim()) return null;

    return (
        <div style={{ marginBottom: "22px" }}>
            <h3
                style={{
                    marginBottom: "10px",
                    color: "#0096FF",
                    fontSize: "20px",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                }}
            >
                {title}
            </h3>

            <p
                style={{ whiteSpace: "pre-line", lineHeight: "1.6", fontSize: "14px" }}
            >
                {text}
            </p>
        </div>
    );
};

export default ResumeCreatorForm;
