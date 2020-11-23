export const memberInfo1 = [
  {
    label: "BIN#",
    labelValue: "789568",
  },
  {
    label: "PCN",
    labelValue: "123456",
  },
  {
    label: "Group",
    labelValue: "Group Name",
  },
  {
    label: "Member ID",
    labelValue: "8133381165",
  },
  {
    label: "Medicare Beneficiary ID",
    labelValue: "12345",
  },
  {
    label: "First Name",
    labelValue: "Machenzie",
  },
  {
    label: "Last Name",
    labelValue: "Johnson-Robertson III",
  },
];
export const memberInfo2 = [
  {
    label: "DOB",
    labelValue: "6/1/1984",
  },
  {
    label: "Person Code",
    labelValue: "01",
  },
  {
    label: "Relationship Code",
    labelValue: "01",
  },
  {
    label: "Gender",
    labelValue: "Female",
  },
  {
    label: "LIS Level",
    labelValue: "1001",
  },
  {
    label: "Date of Service",
    labelValue: "8/1/2020",
  },
  {
    label: "RX#",
    labelValue: "333333333",
  },
];
export const memberInfo3 = [
  {
    label: "Drug Label",
    labelValue: "Abilify 10 mg",
  },
  {
    label: "NDC",
    labelValue: "59148002985",
  },
  {
    label: "Days Supply",
    labelValue: "30",
  },
  {
    label: "Quantity",
    labelValue: "30.000",
  },
  {
    label: "Pharmacy NPI",
    labelValue: "123456789",
  },
  {
    label: "Pharmacy NCPDP#",
    labelValue: "1234567",
  },
  {
    label: "Patient Pay Amount",
    labelValue: "$30",
  },
];

export const getClaimsResultModalFolderTabData = () => {
  const tabList: any[] = [
    {
      id: 1,
      text: "Claim Detail",
    },
    {
      id: 2,
      text: "Claim Transaction",
    },
    {
      id: 3,
      text: "Adjudication Rules",
    },
  ];
  return tabList;
};

export const getClaimModalFolderTabData = () => {
  const tabList: any[] = [
    {
      id: 1,
      text: "Claim Detail",
    },
    {
      id: 2,
      text: "Claim Transaction",
    },
    {
      id: 3,
      text: "Adjudication Rules",
    },
    {
      id: 4,
      text: "Test Claims History",
    },
  ];
  return tabList;
};

export const getClaimModalMiniTabData = () => {
  const tabList: any[] = [
    {
      id: 1,
      text: "Pricing",
    },
    {
      id: 2,
      text: "Client Pricing",
    },
  ];
  return tabList;
};

// export const claimDetails = () => {
//     const pricing = [
//         {

//         }
//     ]
// }

export const pricing = [
  {
    label: "U&C",
    submittedValue: "$0.00",
    planAllowed: "$0.00",
  },
  {
    label: "Ingredient Cost",
    submittedValue: "$0.00",
    planAllowed: "$0.00",
  },
  {
    label: "Dispensing Fee",
    submittedValue: "$0.00",
    planAllowed: "$0.00",
  },
  {
    label: "Flat Tax",
    submittedValue: "$0.00",
    planAllowed: "$0.00",
  },
  {
    label: "Percent Tax",
    submittedValue: "$0.00",
    planAllowed: "$0.00",
  },
  {
    label: "Incentive Fee",
    submittedValue: "$0.00",
    planAllowed: "$0.00",
  },
  {
    label: "Professional Service Fee",
    submittedValue: "$0.00",
    planAllowed: "$0.00",
  },
  {
    label: "Other",
    submittedValue: "$0.00",
    planAllowed: "$0.00",
  },
  {
    label: "Gross Amount Due",
    submittedValue: "$0.00",
    planAllowed: "$0.00",
  },
  {
    label: "COB",
    submittedValue: "$0.00",
    planAllowed: "$0.00",
  },
  {
    label: "Amount Due",
    submittedValue: "$0.00",
    planAllowed: "$0.00",
  },
  {
    label: "Withhold",
    submittedValue: "$0.00",
    planAllowed: "$0.00",
  },
  {
    label: "POS Rebate",
    submittedValue: "$0.00",
    planAllowed: "$0.00",
  },
];

export const patientPayMedicare = [
  {
    label: "Copay",
    calculatedValue: "$0.000",
    override: "$0.000",
  },
  {
    label: "Coinsurance",
    calculatedValue: "$0.000",
    override: "$0.000",
  },
  {
    label: "Deductible",
    calculatedValue: "$0.000",
    override: "$0.000",
  },
  {
    label: "Over Ben Max",
    calculatedValue: "$0.000",
    override: "$0.000",
  },
  {
    label: "DAW/PSC Fee",
    calculatedValue: "$0.000",
    override: "$0.000",
  },
  {
    label: "LIS",
    calculatedValue: "$0.000",
    override: "$0.000",
  },
];

export const patientPayCommercial = [
  {
    label: "Copay",
    calculatedValue: "$0.000",
    override: "$0.000",
  },
  {
    label: "Coinsurance",
    calculatedValue: "$0.000",
    override: "$0.000",
  },
  {
    label: "Deductible",
    calculatedValue: "$0.000",
    override: "$0.000",
  },
  {
    label: "Over Ben Max",
    calculatedValue: "$0.000",
    override: "$0.000",
  },
  {
    label: "DAW/PSC Fee",
    calculatedValue: "$0.000",
    override: "$0.000",
  },
  {
    label: "CSR",
    calculatedValue: "$0.000",
    override: "$0.000",
  },
];

export const transactionInformation = [
  {
    label: "Claim ID",
    labelValue: "124362725373",
  },
  {
    label: "Date/Time Adjudication Began",
    labelValue: "6/22/2020 14:35:55:123",
  },
  {
    label: "Date/Time Adjudication Ended",
    labelValue: "6/22/2020 14:35:55:555",
  },
  {
    label: "Date Received",
    labelValue: "6/22/2020",
  },
  {
    label: "Date of Service",
    labelValue: "6/22/2020",
  },
  {
    label: "Date Rx Written",
    labelValue: "6/22/2020",
  },
  {
    label: "Date Adjusted",
    labelValue: "7/22/2020 14:35:55:123",
  },
  {
    label: "Date Reversed",
    labelValue: "Blank",
  },
  {
    label: "Transaction Code",
    labelValue: "B1",
  },
  {
    label: "Transaction Type",
    labelValue: "Electronic ",
  },
  {
    label: "NCPDP Version",
    labelValue: "D.0",
  },
  {
    label: "BIN#",
    labelValue: "60987",
  },
  {
    label: "PCN",
    labelValue: "9u37629",
  },
];

export const benefitInformation = [
  {
    label: "Client",
    labelValue: "23465432",
  },
  {
    label: "Carrier",
    labelValue: "3456372",
  },
  {
    label: "Account",
    labelValue: "66756",
  },
  {
    label: "Group",
    labelValue: "66756",
  },
  {
    label: "Benefit",
    labelValue: "3452",
  },
];

export const pharmacyInformation = [
  {
    label: "Pharmacy Service Type",
    labelValue: "01",
  },
  {
    label: "Pharmacy NPI",
    labelValue: "123456789",
  },
  {
    label: "Pharmacy NCPDP#",
    labelValue: "1234567",
  },
  {
    label: "Pharmacy Name",
    labelValue: "Walmart",
  },
  {
    label: "Pharmacy Phone",
    labelValue: "(123) 456-7890",
  },
  {
    label: "Pharmacy Fax",
    labelValue: "(123) 456-7890",
  },
  {
    label: "Pharmacy Network",
    labelValue: "0001",
  },
  {
    label: "Network Name",
    labelValue: "FutureRx MAC 1",
  },
];

export const prescriberInformation = [
  {
    label: "Prescriber ID Qualifier",
    labelValue: "01",
  },
  {
    label: "Prescriber NPI",
    labelValue: "23467653427",
  },
  {
    label: "Prescriber DEA",
    labelValue: "23467653427",
  },
  {
    label: "Prescriber Name",
    labelValue: "Surfert, Nancy",
  },
  {
    label: "Prescriber Phone",
    labelValue: "(123) 456-7890",
  },
  {
    label: "Prescriber Fax",
    labelValue: "(123) 456-7890",
  },
];

export const messagingToPharmacy = [
  {
    label: "Update DOB",
    labelValue: "MM/DD/YYYY",
  },
  {
    label: "Updated BIN",
    labelValue: "789568",
  },
];

export const additionalInformationBox1 = [
  {
    label: "Drug Label",
    labelValue: "Abilify 10 mg",
  },
  {
    label: "NDC",
    labelValue: "59148002985",
  },
  {
    label: "GPI",
    labelValue: "41400010100310",
  },
  {
    label: "MONY",
    labelValue: "-",
  },
  {
    label: "DDID",
    labelValue: "-",
  },
  {
    label: "RXCUI",
    labelValue: "1998457",
  },
  {
    label: "Formulary",
    labelValue: "Y",
  },
  {
    label: "Formulary Tier",
    labelValue: "2",
  },
  {
    label: "Formulary ID",
    labelValue: "-",
  },
  {
    label: "CMS Drug Status",
    labelValue: "D",
  },
  {
    label: "Part D Drug Coverage Status",
    labelValue: "C",
  },
  {
    label: "SCD",
    labelValue: "N",
  },
];
export const additionalInformationBox2 = [
  {
    label: "Quantity Dispensed",
    labelValue: "30.000",
  },
  {
    label: "Days Supply",
    labelValue: "30",
  },
  {
    label: "Unit of Measure",
    labelValue: "MG",
  },
  {
    label: "Dosage Form",
    labelValue: "Tablet",
  },
  {
    label: "Schedule II",
    labelValue: "N",
  },
  {
    label: "DAW",
    labelValue: "00",
  },
  {
    label: "Compound Claim",
    labelValue: "N",
  },
  {
    label: "Vaccine",
    labelValue: "N",
  },
  {
    label: "340B Claim",
    labelValue: "N",
  },
  {
    label: "SCC",
    labelValue: "20, 99, 02",
  },
  {
    label: "Dispensing Status",
    labelValue: "-",
  },
  {
    label: "DCS",
    labelValue: "N",
  },
];
export const additionalInformationBox3Medicare = [
  {
    label: "RX",
    labelValue: "123456789",
  },
  {
    label: "Fill Number",
    labelValue: "03",
  },
  {
    label: "Number of Refills",
    labelValue: "05",
  },
  {
    label: "Transition Claim",
    labelValue: "N",
  },
  {
    label: "Patient Residence Code",
    labelValue: "00",
  },
  {
    label: "PDE Status",
    labelValue: "Accepted",
  },
  {
    label: "MME Per Day",
    labelValue: "0.034",
  },
  {
    label: "APAP Per Day",
    labelValue: "0.085",
  },
  {
    label: "Quantity Intended to be Dispensed",
    labelValue: "30.000",
  },
  {
    label: "Days Supply Intended to be Dispensed",
    labelValue: "30",
  },
  {
    label: "COB",
    labelValue: "N",
  },
  {
    label: "LIS Level",
    labelValue: "1001",
  },
];

export const additionalInformationBox3Commercial = [
  {
    label: "RX",
    labelValue: "123456789",
  },
  {
    label: "Fill Number",
    labelValue: "03",
  },
  {
    label: "Number of Refills",
    labelValue: "05",
  },
  {
    label: "Transition Claim",
    labelValue: "N",
  },
  {
    label: "Patient Residence Code",
    labelValue: "00",
  },
  {
    label: "PDE Status",
    labelValue: "Accepted",
  },
  {
    label: "MME Per Day",
    labelValue: "0.034",
  },
  {
    label: "APAP Per Day",
    labelValue: "0.085",
  },
  {
    label: "Quantity Intended to be Dispensed",
    labelValue: "30.000",
  },
  {
    label: "Days Supply Intended to be Dispensed",
    labelValue: "30",
  },
  {
    label: "COB",
    labelValue: "N",
  },
  {
    label: "CSR Level",
    labelValue: "1001",
  },
];

export const coordinationOfBenefitsFieldsTable1 = [
  {
    label: "COB/Other Payments Count",
    labelValue: "0",
  },
  {
    label: "Other Payer Coverage Type",
    labelValue: "0",
  },
  {
    label: "Other Payer ID Qualifier",
    labelValue: "0",
  },
  {
    label: "Other Payer IDr",
    labelValue: "0",
  },
  {
    label: "Other Payer Date",
    labelValue: "0",
  },
];
export const coordinationOfBenefitsFieldsTable2 = [
  {
    label: "Other Payer Reject Count",
    labelValue: "0",
  },
  {
    label: "Other Payer Reject Code",
    labelValue: "0",
  },
];
export const multiIngredientCompoundFieldsColumn1 = [
  {
    label: "Route of Administration",
    labelValue: "Abc",
  },
  {
    label: "Compound Type",
    labelValue: "01",
  },
];
export const multiIngredientCompoundFieldsColumn2 = [
  {
    label: "Compound Dosage Form",
    labelValue: "Tablet",
  },
  {
    label: "Compound Dispensing Unit Indicator",
    labelValue: "4",
  },
];
export const coordinationOfBenefitsFieldsTable3 = [
  {
    label: "Benefit Stage Count",
    labelValue: "0",
  },
  {
    label: "Benefit Stage Qualifier",
    labelValue: "0",
  },
  {
    label: "Benefit Stage Amount",
    labelValue: "0",
  },
];

export const coordinationOfBenefitsFieldsTable4 = [
  {
    label: "Other Payer Amount Paid Count",
    labelValue: "0",
  },
  {
    label: "Other Payer Amount Paid Qualifier",
    labelValue: "0",
  },
  {
    label: "Other Payer Amount Paid",
    labelValue: "0",
  },
];

export const multiIngredientCompoundFieldsTable2 = [
  {
    label: "Ingredient Component Count",
    labelValue: "01",
  },
  {
    label: "Product ID (NDC) Qualifier",
    labelValue: "12345",
  },
  {
    label: "Product ID (NDC)",
    labelValue: "- - - - ",
  },
  {
    label: "Ingredient Quantity",
    labelValue: "5",
  },
  {
    label: "Ingredient Drug Cost",
    labelValue: "56",
  },
  {
    label: "Basis of Cost Determination",
    labelValue: "45",
  },
];

export const priorAuthorization = [
  {
    label: "Override ID",
    labelValue: "123456789",
  },
  {
    label: "Authorization ID",
    labelValue: "123456789",
  },
  {
    label: "Start Date",
    labelValue: "05/21/2020",
  },
  {
    label: "End Date",
    labelValue: "07/31/2020",
  },
  {
    label: "Refills Allowed",
    labelValue: "3",
  },
];

export const reimbursementDetails = [
  {
    label: "Payment Status",
    labelValue: "abc",
  },
  {
    label: "Check",
    labelValue: "123",
  },
  {
    label: "Check Date",
    labelValue: "06/28/2020",
  },
  {
    label: "Mailing Date",
    labelValue: "06/28/2020",
  },
];

export const viewDURMessages = [
  {
    label: "Messages 1 ",
  },
  {
    label: "Messages 2",
  },
  {
    label: "Messages 3",
  },
  {
    label: "Messages 4",
  },
];

export const benefitInformationn = [
  {
    label: "Drug Coverage Status",
    labelValue: "C or E or O",
  },
  {
    label: "Brand Generic Indicator",
    labelValue: "B or G",
  },
];

export const partDModelBenefit = [
  {
    label: "Part D Senior Savings",
    labelValue: "$1.00",
  },
  {
    label: "LIS Copay Savings",
    labelValue: "$2.00",
  },
  {
    label: "VBID",
    labelValue: " $3.00",
  },
];

export const moopAccumulator = [
  {
    label: "MOOP Amount Applied",
    labelValue: "$100",
  },
  {
    label: "MOOP Amount Remaining",
    labelValue: "$4500",
  },
];
export const pdeStatus = [
  {
    // labelValue:"Accepted",
    submiteDate: "11/6/2020",
    responseDate: "11/7/2020",
  },
];

// table //
export const columns = [
  {
    title: "Benefit Phase",
    dataIndex: "benefitPhase",
  },
  {
    title: "Limit",
    dataIndex: "limit",
  },
  {
    title: "Amount Applied",
    dataIndex: "amountApplied",
  },
  {
    title: "Amount Remaining",
    dataIndex: "amountRemaining",
  },
  {
    title: "Benefit Phase Indicator",
    dataIndex: "benefitPhaseIndicator",
  },
  {
    title: "Member Pay Non-LIS",
    dataIndex: "nonLIS",
  },
  {
    title: "Member Pay LIS",
    dataIndex: "payLIS",
  },
  {
    title: "LICS",
    dataIndex: "lics",
  },
  {
    title: "CGDP",
    dataIndex: "cgdp",
  },
  {
    title: "TrOOP Actual",
    dataIndex: "troopActual",
  },
  {
    title: "CPP",
    dataIndex: "cpp",
  },
  {
    title: "NPP",
    dataIndex: "npp",
  },
  {
    title: "Other TrOOP",
    dataIndex: "otherTroop",
  },
  {
    title: "GDCB",
    dataIndex: "gdcb",
  },
  {
    title: "GDCA",
    dataIndex: "gdca",
  },
  {
    title: "PRLO",
    dataIndex: "prlo",
  },
];
export const data = [
  {
    key: "1",
    benefitPhase: "Deductible",
    limit: "$320",
    amountApplied: "$50",
    amountRemaining: "$220",
    benefitPhaseIndicator: "D",
    nonLIS: "$",
    payLIS: "$",
    lics: "$25",
    cgdp: "$25",
    troopActual: "$25",
    cpp: "$25",
    npp: "$25",
    otherTroop: "$25",
    gdcb: "$25",
    gdca: "$25",
    prlo: "$",
  },
  {
    key: "2",
    benefitPhase: "Initial Coverage",
    limit: "$4,700",
    amountApplied: "$50",
    amountRemaining: "$4,600",
    benefitPhaseIndicator: "N",
    nonLIS: "$",
    payLIS: "$",
    lics: "$300",
    cgdp: "$25",
    troopActual: "$25",
    cpp: "$25",
    npp: "$25",
    otherTroop: "$25",
    gdcb: "$25",
    gdca: "$25",
    prlo: "$",
  },
  {
    key: "3",
    benefitPhase: "Coverage Gap",
    limit: "$6250",
    amountApplied: "$0",
    amountRemaining: "$0",
    benefitPhaseIndicator: "G",
    nonLIS: "$",
    payLIS: "$",
    lics: "",
    cgdp: "$25",
    troopActual: "$25",
    cpp: "$25",
    npp: "$25",
    otherTroop: "$25",
    gdcb: "$25",
    gdca: "$25",
    prlo: "$",
  },
  {
    key: "4",
    benefitPhase: "Catastrophic",
    limit: "N/A",
    amountApplied: "$0",
    amountRemaining: "$0",
    benefitPhaseIndicator: "C",
    nonLIS: "$",
    payLIS: "$",
    lics: "",
    cgdp: "$25",
    troopActual: "$25",
    cpp: "$25",
    npp: "$25",
    otherTroop: "$25",
    gdcb: "$25",
    gdca: "$25",
    prlo: "$",
  },
  {
    key: "5",
    benefitPhase: "",
    limit: "TOTAL",
    amountApplied: "$100",
    amountRemaining: "",
    benefitPhaseIndicator: "",
    nonLIS: "",
    payLIS: "",
    lics: "175",
    cgdp: "$25",
    troopActual: "$25",
    cpp: "$25",
    npp: "$25",
    otherTroop: "$25",
    gdcb: "$25",
    gdca: "$25",
    prlo: "$",
  },
];

export const columnsCommercial = [
  {
    title: "Accumulator",
    dataIndex: "accumulator",
  },
  {
    title: "Limit",
    dataIndex: "limit",
  },
  {
    title: "Amount Applied",
    dataIndex: "amountApplied",
  },
  {
    title: "Amount Remaining",
    dataIndex: "amountRemaining",
  },
];

export const dataCommercial = [
  {
    key: "1",
    accumulator: "Deductible",
    limit: "$320",
    amountApplied: "$50",
    amountRemaining: "$220",
  },
  {
    key: "2",
    benefitPhase: "Initial Coverage",
    limit: "$4,700",
    amountApplied: "$50",
    amountRemaining: "$4,600",
  },
  {
    key: "3",
    benefitPhase: "Coverage Gap",
    limit: "$6250",
    amountApplied: "$0",
    amountRemaining: "$0",
  },
  {
    key: "4",
    benefitPhase: "Catastrophic",
    limit: "N/A",
    amountApplied: "$0",
    amountRemaining: "$0",
  },
  {
    key: "5",
    benefitPhase: "",
    limit: "TOTAL",
    amountApplied: "$100",
    amountRemaining: "",
  },
];

// rejected count table //
export const rejectedCountData = [
  {
    key: "1",
    rejectCode: "1",
    description: "M/I Bin Number",
    submittedValue: ["789579"],
    expectedValue: ["56500"],
    status: "Overridden",
  },
  {
    key: "2",
    rejectCode: "655",
    description: "M/I cardholder frist name",
    submittedValue: ["Mary"],
    expectedValue: ["Maria"],
    status: "Rejected",
  },
  {
    key: "3",
    rejectCode: "656",
    description: "M/ I Date Of Birth",
    submittedValue: ["06/01/1984"],
    expectedValue: ["06/11/1984"],
    status: "Overridden",
  },
  {
    key: "4",
    rejectCode: "263",
    description: "DAW code Value Not Supported ",
    submittedValue: ["20"],
    expectedValue: ["25"],
    status: "Soft",
  },
];
// rejected count table //

// Claim transaction tab //
export const getClaimModalTransactionMiniTabData = () => {
  const tabList: any[] = [
    {
      id: 1,
      text: "Request",
    },
    {
      id: 2,
      text: "Response",
    },
  ];
  return tabList;
};
export const claimTransactionAccorLabels = [
  {
    id: 1,
    label: "Transaction Header Segment",
    responseLabel: "Response Header Segment",
    expanded: false,
  },
  {
    id: 2,
    label: "Insurance Segment",
    responseLabel: "Response Message Segment",
    expanded: false,
  },
  {
    id: 3,
    label: "Patient Segment",
    responseLabel: "Response Insurance Segment",
    expanded: false,
  },
  {
    id: 4,
    label: "Pharmacy Provider Segment",
    responseLabel: "Response Insurance Additional Information Segment",
    expanded: false,
  },
  {
    id: 5,
    label: "Claim Segment",
    responseLabel: "Response Patient Segment",
    expanded: false,
  },
  {
    id: 6,
    label: "Prescriber Segment",
    responseLabel: "Response Status Segment",
    expanded: false,
  },
  {
    id: 7,
    label: "Coordination Of Benefits/Other Payments",
    responseLabel: "Response Claim Segment",
    expanded: false,
  },
  {
    id: 8,
    label: "Workers Compensation Segment",
    responseLabel: "Response Pricing Segment",
    expanded: false,
  },
  {
    id: 9,
    label: "DUR/PPS Segment",
    responseLabel: "Response DUR/PPS Segment",
    expanded: false,
  },
  {
    id: 10,
    label: "Pricing Segment",
    responseLabel: "Response Prior Authorization Segment",
    expanded: false,
  },
  {
    id: 11,
    label: "Coupon Segment",
    responseLabel: "Response Other Payers Segment",
    expanded: false,
  },
  {
    id: 12,
    label: "Compound Segment",
    responseLabel: "Response Intermediary Segment",
    expanded: false,
  },
  {
    id: 13,
    label: "Prior Authorization Segment",
    responseLabel: "Response Other Related Benefit Detail Segment",
    expanded: false,
  },
  {
    id: 14,
    label: "Clinical Segment",
    expanded: false,
  },
  {
    id: 15,
    label: "Additional Documentation Segment",
    expanded: false,
  },
  {
    id: 16,
    label: "Facility Segment",
    expanded: false,
  },
  {
    id: 17,
    label: "Narrative Segment",
    expanded: false,
  },
];

export const accordionDataReqHeader = [
  {
    segmentNumber: "1Ã˜1-A1",
    segmentValue: "BIN Number",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "1Ã˜2-A2",
    segmentValue: "Version Release Number",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "1Ã˜3-A3",
    segmentValue: "Transaction Code",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "1Ã˜4-A4",
    segmentValue: "Processor Control Number",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "1Ã˜9-A9",
    segmentValue: "Transaction Count",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "2Ã˜2-B2",
    segmentValue: "Service Provider ID Qualifier",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "2Ã˜1-B1",
    segmentValue: "Service Provider ID",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "4Ã˜1-D1",
    segmentValue: "Date of Service",
    submittedValue: "MM/DD/YYYY",
    required: "M",
  },
  {
    segmentNumber: "11Ã˜-AK",
    segmentValue: "Software Vendor/Certification ID",
    submittedValue: "1234567",
    required: "M",
  },
];

export const accordionDataReqInsurance = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "12",
    required: "M",
  },
  {
    segmentNumber: "3Ã˜2-C2",
    segmentValue: "Cardholder ID",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "312-CC",
    segmentValue: "Cardholder First Name",
    submittedValue: "-",
    required: "q",
  },
  {
    segmentNumber: "313-CD",
    segmentValue: "Cardholder Last Name",
    submittedValue: "-",
    required: "q",
  },
  {
    segmentNumber: "314-CE",
    segmentValue: "Home Plan",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "524-FO",
    segmentValue: "Plan ID",
    submittedValue: "1234567",
    required: "N",
  },
  {
    segmentNumber: "3Ã˜9-C9",
    segmentValue: "Eligibility Clarification Code",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "3Ã˜1-C1",
    segmentValue: "Group ID",
    submittedValue: "MM/DD/YYYY",
    required: "q",
  },
  {
    segmentNumber: "3Ã˜3-C3",
    segmentValue: "Person Code",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "3Ã˜6-C6",
    segmentValue: "Patient Relationship Code",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "99Ã˜-MG",
    segmentValue: "Other Payer BIN Number",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "991-MH",
    segmentValue: "Other Payer Processor Control Number",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "356-NU",
    segmentValue: "Other Payer Cardholder ID",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "992-MJ",
    segmentValue: "Other Payer Group ID",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "359-2A",
    segmentValue: "Medigap ID",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Medicaid Indicator",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Provider Accept Assignment Indicator",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "CMS Part D Defined Qualified Facility",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Medicaid ID Number",
    submittedValue: "1234567",
    required: "q, qM",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Medicaid Agency Number",
    submittedValue: "1234567",
    required: "n, qM",
  },
];

export const accordionDataReqPatient = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "14",
    required: "M",
  },
  {
    segmentNumber: "331-CX",
    segmentValue: "Patient ID Qualifier",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "312-CC",
    segmentValue: "Patient ID",
    submittedValue: "-",
    required: "q",
  },
  {
    segmentNumber: "313-CD",
    segmentValue: "Date of Birth",
    submittedValue: "6/1/1984",
    required: "R",
  },
  {
    segmentNumber: "314-CE",
    segmentValue: "Patient Gender Code",
    submittedValue: "2",
    required: "R",
  },
  {
    segmentNumber: "524-FO",
    segmentValue: "Patient First Name",
    submittedValue: "Machenzie",
    required: "q,qM",
  },
  {
    segmentNumber: "3Ã˜9-C9",
    segmentValue: "Patient Last Name",
    submittedValue: "Johnson-Robertson III",
    required: "r",
  },
  {
    segmentNumber: "3Ã˜1-C1",
    segmentValue: "Patient Street Address",
    submittedValue: "MM/DD/YYYY",
    required: "q,qM",
  },
  {
    segmentNumber: "3Ã˜3-C3",
    segmentValue: "Patient City",
    submittedValue: "Tampa",
    required: "q,qM",
  },
  {
    segmentNumber: "3Ã˜6-C6",
    segmentValue: "Patient State or Province",
    submittedValue: "1234567",
    required: "q,qM",
  },
  {
    segmentNumber: "99Ã˜-MG",
    segmentValue: "Patient Zip/Postal Code",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "991-MH",
    segmentValue: "Patient Phone number",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "356-NU",
    segmentValue: "Place of Service",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "992-MJ",
    segmentValue: "Employer ID",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "359-2A",
    segmentValue: "Smoker/Non-smoker Code",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Pregnancy Indicator",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Patient E-Mail Address",
    submittedValue: "abc@email.com",
    required: "M",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Patient Residence",
    submittedValue: "1234567",
    required: "M",
  },
];

export const accordionDataReqPharmacy = [
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Segment Identification",
    submittedValue: "15",
    required: "M",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Patient ID Qualifier",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Patient ID",
    submittedValue: "-",
    required: "q",
  },
];

export const accordionDataReqClaim = [
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Segment Identification",
    submittedValue: "15",
    required: "M",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Prescription/Service Reference Number Qualifier",
    submittedValue: "1234567",
    required: "M",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Prescription/Service Reference Number",
    submittedValue: "-",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Product/Service ID Qualifier",
    submittedValue: "-",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Product/Service ID",
    submittedValue: "-",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Associated Prescription/Service Reference Number",
    submittedValue: "-",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Associated Prescription/Service Date",
    submittedValue: "-",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Procedure Modifier Code Count",
    submittedValue: "-",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Procedure Modifier Code",
    submittedValue: "-",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Quantity Dispensed",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Fill Number",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Days Supply",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Compound Code",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Dispense as Written/Product Selection Codee",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Date Prescription Written",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Number of Refills Authorized",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Prescription Origin Code",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Submission Clarification Code Count",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Submission Clarification Code",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Quantity Prescribed",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Other Coverage",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Special Packaging Indicator",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Originally Prescribed Product/Service ID Qualifier",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Originally Prescribed Product/Service Code",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Originally Prescribed Quantity",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Alternate ID",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Scheduled Prescription ID Number",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Unit of Measure",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Level of Service",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Prior Authorization Type Code",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Prior Authorization Number Submitted",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Intermediary Authorization Type ID ",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Intermediary Authorization ID ",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Dispensing Status ",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Quantity Intended to be Dispensed",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Days Supply Intended to be Dispensed",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Delay Reason Code",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Transaction Reference Numbere",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Patient Assignment Indicator",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Route of Administration",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Compound Type",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Medicaid Subrogation (ICN/TCN)",
    submittedValue: "1234567",
    required: "n",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Pharmacy Service Type",
    submittedValue: "1234567",
    required: "n",
  },
];

export const accordionDataReqPrescriber = [
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Segment Identification",
    submittedValue: "11",
    required: "m",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Prescriber ID Qualifier",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Prescriber ID ",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Prescriber Last Name",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Prescriber Phone Number",
    submittedValue: "555-5555-5555",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Primary Care Provider ID Qualifier",
    submittedValue: "12345",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Primary Care Provider ID ",
    submittedValue: "12345",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Primary Care Provider Last Name",
    submittedValue: "J",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Prescriber First Name",
    submittedValue: "Jone",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Prescriber Street Address",
    submittedValue: "street 2",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Prescriber City Address",
    submittedValue: "FL",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Prescriber State/Province Address",
    submittedValue: "Tampa",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Prescriber ZIP/Postal Zone",
    submittedValue: "311065",
    required: "q",
  },
];

export const accordionDataReqCordination = [
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Segment Identification",
    submittedValue: "15",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Coordination of Benefits/Other Payments Count",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Other Payer Coverage Type",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Other Payer ID Qualifier",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Other Payer ID ",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Other Payer Date",
    submittedValue: "25/9/2020",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Internal Control Number",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Other Payer Amount Paid Count",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Other Payer Amount Paid Qualifier",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Other Payer Amount Paid",
    submittedValue: "$250",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Other Payer Reject Count",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Other Payer Reject Code",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Other Payer-Patient Responsibility Amount Count",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Other Payer-Patient Responsibility Amount Qualifier",
    submittedValue: "25",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Other Payer-Patient Responsibility Amount",
    submittedValue: "25",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Benefit Stage Count",
    submittedValue: "25",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Benefit Stage Qualifier",
    submittedValue: "25",
    required: "q",
  },
  {
    segmentNumber: "36Ã˜-2B",
    segmentValue: "Benefit Stage Amount",
    submittedValue: "2",
    required: "q",
  },
];

export const accordionDataReqWorkers = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "11",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Date of Injury",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Employer Name",
    submittedValue: "-",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Employer Street Address",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Employer City Address",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Employer State/Province Address",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Employer Zip/Postal Code",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Employer Phone Number",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Employer Contact Name",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Carrier ID",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Claim/Reference ID ",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Billing Entity Type Indicator",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Pay To Qualifier",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Pay To ID",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Pay To Name",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Pay To Street Address",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Pay To City Address",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Pay To State/Province Address",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Pay To ZIP/Postal Zone",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Generic Equivalent Product ID Qualifier",
    submittedValue: "1234567",
    required: "q",
  },
  {
    segmentNumber: "434-DY",
    segmentValue: "Generic Equivalent Product ID",
    submittedValue: "1234567",
    required: "q",
  },
];

export const accordionDataReqDur = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "15",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "DUR/PPS Code Counter",
    submittedValue: "2",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Reason for Service Code",
    submittedValue: "2",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Professional Service Code",
    submittedValue: "2",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Result of Service Code",
    submittedValue: "6578",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "DUR/PPS Level of Effort",
    submittedValue: "2",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "DUR Co-Agent ID Qualifier",
    submittedValue: "33601",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "DUR Co-Agent ID ",
    submittedValue: "33601",
    required: "q",
  },
];

export const accordionDataReqPricing = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "15",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Ingredient Cost Submitted",
    submittedValue: "15",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Dispensing Fee Submitted",
    submittedValue: "15",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Professional Service Fee Submitted",
    submittedValue: "$250",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Patient Paid Amount Submitted",
    submittedValue: "$250",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Incentive Amount Submitted",
    submittedValue: "$250",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Other Amount Claimed Submitted Count",
    submittedValue: "$250",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Other Amount Claimed Submitted Qualifier",
    submittedValue: "$250",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Other Amount Claimed Submitted ",
    submittedValue: "$250",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Flat Sales Tax Amount Submitted",
    submittedValue: "$250",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Percentage Sales Tax Amount Submitted",
    submittedValue: "$250",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Percentage Sales Tax Rate Submitted",
    submittedValue: "$250",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Percentage Sales Tax Rate Submitted",
    submittedValue: "9%",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Percentage Sales Tax Basis Submitted",
    submittedValue: "12%",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Usual and Customary Charge",
    submittedValue: "3",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Gross Amount Due",
    submittedValue: "$450",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Basis of Cost Determination",
    submittedValue: "3",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Medicaid Paid Amount",
    submittedValue: "$450",
    required: "m",
  },
];

export const accordionDataReqCoupon = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "15",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Coupon Type",
    submittedValue: "2",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Coupon Number",
    submittedValue: "2",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Coupon Value Amount",
    submittedValue: "$320",
    required: "m",
  },
];

export const accordionDataReqCompound = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "1",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Compound Dosage Form Description Code",
    submittedValue: "1",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Compound Dispensing Unit Form Indicator",
    submittedValue: "1",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Compound Ingredient Component Count",
    submittedValue: "1",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Compound Product ID Qualifier",
    submittedValue: "1",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Compound Product ID ",
    submittedValue: "1",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Compound Ingredient Quantity",
    submittedValue: "1",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Compound Ingredient Drug Cost",
    submittedValue: "1",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Compound Ingredient Basis of Cost Determination",
    submittedValue: "1",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Compound Ingredient Modifier Code Count",
    submittedValue: "$25",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Compound Ingredient Modifier Code",
    submittedValue: "2456",
    required: "m",
  },
];

export const accordionDataReqPriorAuth = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "15",
    required: "N/A",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Request Type",
    submittedValue: "-",
    required: "N/A",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Request Period Date - Begin",
    submittedValue: "23/8/2020",
    required: "N/A",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Request Period Date - End",
    submittedValue: "23/8/2020",
    required: "N/A",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Basis of Request",
    submittedValue: "3",
    required: "N/A",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Authorized Representative First Name",
    submittedValue: "Johne",
    required: "N/A",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Authorized Rep. Last Name",
    submittedValue: "Bella",
    required: "N/A",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Authorized Rep. Street Address",
    submittedValue: "Street-1",
    required: "N/A",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Authorized Rep. City",
    submittedValue: "Street-1",
    required: "N/A",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Authorized Rep. State/Province",
    submittedValue: "Street-1",
    required: "N/A",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Authorized Rep. Zip/Postal Code",
    submittedValue: "33610",
    required: "N/A",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Prior Authorization Number - Assigned",
    submittedValue: "Street-1",
    required: "N/A",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Authorization Number",
    submittedValue: "555 5555 5555",
    required: "N/A",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Prior Authorization Supporting Documentation",
    submittedValue: "Street-1",
    required: "N/A",
  },
];

export const accordionDataReqClinical = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "11",
    required: "M",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Diagnosis Code Count",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Diagnosis Code Qualifier",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Diagnosis Code",
    submittedValue: "1",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Clinical Information Counter",
    submittedValue: "04",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Measurement Date",
    submittedValue: "24/9/2020",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Measurement Time",
    submittedValue: "10:30am",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Measurement Dimension",
    submittedValue: "24X36",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Measurement Unit",
    submittedValue: "2",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Measurement Value",
    submittedValue: "2.3x3.5",
    required: "q",
  },
];

export const accordionDataReqAdditional = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "15",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Additional Documentation Type ID",
    submittedValue: "$85",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Request Period Begin Date",
    submittedValue: "18/9/2020",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Request Period Recert/Revised Date",
    submittedValue: "20/9/2020",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Request Status",
    submittedValue: "1",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Length Of Need Qualifier",
    submittedValue: "1",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Length Of Need ",
    submittedValue: "1",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Prescriber/Supplier Date Signed",
    submittedValue: "24/9/2020",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Supporting Documentation",
    submittedValue: "2",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Question Number/Letter Count",
    submittedValue: "2",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Question Number/Letter",
    submittedValue: "9%",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Question Percent Response",
    submittedValue: "5%",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Question Date Response",
    submittedValue: "25/9/2020",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Question Dollar Amount Response",
    submittedValue: "5%",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Question Numeric Response",
    submittedValue: "25",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Question Alphanumeric Response",
    submittedValue: "ABC",
    required: "q",
  },
];

export const accordionDataReqFacility = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "16",
    required: "M",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Facility ID",
    submittedValue: "2",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Facility Name",
    submittedValue: "2",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Facility Street Address",
    submittedValue: "2",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Facility City Address",
    submittedValue: "Tampa",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Facility State/Province Address",
    submittedValue: "2",
    required: "q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Facility ZIP/Postal Zone",
    submittedValue: "33601",
    required: "q",
  },
];

export const accordionDataReqNarrative = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "15",
    required: "M",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Narrative Message",
    submittedValue: "2",
    required: "q",
  },
];

export const accordionDataResHeader = [
  {
    segmentNumber: "102-A2",
    segmentValue: "Version Release Number",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "103-A3",
    segmentValue: "Transaction Code",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "109-A9",
    segmentValue: "Transaction Count",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "501-FI",
    segmentValue: "Header Response Status",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "102-A2",
    segmentValue: "Service Provider ID Qualifier",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "102-A2",
    segmentValue: "Service Provider ID",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "102-A2",
    segmentValue: "Date Of Service",
    submittedValue: "M",
    required: "M",
  },
];

export const accordionDataResMessage = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "504-F4",
    segmentValue: "Message",
    submittedValue: "Q",
    required: "Q",
  },
];

export const accordionDataResInsurance = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "301-C1",
    segmentValue: "Group ID",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "301-C1",
    segmentValue: "Plan ID",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "301-C1",
    segmentValue: "Network Reimbursement ID",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "301-C1",
    segmentValue: "Payer/Health Plan ID Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "301-C1",
    segmentValue: "Payer/Health Plan ID Qualifier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "569-J8",
    segmentValue: "Payer/Health Plan ID",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "569-J8",
    segmentValue: "Medicaid ID Number",
    submittedValue: "N, QM",
    required: "Q",
  },
  {
    segmentNumber: "569-J8",
    segmentValue: "Medicaid Agency Number",
    submittedValue: "N, QM",
    required: "Q",
  },
  {
    segmentNumber: "569-J8",
    segmentValue: "Cardholder ID",
    submittedValue: "Q",
    required: "Q",
  },
];

export const accordionDataResInsuranceAddi = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "618-RR",
    segmentValue: "Medicare Part D Coverage Code",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "569-J8",
    segmentValue: "Contract Number",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "569-J8",
    segmentValue: "Formulary ID",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "569-J8",
    segmentValue: "Benefit ID",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "569-J8",
    segmentValue: "Next Medicare Part D Effective Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "569-J8",
    segmentValue: "Next Medicare Part D Termination Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "569-J8",
    segmentValue: "Plan Name",
    submittedValue: "",
    required: "",
  },
];

export const accordionDataResPatient = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Patient ID Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Patient ID Qualifier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "332-CY",
    segmentValue: "Patient ID",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "332-CY",
    segmentValue: "Patient First Name",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "332-CY",
    segmentValue: "Patient Last Name",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "332-CY",
    segmentValue: "Date Of Birth",
    submittedValue: "Q",
    required: "Q",
  },
];

export const accordionDataResStatus = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "112-AN",
    segmentValue: "Transaction Response Status",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "503-F3",
    segmentValue: "Authorization Number",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Reconciliation ID",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Reject Count",
    submittedValue: "R",
    required: "M",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Reject Code",
    submittedValue: "R",
    required: "M",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Reject Field Occurrence Indicator",
    submittedValue: "R",
    required: "M",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Approved Message Code Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Additional Message Information Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Additional Message Information Qualifier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Additional Message Information",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Additional Message Information Continuity",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Help Desk Support Type Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Help Desk Support Type",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Help Desk Business Unit Type Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Help Desk Business Unit Type",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Help Desk Contact Information Qualifier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Help Desk Contact Information",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Help Desk Contact Information Extension",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Transaction Reference Number",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Internal Control Number",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Adjudicated Program Type",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B98-34",
    segmentValue: "Next Available Fill Date",
    submittedValue: "Q",
    required: "Q",
  },
];

export const accordionDataResClaim = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "M",
    required: "m",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Prescription/Service Reference Number Qualifier",
    submittedValue: "M",
    required: "m",
  },
  {
    segmentNumber: "551-9F",
    segmentValue: "Prescription/Service Reference Number",
    submittedValue: "M",
    required: "m",
  },
  {
    segmentNumber: "551-9F",
    segmentValue: "Formulary Alternative Product Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Formulary Alternative Plan Benefit Tier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Formulary Alternative Reason Code",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Formulary Alternative Required Therapy Indicator Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Formulary Alternative Required Therapy Indicator",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue:
      "Formulary Alternative Required Therapy Time Period Qualifier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Formulary Alternative Required Therapy Time Period Duration",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue:
      "Formulary Alternative Required Therapy Time Period Start Date",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Formulary Alternative Required Therapy Time Period End Date",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Formulary Alternative ID Qualifier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Formulary Alternative ID",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Formulary Alternative Incentive",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Formulary Alternative Cost Share Incentive",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Formulary Alternative Description",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Plan Benefit Override Indicator",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Plan Benefit Override Value Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Plan Benefit Override Value",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Maximum Age Qualifier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Maximum Age",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Minimum Age Qualifier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Minimum Age",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Minimum Amount Qualifier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Minimum Amount",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Maximum Amount Qualifier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Maximum Amount",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Maximum Amount Time Period",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Maximum Amount Time Period End Date",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Maximum Amount Time Period Start Date",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Maximum Amount Time Period Units",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Remaining Amount Qualifier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Remaining Amount",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Benefit Type Opportunity Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Benefit Type Opportunity",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D42-PV",
    segmentValue: "Subrogation Requestors Reconciliation ID",
    submittedValue: "Q",
    required: "Q",
  },
];

export const accordionDataResPricing = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Total Amount Paid",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Patient Pay Amount",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Patient Pay Component Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Patient Pay Component Qualifier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Patient Pay Component Amount",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "111-AM",
    segmentValue: "Ingredient Cost Paid",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Dispensing Fee Paid",
    submittedValue: "R",
    required: "r",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Percentage Tax Exempt Indicator",
    submittedValue: "R",
    required: "r",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Regulatory Fee Count",
    submittedValue: "R",
    required: "r",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Regulatory Fee Type Code",
    submittedValue: "R",
    required: "r",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Regulatory Fee Exempt Indicator",
    submittedValue: "R",
    required: "r",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Regulatory Fee Amount Paid",
    submittedValue: "R",
    required: "r",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Percentage Tax Amount Paid",
    submittedValue: "R",
    required: "r",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Percentage Tax Rate Paid",
    submittedValue: "R",
    required: "r",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Percentage Tax Basis Paid",
    submittedValue: "R",
    required: "r",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Incentive Amount Paid",
    submittedValue: "R",
    required: "r",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Professional Service Fee Paid",
    submittedValue: "R",
    required: "r",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Other Amount Paid Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Other Amount Paid Qualifier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Other Amount Paid",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Other Payer Amount Recognized",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Basis of Reimbursement Determination",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Benefit Stage Indicator Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Benefit Stage Indicator",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Basis of Calculation â€“ Dispensing Fee",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Basis of Calculation â€“ Copay",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Basis of Calculation-Coinsurance",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Basis Of Calculation â€” Regulatory Fee",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Basis of Calculation â€“ Percentage Tax",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Accumulated Deductible Amount",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Remaining Deductible Amount",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Remaining Benefit Amount",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Spending Account Amount Remaining",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Patient Percentage Tax Amount",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Patient Regulatory Fee Amount",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Estimated Generic Savings",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Ingredient Cost Contracted/Reimbursable Amount",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Dispensing Fee Contracted/Reimbursable Amount",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "506-F6",
    segmentValue: "Professional Service Fee Contracted/Reimbursable Amount",
    submittedValue: "Q",
    required: "Q",
  },
];

export const accordionDataResDur = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "567-J6",
    segmentValue: "DUR/PPS Response Code Counter",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "567-J6",
    segmentValue: "Reason for Service Code",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "567-J6",
    segmentValue: "Clinical Significance Code",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "567-J6",
    segmentValue: "Other Pharmacy Indicator",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "567-J6",
    segmentValue: "Quantity of Previous Dispensing",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "567-J6",
    segmentValue: "Previous Date of Service",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "567-J6",
    segmentValue: "Database Indicator",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "567-J6",
    segmentValue: "Other Prescriber Indicator",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "567-J6",
    segmentValue: "DUR Free Text Message",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "567-J6",
    segmentValue: "DUR Additional Text",
    submittedValue: "Q",
    required: "Q",
  },
];

export const accordionDataResPriorAuth = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "498-PR",
    segmentValue: "Prior Authorization Processed Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "498-PR",
    segmentValue: "Prior Authorization Effective Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "498-PR",
    segmentValue: "Prior Authorization Expiration Date",
    submittedValue: "Q",
    required: "",
  },
  {
    segmentNumber: "498-PR",
    segmentValue: "Prior Authorization Quantity",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "498-PR",
    segmentValue: "Prior Authorization Dollars Authorized",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "498-PR",
    segmentValue: "Prior Authorization Number of Refills Authorized",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "498-PR",
    segmentValue: "Prior Authorization Quantity Accumulated",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "498-PR",
    segmentValue: "Prior Authorization ID Assigned",
    submittedValue: "",
    required: "",
  },
];

export const accordionDataResOtherPayers = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer ID Count",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer Coverage Type",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer Relationship Type",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer Benefit Classification",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer Adjudicated Program Type",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer ID Qualifier",
    submittedValue: "M",
    required: "M",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer ID",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer Processor Control Number",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer Cardholder ID",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer Group ID",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer Person Code",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer Help Desk Telephone Number",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer Help Desk Telephone Number Extension",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer Patient Relationship Code",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer Benefit Effective Date",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "355-NT",
    segmentValue: "Other Payer Benefit Termination Date",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "D23-M5",
    segmentValue: "Other Payer Name",
    submittedValue: "Q",
    required: "Q",
  },
];

export const accordionDataResIntermediary = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "B52-8R",
    segmentValue: "Response Intermediary Authorization Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B52-8R",
    segmentValue: "Response Intermediary Authorization Type ID",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B52-8R",
    segmentValue: "Response Intermediary Authorization ID",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B52-8R",
    segmentValue: "Intermediary Message",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B52-8R",
    segmentValue: "Intermediary Help Desk Support Type Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B52-8R",
    segmentValue: "Intermediary Help Desk Support Type",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B52-8R",
    segmentValue: "Intermediary Help Desk Business Unit Type Count",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B52-8R",
    segmentValue: "Intermediary Help Desk Business Unit Type",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B52-8R",
    segmentValue: "Intermediary Help Desk Contact Information Qualifier",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "B52-8R",
    segmentValue: "Intermediary Help Desk Contact Information",
    submittedValue: "Q",
    required: "Q",
  },
  {
    segmentNumber: "C83-JR",
    segmentValue: "Intermediary Help Desk Contact Information Extension",
    submittedValue: "Q",
    required: "Q",
  },
];

export const accordionDataResOtherRelated = [
  {
    segmentNumber: "111-AM",
    segmentValue: "Segment Identification",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Plan Type",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "LIS Level",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "LIS Effective Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "LIS Termination Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Disability Effective Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "ESRD Indicator",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "ESRD Effective Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "ESRD Termination Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Hospice Effective Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Hospice Termination Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Hospice Provider Number",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Hospice Facility Name",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Hospice Telephone Number",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Institutional Indicator",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Institutional Effective Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Institutional Termination Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Other Benefit Count",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Other Benefit Type Code",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Other Benefit Effective Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Other Benefit Termination Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "State/Province Address",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Other Benefit Type ID",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Other Benefit Facility Name",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Other Benefit Facility Telephone Number",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Other Benefit Detail Information Count",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Other Benefit Detail Information Qualifier",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Other Benefit Detail Information",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Other Benefit Detail Information Effective Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Other Benefit Detail Information Termination Date",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "C97-KS",
    segmentValue: "Other Benefit Detail Information Provider Number",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "D30-MP",
    segmentValue: "Other Benefit Detail Information Facility Name",
    submittedValue: "",
    required: "",
  },
  {
    segmentNumber: "D30-MP",
    segmentValue: "Other Benefit Detail Information Facility Telephone Number",
    submittedValue: "",
    required: "",
  },
];

export const responseStatus = [
  {
    label: "Header Response Status",
    statusValue: "Accepted",
  },
  {
    label: "Transaction Response Status",
    statusValue: "Paid",
  },
];

// Claim transaction tab //

// PDE Status dialog //
export const PDEStatusDialogAcceptedInfo = [
  {
    id: 1,
    fieldName: "Record ID",
    fieldValue: "ACC",
  },
  {
    id: 2,
    fieldName: "Sequence No",
    fieldValue: "0000001",
  },
  {
    id: 3,
    fieldName: "Claim Control Number",
    fieldValue: "- - - - - - - - - -",
  },
  {
    id: 4,
    fieldName: "Medicare Beneficiary Identifier",
    fieldValue: "123456789",
  },
  {
    id: 5,
    fieldName: "Cardholder ID",
    fieldValue: "330920984",
  },
  {
    id: 6,
    fieldName: "Patient Date Of Birth (DOB)",
    fieldValue: "19650323",
  },
  {
    id: 7,
    fieldName: "Patient Gender Code",
    fieldValue: "1",
  },
  {
    id: 8,
    fieldName: "Date Of Service (DOS)",
    fieldValue: "20190809",
  },
  {
    id: 9,
    fieldName: "Paid Date",
    fieldValue: "20190810",
  },
  {
    id: 10,
    fieldName: "Prescription Service Reference No",
    fieldValue: "1234567890",
  },
  {
    id: 11,
    fieldName: "Filler",
    fieldValue: "- - - - - - - - - -",
  },
  {
    id: 12,
    fieldName: "Product Service ID",
    fieldValue: "2209367890",
  },
  {
    id: 13,
    fieldName: "Service Provider ID Qualifier",
    fieldValue: "01",
  },
  {
    id: 14,
    fieldName: "Service Provider ID",
    fieldValue: "1200099967",
  },
  {
    id: 15,
    fieldName: "Fill Number",
    fieldValue: "56",
  },
  {
    id: 16,
    fieldName: "Dispensing Status",
    fieldValue: "P",
  },
  {
    id: 17,
    fieldName: "Compound Code",
    fieldValue: "1",
  },
  {
    id: 18,
    fieldName: "Dispense As Written (DAW) Product Selection Code",
    fieldValue: "2",
  },
  {
    id: 19,
    fieldName: "Quantity Dispensed",
    fieldValue: "12",
  },
  {
    id: 20,
    fieldName: "Filler",
    fieldValue: "- - - - - - - - - -",
  },
  {
    id: 21,
    fieldName: "Days Supply",
    fieldValue: "45",
  },

  {
    id: 22,
    fieldName: "Prescriber ID Qualifier",
    fieldValue: "08",
  },
  {
    id: 23,
    fieldName: "Prescriber ID",
    fieldValue: "P333000",
  },
  {
    id: 24,
    fieldName: "Drug Coverage Status Code",
    fieldValue: "C",
  },
  {
    id: 25,
    fieldName: "Adjustment Deletion Code",
    fieldValue: "A",
  },
  {
    id: 26,
    fieldName: "Non- Standard Format Code",
    fieldValue: "X",
  },
  {
    id: 27,
    fieldName: "Pricing Exception Code",
    fieldValue: "M",
  },
  {
    id: 28,
    fieldName: "Catastrophic Coverage Code",
    fieldValue: "A",
  },
  {
    id: 29,
    fieldName: "Ingredient Cost Paid",
    fieldValue: "$450.00",
  },
  {
    id: 30,
    fieldName: "Dispensing Fee Paid",
    fieldValue: "$34.23",
  },
  {
    id: 31,
    fieldName: "Total Amount Attributed To Sales Tax",
    fieldValue: "$33.33",
  },
  {
    id: 32,
    fieldName: "Gross Drug Cost Below Out-Of-Pocket Threshold (GDCB)",
    fieldValue: "$340.89",
  },
  {
    id: 33,
    fieldName: "Gross Drug Cost Above Out-Of-Pocket Threshold (GDCA)",
    fieldValue: "$340.89",
  },
  {
    id: 34,
    fieldName: "Patient Pay Amount",
    fieldValue: "$75.00",
  },
  {
    id: 35,
    fieldName: "Other Troop Amount",
    fieldValue: "$15.56",
  },
  {
    id: 36,
    fieldName: "Low Income Cost Sharing Subsidy amount (LICS)",
    fieldValue: "$66.66",
  },
  {
    id: 37,
    fieldName: "Patient Liability Reduction Due To Other Payer Amount (PLRO)",
    fieldValue: "$33.33",
  },
  {
    id: 38,
    fieldName: "Covered D Plan Paid Amount (CPP)",
    fieldValue: "$90.89",
  },
  {
    id: 39,
    fieldName: "Non Covered Plan Paid Amount (NPP)",
    fieldValue: "$120.00",
  },
  {
    id: 40,
    fieldName: "Estimated Rebate At POS",
    fieldValue: "$13.19",
  },
  {
    id: 41,
    fieldName: "Vaccine Administration Fee",
    fieldValue: "$4.00",
  },
  {
    id: 42,
    fieldName: "Prescription Origin Code",
    fieldValue: "1",
  },
  {
    id: 43,
    fieldName: "Date Original Claim Received",
    fieldValue: "20190505",
  },
  {
    id: 44,
    fieldName: "Claim Adjudication Began Timestamp",
    fieldValue: "20191214191415222",
  },
  {
    id: 45,
    fieldName: "Total Gross Covered Drug Cost Accumulator",
    fieldValue: "$396.99",
  },
  {
    id: 46,
    fieldName: "True Out-Of-Pocket Accumulator",
    fieldValue: "$100.00",
  },
  {
    id: 47,
    fieldName: "Brand/Generic Code",
    fieldValue: "B",
  },
  {
    id: 48,
    fieldName: "Beginning Benefit Phase",
    fieldValue: "D",
  },
  {
    id: 49,
    fieldName: "Ending Benefit Phase",
    fieldValue: "N",
  },
  {
    id: 50,
    fieldName: "Reported Gap Discount",
    fieldValue: "$22.22",
  },
  {
    id: 51,
    fieldName: "Tier",
    fieldValue: "1",
  },
  {
    id: 52,
    fieldName: "Formulary Code",
    fieldValue: "F",
  },
  {
    id: 53,
    fieldName: "OAP Indicator",
    fieldValue: "- - - - - - - - - -",
  },
  {
    id: 54,
    fieldName: "Pharmacy Service Type",
    fieldValue: "02",
  },
  {
    id: 55,
    fieldName: "Patient Residence",
    fieldValue: "03",
  },
  {
    id: 56,
    fieldName: "Submission Clarification Code",
    fieldValue: "32",
  },
  {
    id: 57,
    fieldName: "Adjustment Reason Code Qualifier",
    fieldValue: "2",
  },
  {
    id: 58,
    fieldName: "Adjustment Reason Code",
    fieldValue: "RAC",
  },
  {
    id: 59,
    fieldName: "Type Of Fill Code",
    fieldValue: "- - - - - - - - - -",
  },
  {
    id: 60,
    fieldName: "Filler",
    fieldValue: "- - - - - - - - - -",
  },
  {
    id: 61,
    fieldName: "CMS Calculated Gap Discount",
    fieldValue: "$55.55",
  },
  {
    id: 62,
    fieldName: "PBP Of Record",
    fieldValue: "123",
  },
  {
    id: 63,
    fieldName: "Alternate Service Provider ID Qualifier",
    fieldValue: "01",
  },
  {
    id: 64,
    fieldName: "Alternate Service Provider ID",
    fieldValue: "333999333",
  },
  {
    id: 65,
    fieldName: "Original Submitting Contract",
    fieldValue: "12345",
  },
  {
    id: 66,
    fieldName: "P2P Contract Of Record",
    fieldValue: "99999",
  },
  {
    id: 67,
    fieldName: "Corrected Medicare Beneficiary Identifier",
    fieldValue: "1234567890",
  },
];

// PDE Status dialog //
export const PDEStatusDialogRejectedInfo = [
  {
    id: 1,
    fieldName: "Record ID",
    fieldValue: "REJ",
  },
  {
    id: 2,
    fieldName: "Sequence No",
    fieldValue: "0000001",
  },
  {
    id: 3,
    fieldName: "Claim Control Number",
    fieldValue: "- - - - - - - - - -",
  },
  {
    id: 4,
    fieldName: "Medicare Beneficiary Identifier",
    fieldValue: "123456789",
  },
  {
    id: 5,
    fieldName: "Cardholder ID",
    fieldValue: "330920984",
  },
  {
    id: 6,
    fieldName: "Patient Date Of Birth (DOB)",
    fieldValue: "19650323",
  },
  {
    id: 7,
    fieldName: "Patient Gender Code",
    fieldValue: "1",
  },
  {
    id: 8,
    fieldName: "Date Of Service (DOS)",
    fieldValue: "20190809",
  },
  {
    id: 9,
    fieldName: "Paid Date",
    fieldValue: "20190810",
  },
  {
    id: 10,
    fieldName: "Prescription Service Reference No",
    fieldValue: "1234567890",
  },
  {
    id: 11,
    fieldName: "Filler",
    fieldValue: "- - - - - - - - - -",
  },
  {
    id: 12,
    fieldName: "Product Service ID",
    fieldValue: "2209367890",
  },
  {
    id: 13,
    fieldName: "Service Provider ID Qualifier",
    fieldValue: "01",
  },
  {
    id: 14,
    fieldName: "Service Provider ID",
    fieldValue: "1200099967",
  },
  {
    id: 15,
    fieldName: "Fill Number",
    fieldValue: "56",
  },
  {
    id: 16,
    fieldName: "Dispensing Status",
    fieldValue: "P",
  },
  {
    id: 17,
    fieldName: "Compound Code",
    fieldValue: "1",
  },
  {
    id: 18,
    fieldName: "Dispense As Written (DAW) Product Selection Code",
    fieldValue: "2",
  },
  {
    id: 19,
    fieldName: "Quantity Dispensed",
    fieldValue: "12",
  },
  {
    id: 20,
    fieldName: "Filler",
    fieldValue: "- - - - - - - - - -",
  },
  {
    id: 21,
    fieldName: "Days Supply",
    fieldValue: "45",
  },

  {
    id: 22,
    fieldName: "Prescriber ID Qualifier",
    fieldValue: "08",
  },
  {
    id: 23,
    fieldName: "Prescriber ID",
    fieldValue: "P333000",
  },
  {
    id: 24,
    fieldName: "Drug Coverage Status Code",
    fieldValue: "C",
  },
  {
    id: 25,
    fieldName: "Adjustment Deletion Code",
    fieldValue: "A",
  },
  {
    id: 26,
    fieldName: "Non- Standard Format Code",
    fieldValue: "X",
  },
  {
    id: 27,
    fieldName: "Pricing Exception Code",
    fieldValue: "M",
  },
  {
    id: 28,
    fieldName: "Catastrophic Coverage Code",
    fieldValue: "A",
  },
  {
    id: 29,
    fieldName: "Ingredient Cost Paid",
    fieldValue: "$450.00",
  },
  {
    id: 30,
    fieldName: "Dispensing Fee Paid",
    fieldValue: "$34.23",
  },
  {
    id: 31,
    fieldName: "Total Amount Attributed To Sales Tax",
    fieldValue: "$33.33",
  },
  {
    id: 32,
    fieldName: "Gross Drug Cost Below Out-Of-Pocket Threshold (GDCB)",
    fieldValue: "$340.89",
  },
  {
    id: 33,
    fieldName: "Gross Drug Cost Above Out-Of-Pocket Threshold (GDCA)",
    fieldValue: "$340.89",
  },
  {
    id: 34,
    fieldName: "Patient Pay Amount",
    fieldValue: "$75.00",
  },
  {
    id: 35,
    fieldName: "Other Troop Amount",
    fieldValue: "$15.56",
  },
  {
    id: 36,
    fieldName: "Low Income Cost Sharing Subsidy amount (LICS)",
    fieldValue: "$66.66",
  },
  {
    id: 37,
    fieldName: "Patient Liability Reduction Due To Other Payer Amount (PLRO)",
    fieldValue: "$33.33",
  },
  {
    id: 38,
    fieldName: "Covered D Plan Paid Amount (CPP)",
    fieldValue: "$90.89",
  },
  {
    id: 39,
    fieldName: "Non Covered Plan Paid Amount (NPP)",
    fieldValue: "$120.00",
  },
  {
    id: 40,
    fieldName: "Estimated Rebate At POS",
    fieldValue: "$13.19",
  },
  {
    id: 41,
    fieldName: "Vaccine Administration Fee",
    fieldValue: "$4.00",
  },
  {
    id: 42,
    fieldName: "Prescription Origin Code",
    fieldValue: "1",
  },
  {
    id: 43,
    fieldName: "Date Original Claim Received",
    fieldValue: "20190505",
  },
  {
    id: 44,
    fieldName: "Claim Adjudication Began Timestamp",
    fieldValue: "20191214191415222",
  },
  {
    id: 45,
    fieldName: "Total Gross Covered Drug Cost Accumulator",
    fieldValue: "$396.99",
  },
  {
    id: 46,
    fieldName: "True Out-Of-Pocket Accumulator",
    fieldValue: "$100.00",
  },
  {
    id: 47,
    fieldName: "Brand/Generic Code",
    fieldValue: "B",
  },
  {
    id: 48,
    fieldName: "Beginning Benefit Phase",
    fieldValue: "D",
  },
  {
    id: 49,
    fieldName: "Ending Benefit Phase",
    fieldValue: "N",
  },
  {
    id: 50,
    fieldName: "Reported Gap Discount",
    fieldValue: "$22.22",
  },
  {
    id: 51,
    fieldName: "Tier",
    fieldValue: "1",
  },
  {
    id: 52,
    fieldName: "Formulary Code",
    fieldValue: "F",
  },
  {
    id: 53,
    fieldName: "OAP Indicator",
    fieldValue: "- - - - - - - - - -",
  },
  {
    id: 54,
    fieldName: "Pharmacy Service Type",
    fieldValue: "02",
  },
  {
    id: 55,
    fieldName: "Patient Residence",
    fieldValue: "03",
  },
  {
    id: 56,
    fieldName: "Submission Clarification Code",
    fieldValue: "32",
  },
  {
    id: 57,
    fieldName: "Adjustment Reason Code Qualifier",
    fieldValue: "2",
  },
  {
    id: 58,
    fieldName: "Adjustment Reason Code",
    fieldValue: "RAC",
  },
  {
    id: 59,
    fieldName: "Type Of Fill Code",
    fieldValue: "- - - - - - - - - -",
  },
  {
    id: 60,
    fieldName: "Filler",
    fieldValue: "- - - - - - - - - -",
  },
  {
    id: 61,
    fieldName: "CMS Calculated Gap Discount",
    fieldValue: "$55.55",
  },
  {
    id: 62,
    fieldName: "PBP Of Record",
    fieldValue: "123",
  },
  {
    id: 63,
    fieldName: "Alternate Service Provider ID Qualifier",
    fieldValue: "01",
  },
  {
    id: 64,
    fieldName: "Alternate Service Provider ID",
    fieldValue: "333999333",
  },
  {
    id: 65,
    fieldName: "Original Submitting Contract",
    fieldValue: "12345",
  },
  {
    id: 66,
    fieldName: "P2P Contract Of Record",
    fieldValue: "99999",
  },
  {
    id: 67,
    fieldName: "Corrected Medicare Beneficiary Identifier",
    fieldValue: "1234567890",
  },
  {
    id: 68,
    fieldName: "Error Count",
    fieldValue: "10",
  },
  {
    id: 69,
    fieldName: "Error 1",
    fieldValue: "888",
  },
  {
    id: 70,
    fieldName: "Error 2",
    fieldValue: "888",
  },
  {
    id: 71,
    fieldName: "Error 3",
    fieldValue: "888",
  },
  {
    id: 72,
    fieldName: "Error 4",
    fieldValue: "888",
  },
  {
    id: 73,
    fieldName: "Error 5",
    fieldValue: "888",
  },
  {
    id: 74,
    fieldName: "Error 5",
    fieldValue: "888",
  },
  {
    id: 75,
    fieldName: "Error 6",
    fieldValue: "888",
  },
  {
    id: 76,
    fieldName: "Error 6",
    fieldValue: "888",
  },
  {
    id: 77,
    fieldName: "Error 6",
    fieldValue: "888",
  },
  {
    id: 78,
    fieldName: "Error 6",
    fieldValue: "888",
  },
  {
    id: 79,
    fieldName: "Exclusion Reason Code",
    fieldValue: "888",
  },
  {
    id: 80,
    fieldName: "Filler",
    fieldValue: "-",
  },
];

// PDE Status dialog //
