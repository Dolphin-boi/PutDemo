import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { coilContext } from "../page/Stock.js"

function Table() {

    const { coilList } = useContext(coilContext)

    console.log(coilList)

    return (
        <div className="m-3">
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
                    </tr>
                </thead>
                {coilList.map((value, key) => {
                    return (
                        <tbody key={key}>
                            <tr>
                                <td>TPPC-TCC-BOSTON</td>
                                <td>TCC</td>
                                <td>0.23</td>
                                <td>770</td>
                                <td>COIL</td>
                                <td>T3ULCA</td>
                                <td>50/50</td>
                                <td>BF</td>
                                <td>
                                    <a href="https://github.com/Dolphin-boi/PutDemo">TPPC-TCC-BOSTON-7250</a>
                                </td>
                                <td>7250</td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
    )
}

export default Table;