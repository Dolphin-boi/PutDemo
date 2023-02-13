import { useEffect, useState } from "react";
import VendorManage from "../component/VendorManage";
import TypeManage from "../component/TypeManage";
import TemperManage from "../component/TemperManage";
import CoatingManage from "../component/CoatingManage";
import HardnessManage from "../component/HardnessManage";

function AddCoil() {

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
        console.log(vendor, metalType, thickness, width, lenght, weight, temper, coating, hardness)
    })
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
                                <div class="input-group">
                                    <select className="form-select col" onChange={event => {
                                        setVendor(event.target.value)
                                    }}>
                                        <option defaultValue="0" value="0">ทั้งหมด</option>
                                        <option value="TCC">TCC</option>
                                        <option value="TTP">TTP</option>
                                    </select>
                                    <button type="button" class="input-group-text" data-bs-toggle="modal" data-bs-target="#vendorManage">เพิ่ม</button>
                                </div>
                            </div>
                            <div className="col">
                                <label className="form-label">ประเภทเหล็ก</label>
                                <div className="input-group">
                                    <select className="form-select col" onChange={event => {
                                        setMetalType(event.target.value)
                                    }}>
                                        <option defaultValue="0" value="0">ทั้งหมด</option>
                                        <option value="TPPC-TCC-BOSTON">TPPC-TCC-BOSTON</option>
                                        <option value="TPPC-TTP-TY">TPPC-TTP-TY</option>
                                    </select>
                                    <button type="button" class="input-group-text" data-bs-toggle="modal" data-bs-target="#typeManage">เพิ่ม</button>
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
                                        <option defaultValue="0" value="0">ทั้งหมด</option>
                                        <option value="T3ULCA">T3ULCA</option>
                                        <option value="T2">T2</option>
                                    </select>
                                    <button type="button" class="input-group-text" data-bs-toggle="modal" data-bs-target="#temperManage">เพิ่ม</button>
                                </div>
                            </div>
                            <div className="col">
                                <label className="form-label">Coating</label>
                                <div className="input-group">
                                    <select className="form-select col" onChange={event => {
                                        setCoating(event.target.value)
                                    }}>
                                        <option defaultValue="0" value="0">ทั้งหมด</option>
                                        <option value="T3ULCA">T3ULCA</option>
                                        <option value="T2">T2</option>
                                    </select>
                                    <button type="button" class="input-group-text" data-bs-toggle="modal" data-bs-target="#coatingManage">เพิ่ม</button>
                                </div>
                            </div>
                            <div className="col">
                                <label className="form-label">ความแข็ง</label>
                                <div className="input-group">
                                    <select className="form-select col" onChange={event => {
                                        setHardness(event.target.value)
                                    }}>
                                        <option defaultValue="0" value="0">ทั้งหมด</option>
                                        <option value="T3ULCA">T3ULCA</option>
                                        <option value="T2">T2</option>
                                    </select>
                                    <button type="button" class="input-group-text" data-bs-toggle="modal" data-bs-target="#hardnessManage">เพิ่ม</button>
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
                            console.log("test")
                        }}>เพิ่ม</button>
                    </div>
                </div>
            </div>

            <VendorManage />
            <TypeManage />
            <TemperManage />
            <CoatingManage />
            <HardnessManage />
        </>
    )
}

export default AddCoil;