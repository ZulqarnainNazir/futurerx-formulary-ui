import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { Grid } from "@material-ui/core";

import "./FileType.scss";
interface Props {}
interface State {}

const fileTypes = [
  {
    id: 1,
    lable: "Formulary",
    types: [
      { id: 1, lable: "Prior Authorization File" },
      { id: 2, lable: "Step Therapy File" },
      { id: 3, lable: "Indication-Based Coverage File" },
    ],
  },
  {
    id: 2,
    lable: "Supplemental",
    types: [
      { id: 1, lable: "Free First Fill (FFF)" },
      { id: 2, lable: "Home Infusion" },
      { id: 3, lable: "Partial Gap Coverage" },
    ],
  },
  {
    id: 3,
    lable: "Other",
    types: [
      { id: 1, lable: "Value-Based Insurance Design (VBID)" },
      { id: 2, lable: "LIS Caost-Sharing Reduction File" },
    ],
  },
];

interface TypeObject {
  id: number;
  lable: string;
  isChecked: boolean;
}
interface FileObject {
  id: number;
  lable: string;
  isChecked: boolean;
  types: Array<TypeObject>;
}

class FileType extends Component<Props, State> {
  state = {
    fileTypes: [],
    checkedList: [],
  };

  componentDidMount = () => {
    const checkList = fileTypes.map((file) => {
      file["isChecked"] = false;
      file.types.map((type) => {
        type["isChecked"] = false;
        return type;
      });
      return file;
    });
    console.log("[checkList]:", checkList);
    this.setState({ fileTypes: checkList });
  };

  onParentCheck = (e, parentId) => {
    const updateCheckBoxStatus: Array<FileObject> = this.state.fileTypes.map(
      (file: FileObject) => {
        if (file.id == parentId) {
          file["isChecked"] = e.target.checked;
          file.types.map((types) => (types["isChecked"] = e.target.checked));
        }
        return file;
      }
    );
    console.log("[updateCheckBoxStatus]:", updateCheckBoxStatus);
    console.log("[currentCheckBoxStatus]:", e.target.checked);

    this.setState({ fileTypes: updateCheckBoxStatus });
  };

  onChildChekBoxClicked = (e, parentId, id) => {
    console.log("[childCheckBox]:", e.target.checked);
    console.log("[parentId]:", parentId);
    console.log("[chilId]:", id);
    const updateCheckBoxStatus: Array<FileObject> = this.state.fileTypes.map(
      (file: FileObject) => {
        if (file.id == parentId) {
          // file["isChecked"] = e.target.checked;
          let parentCheckBoxStatus;

          file.types.map((type) => {
            if (type.id === id) {
              type["isChecked"] = e.target.checked;
            }
            if (type.isChecked) {
              parentCheckBoxStatus = true;
            } else {
              parentCheckBoxStatus = false;
            }
            return type;
          });
          // file.isChecked = parentCheckBoxStatus;
          let newParentCheckBoxState = file.types.reduce((acc, type) => {
            acc = acc && type.isChecked;

            return acc;
            // if (type.isChecked) {
            //   acc = acc && type.isChecked;
            // } else {
            //   acc = acc && type.isChecked;
            // }
          }, parentCheckBoxStatus);
          console.log(
            "[newParentCheckBoxState(parentCheckbox)]:",
            newParentCheckBoxState
          );
          file.isChecked = newParentCheckBoxState;
        }

        return file;
      }
    );

    this.setState({ fileTypes: updateCheckBoxStatus });
  };

  render() {
    const { fileTypes } = this.state;
    return (
      <div className="__root-filetype-contianer">
        <Grid container className="__main-grid-container">
          {fileTypes.length == 0 ? null : (
            <>
              {fileTypes.map((file: any) => (
                //   <Grid container>
                <Grid item sm={4} className="__item-grid-sm-4-container">
                  <div key={file.id} className="__root_file_type_category">
                    <div className="__fileTypeHeader-wrapper">
                      <Checkbox
                        color="primary"
                        size="small"
                        checked={file.isChecked}
                        onClick={(e) => this.onParentCheck(e, file.id)}
                      />
                      <label htmlFor="" className="__file-lable">
                        {file.lable}
                      </label>
                    </div>

                    <div className="__file_types_wraper">
                      {file.types.map((type) => (
                        <div key={type.id} className="__filt_type_list">
                          <Checkbox
                            color="primary"
                            size="small"
                            checked={type.isChecked}
                            onClick={(e) =>
                              this.onChildChekBoxClicked(e, file.id, type.id)
                            }
                          />
                          <label htmlFor="" className="__type-lable">
                            {type.lable}
                          </label>
                        </div>
                      ))}
                    </div>
                    {/* </Grid> */}
                  </div>
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </div>
    );
  }
}

export default FileType;
