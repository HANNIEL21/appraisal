import React, { useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';

const Table = ({ columns, data, title, children, filter }) => {
    const [searchTerm, setSearchTerm] = useState("");

    // Filtered data based on the search term
    const filteredData = useMemo(() => {
        if (!searchTerm) return data;

        return data.filter(item =>
            columns.some(col => 
                item[col.selector]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [data, searchTerm, columns]);

    const subHeaderComponentMemo = useMemo(() => {
        if (!filter && (!children || children.length === 0)) {
            return null;
        }

        return (
            <div className="w-full flex items-center justify-between">
                {filter ? (
                    <div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full p-2 border rounded"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                ) : (
                    <div></div>
                )}
                <div className="items-end">
                    {children}
                </div>
            </div>
        );
    }, [children, filter, searchTerm]);

    return (
        <DataTable
            responsive
            title={<p className="uppercase text-3xl font-bold">{title}</p>}
            columns={columns}
            data={filteredData}
            pagination
            striped
            highlightOnHover
            subHeader={!!subHeaderComponentMemo}
            subHeaderComponent={subHeaderComponentMemo}
        />
    );
};

export default Table;