import axios from "axios";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { invoiceContext } from "../page/Quotation";


const ItemList = () => {

    const { selectedList } = useContext(invoiceContext)

    return (
        <>
            {selectedList.map((val, key) => {
                return (
                    <tbody key={key}>
                        <tr>
                            <td>{val.metaltype.name}</td>
                            <td>{val.metaltype.vendor.name}</td>
                            <td>{val.thickness}</td>
                            <td>{val.width}</td>
                            <td>{val.length}</td>
                            <td>{val.temperID}</td>
                            <td>{val.coatID}</td>
                            <td>{val.sfID}</td>
                            <td>{val.name}</td>
                            <td>{val.weight}</td>
                            <td>{val.price}</td>
                        </tr>
                    </tbody>
                )
            })}
        </>
    )

}

const CustomerName = () => {

    const { customer } = useContext(invoiceContext)

    return (
        <p>{customer}</p>
    )
}

const CustomerAddress = () => {

    const { address } = useContext(invoiceContext)

    return (
        <p>{address}</p>
    )
}


class ComponentToPrint extends React.Component {

    render() {
        return (
            <div className="m-3">
                <h1 className="text-center">บริษัท ธ. พุทธรักษาจัดกัด</h1>
                <h2 className="text-center">T. BUD-DHA RAKSA CO., LTD.</h2>
                <h5 className="text-center">30/131 หมู่1 นิคมอุตสาหกรรมสินสาคร ต.โคกขาม อ.เมืองสมุทรสาคาร จ.สมุทรสาคร 74000</h5>
                <h5 className="text-center">โทร 02-402-2234 แฟกซ์ 02-402-2233</h5>
                <hr></hr>
                <div className="m-3">
                    <div className="m-3">
                        <CustomerName></CustomerName>
                        <CustomerAddress></CustomerAddress>
                        <table className="table">
                            <thead className="thead-dark">
                                <tr>
                                    <th>เหล็ก</th>
                                    <th>ผู้ผลิต</th>
                                    <th>หนา</th>
                                    <th>กว้าง</th>
                                    <th>ยาว</th>
                                    <th>Temper</th>
                                    <th>Coating</th>
                                    <th>SF</th>
                                    <th>ชื่อลูก</th>
                                    <th>น้ำหนัก</th>
                                    <th>ราคา</th>
                                </tr>
                            </thead>
                            <ItemList ></ItemList>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ComponentToPrint;