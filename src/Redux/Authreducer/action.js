import axios from "axios";
import { toast, Zoom } from "react-toastify";
import { url } from "../../baseserverurl";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "./actionType";
const notify = () => toast.success(' User logged in Successfully', {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  transition:Zoom

})


const notify2= () => toast.error('User Not Found. !', {
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

export const login = (details) => async (dispatch) => {

  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post(
      `${url}/login`,
      details
    );


    
  
    const {token} = res.data
    if(res.status == 200){
      dispatch({type:LOGIN_SUCCESS, payload: token})
      notify()
    
    }




 

    if (res.error) {
      throw new Error(res.error);
    }

    
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE });
  notify2()
  }

};









// export const register = (details) => async (dispatch) => {
//   try {
//     const res = await axios.post(
//       "https://fitness-place.onrender.com/user/register",
//       details
//     );
//     if (res.error) {
//       throw new Error(res.error);
//     }
//     alert("Register successfull");
//   } catch (err) {
//     console.log(err);
//     alert("error");
//   }
// };