import Axios from "axios"
import { useState, useContext } from "react";
import { listContext } from "../page/AddCoil";
import editIcon from "../resource/pen.svg";

function TypeManage() {

    const url = "http://localhost:8080"

    const addMetalType = () => {
        Axios({
            method: "POST",
            url: url + "/api/metalType",
            data: {
                name: name,
                vendorID: vendor
            }
        }).then((res) => {
            if (res.data.success) {
                setMetalTypeList([...metalTypeList, res.data.data])
            }
        })
    }

    const editMetalType = (MetalTypeID) => {
        Axios({
            method: "PUT",
            url: url + "/api/metalType/" + MetalTypeID,
            data: {
                name: modalName,
                vendorID: modalVendor
            }
        }).then((res) => {
            if (res.data.success) {
                const updateMetalType = res.data.data.newmetalType
                setMetalTypeList(metalTypeList.map((val) => {
                    return val.typeID === MetalTypeID ? {
                        typeID: updateMetalType.typeID,
                        vendorID: updateMetalType.vendorID,
                        name: updateMetalType.name,
                        vendor: updateMetalType.vendor
                    } : val
                }))
            }
        })
    }

    const deleteMetalType = (MetalTypeID) => {
        Axios({
            method: "DELETE",
            url: url + "/api/metalType/" + MetalTypeID
        }).then((res) => {
            if (res.data.success) {
                setMetalTypeList(metalTypeList.filter((val) => {
                    return val.typeID !== MetalTypeID
                }))
            }
        })
    }

    const { metalTypeList, setMetalTypeList, vendorList } = useContext(listContext)

    const [vendor, setVendor] = useState(0)
    const [name, setName] = useState(0)

    const [modalID, setModalID] = useState(0)
    const [modalVendor, setModalVendor] = useState(0)
    const [modalName, setModalName] = useState(0)

    return (
        <>
            <div className="modal fade" id="typeManage" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">จัดการประเภทเหล็ก</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <h4>เพิ่มประเภทเหล็ก</h4>
                            <div className="row">
                                <div className="col">
                                    <label>ผู้ผลิต</label>
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
                                    <label>ชื่อประเภทเหล็ก</label>
                                    <input className="form-control" onChange={event => {
                                        setName(event.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div className="text-end">
                                <button className="btn btn-success my-2" onClick={event => {
                                    addMetalType()
                                }}>เพิ่ม</button>
                            </div>
                            <hr></hr>
                            <div className="m-3">
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>id</th>
                                            <th>ชื่อผู้ผลิต</th>
                                            <th>ชื่อประเภทเหล็ก</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {metalTypeList.map((val, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{val.typeID}</td>
                                                    <td>{val.vendor.name}</td>
                                                    <td>{val.name}</td>
                                                    <td>
                                                        <a href="edit" data-bs-toggle="modal" data-bs-target="#editType" onClick={() => {
                                                            setModalID(val.typeID)
                                                            setModalName(val.name)
                                                            setModalVendor(val.vendor.vendorID)
                                                        }}>
                                                            <img src={editIcon} alt="edit button"></img>
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editType" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="0">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">แก้ไขประเภท</h1>
                            <button type="button" className="btn-close" data-bs-toggle="modal" data-bs-target="#typeManage"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <label>ผู้ผลิต</label>
                                    <select className="form-select col" value={modalVendor} onChange={event => {
                                        setModalVendor(event.target.value)
                                    }}>
                                        {vendorList.map((val, key) => {
                                            if (key === modalVendor) {
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
                                    <label>ชื่อประเภทเหล็ก</label>
                                    <input className="form-control" value={modalName} onChange={event => {
                                        setModalName(event.target.value)
                                    }}></input>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#typeManage" onClick={() => {
                                editMetalType(modalID)
                            }}>แก้ไขผู้ผลิต</button>
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#typeManage" onClick={() => {
                                deleteMetalType(modalID)
                            }}>ลบผู้ผลิต</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TypeManage;