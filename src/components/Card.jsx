import axios from 'axios';
import React, { useState } from 'react';
import { MdDelete, MdOutlineModeEditOutline } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { addtask } from '../Redux/Taskreducer/action';


import { toast, Zoom } from 'react-toastify';
import { url } from '../baseserverurl';


const notify1 = () => toast.success('Task Updated Successfully', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Zoom


})

const notify2 = () => toast.warn("Please fill all details!!", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Zoom


})

const notify3 = () => toast.warn("Task deleted Successfully", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Zoom


})

const Card = (props) => {
    let data = props.task;

  
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch()
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const [id, setId] = useState("")
    const [status, setstatus] = useState("nothing")
    const [priority, setpriority] = useState("nothing")
    const [duedate, setduedate] = useState("nothing")

    const handledelete = async (id) => {

        await axios.delete(`${url}/task/delete/${id}`)
        notify3()
        let data = await axios.get(`${url}/task/read`)
        dispatch(addtask(data.data))
    }

    const handleedit = (id) => {

        setId(id)
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false);
    };

    const handlesubmit = async (e) => {
        e.preventDefault()

        // if ((status == "nothing") || (priority == "nothing") ) {
        //     return notify2()
        // }



        await axios.put(`${url}/task/update/${id}`, { title, description, status, priority, duedate })
        let data = await axios.get(`${url}/task/read`)
        dispatch(addtask(data.data))


        notify1()
        setIsOpen(false);
        setTitle("")
        setDescription("")
        setstatus("nothing")
        setpriority("nothing")
        setduedate("nothing")


    }

    const stopPropagation = (e) => {
        e.stopPropagation();
    };



    const handleselectstatus = (e) => {

        setstatus(e.target.value)
    }



    const handleselectpriority = (e) => {


        setpriority(e.target.value)

    }

    const handlechangedate = (e) => {
        setduedate(e.target.value)
    }

    return (
        <>
            {isOpen && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center h-full bg-gray-800 bg-opacity-50" onClick={closeModal} >
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg" onClick={stopPropagation} >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Edit  Task</h3>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={closeModal}
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-start text-gray-900">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter title"
                                    required
                                    onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium  text-start text-gray-900">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter task description"
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />
                            </div>


                            <div className="mb-4">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-start text-gray-900">
                                    Status
                                </label>
                                <select onChange={handleselectstatus} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                    <option value="nothing">Select task status</option>
                                    <option value="pending"> Pending </option>
                                    <option value="completed">Completed</option>

                                </select>

                            </div>

                            <div className="mb-4">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-start text-gray-900">
                                    Priority
                                </label>
                                <select onChange={handleselectpriority} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                    <option value="nothing">Select Priority </option>
                                    <option value="low"> Low </option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>

                            </div>


                            <div className="mb-4">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-start text-gray-900">
                                    Select Due Date
                                </label>
                                <input onChange={handlechangedate}
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>


                            <button

                                onClick={handlesubmit}
                                className="w-full bg-blue-500 text-white rounded-md py-2 px-4 font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Save the changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {
                data.length > 0 ? (
                    <div className='grid    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xs:grid-cols-2 gap-2 w-11/12 m-auto pb-4'>
                        {data.map((item, index) => (
                            <div key={index} style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }} className='p-7 bg-blue-900 min-h-[170px] flex flex-col justify-between text-white rounded-md'>

                                <span
                                    className={`text-start w-fit  text-sm font-bold p-2 mb-2 rounded ${item.priority === "high"
                                        ? "bg-red-700 text-balck"
                                        : item.priority === "medium"
                                            ? "bg-yellow-500 text-white"
                                            : "bg-green-700 text-white"
                                        }`}
                                >
                                    {item.priority}
                                </span>

                                <h4 className=' text-start font-bold pb-4 text-xl'>{item.title}</h4>
                                <p className=' text-start font-semibold  ' > Status: &nbsp;  {item.status}</p>
                                <p className=' text-start font-semibold mb-4 ' > Due date: &nbsp; {item.due_date || "bull"}</p>

                                <div className='flex justify-between'>
                                    <MdOutlineModeEditOutline onClick={() => handleedit(item._id)} className='text-2xl cursor-pointer' />

                                    <MdDelete onClick={() => handledelete(item._id)} className='text-2xl cursor-pointer' />
                                </div>
                            </div>
                        ))}
                    </div>

                ) : (
                    <div className=' mb-4'>
                        <img className='w-[250px] h-[200px] m-auto ' src="https://cdn.dribbble.com/users/4241563/screenshots/11874468/media/7796309c77cf752615a3f9062e6a3b3d.gif" alt="" />
                        <h1 className='font-bold text-2xl '>No Task currently</h1>
                    </div>
                )
            }


        </>

    );
};

export default Card;
