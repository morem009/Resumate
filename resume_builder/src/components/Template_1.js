import React, { forwardRef, useEffect, useRef, useState } from "react";

import Image from "../resources/empty_profile_img.png";
import {
  AtSign,
  Calendar,
  GitHub,
  Linkedin,
  MapPin,
  Paperclip,
  Phone,
  Award,
  Briefcase,
  BookOpen,
  Code,
  Grid,
  Info,
  Layers,
} from "react-feather";

import styles from "./css/Template_1.module.css";

const Template_1 = forwardRef((props, ref) => {
  const information = props.information;
  const sections = props.sections;
  const containerRef = useRef();

  const [columns, setColumns] = useState([[], []]);
  const [source, setSource] = useState("");
  const [target, seTarget] = useState("");

  const info = {
    basicInfo: information[sections.basicInfo],
    education: information[sections.education],
    workExp: information[sections.workExp],
    skills: information[sections.skills],
    project: information[sections.project],
    achievement: information[sections.achievement],
    summary: information[sections.summary],
    Other: information[sections.Other],
  };


  // if(info.basicInfo.detail.image){
  //   console.log(info.basicInfo.detail.image)
  // }
  


  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);

    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const sectionDiv = {
    [sections.education]: (
      <div
        key={"education"}
        draggable
        onDragOver={() => seTarget(info.education?.id)}
        onDragEnd={() => setSource(info.education?.id)}
        className={`${styles.section} ${
          info.education?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>
          <BookOpen className="svg"/>
          {info.education?.sectionTitle}
        </div>
        <div className={styles.content}>
          {info.education?.details?.map((item) => (
            <div className={styles.item}>
              {item.title ? (
               <div className={styles.title}>{item.title}</div>
              ) : (
                <span />
              )}
              {item.college ? (
               <div className={styles.subTitle}>{item.college}</div>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className={styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)} -
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.workExp]: (
      <div
        key={"workexp"}
        draggable
        onDragOver={() => seTarget(info.workExp?.id)}
        onDragEnd={() => setSource(info.workExp?.id)}
        className={`${styles.section} ${
          info.workExp?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>
          <Briefcase className="svg"/>
          {info.workExp.sectionTitle}</div>
        <div className={styles.content}>
          {info.workExp?.details?.map((item) => (
            <div className={styles.item} key={item.title}>
              {item.title ? (
                <span className={styles.title}>{item.title}</span>
              ) : (
                <span />
              )}
              {item.companyName ? (
                <span className={styles.subTitle}>{item.companyName}</span>
              ) : (
                <span />
              )}
              {item.certificationLink ? (
                <a className={styles.link} href={item.certificationLink}>
                  <Paperclip />
                  {item.certificationLink}
                </a>
              ) : (
                <span />
              )}
              {item.startDate && item.endDate ? (
                <div className={styles.date}>
                  <Calendar /> {getFormattedDate(item.startDate)}-
                  {getFormattedDate(item.endDate)}
                </div>
              ) : (
                <div />
              )}
              {item.location ? (
                <span className={styles.date}>
                  <MapPin /> {item.location}
                </span>
              ) : (
                <span />
              )}
               <div className={styles.work_desc}>{item.work_desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.skills]: (
      <div
        key={"skills"}
        draggable
        onDragOver={() => seTarget(info.skills?.id)}
        onDragEnd={() => setSource(info.skills?.id)}
        className={`${styles.section} ${
          info.skills?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>
          <Code className="svg"/>
          {info.skills?.sectionTitle}</div>
        <div className={styles.content}>
          {info.skills?.points?.length > 0 ? (
            <ul className={styles.numbered}>
              {info.skills?.points?.map((elem, index) => (
                <li className={styles.point} key={elem + index}>
                  {elem}
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
        </div>
      </div>
    ),
    [sections.project]: (
      <div
        key={"project"}
        draggable
        onDragOver={() => seTarget(info.project?.id)}
        onDragEnd={() => setSource(info.project?.id)}
        className={`${styles.section} ${
          info.project?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>
          <Layers  />
          {info.project.sectionTitle}</div>
        <div className={styles.content}>
          {info.project?.details?.map((item) => (
            <div className={styles.item}>
              {item.title ? (
               <div className={styles.title}>{item.title}</div>
              ) : (
                <span />
              )}
              {item.link ? (
                <a className={styles.link} href={item.link}>
                  <Paperclip />
                  {item.link}
                </a>
              ) : (
                <span />
              )}
              {item.github ? (
                <a className={styles.link} href={item.github}>
                  <GitHub />
                  {item.github}
                </a>
              ) : (
                <span />
              )}
              {/* {item.overview ? ( */}
               <div className={styles.overview}>{item.overview}</div>
              {/* ) : (
                <span />
              )} */}
             <div className={styles.proj_desc}>{item.proj_desc}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.achievement]: (
      <div
        key={"achievement"}
        draggable
        onDragOver={() => seTarget(info.achievement?.id)}
        onDragEnd={() => setSource(info.achievement?.id)}
        className={`${styles.section} ${
          info.achievement?.sectionTitle ? "" : styles.hidden
        }`}
      >
       <div className={styles.sectionTitle}>
       <Award className="svg"/> 
          {info.achievement?.sectionTitle}
        </div>
        <div className={styles.content}>
          {info.achievement?.points?.length > 0 ? (
            <ul className={styles.numbered}>
              {info.achievement?.points?.map((elem, index) => (
                <li className={styles.point} key={elem + index}>
                  {elem}
                </li>
              ))}
            </ul>
          ) : (
            <span />
          )}
        </div>
      </div>
    ),
    [sections.summary]: (
      <div
        key={"summary"}
        draggable
        onDragOver={() => seTarget(info.summary?.id)}
        onDragEnd={() => setSource(info.summary?.id)}
        className={`${styles.section} ${
          info.summary?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>
          <Info className="svg" />
          {info.summary?.sectionTitle}</div>
        <div className={styles.content}>
         <div className={styles.overview}>{info.summary?.detail}</div>
        </div>
      </div>
    ),
    [sections.Other]: (
      <div
        key={"Other"}
        draggable
        onDragOver={() => seTarget(info.Other?.id)}
        onDragEnd={() => setSource(info.Other?.id)}
        className={`${styles.section} ${
          info.Other?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>
          <Grid className="svg" />
          {info.Other?.sectionTitle}</div>
        <div className={styles.content}>
         <div className={styles.overview}>{info.Other?.detail}</div>
        </div>
      </div>
    ),
  };

  const swapSourceTarget = (source, target) => {
    if (!source || !target) return;
    const tempColumns = [[...columns[0]], [...columns[1]]];

    //To get row and column index of source & Target
    let sourceRowIndex = tempColumns[0].findIndex((item) => item === source);
    // console.log("Row: "+sourceRowIndex)
    let sourceColumnIndex = 0;
    if (sourceRowIndex < 0) {
      sourceColumnIndex = 1;
      // console.log("column: "+sourceColumnIndex)
      sourceRowIndex = tempColumns[1].findIndex((item) => item === source);
    }

    let targetRowIndex = tempColumns[0].findIndex((item) => item === target);
    let targetColumnIndex = 0;
    if (targetRowIndex < 0) {
      targetColumnIndex = 1;
      targetRowIndex = tempColumns[1].findIndex((item) => item === target);
    }

    //Now swapping
    const tempSource = tempColumns[sourceColumnIndex][sourceRowIndex];
    tempColumns[sourceColumnIndex][sourceRowIndex] =
      tempColumns[targetColumnIndex][targetRowIndex];

    tempColumns[targetColumnIndex][targetRowIndex] = tempSource;

    setColumns(tempColumns);
  };

  useEffect(() => {
    setColumns([
      [sections.education,sections.skills, sections.achievement,],
      [sections.workExp,sections.project, sections.summary,sections.Other ],
    ]);
    // eslint-disable-next-line
  }, []);
  
  useEffect(() => {
    swapSourceTarget(source, target);
    // eslint-disable-next-line
  }, [source]);

  useEffect(() => {
    const container = containerRef.current;
    if (!props.activeColor || !container) return;

    container.style.setProperty("--color", props.activeColor);
  }, [props.activeColor]);

  return (
    <div ref={ref}>
      <div ref={containerRef} className={styles.container}>
        <div className={styles.header}>
       <div className={styles.heading}>{info.basicInfo?.detail?.name}
       <div className={styles.img}>
          {info.basicInfo.detail.image ? (
            <img className={styles.image} alt="ProfilePicture"  src={info.basicInfo.detail.image} value={undefined}/>
          ):(
            <img  src={Image} alt="ProfilePicture" value={undefined}/>
          )}
       </div>
       <div className={styles.subHeading}>{info.basicInfo?.detail?.title}</div>
       </div>
          <div className={styles.links}>
            {info.basicInfo?.detail?.email ? (
                 // eslint-disable-next-line
              <a className={styles.link} type="email">
                <AtSign /> {info.basicInfo?.detail?.email}
              </a>
            ) : (
              <span />
            )}
            {info.basicInfo?.detail?.phone ? (
                 // eslint-disable-next-line
              <a className={styles.link}>
                <Phone /> {info.basicInfo?.detail?.phone}
              </a>
            ) : (
              <span />
            )}
            {info.basicInfo?.detail?.linkedin ? (
                 // eslint-disable-next-line
              <a className={styles.link}>
                <Linkedin /> {info.basicInfo?.detail?.linkedin}
              </a>
            ) : (
              <span />
            )}
            {info.basicInfo?.detail?.github ? (
                 // eslint-disable-next-line
              <a className={styles.link}>
                <GitHub /> {info.basicInfo?.detail?.github}
              </a>
            ) : (
              <span />
            )}
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.col1}>
            {columns[0].map((item) => sectionDiv[item])}
          </div>
          <div className={styles.col2}>
            {columns[1].map((item) => sectionDiv[item])}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Template_1;