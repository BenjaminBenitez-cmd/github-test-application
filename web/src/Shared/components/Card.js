import React from "react";
import MultiUseButton from "./MultiUseButton";

const Card = (props) => {
  return (
    <div className="repo_container">
      <div className="repo_header">
        <a href={props.html_url} className="repo_title">
          <h3>{props.name}</h3>
        </a>
        <div className="repo_bookmark">
          <MultiUseButton buttonType={props.buttonType} values={props} />
        </div>
      </div>
      <p>{props.description}</p>
      <div className="repo_details">
        <div className="stars">⭐ {props.stars}</div>
        <div className="forks">🍴 {props.forks}</div>
      </div>
    </div>
  );
};

export default Card;
