import React, { useEffect, useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from "./css/Template_2.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Templates_2 = React.forwardRef((props, ref) => {
  const [pdfs, setPdf] = useState([]);
  const containerRef = useRef();
//   const information = props.information;
//   const sections = props.sections;

//   const info = {
//     basicInfo: information[sections.basicInfo],
//     education: information[sections.education],
//     workExp: information[sections.workExp],
//     skills: information[sections.skills],
//     project: information[sections.project],
//     achievement: information[sections.achievement],
//     summary: information[sections.summary],
//     Other: information[sections.Other],
//   };

  useEffect(() => {
    fetch("http://localhost:8080/templates/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((pdfs) => setPdf(pdfs[2]?.data));
  }, []);


  return (
    <div ref={ref}>
      <div ref={containerRef} className={styles.container}>
        <Document file={{ data: pdfs.data }}>
          <Page pageNumber={1} width={700} height={900} renderMode="canvas" />
        </Document>
      </div>
    </div>
  );
});

export default Templates_2;
