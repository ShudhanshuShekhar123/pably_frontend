import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { url } from '../baseserverurl';
import Card from '../components/Card';
import { addtask, createtask } from '../Redux/Taskreducer/action';
import { TASK_DELETE } from '../Redux/Taskreducer/actiontype';

const notify1 = () => toast.warn('Please fill all fields!', {
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


const Taskpage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("")
    const dispatch = useDispatch()
    const tasklist = useSelector((store) => store.taskreducer.task)
    const navigate = useNavigate()
    const [task, settask] = useState("")
    const [userid, setuserid] = useState("")
    const [status, setstatus] = useState("nothing")
    const [priority, setpriority] = useState("nothing")
    const [duedate, setduedate] = useState("nothing")


   
    const gettokenstatus = localStorage.getItem("token")





    let decodedtoken = "";



    useEffect(() => {
   



        if (gettokenstatus) {
            decodedtoken = jwtDecode(gettokenstatus);
            const currentTime = Math.floor(Date.now() / 1000);

   
            setuserid(decodedtoken.userId)



            if (decodedtoken.exp < currentTime) {
                localStorage.removeItem('token');
                dispatch({ type: TASK_DELETE })
                navigate("/login");

            } else {
                axios.get(`${url}/task/read`)
                    .then((res) => {

                        dispatch(addtask(res.data))


                    })

            }

        } else {



            navigate("/login");


        }


    }, [])


  



    const handleSubmit = async (e) => {
        e.preventDefault();

    

      console.log(priority, status, duedate,"staus, prirotiy, duedtae")


        const data = {
            title: title,
            description: description,
            createdBy: userid,
            due_date: duedate,
            status: status,
            priority: priority
        };

        dispatch(createtask(data))
    
        setTitle('');
        setDescription('');
        setIsOpen(false);


    };


    const closeModal = () => {
        setIsOpen(false);
    };

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

    const handlefilter = (e) => {


        if (e.target.value !== "All") {
            let filteredtask = tasklist.filter((item) => {
                if (item.priority == e.target.value) {
                    return true
                } else {
                    return false
                }
            })


            settask(filteredtask)

        } else {
            settask("")
        }
    }

    return (
        <div className="mt-6">


            {
                tasklist.length == 0 ? null
                    :


                    <div className="mb-4">

                        <div className="flex flex-col items-center justify-center ">
                            <h3 className="mb-2 font-semibold text-gray-900 ">Priority Level</h3>
                            <div className="min-w-[60%]">
                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-blue-700 dark:border-gray-600 dark:text-white">
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">


                                        <div className="flex items-center p-1">
                                            <input
                                                id="horizontal-list-radio-All"
                                                type="radio"
                                                value="All"
                                                name="priority"
                                                className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                onChange={handlefilter}
                                            />
                                            <label
                                                htmlFor="horizontal-list-radio-All"
                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                All
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">


                                        <div className="flex items-center p-1">
                                            <input
                                                onChange={handlefilter}
                                                id="horizontal-list-radio-low"
                                                type="radio"
                                                value="low"
                                                name="priority"
                                                className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                htmlFor="horizontal-list-radio-low"
                                                className="ml-2 text-sm font-medium text-gray-900  dark:text-gray-300"
                                            >
                                                Low
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center p-1">
                                            <input
                                                onChange={handlefilter}
                                                id="horizontal-list-radio-medium"
                                                type="radio"
                                                value="medium"
                                                name="priority"
                                                className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                htmlFor="horizontal-list-radio-medium"
                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                Medium
                                            </label>
                                        </div>
                                    </li>
                                    <li className="w-full dark:border-gray-600">
                                        <div className="flex items-center p-1">
                                            <input
                                                onChange={handlefilter}
                                                id="horizontal-list-radio-high"
                                                type="radio"
                                                value="high"
                                                name="priority"
                                                className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                htmlFor="horizontal-list-radio-high"
                                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                High
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

            }

            <div>
                {
                    task.length !== 0 ? <Card task={task} /> : <Card task={tasklist} />
                }

            </div>


            {isOpen && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center h-full bg-gray-800 bg-opacity-50" onClick={closeModal}>
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg" onClick={stopPropagation}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Create New Task</h3>
                            <button
                                type="button"
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={closeModal}>
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

                                onClick={handleSubmit}
                                className="w-full bg-blue-500 text-white rounded-md py-2 px-4 font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}




            <button
                type="button"
                className="flex mb-4 items-center justify-between  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700    dark:focus:ring-blue-800 m-auto"
                onClick={() => setIsOpen(true)}>
                Create a new Task

                <IoMdAdd className='text-3xl  cursor-pointer ml-4 font-extrabold' />


            </button>
        </div>
    );
};

export default Taskpage;
