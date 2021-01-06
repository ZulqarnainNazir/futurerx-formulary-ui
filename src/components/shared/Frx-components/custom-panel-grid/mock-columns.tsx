import React from "react";
import { Column } from "../../../../models/grid.model";
import FrxImageCell from "./FrxImageCell/FrxImageCell";

export const cutomPanelGridMockColumns: () => Column<any>[] = () => {
  return [
    {
      position: 1,
      sorter: {},
      textCase: "upper",
      pixelWidth: 100,
      key: "type",
      displayTitle: "TYPE",

      dataType: "string",

      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 3,
      sorter: {},
      textCase: "upper",
      pixelWidth: 150,
      key: "no_of_groups",
      displayTitle: "NUMBER OF GROUPS",

      dataType: "string",

      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 4,
      sorter: {},
      textCase: "upper",
      pixelWidth: 137,
      key: "added_groups",
      displayTitle: "ADDED GROUPS",

      dataType: "string",

      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 5,
      sorter: {},
      textCase: "upper",
      pixelWidth: 163,
      key: "removed_groups",
      displayTitle: "REMOVED GROUPS",

      dataType: "string",

      hidden: false,
      sortDirections: ["ascend", "descend"]
    },

    {
      position: 6,
      sorter: {},
      textCase: "upper",
      pixelWidth: 150,
      key: "no_of_drugs",
      displayTitle: "NUMBER OF DRUGS",

      dataType: "string",

      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 7,
      sorter: {},
      textCase: "upper",
      pixelWidth: 109,
      key: "added_drugs",
      displayTitle: "ADDED DRUGS",

      dataType: "string",

      hidden: false,
      sortDirections: ["ascend", "descend"]
    },
    {
      position: 8,
      sorter: {},
      textCase: "upper",
      pixelWidth: 109,
      key: "removed_drugs",
      displayTitle: "REMOVED DRUGS",
      cellWrapper: (props: any) => (
        <FrxImageCell
          data={props.data ? props.data : ""}
          // img={require("./../../mocks/sample.svg")}
          img=""
        />
      ),
      dataType: "string",

      hidden: false,
      sortDirections: ["ascend", "descend"]
    }
  ];
};
