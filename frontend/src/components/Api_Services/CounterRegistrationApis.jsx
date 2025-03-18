import axios from "axios";
// const baseUrl ='http://192.168.1.6:9090/counter';
const baseUrl = import.meta.env.VITE_FOR_REGISTRATION_COUNTERS;

class CounterRegistrationApis{
// to fetch the data for All Counters:
static fetchAllCounterDetails()
{
   return axios.get(`${baseUrl}/getAllWithAllData`);
}
static fetchAllRegisteredCounterDetails()
{
   return axios.get(`${baseUrl}/getAll`);
}

static counterogin(mobile)
{
   return axios.get(`${baseUrl}/getByMobileNo/${mobile}`);
}

static counterIdByMobNo(mobile)
{
   return axios.get(`${baseUrl}/getCounterI/ByMobileNo/${mobile}`);
}

static registerCounter (formData)
{
    const response =  axios.post(`${baseUrl}/save`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
}

static registerCounterUpdate (id,formData)
{
    const response =  axios.put(`${baseUrl}/update/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
    });
    return response;
}

static registerCounterDelete (id)
{
    const response =  axios.delete(`${baseUrl}/delete/${id}`)
    return response;
}

static registerCounterUpdateForImage (id,formData)
{
    const response =  axios.put(`${baseUrl}/update-image/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response;
}

static registerCounterUpdateForAvailability (id,availability)
{
    const response =  axios.put(`${baseUrl}/getById/availability/${id}/${availability}`);
    return response;
}


}
export default CounterRegistrationApis;