
import { Column } from "../../../../../../models/grid.model";
import { textFilters } from "../../../../../../utils/grid/filters";

export const tierDefinationColumns: () => Column<any>[] = () => {
    return [
      {
        position: 1,
        sorter: {},
        textCase: "upper",
        pixelWidth: 100,
        key: "tierName",
        displayTitle: "TIER NAME",
        isFilterable: false,
        dataType: "string",
        hidden: false,
        sortDirections: [],
      },
      {
        position: 2,
        sorter: {},
        textCase: "upper",
        pixelWidth: 122,
        key: "tierDescription",
        displayTitle: "TIER DESCRIPTION",
        isFilterable: false,
        dataType: "string",
        hidden: false,
        sortDirections: [],
      },
      {
        position: 3,
        sorter: {},
        textCase: "upper",
        pixelWidth: 137,
        key: "currentAccount",
        displayTitle: "CURRENT ACCOUNT",
        isFilterable: false,
        dataType: "string",
        hidden: false,
        sortDirections: [],
      },
      {
        position: 4,
        sorter: {},
        textCase: "upper",
        pixelWidth: 163,
        key: "added",
        displayTitle: "ADDED",
        isFilterable: false,
        dataType: "string",
        hidden: false,
        sortDirections: [],
      },
  
      {
        position: 5,
        sorter: {},
        textCase: "upper",
        pixelWidth: 100,
        key: "removed",
        displayTitle: "REMOVED",
        isFilterable: false,
        dataType: "string",
        hidden: false,
        sortDirections: [],
      },
      {
        position: 6,
        sorter: {},
        textCase: "upper",
        pixelWidth: 109,
        key: "validation",
        displayTitle: "VALIDATION",
        isFilterable: false,
        dataType: "string",
        hidden: false,
        sortDirections: [],
      }
    ];
  };