import React from 'react';
import DataTable from 'react-data-table-component';

const Table = ({ columns, data, title }) => {
    return (
        <DataTable
            responsive
            title={<p className='uppercase text-3xl font-bold'>{title}</p>}
            columns={columns} 
            data={data}
            pagination
            striped
            highlightOnHover
        />
    );
};

export default Table;
