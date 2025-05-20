import axios from "axios"


const login = async (email :string, password :string) =>{
    try {
        const response = await axios.post("http://localhost:3000/api/login", {
             email: email, password: password
        },
        {
            headers: { "Content-Type": "application/json" }
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching user:", error); 
        throw error; 
    }
}

const logout = async (token:string) =>{
    try {
        const response = await axios.post("http://localhost:3000/users/logout",{},
       {
           headers: { "Content-Type": "application/json", "X-API-TOKEN": token}
       });
        return response.data; 
    } catch (error) {
        console.error("Error fetching user:", error); 
        throw error; 
    }
}


const register = async (username:string, email:string, password:string) =>{
    try {
        const response = await axios.post("http://localhost:3000/api/register", {
            username: username,
            email: email,
            password: password
        });
        return response.data; 
    } catch (error) {
        console.error("Error fetching user:", error); 
        throw error; 
    }
}

const updateNameUser = async (email:string, username:string) =>{
    try{
        await axios.put("/users/updateUser",{
            email,
            username
        })
    }catch(error){
        console.error(error)
    }
    
}

const updatePasswordUser = async (email: string, password: string) =>{
    try{
        await axios.put("/users/updatePass",{
            email,
            password
        })
    }catch(error){
        console.error(error)
    }
}

const deleteAUser = async (id:number) =>{
    try{
        await axios.delete("/users/",{
            data:{
                id
            }
        })
    }catch(error){
        console.error(error)
    }
}

const getUser = async (token: string) =>{
    try{
        const response = await axios.get("http://localhost:3000/users/info"
            ,{
            headers: { "Content-Type": "application/json", "X-API-TOKEN": token}
        })
        return response.data
    }catch(error){

    }
}


export {login, register, logout, updateNameUser, updatePasswordUser, deleteAUser, getUser}