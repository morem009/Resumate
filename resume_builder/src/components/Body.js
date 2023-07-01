import React, { useState } from "react";
import TempNavbar from "./TempNavbar";
import Editor from "./Editor";
import styles from "./css/Body.module.css";

function Body(props) {
  const colors = ["#239ce2", "#F92E63","#DFCF0C", "#800080", "#909F9F","#867CD8"];
  const sections = {
    basicInfo: "Basic Info",
    education: "Education",
    workExp: "Work Experience",
    skills: "Skills",
    project: "Projects",
    achievement: "Achievements",
    summary: "Summary",
    Other: "Other",
  };
  const [activeColor, setActiveColor] = useState(colors[0]);
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.skills]: {
      id: sections.skills,
      sectionTitle: sections.skills,
      points: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",
    },
    [sections.Other]: {
      id: sections.Other,
      sectionTitle: sections.Other,
      detail: "",
    },
  });
  // console.log(resumeInformation)
  return (
    <div className={styles.container}>
      <p className={styles.heading}>Kindly Enter you details below:</p>
      <div className={styles.main}>
        {/* console.log(props.useremail) */}
        <Editor
          useremail={props.useremail}
          sections={sections}
          information={resumeInformation}
          setInformation={setResumeInformation}
        />
          <div className={styles.toolbar}>
        <div className={styles.colors}>
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${styles.color} ${
                activeColor === item ? styles.active : ""
              }`}
              onClick={() => setActiveColor(item)}
            />
          ))}
        </div>
      </div>
        <TempNavbar
          sections={sections}
          information={resumeInformation}
          activeColor={activeColor}
        ></TempNavbar>
      </div>
    </div>
  );
}

export default Body;
