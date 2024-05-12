let urlBase = `https://api.openweathermap.org/data/2.5/weather`
let api_key = "54adb60961f701fedb8eed2a299064d6"
let difKelvin = 273.15


document.getElementById("botonBusqueda").addEventListener("click", () => {
    buscarClima();
});

document.getElementById("ciudadEntrada").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        buscarClima();
    }
});

function buscarClima() {
    const ciudad = document.getElementById("ciudadEntrada").value;
    if (ciudad) {
        fetchDatosClima(ciudad);
    }
}
function fetchDatosClima(ciudad){
    const lang = 'es';
    fetch (`${urlBase}?q=${ciudad}&appid=${api_key}&lang=${lang}`)
    .then(data => data.json())
    .then(data => mostrarDatosClima(data))
}

function mostrarDatosClima(data){
    const divDatosClima = document.getElementById("datosClima")
    divDatosClima.innerHTML=""
    const ciudadNombre = data.name
    const paisNombre = data.sys.country
    const temperatura = data.main.temp
    const humedad = data.main.humidity
    const descripcion = data.weather[0].description
    const icono = data.weather[0].icon
    const ciudadTitulo = document.createElement("h2")
    ciudadTitulo.textContent = `${ciudadNombre}, ${paisNombre}`

    const temperaturaInfo = document.createElement("p")
    temperaturaInfo.textContent = `La temperatura es ${Math.floor(temperatura-difKelvin)}°C `

    const humedadInfo = document.createElement("p")
    humedadInfo.textContent = `La humedad es ${humedad}%`

    const iconoInfo = document.createElement("img")
    iconoInfo.src= ` https://openweathermap.org/img/wn/${icono}@2x.png`

    const descripcionInfo = document.createElement("p")
    descripcionInfo.textContent = `La descripcion meteorologica es: ${descripcion}`


    divDatosClima.appendChild(ciudadTitulo)
    divDatosClima.appendChild(temperaturaInfo)
    divDatosClima.appendChild(humedadInfo)
    divDatosClima.appendChild(iconoInfo)
    divDatosClima.appendChild(descripcionInfo)
}


// async function traducirDescripcion(descripcion) {
//     const traducciones = {
//         "clear sky": "cielo despejado",
//         "few clouds": "pocas nubes",
//         "scattered clouds": "nubes dispersas",
//         "broken clouds": "nubes rotas",
//         "shower rain": "lluvia",
//         "rain": "lluvia",
//         "thunderstorm": "tormenta",
//         "snow": "nieve",
//         "mist": "niebla",
//         "overcast clouds":"nubes cubiertas",
//     };

//     // Si la descripción está en nuestro objeto de traducciones, la devolvemos, de lo contrario devolvemos la descripción original
//     return traducciones[descripcion.toLowerCase()] || descripcion;
// }