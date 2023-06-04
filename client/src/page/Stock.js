import Axios from "axios"
import { useEffect, useState, createContext } from "react";
import Table from "../component/Table";

const coilContext = createContext()

function Stock() {

    process.env.TZ = 'Asia/Bangkok'

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

    const getStatusList = () => {
        Axios({
            method: "GET",
            url: url + "/api/status"
        }).then((res) => {
            if (res.data.success) {
                setStatusList(res.data.data)
            }
        })
    }

    const getVendorList = () => {
        Axios({
            method: "GET",
            url: url + "/api/vendor"
        }).then((res) => {
            if (res.data.success) {
                setVendorList(res.data.data)
            }
        })
    }

    const getMetalTypeList = () => {
        Axios({
            method: "GET",
            url: url + "/api/metalType"
        }).then((res) => {
            if (res.data.success) {
                setMetalTypeList(res.data.data)
            }
        })
    }

    const [coilList, setCoilList] = useState([])
    const [statusList, setStatusList] = useState([])
    const [vendorList, setVendorList] = useState([])
    const [metalTypeList, setMetalTypeList] = useState([])
    const [status, setStatus] = useState(1)
    const [vendor, setVendor] = useState(0)
    const [metalType, setMetalType] = useState(0)
    // const [thickness, setThickness] = useState(0)
    // const [width, setWidth] = useState(0)
    // const [lenght, setLength] = useState(0)

    useEffect(() => {
        getStockList()
        getStatusList()
        getVendorList()
        getMetalTypeList()
        console.log("api")
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
                            {statusList.map((val, key) => {
                                if (key === 0) {
                                    return (
                                        <option defaultValue={val.statusID} value={val.statusID} key={key}>{val.name}</option>
                                    )
                                }
                                else {
                                    return (
                                        <option value={val.statusID} key={key}>{val.name}</option>
                                    )
                                }
                            })}
                        </select>
                    </div>
                    <div className="col">
                        <label className="form-label">ผู้ผลิต</label>
                        <select className="form-select col" onChange={event => {
                            setVendor(event.target.value)
                        }}>
                            {vendorList.map((val, key) => {
                                if (key === 0) {
                                    return (
                                        <option defaultValue={val.vendorID} value={val.vendorID} key={key}>{val.name}</option>
                                    )
                                }
                                else {
                                    return (
                                        <option value={val.vendorID} key={key}>{val.name}</option>
                                    )
                                }
                            })}
                        </select>
                    </div>
                    <div className="col">
                        <label className="form-label">ประเภทเหล็ก</label>
                        <select className="form-select col" onChange={event => {
                            setMetalType(event.target.value)
                        }}>
                            {metalTypeList.map((val, key) => {
                                if (key === 0) {
                                    return (
                                        <option defaultValue={val.typeID} value={val.typeID} key={key}>{val.name}</option>
                                    )
                                }
                                else {
                                    return (
                                        <option value={val.typeID} key={key}>{val.name}</option>
                                    )
                                }
                            })}
                        </select>
                    </div>
                </form>
                <button className="btn btn-primary">ค้นหา</button>
                <hr></hr>
            </div>
            <coilContext.Provider value={{ 
                coilList,
                vendor,
                status,
                metalType
                }}>
                <Table />
            </coilContext.Provider>
        </div>
    )
}

export { coilContext }
export default Stock;