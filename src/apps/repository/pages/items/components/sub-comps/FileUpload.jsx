import React from "react";
import Form from "react-bootstrap/Form";

import * as FilePond from "../../../../../root-app/filepod/filepond.min";
import "../../../../../root-app/filepod/filepond.min.css";

import { BASE_API_URL } from "../../../../../root-app/utils/constant_values";
import { loginInfo } from "../../../../../root-app/utils/auth";

export default class FileUpload extends React.Component {
  componentDidMount() {
    // Create a FilePond instance
    const fileInput = document.querySelector('input[id="files"]');
    const pond = FilePond.create(fileInput, {
      allowMultiple: true,
    });

    // On file upload proccess init for each files set the default upload error message
    pond.onprocessfilestart = (file) => {
      pond.labelFileProcessingError = "Error during upload";
    };

    const login = loginInfo();
    const AUTH_TOKEN = login.AUTH_TOKEN;

    pond.setOptions({
      // chunkUploads: true,
      // chunkSize: 500000,
      server: {
        url: `${BASE_API_URL}/repository/file_upload`,
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN}`,
        },
        // timeout: 7000,
        process: {
          url: "/process/",
          withCredentials: false,
          onload: (response, file) => {
            this.props.addTemporaryUploadedFiles(response);
            return response;
          },
          onerror: (error) => {
            // If the file already exists set the error message
            if (error === "conflict") {
              pond.labelFileProcessingError = "File already exists";
            }
          },
        },
        revert: {
          url: "/revert/",
          onload: (response) => {
            this.props.removeTemporaryUploadedFiles(response);
          },
        },
        patch: "/patch/",
        fetch: "/fetch/?target=",
      },
    });

    this.props.clearAllFiles(() => {
      pond.removeFiles();
    });
  }
  render() {
    return (
      <>
        <Form.Control type="file" id="files" />
      </>
    );
  }
}
