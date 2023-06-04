import Axios from "axios"
import { useEffect, useState, createContext } from "react";
import VendorManage from "../component/VendorManage";
import TypeManage from "../component/TypeManage";
import TemperManage from "../component/TemperManage";
import CoatingManage from "../component/CoatingManage";
import HardnessManage from "../component/HardnessManage";

const listContext = createContext()

function AddCoil() {

    const url = "http://localhost:8080"

    const getVendorList = () => {
        Axios({
            method: "GET",
            url: url + "/api/vendor"
        }).then((res) => {
            if (res.data.success) {
                setVendorList(res.data.data)
                setMetalType(res.data.data[0].vendorID)
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
                setMetalType(res.data.data[0].typeID)
            }
        })
    }

    const getTemperList = () => {
        Axios({
            method: "GET",
            url: url + "/api/temper"
        }).then((res) => {
            if (res.data.success) {
                setTemperList(res.data.data)
                setTemper(res.data.data[0].temperID)
            }
        })
    }

    const getCoatingList = () => {
        Axios({
            method: "GET",
            url: url + "/api/coating"
        }).then((res) => {
            if (res.data.success) {
                setCoatingList(res.data.data)
                setCoating(res.data.data[0].coatID)
            }
        })
    }

    const getHardnessList = () => {
        Axios({
            method: "GET",
            url: url + "/api/sf"
        }).then((res) => {
            if (res.data.success) {
                setHardnessList(res.data.data)
                setHardness(res.data.data[0].sfID)
            }
        })
    }

    const addNewCoil = () => {
        Axios({
            method: "POST",
            url: url + "/api/coil",
            data: {
                name: metalTypeList[metalType-1].name + "-" + weight,
                thickness: thickness,
                width: width,
                length: lenght,
                weight: weight,
                typeID: metalType,
                vendorID: vendor,
                temperID: temper,
                coatID: coating,
                sfID: hardness,
                // statusID: 1 /* แก้ขัด */
            }
        }).then((res) => {
            if (res.data.success) {
                console.log(res.data)
            }
        })
    }

    

    const [vendorList, setVendorList] = useState([])
    const [metalTypeList, setMetalTypeList] = useState([])
    const [temperList, setTemperList] = useState([])
    const [coatingList, setCoatingList] = useState([])
    const [hardnessList, setHardnessList] = useState([])

    const [vendor, setVendor] = useState(0)
    const [metalType, setMetalType] = useState(0)
    const [thickness, setThickness] = useState(0)
    const [temper, setTemper] = useState(0)
    const [coating, setCoating] = useState(0)
    const [hardness, setHardness] = useState(0)
    const [width, setWidth] = useState(0)
    const [lenght, setLength] = useState(0)
    const [weight, setWeight] = useState(0)

    useEffect(() => {
        getVendorList()
        getMetalTypeList()
        getTemperList()
        getCoatingList()
        getHardnessList()
    }, [])

    return (
        <>
            <div className="m-3 card">
                <div className="m-3">
                    <div className="p-2 bg-dark text-white">
                        <h1>Add coil</h1>
                    </div>
                    <hr></hr>
                    <form>
                        <div className="row my-2">
                            <div className="col">
                                <label className="form-label">ผู้ผลิต</label>
                                <div className="input-group">
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
                                    <button type="button" className="input-group-text" data-bs-toggle="modal" data-bs-target="#vendorManage">เพิ่ม</button>
                                </div>
                            </div>
                            <div className="col">
                                <label className="form-label">ประเภทเหล็ก</label>
                                <div className="input-group">
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
                                    <button type="button" className="input-group-text" data-bs-toggle="modal" data-bs-target="#typeManage">เพิ่ม</button>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row my-2">
                            <div className="col">
                                <label className="form-label">Temper</label>
                                <div className="input-group">
                                    <select className="form-select col" onChange={event => {
                                        setTemper(event.target.value)
                                    }}>
                                        {temperList.map((val, key) => {
                                            if (key === 0) {
                                                return (
                                                    <option defaultValue={val.temperID} value={val.temperID} key={key}>{val.name}</option>
                                                )
                                            }
                                            else {
                                                return (
                                                    <option value={val.temperID} key={key}>{val.name}</option>
                                                )
                                            }
                                        })}
                                    </select>
                                    <button type="button" className="input-group-text" data-bs-toggle="modal" data-bs-target="#temperManage">เพิ่ม</button>
                                </div>
                            </div>
                            <div className="col">
                                <label className="form-label">Coating</label>
                                <div className="input-group">
                                    <select className="form-select col" onChange={event => {
                                        setCoating(event.target.value)
                                    }}>
                                        {coatingList.map((val, key) => {
                                            if (key === 0) {
                                                return (
                                                    <option defaultValue={val.coatID} value={val.coatID} key={key}>{val.name}</option>
                                                )
                                            }
                                            else {
                                                return (
                                                    <option value={val.coatID} key={key}>{val.name}</option>
                                                )
                                            }
                                        })}
                                    </select>
                                    <button type="button" className="input-group-text" data-bs-toggle="modal" data-bs-target="#coatingManage">เพิ่ม</button>
                                </div>
                            </div>
                            <div className="col">
                                <label className="form-label">ความแข็ง</label>
                                <div className="input-group">
                                    <select className="form-select col" onChange={event => {
                                        setHardness(event.target.value)
                                    }}>
                                        {hardnessList.map((val, key) => {
                                            if (key === 0) {
                                                return (
                                                    <option defaultValue={val.sfID} value={val.sfID} key={key}>{val.name}</option>
                                                )
                                            }
                                            else {
                                                return (
                                                    <option value={val.sfID} key={key}>{val.name}</option>
                                                )
                                            }
                                        })}
                                    </select>
                                    <button type="button" className="input-group-text" data-bs-toggle="modal" data-bs-target="#hardnessManage">เพิ่ม</button>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row my-2">
                            <div className="col">
                                <label className="form-label">ความหนา</label>
                                <input className="form-control" onChange={event => {
                                    setThickness(event.target.value)
                                }}></input>
                            </div>
                            <div className="col">
                                <label className="form-label">ความกว้าง</label>
                                <input className="form-control" onChange={event => {
                                    setWidth(event.target.value)
                                }}></input>
                            </div>
                            <div className="col">
                                <label className="form-label">ความยาว</label>
                                <input className="form-control" onChange={event => {
                                    setLength(event.target.value)
                                }}></input>
                            </div>
                            <div className="col">
                                <label className="form-label">น้ำหนัก</label>
                                <input className="form-control" onChange={event => {
                                    setWeight(event.target.value)
                                }}></input>
                            </div>
                        </div>
                    </form>
                    <div className="text-end">
                        <button className="btn btn-success my-2" onClick={event => {
                            addNewCoil()
                        }}>เพิ่ม</button>
                    </div>
                </div>
            </div>

            <listContext.Provider value={{
                vendorList,
                setVendorList,
                metalTypeList,
                setMetalTypeList,
                temperList,
                setTemperList,
                coatingList,
                setCoatingList,
                hardnessList,
                setHardnessList
            }}>
            <VendorManage />
            <TypeManage />
            <TemperManage />
            <CoatingManage />
            <HardnessManage />
            </listContext.Provider>
        </>
    )
}

export { listContext }
export default AddCoil;