import Axios from "axios"
import { useContext, useState } from "react";
import { listContext } from "../page/AddCoil";
import editIcon from "../resource/pen.svg";

function VendorManage() {

    const url = "http://localhost:8080"

    const addVendor = () => {
        Axios({
            method: "POST",
            url: url + "/api/vendor",
            data: {
                name: name,
                contact: contact,
                email: email,
                address: address
            }
        }).then((res) => {
            if (res.data.success) {
                setVendorList([...vendorList, res.data.data])
            }
        })
    }

    const editVendor = (vendorID) => {
        Axios({
            method: "PUT",
            url: url + "/api/vendor/" + vendorID,
            data: {
                name: modalName,
                contact: modalContact,
                email: modalEmail,
                address: modalAddress
            }
        }).then((res) => {
            if (res.data.success) {
                const updateVendor = res.data.data.newvendor
                setVendorList(vendorList.map((val) => {
                    return val.vendorID === vendorID ? {
                        vendorID: updateVendor.vendorID,
                        name: updateVendor.name,
                        contact: updateVendor.contact,
                        email: updateVendor.email,
                        address: updateVendor.address
                    } : val
                }))
            }
        })
    }

    const deleteVendor = (vendorID) => {
        Axios({
            method: "DELETE",
            url: url + "/api/vendor/" + vendorID
        }).then((res) => {
            if (res.data.success) {
                setVendorList(vendorList.filter((val) => {
                    return val.vendorID !== vendorID
                }))
            }
        })
    }

    const { vendorList, setVendorList } = useContext(listContext)

    const [name, setName] = useState(0)
    const [contact, setContact] = useState(0)
    const [email, setEmail] = useState(0)
    const [address, setAddress] = useState(0)

    const [modalID, setModalID] = useState(0)
    const [modalName, setModalName] = useState(0)
    const [modalContact, setModalContact] = useState(0)
    const [modalEmail, setModalEmail] = useState(0)
    const [modalAddress, setModalAddress] = useState(0)

    return (
        <>
            <div className="modal fade" id="vendorManage" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">จัดการผู้ผลิต</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <h4>เพิ่มผู้ผลิต</h4>
                            <div className="row">
                                <div className="col">
                                    <label>ชื่อผู้ผลิต</label>
                                    <input className="form-control" onChange={event => {
                                        setName(event.target.value)
                                    }}></input>
                                </div>
                                <div className="col">
                                    <label>เบอร์โทร</label>
                                    <input className="form-control" onChange={event => {
                                        setContact(event.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>email</label>
                                    <input className="form-control" onChange={event => {
                                        setEmail(event.target.value)
                                    }}></input>
                                </div>
                                <div className="col">
                                    <label>ที่อยู่</label>
                                    <textarea className="form-control" onChange={event => {
                                        setAddress(event.target.value)
                                    }}></textarea>
                                </div>
                            </div>
                            <div className="text-end">
                                <button className="btn btn-success my-2" onClick={event => {
                                    addVendor()
                                }}>เพิ่ม</button>
                            </div>
                            <hr></hr>
                            <div className="m-3">
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>id</th>
                                            <th>ชื่อผู้ผลิต</th>
                                            <th>เบอร์โทรติดต่อ</th>
                                            <th>email</th>
                                            <th>ที่อยู่</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    {vendorList.map((value, key) => {
                                        return (
                                            <tbody key={key}>
                                                <tr>
                                                    <td>{value.vendorID}</td>
                                                    <td>{value.name}</td>
                                                    <td>{value.contact}</td>
                                                    <td>{value.email}</td>
                                                    <td>{value.address}</td>
                                                    <td>
                                                        <a href="edit" data-bs-toggle="modal" data-bs-target="#editVendor" onClick={() => {
                                                            setModalID(value.vendorID)
                                                            setModalName(value.name)
                                                            setModalContact(value.contact)
                                                            setModalEmail(value.email)
                                                            setModalAddress(value.address)
                                                        }}>
                                                            <img src={editIcon} alt="edit button"></img>
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    })
                                    }
                                </table>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editVendor" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="0">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">จัดการผู้ผลิต</h1>
                            <button type="button" className="btn-close" data-bs-toggle="modal" data-bs-target="#vendorManage"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col">
                                    <label>ชื่อผู้ผลิต</label>
                                    <input className="form-control" value={modalName} onChange={event => {
                                        setModalName(event.target.value)
                                    }}></input>
                                </div>
                                <div className="col">
                                    <label>เบอร์โทร</label>
                                    <input className="form-control" value={modalContact} onChange={event => {
                                        setModalContact(event.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label>email</label>
                                    <input className="form-control" value={modalEmail} onChange={event => {
                                        setModalEmail(event.target.value)
                                    }}></input>
                                </div>
                                <div className="col">
                                    <label>ที่อยู่</label>
                                    <textarea className="form-control" value={modalAddress} onChange={event => {
                                        setModalAddress(event.target.value)
                                    }}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#vendorManage" onClick={() => {
                                editVendor(modalID)
                            }}>แก้ไขผู้ผลิต</button>
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#vendorManage" onClick={() => {
                                deleteVendor(modalID)
                            }}>ลบผู้ผลิต</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VendorManage;