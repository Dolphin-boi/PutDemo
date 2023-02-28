import Axios from "axios"
import { useState, useContext } from "react";
import { listContext } from "../page/AddCoil";
import editIcon from "../resource/pen.svg";

function CoatingManage() {

    const url = "http://localhost:8080"

    const addCoating = () => {
        Axios({
            method: "POST",
            url: url + "/api/coating",
            data: {
                name: name
            }
        }).then((res) => {
            if (res.data.success) {
                setCoatingList([...coatingList, res.data.data])
            }
        })
    }

    const editCoating = (coatID) => {
        Axios({
            method: "PUT",
            url: url + "/api/coating/" + coatID,
            data: {
                name: modalName
            }
        }).then((res) => {

            if (res.data.success) {
                const updateTemper = res.data.data.newCoating
                setCoatingList(coatingList.map((val) => {
                    return val.coatID === coatID ? {
                        coatID: updateTemper.coatID,
                        name: updateTemper.name
                    } : val
                }))
            }
        })
    }

    const deleteCoating = (coatID) => {
        Axios({
            method: "DELETE",
            url: url + "/api/coating/" + coatID
        }).then((res) => {
            if (res.data.success) {
                setCoatingList(coatingList.filter((val) => {
                    return val.coatID !== coatID
                }))
            }
        })
    }

    const { coatingList, setCoatingList } = useContext(listContext)

    const [name, setName] = useState(0)

    const [modalID, setModalID] = useState(0)
    const [modalName, setModalName] = useState(0)

    return (
        <>
            <div className="modal fade" id="coatingManage" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">จัดการCoating</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <h4>เพิ่มประเภทCoating</h4>
                            <div className="row">
                                <div className="col-6">
                                    <label>ชื่อประเภทCoating</label>
                                    <input className="form-control" onChange={event => {
                                        setName(event.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div className="text-end">
                                <button className="btn btn-success my-2" onClick={event => {
                                    addCoating()
                                }}>เพิ่ม</button>
                            </div>
                            <hr></hr>
                            <div className="m-3">
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>id</th>
                                            <th>ชื่อ Coating</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {coatingList.map((val, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{val.coatID}</td>
                                                    <td>{val.name}</td>
                                                    <td>
                                                        <a href="edit" data-bs-toggle="modal" data-bs-target="#editCoating" onClick={() => {
                                                            setModalID(val.coatID)
                                                            setModalName(val.name)
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

            <div className="modal fade" id="editCoating" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="0">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">แก้ไขCoating</h1>
                            <button type="button" className="btn-close" data-bs-toggle="modal" data-bs-target="#temperManage"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <label>ชื่อประเภท Coating</label>
                                    <input className="form-control" value={modalName} onChange={event => {
                                        setModalName(event.target.value)
                                    }}></input>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#coatingManage" onClick={() => {
                                editCoating(modalID)
                            }}>แก้ไขผู้ผลิต</button>
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#coatingManage" onClick={() => {
                                deleteCoating(modalID)
                            }}>ลบผู้ผลิต</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CoatingManage;