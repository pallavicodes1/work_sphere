import axios from "axios";

function useAuth(){
    const request=axios.create({
        baseURL:'http://localhost:8000',
        withCredentials:true,
    
    })
    return {request};
}
export default useAuth;