import React, { useState, useRef } from "react";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";

const ResumeBuilder: React.FC = () => {
  const [data, setData] = useState<any>({
    /* ...initial data... */
  });
  const [experienceList, setExperienceList] = useState<any[]>([
    /* ... */
  ]);
  const [projectList, setProjectList] = useState<any[]>([
    /* ... */
  ]);
  const resumeRef = useRef<HTMLDivElement>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleExperienceChange = (
    index: number,
    field: string,
    value: string | boolean
  ) => {
    const updated = [...experienceList];
    (updated[index] as any)[field] = value;
    if (field === "isCurrent" && value) updated[index].endDate = "";
    setExperienceList(updated);
    setData({
      ...data,
      experience: updated
        .map(
          (exp) =>
            `${exp.designation} - ${exp.organization}\n${exp.startDate} → ${
              exp.isCurrent ? "Present" : exp.endDate
            }`
        )
        .join("\n\n"),
    });
  };
  const addExperience = () =>
    setExperienceList([
      ...experienceList,
      {
        designation: "",
        organization: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        details: "",
      },
    ]);
  const handleProjectChange = (
    index: number,
    field: "title" | "details",
    value: string
  ) => {
    const updated = [...projectList];
    updated[index][field] = value;
    setProjectList(updated);
    setData({
      ...data,
      projects: updated.map((p) => `${p.title}\n${p.details}`).join("\n\n"),
    });
  };
  const addProject = () =>
    setProjectList([...projectList, { title: "", details: "" }]);
  const downloadPDF = async () => {
    /* same as before */
  };
  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {" "}
      <ResumeForm
        data={data}
        handleChange={handleChange}
        experienceList={experienceList}
        handleExperienceChange={handleExperienceChange}
        addExperience={addExperience}
        projectList={projectList}
        handleProjectChange={handleProjectChange}
        addProject={addProject}
        downloadPDF={downloadPDF}
      />{" "}
      <ResumePreview
        data={data}
        experienceList={experienceList}
        projectList={projectList}
        resumeRef={resumeRef}
      />{" "}
    </div>
  );
};
export default ResumeBuilder;
