
function get_weather_info(){
    let city=document.getElementById("city").value;
    let message;
    let html;
    if(city==""){
        html=`<h3 class='text-center alert alert-danger'>Please , Enter City</h3>`;
        document.getElementById("api-response").innerHTML=html;
        return false;
    }
    
   
    let weatherApi=`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid={your_APP_ID}`;
    html=`<h3 class='text-center alert alert-warning'>Please Wait, Your Request is under Proces</h3>`;
    document.getElementById("api-response").innerHTML=html;
    setTimeout(() => {
        fetch(weatherApi)
        .then((response)=>{
            return response.json();
        }).then((result)=>{
            if(result.cod==='404'){
                message=result.message.toUpperCase();
                html=`<h3 class='text-center alert alert-danger'>${message}</h3>`
                document.getElementById("api-response").innerHTML=html;
            }
            else{
               console.log(result);
               let sunRise=result.sys.sunrise;
               sunRise = new Date(sunRise);
               sunRise = sunRise.getTime();
              
               let sunSet=result.sys.sunset;
               sunSet = new Date(sunSet);
               sunSet = sunSet.getTime();
                html=`<div class='py-3'>
                        <div class='container'>
                            <table class="table table-bordered">
                               <tr>
                                    <th>
                                         City
                                    </th>
                                    <td>
                                        ${result.name}
                                    </td>
                                    <th>
                                         Coordinates
                                    </th>
                                    <td>
                                        ${result.coord.lat},${result.coord.lon}
                                    </td>
                               </tr>
                               <tr>
                                    <th>
                                        Temperature
                                    </th>
                                    <td>
                                        ${result.main.temp} °C
                                    </td>
                                    <th>
                                        Feeling Temp
                                    </th>
                                    <td>
                                        ${result.main.feels_like} °C
                                    </td>
                               </tr>
                                <tr>
                                    <th>
                                        Today Maximum Temperature
                                    </th>
                                    <td>
                                        ${result.main.temp_max} °C
                                    </td>
                                    <th>
                                        Today Minimum Temperature
                                    </th>
                                    <td>
                                        ${result.main.temp_min} °C
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Sunrise
                                    </th>
                                    <td>
                                        ${sunRise}
                                    </td>
                                    <th>
                                        Sunset
                                    </th>
                                    <td>
                                        ${sunSet}
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        Weather
                                    </th>
                                    <td>
                                        ${result.weather[0].main}
                                    </td>
                                    <th>
                                        Weather Description
                                    </th>
                                    <td>
                                        ${result.weather[0].description}
                                    </td>
                                </tr>
                            </table>
                            
                           
                        </div>
                    </div>`
                
                
                document.getElementById("api-response").innerHTML=html;
            }
            
        }).catch((error)=>{
        
            message=error;
            html=`<h3 class='text-center alert alert-danger'>${message}</h3>`
            document.getElementById("api-response").innerHTML=html;
        });
    }, 1000);
}