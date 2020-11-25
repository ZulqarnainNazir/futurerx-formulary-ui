export const getTapList = () => {
    return [
        {
            id: 1,
            text: "LA"
        },
        {
            id: 2,
            text: "MO/NM"
        },
        {
            id: 3,
            text: "IBF"
        },
        {
            id: 4,
            text: "FGC"
        },
        {
            id: 5,
            text: "PGC"
        },
        {
            id: 6,
            text: "FFF"
        },
        {
            id: 7,
            text: "HI"
        },
        {
            id: 8,
            text: "VBID"
        },
        {
            id: 9,
            text: "CB"
        },
        {
            id: 10,
            text: "LIS"
        },
        {
            id: 11,
            text: "PBST"
        },
        {
            id: 12,
            text: "SSM"
        },
        {
            id: 13,
            text: "AF"
        },
        {
            id: 14,
            text: "SO"
        }
    ]
}

export const getMiniTabs = () => {
    return [
        {
            id: 1,
            text: "Replace"
        },
        {
            id: 2,
            text: "Append"
        },
        {
            id: 3,
            text: "Remove"
        }
    ]
}

// table //
export const columns = [
    {
      title: "Number Of drugs",
      dataIndex: "numberofdrugs",
    },
    {
      title: "Added Drugs",
      dataIndex: "addeddrugs",
    },
    {
      title: "Removed drugs",
      dataIndex: "removeddrugs",
    }
  ];