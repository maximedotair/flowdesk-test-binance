import React, { useMemo } from 'react';
import { useTable, useSortBy,usePagination } from 'react-table';

interface Trade {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

interface TradesProps {
  data: Trade[];
}

const Trades = ({ data }: TradesProps) => {
  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Quantity',
        accessor: 'qty',
      },
      {
        Header: 'Time',
        accessor: 'time',
        Cell: ({ value }: { value: number }) => new Date(value).toLocaleString(),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 }, // start on the first page and set page size to 10
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="p-4 bg-white shadow rounded mt-4">
      <h2 className="font-bold mb-2 text-xl text-blue-500">Trades Data:</h2>
      <table {...getTableProps()} className="table-auto w-full mt-2">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ' ↔️'}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="bg-gray-100 hover:bg-gray-200">
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} className="px-4 py-2 border-t">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Trades;
