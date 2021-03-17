import axios from 'axios'

export async function getAllRecords(){
    try{
        const response = await axios.get('http://localhost:8010/proxy', {
            "Content-Type": "application/x-www-form-urlencoded"
        });
        console.log("Response received: " + response )
        return response.data.Items
    }
    catch (error){
        console.log("Something went wrong - " + error.toString())
    }
}