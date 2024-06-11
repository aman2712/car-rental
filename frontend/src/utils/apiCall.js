export default async function apiCall(url, method, data, secured) {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null
    const response = await fetch(`http://192.168.0.8:5000/api${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': secured ? token : undefined
        },
        body: data ? JSON.stringify(data) : undefined
    })
    const resp = await response.json()
    if(!response.ok){
        throw new Error(resp.message)
    }else{
        return resp
    }
}