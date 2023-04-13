let btn = document.querySelector('button');

btn.addEventListener('click', getlocation);

function getlocation(e) {
    // console.log(e);
    if (navigator.geolocation) {
        btn.innerText = "Please Allow to Detect Location";
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }
    else {
        btn.innerText = "your browser dosen't support location";
    }
}

function onSuccess(e) {
    // console.log(e);
    let { latitude, longitude } = e.coords;
    //  console.log(latitude);
    let apikey = '09d45c930c214c2db4a69222358d56bb'
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=${apikey}`)
        .then(response => {
            return response.json();
            // console.log(response.json());
        })
        .then(response => {
            // console.log(response);
            let allDetails = response.results[0].components;
            // console.log(allDetails);
            let { county, country } = allDetails;
            btn.innerText = `${county}, ${country}`;
        }).catch(() => {
            btn.innerText = "Oops! something wrong please try again";
        })
}

function onError(err) {
    if (erro.code === 1) {
        btn.innerText = erro.message;
    }
    else if (erro.code === 2) {
        btn.innerText = erro.message;
    }
    else {
        btn.innerText = "something went wrong";
    }
    btn.setAttribute("disabled", "true");
}