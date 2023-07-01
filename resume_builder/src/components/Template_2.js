import React, { useEffect, useState, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import styles from "./css/Template_2.module.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Templates_2 = React.forwardRef((props, ref) => {
  const [pdfs, setPdf] = useState([]);
  const containerRef = useRef();
  // const information = props.information;
  // const sections = props.sections;

  // const info = {
  //   basicInfo: information[sections.basicInfo],
  //   education: information[sections.education],
  //   workExp: information[sections.workExp],
  //   skills: information[sections.skills],
  //   project: information[sections.project],
  //   achievement: information[sections.achievement],
  //   summary: information[sections.summary],
  //   Other: information[sections.Other],
  // };

  useEffect(() => {
    fetch("http://localhost:8080/templates/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((pdfs) => setPdf(pdfs[1]?.data));
  }, []);

  // async function extractTextWithPositionFromPDF() {
  //   const pdfObject = pdfs;

  //   try {
  //     const uint8Array = new Uint8Array(pdfObject.data);
  //     const pdfData = uint8Array.buffer;

  //     const loadingTask = pdfjs.getDocument(pdfData);

  //     const document = await loadingTask.promise;
  //     const numPages = document.numPages;

  //     const extractedTextWithPosition = [];

  //     for (let i = 1; i <= numPages; i++) {
  //       const page = await document.getPage(i);
  //       const content = await page.getTextContent();
  //       const textItems = content.items;

  //       textItems.forEach(item => {
  //         const { str, transform } = item;

  //         const textWithPosition = {
  //           text: str,
  //           x: transform[4],
  //           y: transform[5],
  //         };

  //         extractedTextWithPosition.push(textWithPosition);
  //       });
  //     }

  //     return extractedTextWithPosition;
  //   } catch (error) {
  //     console.error('Error extracting text from PDF:', error);
  //     return [];
  //   }
  // }

  // async function addInformationToPDF(extractedTextWithPosition) {
  //   const pdfObject = pdfs;
  //   try {
  //     const uint8Array = new Uint8Array(pdfObject.data);
  //     const pdfData = uint8Array.buffer;

  //     const loadingTask = pdfjs.getDocument(pdfData);

  //     const pdfDoc = await loadingTask.promise;
  //     const pages = await pdfDoc.getPage();

  //     pages.forEach((page) => {
  //       const fontSize = 12;
  //       extractedTextWithPosition.forEach((textWithPosition) => { 
  //         const { text, x, y } = textWithPosition;
  //         console.log(info.summary)
  //         // Add information at corresponding positions
  //         if (text === 'summary') {
  //           page.drawText(info.summary, { x, y, size: fontSize, color: rgb(0, 0, 0) });
  //         } else if (text === 'basicInfo') {
  //           page.drawText(info.basicInfo, { x, y, size: fontSize, color: rgb(0, 0, 0) });
  //         } else if (text === 'education') {
  //           page.drawText(info.education, { x, y, size: fontSize, color: rgb(0, 0, 0) });
  //         } else if (text === 'workExp') {
  //           page.drawText(info.workExp, { x, y, size: fontSize, color: rgb(0, 0, 0) });
  //         } else if (text === 'skills') {
  //           page.drawText(info.skills, { x, y, size: fontSize, color: rgb(0, 0, 0) });
  //         } else if (text === 'project') {
  //           page.drawText(info.project, { x, y, size: fontSize, color: rgb(0, 0, 0) });
  //         } else if (text === 'achievement') {
  //           page.drawText(info.achievement, { x, y, size: fontSize, color: rgb(0, 0, 0) });
  //         } else if (text === 'Other') {
  //           page.drawText(info.Other, { x, y, size: fontSize, color: rgb(0, 0, 0) });
  //         }
  //       });
  //     });

  //     const modifiedPdfBytes = await pdfDoc.save();

  //     // Create a new Blob object with the modified PDF data
  //     const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });

  //     // Create a URL from the Blob
  //     const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob);

  //     // Update the state with the modified PDF data
  //     setPdf({ data: modifiedPdfUrl });
  //   } catch (error) {
  //     console.error('Error adding information to PDF:', error);
  //   }
  // }

  // useEffect(() => {
  //   if (pdfs.data) {
  //     addInformationToPDF(pdfs);
  //   }
  //   // eslint-disable-next-line
  // }, [pdfs]);

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
