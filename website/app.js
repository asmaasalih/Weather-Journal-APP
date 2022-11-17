/* Global Variables */
const apiKey = '4ffe52ef8836f7d40a6d27f31b5f5fae&units=imperial';
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const generateBtn = document.getElementById('generate');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//get weather data
const getWeatherData = async (baseUrl,zip,apiKey) => {
    const request = await fetch(`${baseUrl}${zip}&appid=${apiKey}`);
    try {
        const response = await request.json();
        return response;
    } catch(error) {
        console.log('Error',error);
    }
}

//Send data to server
const sendData = async (data ={}) =>{
    const request = await fetch('/sendData',{
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const response = await request.json()
        return response;
    } catch (error) {
        console.log('error',error);
    }
}

//updating UI
const updateUI = async () =>{
    const request = await fetch('/getData');
    try {
        const response = await request.json();
        document.getElementById('date').innerHTML = 'The date today is:  ' + response.date;
        document.getElementById('temp').innerHTML = 'Temprature today is : ' + Math.round(response.temp) + ' degrees.';
        document.getElementById('content').innerHTML = 'You are  ' + response.feelings + '.';
    } catch (error){
        console.log('error',error);
    }
}


generateBtn.addEventListener('click', async ()=>{
    const zip = document.getElementById("zip").value;
    const feelingData = document.getElementById('feelings');
    if (!zip || !feelingData) {
        alert('zip and feelings fields are required!');
    }
    
    const weather = await getWeatherData(baseURL,zip,apiKey);
    await sendData({
        date: newDate,
        temp: weather.main.temp,
        feelings: feelingData.value,
    });
    await updateUI();
});