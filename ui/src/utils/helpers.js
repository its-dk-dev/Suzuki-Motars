// Custom renderer to display accessories in a nested format
const AccessoriesRenderer = ({ value }) => (
    <ul>
      {value.map((accessory, index) => (
        <li key={index}>{`${accessory.name}: ${accessory.price}`}</li>
      ))}
    </ul>
);

const transformDataForHeaderRow = (data) => {
    if (!data) {
        return { columnDefs: [], newData: [] };
    }
    // Extract the column headers from the keys of the first row
    const headers = Object.keys(data[0]).filter(key => key !== 'Name'); // ['exShow', 'rto', 'insurance']

    // Create new column definitions using the 'name' property as column headers
    const columnDefs = [
        { headerName: 'Bike Name', field: 'header' }, // Placeholder for first column
        ...data.map(row => ({
            headerName: row.Name,
            field: row.Name,
        }))
    ];

    // Create a new row of data for the column headers
    const newData = headers.map(header => {
        const row = { header }; // Set the header field as the first cell
        data.forEach(entry => {
            row[entry.Name] = entry[header]; // Populate the new columns with data
        });
        return row;
    });

    return { columnDefs, newData };
}

export {
    transformDataForHeaderRow
}
