export const getDrugsList = () => [
  { drug: "Lipitor 20mg" },
  { drug: "Lipitor 40mg" },
  { drug: "Lipitor 60mg" },
  { drug: "Lipitor 80mg" },
  { drug: "Lipitor 120mg" },
  { drug: "Lipitor 20mg" },
  { drug: "Lipitor 40mg" },
  { drug: "Lipitor 60mg" },
  { drug: "Lipitor 80mg" },
  { drug: "Lipitor 120mg" },
  { drug: "Lipitor 20mg" },
  { drug: "Lipitor 40mg" },
  { drug: "Lipitor 60mg" },
  { drug: "Lipitor 80mg" },
  { drug: "Lipitor 120mg" },
  { drug: "Lipitor 20mg" },
  { drug: "Lipitor 40mg" },
  { drug: "Lipitor 60mg" },
  { drug: "Lipitor 80mg" },
  { drug: "Lipitor 120mg" },
];

export const getColumns = () => [
  {
    title: "FORMULARY NAME",
    dataIndex: "formularyName",
    key: "formularyName",
    className: "table-head-color",
  },
  {
    title: "FORMULARY ID",
    dataIndex: "formularyId",
    key: "formularyId",
    className: "table-head-color",
  },
  {
    title: "FORMULARY VERSION",
    dataIndex: "formularyVersion",
    key: "formularyVersion",
    className: "table-head-center",
  },
  {
    title: "CONTRACT YEAR",
    dataIndex: "contractYeat",
    key: "contractYeat",
    className: "table-head-center",
  },
  {
    title: "FORMULARY TYPE",
    dataIndex: "formularyType",
    key: "formularyType",
    className: "table-head-center",
  },

  {
    title: "EFFECTIVE DATE",
    dataIndex: "effectiveDate",
    key: "formularyName",
    className: "table-head-center",
  },
];

export const getData = () => {
  return [
    {
      key: "1",
      formularyName: "2021Care1234",
      formularyId: "123456789123",
      formularyVersion: 2,
      contractYeat: "2021",
      formularyType: "Medicare",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
    {
      key: "2",
      formularyName: "Medicare12",
      formularyId: "123456789124",
      formularyVersion: 3,
      contractYeat: "2021",
      formularyType: "Medicare",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
    {
      key: "3",
      formularyName: "2021Care4321",
      formularyId: "980765854321",
      formularyVersion: 4,
      contractYeat: "2021",
      formularyType: "Medicare",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
    {
      key: "4",
      formularyName: "Care987",
      formularyId: "192039483745",
      formularyVersion: 5,
      contractYeat: "2021",
      formularyType: "Medicare",
      effectiveDate: "01/01/2021",
      tier: {
        tierId: "1",
        tierNumber: "Tier 1",
        tierDescription: "Generic Brand",
      },
    },
  ];
};
