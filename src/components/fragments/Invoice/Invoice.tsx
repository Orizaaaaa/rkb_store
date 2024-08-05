// src/components/Invoice.tsx
import React from 'react';
import { logo } from '../../../image';
import { formatDate, formatRupiah } from '../../../utils/helper';

interface InvoiceProps {
    date: string;
    name: string;
    product: string;
    quantity: number;
    price: number;
    ppn: number;
    grandtotal: number;
    transaction_type: string;
}

const Invoice = React.forwardRef<HTMLDivElement, InvoiceProps>((props, ref) => (
    <div ref={ref} className="p-5 border border-gray-300 bg-white">
        <div className="flex justify-between items-center my-6">
            <div className="left">
                <h1 className="text-2xl font-bold mb-4">Invoice </h1>
                <p className="mb-4">Nama Pembeli: {props.name}</p>
                <p className="mb-2">Date: {formatDate(props.date)} </p>
            </div>

            <div className="right">
                <img src={logo} alt="logo" />
            </div>
        </div>

        <table className="w-full border-collapse">
            <thead>
                <tr>
                    <th className="border border-gray-300 p-2">Nama Product</th>
                    <th className="border border-gray-300 p-2">Transaction</th>
                    <th className="border border-gray-300 p-2">Kuantitas</th>
                    <th className="border border-gray-300 p-2">Price</th>
                    <th className="border border-gray-300 p-2">PPN</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border border-gray-300 p-2"> {props.product}</td>
                    <td className="border border-gray-300 p-2">{props.transaction_type}</td>
                    <td className="border border-gray-300 p-2"> {props.quantity}</td>
                    <td className="border border-gray-300 p-2">{formatRupiah(props.price)}</td>
                    <td className="border border-gray-300 p-2">{formatRupiah(props.ppn)}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={4} className="border border-gray-300 p-2">Total Harga Barang</td>
                    <td className="border border-gray-300 p-2 font-semibold">{formatRupiah(props.grandtotal)}</td>
                </tr>
            </tfoot>
        </table>
    </div>
));

export default Invoice;
