import axios from "axios";

const axiosClient= axios.create({
    baseURL:'https://localhost:44332/api'
});

class PermissionsApiHelper{
    getAll():Promise<any>{
        return axiosClient.get("/permissions");
    }

    getById(id:Number):Promise<any>{
        return axiosClient.get(`/permissions/${id}`);
    }

    create(data:any):Promise<any>{
        return axiosClient.post("/permissions",data);
    }

    delete(id:Number):Promise<any>{
        return axiosClient.delete(`/permissions/${id}`);
    }

    update(data:any):Promise<any>{
        return axiosClient.put("/permissions",data);
    }
    
    getAllPermissionsTypes():Promise<any>{
        return axiosClient.get("/permissionsTypes");
    }
}

export default new PermissionsApiHelper();
