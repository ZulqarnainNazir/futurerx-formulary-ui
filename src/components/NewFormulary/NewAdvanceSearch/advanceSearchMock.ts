import React from "react";
import TreeNodeTitle from "./components/TreeComponents/TreeNodeTitle/TreeNodeTitle";

export const getCategoryList = () => {
  const categories = [
    {
      id: 1,
      category: "GPI/Generic Name/Label Name/ RXCUI",
    },
    {
      id: 2,
      category: "Reference NDC",
    },
    {
      id: 3,
      category: "Drug Category/Class",
    },
    {
      id: 4,
      category: "File Type",
    },
    {
      id: 5,
      category: "Tier",
    },
    {
      id: 6,
      category: "UM Filter",
    },
    /*{
      id: 7,
      category: "Alternative Drugs",
    },*/
  ];
  return categories;
};

export const getAdditionalCriteriaSectionList = () => {
  return [
    {
      id: 1,
      criteria: "Age",
    },
    {
      id: 2,
      criteria: "Gender",
    },
    {
      id: 3,
      criteria: "ICD",
    },
    {
      id: 4,
      criteria: "Pharmacy Network",
    },
    {
      id: 5,
      criteria: "Prescriber Taxonomy",
    },
    {
      id: 6,
      criteria: "Place of Service",
    },
    {
      id: 7,
      criteria: "Patient Residence",
    },
    {
      id: 8,
      criteria: "Prerequisite Claims History & Lookback",
    },
  ];
};
