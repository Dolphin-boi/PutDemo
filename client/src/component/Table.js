import { useState, useEffect, useContext } from "react"
import { coilContext } from "../page/Stock.js"

function Table() {

    const filterCoilList = () => {
        setFilteredCoilList(coilList.filter((val) => {
            // if(val.metaltype.vendor.vendorID != vendor) return false

            // if (val.metaltype.typeID != metalType) return false

            // eslint-disable-next-line
            return val.status.statusID == status
        }))
    }

    const { coilList, vendor, status, metalType } = useContext(coilContext)

    const [filteredCoilList, setFilteredCoilList] = useState([])

    useEffect(() => {
        filterCoilList()
    }, [coilList, vendor, status, metalType])

    return (
        <div className="m-3">
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
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
                {filteredCoilList.map((val, key) => {
                    return (
                        <tbody key={key}>
                            <tr>
                                <td>{val.coilID}</td>
                                <td>{val.metaltype.name}</td>
                                <td>{val.metaltype.vendor.name}</td>
                                <td>{val.thickness}</td>
                                <td>{val.width}</td>
                                <td>{val.length}</td>
                                <td>{val.temperID}</td>
                                <td>{val.coatID}</td>
                                <td>{val.sfID}</td>
                                <td>
                                    <a href="https://github.com/Dolphin-boi/PutDemo">{val.name}</a>
                                </td>
                                <td>{val.weight}</td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>
        </div>
    )
}

export default Table;