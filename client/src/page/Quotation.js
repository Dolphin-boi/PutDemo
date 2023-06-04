import Axios from "axios"
import { useEffect, useState, useRef, createContext } from "react";
import ReactToPrint from 'react-to-print';
import ComponentToPrint from "../component/Invoice";

const invoiceContext = createContext()

function Quotation() {

    const url = "http://localhost:8080"

    const getStockList = () => {
        Axios({
            method: "GET",
            url: url + "/api/coil"
        }).then((res) => {
            if (res.data.success) {
                setCoilList(res.data.data)
            }
        })
    }

    const addSelected = (coil) => {
        setSelectedList([...selectedList, coil])
    }

    const removeSelected = (coil) => {
        setSelectedList(selectedList.filter((val) => {
            return val !== coil
        }))
    }

    const componentRef = useRef();

    const [coilList, setCoilList] = useState([])
    const [selectedList, setSelectedList] = useState([])
    const [customer, setCustomer] = useState(0)
    const [address, setAddress] = useState(0)

    useEffect(() => {
        getStockList()
    }, [])

    return (
        <div className="m-3 card">
            <div className="row m-3">
                <div className="col">
                    <label className="form-label">ชื่อลูกค้า</label>
                    <input className="form-control" onChange={event => {
                        setCustomer(event.target.value)
                    }}></input>
                </div>
                <div className="col">
                    <label className="form-label">ที่อยู่</label>
                    <input className="form-control" onChange={event => {
                        setAddress(event.target.value)
                    }}></input>
                </div>
            </div>
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
                            <th>เลือก</th>
                            <th>ราคา</th>
                        </tr>
                    </thead>
                    {coilList.map((val, key) => {
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
                                    <td>{val.name}</td>
                                    <td>{val.weight}</td>
                                    <td>
                                        <input className="form-check-input" type="checkbox" onChange={(event => {
                                            if (event.target.checked) {
                                                addSelected(val)
                                            }
                                            else {
                                                removeSelected(val)
                                            }
                                        })} />
                                    </td>
                                    <td>
                                        <input className="form-control" onChange={event => {
                                            val.price = (event.target.value)
                                        }}></input>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
            <div>
                <ReactToPrint
                    trigger={() => <button>Print this out!</button>}
                    content={() => componentRef.current}
                />
                <div style={{ display: 'none' }}>
                    <invoiceContext.Provider value={{ selectedList, customer, address }}>
                        <ComponentToPrint ref={componentRef} props={selectedList} />
                    </invoiceContext.Provider>
                </div>
            </div>
        </div>
    )
}

export { invoiceContext };
export default Quotation;