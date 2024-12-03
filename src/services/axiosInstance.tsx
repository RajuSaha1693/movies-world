import axios from "axios";
const API_KEY="fb3458db";

export const axiosInstance=axios.create({
    baseURL:'https://www.omdbapi.com/',
    params:{
        apiKey:API_KEY,
    }
})

export const searchMovies=async(searchText:string)=>{
    try {
        const response=await axiosInstance.get('',{
            params:{
                s:searchText
            }
        })
        return response.data
    } catch (error) {
        console.log('Error while fetching data',error);
        throw error
    }
}
