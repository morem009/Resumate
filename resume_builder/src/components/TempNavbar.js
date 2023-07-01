import React, { useRef, useState } from "react";
import styles from "./css/TempNavbar.module.css";
import ReactToPrint from "react-to-print";
import { ArrowDown } from "react-feather";
import Template_1  from "./Template_1";
import Template_2 from "./Template_2";
import Template_3 from "./Template_3";

const TempNavbar = (props) => {
  const Template = useRef();
    const templates = {
        Template1 : "Template 1",
        Template2 : "Template 2",
        Template3 : "Template 3",
       };
    const [activeSectionKey, setActiveSectionKey] = useState(
        Object.keys(templates)[0]
      );


  return (
    <div>
    <div className={styles.header}>
    {Object.keys(templates)?.map((key) => (
      <div 
      className={`${styles.section} 
        ${
          activeSectionKey === key ? styles.active : ""
        }`
    }
        key={key}
        onClick={() => setActiveSectionKey(key)}
      >
        {templates[key]}
      </div>
    ))}
    <div>
      </div>
  </div>
  <div>
    
    {/* Download Button */}
  <ReactToPrint
          trigger={() => {
            return (
              <button className={styles.button}>
                Download <ArrowDown />
              </button>
            );
          }}
          content={() => Template.current}
        />

      </div>
  {
      activeSectionKey === "Template1" ? 
       // eslint-disable-next-line
      ( <Template_1
        ref={Template}
        sections={props.sections}
        information={props.information}
        activeColor={props.activeColor}
      />  ): 
      (
          <div />
      )
   }
    {
      activeSectionKey === "Template2" ? 
        // eslint-disable-next-line
      ( <Template_2
    
        ref={Template}
        sections={props.sections}
        information={props.information}
        activeColor={props.activeColor}
      />  ): 
      (
          <div />
      )
   }
   {
      activeSectionKey === "Template3" ? 
        // eslint-disable-next-line
      ( <Template_3
    
        ref={Template}
        sections={props.sections}
        information={props.information}
        activeColor={props.activeColor}
      />  ): 
      (
          <div />
      )
   }
     
  </div>
  )
}

export default TempNavbar
