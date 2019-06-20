import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDesktop } from "@fortawesome/free-solid-svg-icons/index";

export const FileUpload = (props) => {
  return (
    <label className="fileUpload">
      <FontAwesomeIcon className="fileUpload__icon" icon={faDesktop} />
      <input className="fileUpload__hidden" type="file" multiple={false} onChange={(e) => props.onFileLoad(e.target.files[0])}/>
      <p className="fileUpload__text">{props.fileName ? `You chose: ${props.fileName}` : "Please choose a file to upload"}</p>
    </label>
  )
};