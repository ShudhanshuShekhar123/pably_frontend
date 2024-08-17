import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOGIN_SUCCESS } from '../Redux/Authreducer/actionType';
import tokenvalidate from '../components/tokenvalidation';


const Homepage = () => {
    const dispatch = useDispatch()
    const istokenvalid = tokenvalidate()

  

   useEffect(()=>{
    dispatch({ type: LOGIN_SUCCESS, payload: istokenvalid });
   }, [])

    const tokenvalidationstatus = useSelector((store) => (store.authreducer.isAuth))
  

    return (
        <div>
            <div className='w-1/2 m-auto h-[500px] flex flex-col justify-center items-center'>
                <h1 className='font-semibold text-3xl md:text-3xl mt-4 lg:text-7xl mb-6'>Organize your work and life, finally.</h1>
                <p className='text-xl md:text-2xl lg:text-3xl mb-6'>Become focused, organized, and calm with Todoist. The world’s #1 task manager and to-do list app.</p>
                {
                    istokenvalid  ? null
                        :
                        <div>
                            <Link to="/signup">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Register for free
                                </button>
                            </Link>
                            <br />

                            <Link to="/login">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                                    Sign in
                                </button>
                            </Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default Homepage;
