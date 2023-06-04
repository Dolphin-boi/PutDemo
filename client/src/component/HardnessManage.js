import Axios from "axios"
import { useState, useContext } from "react";
import { listContext } from "../page/AddCoil";
import editIcon from "../resource/pen.svg";


function HardnessManage() {

    const url = "http://localhost:8080"

    const addHardness = () => {
        Axios({
            method: "POST",
            url: url + "/api/sf",
            data: {
                name: name
            }
        }).then((res) => {
            if (res.data.success) {
                setHardnessList([...hardnessList, res.data.data])
            }
        })
    }

    const editHardness = (sfID) => {
        Axios({
            method: "PUT",
            url: url + "/api/sf/" + sfID,
            data: {
                name: modalName
            }
        }).then((res) => {
            if (res.data.success) {
                const updateTemper = res.data.data.newsf
                setHardnessList(hardnessList.map((val) => {
                    return val.sfID === sfID ? {
                        sfID: updateTemper.sfID,
                        name: updateTemper.name
                    } : val
                }))
            }
        })
    }

    const deleteHardness = (sfID) => {
        Axios({
            method: "DELETE",
            url: url + "/api/sf/" + sfID
        }).then((res) => {
            if (res.data.success) {
                setHardnessList(hardnessList.filter((val) => {
                    return val.sfID !== sfID
                }))
            }
        })
    }

    const { hardnessList, setHardnessList } = useContext(listContext)

    const [name, setName] = useState(0)

    const [modalID, setModalID] = useState(0)
    const [modalName, setModalName] = useState(0)

    return (
        <>
            <div className="modal fade" id="hardnessManage" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">จัดการความแข็ง</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <h4>เพิ่มประเภทความแข็ง</h4>
                            <div className="row">
                                <div className="col-6">
                                    <label>ชื่อประเภทความแข็ง</label>
                                    <input className="form-control" onChange={event => {
                                        setName(event.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div className="text-end">
                                <button className="btn btn-success my-2" onClick={event => {
                                    addHardness()
                                }}>เพิ่ม</button>
                            </div>
                            <hr></hr>
                            <div className="m-3">
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>id</th>
                                            <th>ชื่อความแข็ง</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hardnessList.map((val, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{val.sfID}</td>
                                                    <td>{val.name}</td>
                                                    <td>
                                                        <a href="edit" data-bs-toggle="modal" data-bs-target="#editHardness" onClick={() => {
                                                            setModalID(val.sfID)
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

            <div className="modal fade" id="editHardness" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="0">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">แก้ไขความแข็ง</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <label>ชื่อประเภทความแข็ง</label>
                                    <input className="form-control" value={modalName} onChange={event => {
                                        setModalName(event.target.value)
                                    }}></input>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#hardnessManage" onClick={() => {
                                editHardness(modalID)
                            }}>แก้ไขผู้ผลิต</button>
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#hardnessManage" onClick={() => {
                                deleteHardness(modalID)
                            }}>ลบผู้ผลิต</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HardnessManage;