import axios from "axios";
let apiUrl = "https://api.themoviedb.org/3";
let apiKey = "bc31b5181144feb16a1677b97a18c60e";
let accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzMxYjUxODExNDRmZWIxNmExNjc3Yjk3YTE4YzYwZSIsInN1YiI6IjY2M2Y3NTE0ODVmZDE4OGZlYjEyNjhkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZhLrKi293_JL43NKKNd3NMOwsdBL2f81sVMe5f8B7Lw";

export async function getData(path, options) {
    try {
        let res = await axios.get(`${apiUrl}/${path}`, {
            params: {
                ...options, 
                language: "ru-RU",
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        return res
    } catch (error) {
        
    }
}

export const  signOut = async () => {
    try {
        
    } catch (error) {
        
    }
}

export const  signUp =  async() => {
    try {
        
    } catch (error) {
    }
}


export const  signIn =  async() => {
    try {
        
    } catch (error) {
        
    }
}