export const getCommunicationSearchMock_calls = () => {
    return [
        {
            id: 1,
            row: 1,
            searchType: "DATE",
            isRequired: true,
            nameSpace: "communicationGrid",
            pixelWidth: 173,
            placeholder: "Call Date Start",
            name: "startDate",
        },
        {
            id: 2,
            row: 1,
            searchType: "DATE",
            isRequired: true,
            nameSpace: "communicationGrid",
            pixelWidth: 173,
            placeholder: "Call Date End",
            name: "endDate",
        },
        {
            id: 3,
            row: 1,
            searchType: "TEXT",
            isRequired: true,
            nameSpace: "communicationGrid",
            pixelWidth: 173,
            placeholder: "Caller Name",
            name: "callerName"
        },
        {
            id: 4,
            row: 1,
            searchType: "DROPDOWN",
            isRequired: true,
            nameSpace: "communicationGrid",
            pixelWidth: 173,
            placeholder: "Caller Type",
            name: "callerType",
            options: [
                {
                    id: 1, displayOption: 'Member', item: 'Member', onClick: () => {
                        window.location.pathname = '/dashPa'
                    }
                },
                { id: 2, displayOption: 'Pharmacy', item: 'Pharmacy' },
                { id: 3, displayOption: 'Prescriber', item: 'Prescriber' },
                { id: 4, displayOption: 'Parent/Caretaker', item: 'Parent/Caretaker' },
                { id: 5, displayOption: 'AOR/Attorney', item: 'AOR/Attorney' },
                { id: 6, displayOption: 'Third Party', item: 'Third Party' },
                { id: 7, displayOption: 'Others', item: 'Others' }
            ]
        },
        {
            id: 4,
            row: 1,
            searchType: "DROPDOWN",
            isRequired: true,
            nameSpace: "communicationGrid",
            pixelWidth: 173,
            placeholder: "Classification",
            name: "classification",
            options: [
                { id: 1, displayOption: 'Inquiry', item: 'Inquiry' },
                { id: 2, displayOption: 'Coverage Determination', item: 'Coverage Determination' },
                { id: 3, displayOption: 'Appeal', item: 'Appeal' },
                { id: 4, displayOption: 'First Call Resolution Griev...', item: 'First Call Resolution Griev...' },
                { id: 5, displayOption: 'Grievance/Complaint', item: 'Grievance/Complaint' },
                { id: 6, displayOption: 'Third Quality of Care Griev...', item: 'Third Quality of Care Griev...' },
                { id: 7, displayOption: 'Client Customized Primar...', item: 'Client Customized Primar...' },
                { id: 8, displayOption: 'Others', item: 'Others' }
            ]
        },
        {
            id: 5,
            row: 1,
            searchType: "CLEAR",
            isRequired: true,
            nameSpace: "communicationGrid",
            pixelWidth: 54,
            placeholder: "",
            name: "",
            className:"calls_other_clearBtn"
        }
    ]
}

export const getCommunicationSearchMock_other = () => {
    return [
        {
            id: 1,
            row: 1,
            placeholder: 'Communication Date Start',
            name: 'communicationStart',
            searchType: 'DATE',
            pixelWidth: 220,
            isRequired: true,
            nameSpace: "communicationGrid",
        },
        {
            id: 2,
            row: 1,
            placeholder: 'Communication Date End',
            name: 'communicationEnd',
            searchType: 'DATE',
            pixelWidth: 220,
            isRequired: true,
            nameSpace: "communicationGrid",
        },
        {
            id: 3,
            row: 1,
            placeholder: 'Communication From',
            name: 'communicationFrom',
            searchType: 'DROPDOWN',
            pixelWidth: 170,
            isRequired: true,
            nameSpace: "communicationGrid",
            options: [
                { id: 1, displayOption: 'CSR', item: 'CSR' },
                { id: 2, displayOption: 'Member', item: 'Member' },
                { id: 3, displayOption: 'Pharmacy', item: 'Pharmacy' },
                { id: 4, displayOption: 'Provider', item: 'Provider' }
            ]
        },
        {
            id: 4,
            row: 1,
            placeholder: 'Communication To',
            name: 'communicationTo',
            searchType: 'DROPDOWN',
            pixelWidth: 170,
            isRequired: true,
            nameSpace: "communicationGrid",
            options: [
                { id: 1, displayOption: 'CSR', item: 'CSR' },
                { id: 2, displayOption: 'Member', item: 'Member' },
                { id: 3, displayOption: 'Pharmacy', item: 'Pharmacy' },
                { id: 4, displayOption: 'Provider', item: 'Provider' }
            ]
        },
        {
            id: 5,
            row: 1,
            placeholder: 'Communication Type',
            name: 'communicationType',
            searchType: 'MULTIDROPDOWN',
            pixelWidth: 170,
            isRequired: true,
            nameSpace: "communicationGrid",
            options: [
                { id: 1, displayOption: 'email', item: 'email' },
                { id: 2, displayOption: 'text message', item: 'text message' }
            ]
        },
        {
            id: 6,
            row: 1,
            placeholder: '',
            name: '',
            searchType: 'CLEAR',
            pixelWidth: 54,
            className: 'doc_other_clearBtn',
            isRequired: true,
            nameSpace: "communicationGrid",
        },
    ]
}