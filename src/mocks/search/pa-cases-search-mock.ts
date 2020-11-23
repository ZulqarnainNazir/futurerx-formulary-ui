export const getPaCasesSearchData = () => {
    return [
        {
            id: 1,
            row: 1,
            searchType: "TEXT",
            isRequired: true,
            nameSpace: 'pacasesGrid',
            pixelWidth: 75,
            placeholder: "CASE #",
            name: "case",
        },
        {
            id: 2,
            row: 1,
            searchType: "DROPDOWN",
            isRequired: true,
            nameSpace: 'pacasesGrid',
            pixelWidth: 170,
            placeholder: "Classification",
            name: "classification",
            options: [{ id: 1, displayOption: 'Exception', item: "Exception" }, { id: 2, displayOption: 'Prior Auth', item: "Prior Auth" }]
        },
        {
            id: 3,
            row: 1,
            searchType: "DROPDOWN",
            isRequired: true,
            nameSpace: 'pacasesGrid',
            pixelWidth: 170,
            placeholder: "Priority",
            name: "priorityType",
            options: [{ id: 1, displayOption: 'Standard', item: "Standard" }, { id: 2, displayOption: 'Expedited', item: "Expedited" }]
        },
        {
            id: 4,
            row: 1,
            searchType: "DROPDOWN",
            isRequired: true,
            nameSpace: 'pacasesGrid',
            pixelWidth: 208,
            placeholder: "Status",
            name: "status",
            options: [{ id: 1, displayOption: 'Open', item: "Open" }, { id: 2, displayOption: 'Approved', item: "Approved" }, { id: 3, displayOption: 'Denied', item: "Denied" }, { id: 4, displayOption: 'Withdrawn', item: "Withdrawn" }]
        },
        {
            id: 5,
            row: 1,
            searchType: "TEXT",
            isRequired: true,
            nameSpace: 'pacasesGrid',
            pixelWidth: 170,
            placeholder: "Drug Label",
            name: "drugLabel"
        },
        {
            id: 6,
            row: 1,
            searchType: "CLEAR",
            isRequired: true,
            nameSpace: 'pacasesGrid',
            pixelWidth: 54,
            className:'clear-btn-grid',
            placeholder: "",
            value: [1, 2, 3, 4, 5, 7, 8],
            name: ""
        },
        {
            id: 7,
            row: 2,
            searchType: "DATE",
            isRequired: true,
            nameSpace: 'pacasesGrid',
            pixelWidth: 170,
            placeholder: "Start date",
            name: "startDate"
        },
        {
            id: 8,
            row: 2,
            searchType: "DATE",
            isRequired: true,
            nameSpace: 'pacasesGrid',
            pixelWidth: 170,
            placeholder: "End date",
            name: "endDate"
        }
    ]
}