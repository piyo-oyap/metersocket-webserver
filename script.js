function toggleSwitchMain() {
    fetch("api/update.php?toggle=1");
}

function toggleSwitch1() {
    fetch("api/update.php?toggle=2");
}

function toggleSwitch2() {
    fetch("api/update.php?toggle=3");
}

function toggleSwitch3() {
    fetch("api/update.php?toggle=4");
}

function resetSwitch() {
    if (confirm("Are you sure to reset the energy usage meter?"))
        fetch("api/update.php?id=5&status=1");
}

function logout() {
	if (confirm("Are you sure to logout?"))
		window.location.replace("logout.php");
}

var isDataReceiving = false;
function fetchData() {
    if (!isDataReceiving) {
        isDataReceiving = true;
        fetch("api/update.php").then(function(response) {
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

    document.getElementById("txtVolts").innerHTML = data.voltage;
    document.getElementById("txtHz").innerHTML = data.frequency;
    document.getElementById("txtWatts").innerHTML = data.amperage;
    document.getElementById("txtKWh").innerHTML = data.energy;
    document.getElementById("txtPower").innerHTML = data.pFactor;
    setButtonState("btnToggleSwitchMain", data.relayMain);
    setButtonState("btnToggleSwitch1", data.relay1);
    setButtonState("btnToggleSwitch2", data.relay2);
    setButtonState("btnToggleSwitch3", data.relay3);
}

setInterval(fetchData, 500);
