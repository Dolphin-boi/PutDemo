import Axios from "axios"
import { useEffect, useState, createContext } from "react";
import Table from "../component/Table";

const coilContext = createContext()

function Stock() {

    const url = "http://localhost:8080/api/coil"

    const getStockList = () => {
        Axios({
          method: "GET",
          url: url
        }).then((res) => {
          if (res.data.success) {
            setCoilList(res.data.data)
          }
        })
      }

    process.env.TZ = 'Asia/Bangkok'

    const [coilList, setCoilList] = useState([])
    const [status, setStatus] = useState(1)
    const [vendor, setVendor] = useState(0)
    const [metalType, setMetalType] = useState(0)
    // const [thickness, setThickness] = useState(0)
    // const [width, setWidth] = useState(0)
    // const [lenght, setLength] = useState(0)

    useEffect(() => {
        getStockList()
    }, [])
    return (
        <div className="m-3 card">
            <div className="m-3">
                <div className="p-2 bg-dark text-white">
                    <h1>Stock</h1>
                </div>
                <hr></hr>
                <h5>Filter</h5>
                <form className="row">
                    <div className="col">
                        <label className="form-label">สถานะ</label>
                        <select className="form-select" onChange={event => {
                            setStatus(event.target.value)
                        }}>
                            <option defaultValue="1" value="1">คงคลัง</option>
                            <option value="0">ขายแล้ว</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="form-label">ผู้ผลิต</label>
                        <select className="form-select col" onChange={event => {
                            setVendor(event.target.value)
                        }}>
                            <option defaultValue="0" value="0">ทั้งหมด</option>
                            <option value="TCC">TCC</option>
                            <option value="TTP">TTP</option>
                        </select>
                    </div>
                    <div className="col">
                        <label className="form-label">ประเภทเหล็ก</label>
                        <select className="form-select col" onChange={event => {
                            setMetalType(event.target.value)
                        }}>
                            <option defaultValue="0" value="0">ทั้งหมด</option>
                            <option value="TPPC-TCC-BOSTON">TPPC-TCC-BOSTON</option>
                            <option value="TPPC-TTP-TY">TPPC-TTP-TY</option>
                        </select>
                    </div>
                </form>
                <button className="btn btn-primary">ค้นหา</button>
                <hr></hr>
            </div>
            <coilContext.Provider value={{coilList}}>
                <Table />
            </coilContext.Provider>
        </div>
    )
}

export { coilContext }
export default Stock;