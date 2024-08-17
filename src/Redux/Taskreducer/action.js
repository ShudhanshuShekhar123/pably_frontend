import axios from "axios";
import { toast, Zoom } from "react-toastify";
import { url } from "../../baseserverurl";

const { TASK_CREATE, TASK_ADD } = require("./actiontype")

const notify = () => toast.success('Task created Successfully', {
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

 export const createtask = (details)=> async (dispatch)=>{
      try {
        const response = await axios.post(`${url}/task/create`, details);
        console.log(response,"here inisde middleware")
        if (response.status === 201) {
           
            dispatch({type:TASK_CREATE , payload : response.data})
            notify()
            
        } else {
            console.error('Failed to create task:', response.statusText);
        }
    } catch (error) {
        console.error('Error creating task:', error);
    }
}


export const addtask =(data)=>{
    return {type: TASK_ADD, payload : data}
}