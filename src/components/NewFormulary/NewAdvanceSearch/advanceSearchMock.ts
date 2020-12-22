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
