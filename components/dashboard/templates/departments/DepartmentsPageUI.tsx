"use client"

import {DepartmentType} from "@/lib/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsisVertical, faGear} from "@fortawesome/free-solid-svg-icons";

export default function DepartmentsPageUI({departments}: { departments: DepartmentType[] }) {

    return(
        <div className="w-full p-6">
            <table className="table table-auto w-full">
                <thead className="">
                <tr className="table-header text-left border-b-3 border-zinc-300">
                    <th className="border-r p-2 border-zinc-200 text-zinc-700" scope="col">Code</th>
                    <th className="border-r p-2 border-zinc-200 text-zinc-700" scope="col">Name</th>
                    <th className="border-r p-2 border-zinc-200 text-zinc-700" scope="col">Description</th>
                    <th className="border-r p-2 border-zinc-200 text-zinc-700" scope="col">Department Head</th>
                    <th className="p-2 text-zinc-700 w-min"><FontAwesomeIcon icon={faGear} /></th>
                </tr>
                </thead>
                <tbody>
                {departments?.map((department: DepartmentType) => (
                    <DepartmentRow department={department} key={department.id} />
                ))}
                <AddDepartmentRow />
                </tbody>
            </table>
        </div>
    )
}

function AddDepartmentButton() {
    return(
        <button className="p-2 text-zinc-500 w-full h-full text-left cursor-pointer hover:bg-zinc-200">+ Add</button>
    )
}

function AddDepartmentRow() {
    return(
        <tr className="border-b border-zinc-200">
            <td className="border-r border-zinc-200" ><AddDepartmentButton /></td>
            <td className="border-x border-zinc-200" ><AddDepartmentButton /></td>
            <td className="border-x border-zinc-200" ><AddDepartmentButton /></td>
            <td className="border-x border-zinc-200" ><AddDepartmentButton /></td>
            <td className=""><AddDepartmentButton /></td>
        </tr>
    )
}

function DepartmentRow({department}: {department: DepartmentType}) {
    return(
        <tr className="border-b border-zinc-200">
            <td className="border-r p-2 border-zinc-200" >{department.code}</td>
            <td className="border-x p-2 border-zinc-200" >{department.name}</td>
            <td className="border-x p-2 border-zinc-200" >{department.description}</td>
            <td className="border-x p-2 border-zinc-200 flex flex-row">
                <div className="bg-yellow-500 h-6 w-6 rounded-full text-white font-semibold text-sm flex justify-center items-center">??</div>
                <p className="ml-2">{department.department_head.user.first} {department.department_head.user.last}</p>
            </td>
            <td className="p-2 pl-3 w-min"><FontAwesomeIcon icon={faEllipsisVertical} /></td>
        </tr>
    )
}