import { useState } from "react";

function VendorManage() {

    const [name, setName] = useState(0)
    const [contact, setContact] = useState(0)
    const [email, setEmail] = useState(0)
    const [address, setAddress] = useState(0)

    return (
        <>
            <div className="modal fade" id="vendorManage" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
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
                                    console.log("test")
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>TTP</td>
                                            <td>02-xxx-xxxx</td>
                                            <td>TTP@gmail.com</td>
                                            <td>xxxxxxxxxxx</td>
                                            <td>
                                                <a href="#" data-bs-toggle="modal" data-bs-target="#editVendor">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg>
                                                </a>
                                            </td>
                                        </tr>
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

            <div className="modal fade" id="editVendor" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="0">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">จัดการผู้ผลิต</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
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
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#vendorManage">แก้ไขผู้ผลิต</button>
                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#vendorManage">ลบผู้ผลิต</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VendorManage;