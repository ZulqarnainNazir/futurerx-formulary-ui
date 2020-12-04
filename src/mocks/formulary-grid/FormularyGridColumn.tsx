import React from "react";
import { Column } from "../../models/grid.model";
import {
  dateFilters,
  textFilters,
  numberFilters,
} from "../../utils/grid/filters";

// fileType: "FRF",
// datasource: "FRF",
// labelName: "Abacavir Sulfate SOLN 20 MG/ML",
// ddid: "58633",
// rxcui: "242680",
// gpi: "12341234123",
// trademark: "G",
export const getTierAssignmentGridColumns: () => Column<any>[] = () => {
  return [
    {
      id: 2,
      position: 2,
      sorter: {},
      textCase: "upper",
      // pixelWidth: 30,
      key: "fileType",
      displayTitle: "FILE TYPE",
      // dataIndex: "versionForUpdate",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },

    {
      id: 3,
      position: 3,
      sorter: {},
      textCase: "upper",
      // pixelWidth: 30,
      key: "datasource",
      displayTitle: "DATA SOURCE",
      // dataIndex: "versionForUpdate",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },

    {
      id: 4,
      position: 4,
      sorter: {},
      textCase: "upper",
      pixelWidth: 35,
      key: "labelName",
      displayTitle: "LABEL NAME",
      // dataIndex: "versionForUpdate",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },

    {
      id: 5,
      position: 5,
      sorter: {},
      textCase: "upper",
      // pixelWidth: 30,
      key: "ddid",
      displayTitle: "DDID",
      // dataIndex: "versionForUpdate",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },

    {
      id: 6,
      position: 6,
      sorter: {},
      textCase: "upper",
      // pixelWidth: 30,
      key: "rxcui",
      displayTitle: "RXCUI",
      // dataIndex: "versionForUpdate",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 7,
      position: 7,
      sorter: {},
      textCase: "upper",
      // pixelWidth: 30,
      key: "gpi",
      displayTitle: "GPI",
      // dataIndex: "versionForUpdate",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },

    {
      id: 8,
      position: 8,
      sorter: {},
      textCase: "upper",
      // pixelWidth: 30,
      key: "trademark",
      displayTitle: "TRADEMARK",
      // dataIndex: "versionForUpdate",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
  ];
};

export const getDrugsPAGridColumns: () => Column<any>[] = () => {
  return [
    {
      id: 2,
      position: 2,
      sorter: {},
      textCase: "upper",
      // pixelWidth: 30,
      key: "labelName",
      displayTitle: "LABEL NAME",
      // dataIndex: "versionForUpdate",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 3,
      position: 3,
      sorter: {},
      textCase: "upper",
      // pixelWidth: 30,
      key: "rxcui",
      displayTitle: "RXCUI",
      // dataIndex: "versionForUpdate",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 4,
      position: 4,
      sorter: {},
      textCase: "upper",
      // pixelWidth: 30,
      key: "ddid",
      displayTitle: "DDID",
      // dataIndex: "versionForUpdate",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 5,
      position: 5,
      sorter: {},
      textCase: "upper",
      // pixelWidth: 30,
      key: "datasource",
      displayTitle: "DATA SOURCE",
      // dataIndex: "versionForUpdate",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
    {
      id: 6,
      position: 6,
      sorter: {},
      textCase: "upper",
      // pixelWidth: 30,
      key: "trademark",
      displayTitle: "TRADEMARK",
      // dataIndex: "versionForUpdate",
      isFilterable: true,
      dataType: "string",
      filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
    },
  ];
};

export const getFormularyGridColumns: () => Column<any>[] = () => {
  return [
    // {
    //   id: 1,
    //   position: 1,
    //   key: "checkbox",
    //   displayTitle: "",
    //   hidden: false,
    //   render: (checkbox) => (
    //     <>
    //       {checkbox.map((r) => {
    //         return <input type="checkbox" name="record" id="" value={r} />;
    //       })}
    //     </>
    //   ),
    // },
    {
      id: 2,
      position: 2,
      sorter: {},
      textCase: "upper",
      // pixelWidth: 30,
      key: "versionForUpdate",
      displayTitle: "VERSION for UPDATES",
      // dataIndex: "versionForUpdate",
      isFilterable: false,
      dataType: "string",
      //   filters: textFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],

      // render: (versionForUpdate) => (
      //   <>
      //     {versionForUpdate.map((r) => {
      //       return (
      //         <span
      //           style={{
      //             marginLeft: "10px",
      //           }}
      //         >
      //           {r} Hello colum
      //         </span>
      //       );
      //     })}
      //   </>
      // ),
    },
    {
      id: 3,
      position: 3,
      sorter: {},
      textCase: "upper",
      // pixelWidth: 20,
      key: "lastApprovedVersion",
      isFilterable: false,
      showToolTip: false,
      displayTitle: "LAST APPROVED VERSION",
      dataType: "string",
      //   filters: dateFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
      // fixed: "left",
    },
    {
      id: 4,
      position: 4,
      sorter: {},
      textCase: "upper",
      isFilterable: false,
      // pixelWidth: 15,
      key: "formularyId",
      displayTitle: "FORMULARY ID",
      dataType: "string",
      //   filters: dateFilters,
      hidden: false,
      sortDirections: ["ascend", "descend"],
      // fixed: "left",

      showToolTip: false,
    },
    {
      id: 5,
      position: 5,
      textCase: "upper",
      // pixelWidth: 15,
      sorter: {},
      isFilterable: false,
      showToolTip: false,
      key: "formularyName",
      displayTitle: "formulary name",
      //   filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
      // fixed: "left",
    },
    {
      id: 6,
      position: 6,
      textCase: "upper",
      // pixelWidth: 15,
      sorter: {},
      isFilterable: false,
      showToolTip: false,
      key: "contactYear",
      displayTitle: "CONTRACT YEAR",
      //   filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
      // fixed: "left",
    },
    {
      id: 7,
      position: 7,
      textCase: "upper",
      // pixelWidth: 15,
      sorter: {},
      isFilterable: false,
      showToolTip: false,
      key: "formularyType",
      displayTitle: "FORMULARY TYPE",
      //   filters: textFilters,
      dataType: "string",
      hidden: false,
      sortDirections: ["ascend", "descend"],
      // fixed: "left",
    },
  ];
};