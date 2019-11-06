function toggleSwitchMain() {
    fetch("api/update.php?id=1");
}

function toggleSwitch1() {
    fetch("api/update.php?id=2");
}

function toggleSwitch2() {
    fetch("api/update.php?id=3");
}

function toggleSwitch3() {
    fetch("api/update.php?id=4");
}

function resetSwitch() {
    if (confirm("Are you sure to reset the energy usage meter?"))
        fetch("api/update.php?id=5&status=1");
}

var isDataReceiving = false;
function fetchData() {
    if (!isDataReceiving) {
        isDataReceiving = true;
        fetch("api/update.php?client=1").then(function(response) {
            response.text().then(function(text){
                isDataReceiving = false;
                updateData(text);
            });
        });
    }
}

function setButtonState(id, state) {
    if (state == 1) {
        document.getElementById(id).className =
            document.getElementById(id).className.replace
                ( /(?:^|\s)button-off(?!\S)/g , '' );

        if ( !(document.getElementById(id).className.match(/(?:^|\s)button-on(?!\S)/)) ) {
            document.getElementById(id).className += " button-on";
        }
    } else {
        document.getElementById(id).className =
                document.getElementById(id).className.replace
                    ( /(?:^|\s)button-on(?!\S)/g , '' );

        if ( !(document.getElementById(id).className.match(/(?:^|\s)button-off(?!\S)/)) ) {
            document.getElementById(id).className += " button-off";
        }
    }
}

function updateData(dataRaw) {
    var data = JSON.parse(dataRaw);

    document.getElementById("txtVolts").innerHTML = data.volts;
    document.getElementById("txtHz").innerHTML = data.hertz;
    document.getElementById("txtWatts").innerHTML = data.amperage;
    document.getElementById("txtKWh").innerHTML = data.kwh;
    document.getElementById("txtPower").innerHTML = data.power;
    setButtonState("btnToggleSwitchMain", data.relayMain);
    setButtonState("btnToggleSwitch1", data.relay1);
    setButtonState("btnToggleSwitch2", data.relay2);
    setButtonState("btnToggleSwitch3", data.relay3);
}

setInterval(fetchData, 500);