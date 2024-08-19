import { Disclosure } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { jwtDecode } from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast, Zoom } from 'react-toastify'
import { LOGOUT_SUCCCESS } from '../Redux/Authreducer/actionType'
import { TASK_DELETE } from '../Redux/Taskreducer/actiontype'



const notify = () => toast.success('User logged out  Successfully', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    Transition:Zoom


})




function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const servertoken = useSelector((store) => store.authreducer.token)

    const gettokenstatus = localStorage.getItem("token")

if (gettokenstatus) {
    const decodedtoken = jwtDecode(gettokenstatus);
    const currentTime = Math.floor(Date.now() / 1000);
   

    if (decodedtoken.exp < currentTime) {
        localStorage.removeItem('token');
    }
}

   

    const handlelogout = async () => {

        dispatch({ type: LOGOUT_SUCCCESS, });
        localStorage.removeItem("token")
        dispatch({type: TASK_DELETE})
        notify()
    
        navigate("/")
    }

    return (
        <Disclosure as="nav" className="bg-blue-500">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                             
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6 text-white " aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:ml-6 sm:block w-full">
                                    <div className="flex items-center justify-evenly space-x-4">
                                   
                                        <Link  className="text-white hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" to={"/"}>Homepage</Link>
                                        <Link  className="text-white hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" to={"/task"}>View Task</Link>
                                        { gettokenstatus ? (
                                            <button
                                                className="text-white hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                                onClick={handlelogout}
                                            >
                                                Logout
                                            </button>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Disclosure.Panel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col">
                        <Link  className="text-white hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" to={"/"}>Homepage</Link>
                                        <Link  className="text-white hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium" to={"/task"}>View Task</Link>
                                        {gettokenstatus ? (
                                            <button
                                                className="text-white hover:bg-blue-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                                                onClick={handlelogout}
                                            >
                                                Logout
                                            </button>
                                        ) : null}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}

export default Navbar;
