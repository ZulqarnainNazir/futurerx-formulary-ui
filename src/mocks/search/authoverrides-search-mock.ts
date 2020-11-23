export const getAuthOverridesSearchMock = () => {
    return [
        {
            id: 1,
            row: 1,
            searchType: "TEXT",
            nameSpace: "authOverridesGrid",
            isRequired: true,
            pixelWidth: 173,
            placeholder: "Auth or Override #",
            name: "authOverrideId",
        },
        {
            id: 2,
            row: 1,
            searchType: "TEXT",
            nameSpace: "authOverridesGrid",
            isRequired: true,
            pixelWidth: 173,
            placeholder: "Drug Name",
            name: "drugName",
        },
        {
            id: 3,
            row: 1,
            searchType: "DATE",
            nameSpace: "authOverridesGrid",
            isRequired: true,
            pixelWidth: 173,
            placeholder: "Start Date",
            name: "startDate",
        },
        {
            id: 4,
            row: 1,
            searchType: "DATE",
            nameSpace: "authOverridesGrid",
            isRequired: true,
            pixelWidth: 173,
            placeholder: "End Date",
            name: "endDate",
        },
        {
            id: 5,
            row: 1,
            searchType: "CLEAR",
            nameSpace: "authOverridesGrid",
            isRequired: true,
            className:'clear-btn-grid',
            pixelWidth: 54,
            placeholder: "",
            name: "",
        },
        {
            id: 6,
            row: 2,
            searchType: "DROPDOWN",
            nameSpace: "authOverridesGrid",
            isRequired: true,
            pixelWidth: 173,
            placeholder: "Override Type",
            name: "overrideType",
            options: [
                { id: 1, displayOption: "Restrictive", item: "Restrictive" },
                { id: 2, displayOption: "Clinical", item: "Clinical" },
                { id: 3, displayOption: "Administrative", item: "Administrative" }
            ]
        }
    ]
}