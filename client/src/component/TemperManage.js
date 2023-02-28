import Axios from "axios"
import { useState, useContext } from "react";
import { listContext } from "../page/AddCoil";
import editIcon from "../resource/pen.svg";

function TemperManage() {

    const url = "http://localhost:8080"

    const addTemper = () => {
        Axios({
            method: "POST",
            url: url + "/api/temper",
            data: {
                name: name
            }
        }).then((res) => {
            if (res.data.success) {
                setTemperList([...temperList, res.data.data])
            }
        })
    }

    const editTemper = (temperID) => {
        Axios({
            method: "PUT",
            url: url + "/api/temper/" + temperID,
            data: {
                name: modalName
            }
        }).then((res) => {
            if (res.data.success) {
                const updateTemper = res.data.data.newtemper
                setTemperList(temperList.map((val) => {
                    return val.temperID === temperID ? {
                        temperID: updateTemper.temperID,
                        name: updateTemper.name
                    } : val
                }))
            }
        })
    }

    const deleteTemper = (temperID) => {
        Axios({
            method: "DELETE",
            url: url + "/api/temper/" + temperID
        }).then((res) => {
            if (res.data.success) {
                setTemperList(temperList.filter((val) => {
                    return val.temperID !== temperID
                }))
            }
        })
    }

    const { temperList, setTemperList } = useContext(listContext)

    const [name, setName] = useState(0)

    const [modalID, setModalID] = useState(0)
    const [modalName, setModalName] = useState(0)

    return (
        <>
            <div className="modal fade" id="temperManage" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">จัดการtemper</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <h4>เพิ่มประเภท Temper</h4>
                            <div className="row">
                                <div className="col-6">
                                    <label>ชื่อ Temper</label>
                                    <input className="form-control" onChange={event => {
                                        setName(event.target.value)
                                    }}></input>
                                </div>
                            </div>
                            <div className="text-end">
                                <button className="btn btn-success my-2" onClick={event => {
                                    addTemper()
                                }}>เพิ่ม</button>
                            </div>
                            <hr></hr>
                            <div className="m-3">
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>id</th>
                                            <th>ชื่อ Temper</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {temperList.map((val, key) => {
                                            return (
                                                <tr key={key}>
                                                    <td>{val.temperID}</td>
                                                    <td>{val.name}</td>
                                                    <td>
                                                        <a href="edit" data-bs-toggle="modal" data-bs-target="#editTemper" onClick={() => {
                                                            setModalID(val.temperID)
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

            <div className="modal fade" id="editTemper" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="0">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">แก้ไขTemper</h1>
                            <button type="button" className="btn-close" data-bs-toggle="modal" data-bs-target="#temperManage"></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-6">
                                    <label>ชื่อ Temper</label>
                                    <input className="form-control" value={modalName} onChange={event => {
                                        setModalName(event.target.value)
                                    }}></input>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#temperManage" onClick={() => {
                                editTemper(modalID)
                            }}>แก้ไขผู้ผลิต</button>
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#temperManage" onClick={() => {
                                deleteTemper(modalID)
                            }}>ลบผู้ผลิต</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TemperManage;