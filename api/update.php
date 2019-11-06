<?php
$conn = new mysqli("localhost","metersocket","FabLab2.0","meter_socket") or die("Database conncection failed".mysqli_connect_error());
$query = "";
if(isset($_GET['id']) && isset($_GET['status'])){
	$id = $_GET['id'];
	$status = $_GET['status'];
	$query = "update buttons set status=$status where id=$id";
	echo $conn->query($query);
} elseif(isset($_GET['toggle'])) {
	$id = $_GET['toggle'];
	$stateQuery = "select `status` from `buttons` where id=$id";
	$stateResult = $conn->query($stateQuery);
	$stateRow = mysqli_fetch_array($stateResult);
	$status = $stateRow[0];
	($status == 0) ? $status = 1 : $status = 0;
	$query = "update buttons set status=$status where id=$id";
	$conn->query($query);
} 
elseif(isset($_GET['voltage']) && isset($_GET['frequency']) && isset($_GET['amperage']) && isset($_GET['energy']) && isset($_GET['pFactor'])){
	$voltage = $_GET['voltage'];
	$frequency = $_GET['frequency'];
	$amperage = $_GET['amperage'];
	$energy = $_GET['energy'];
	$pFactor = $_GET['pFactor'];
	$query = "update pzem set voltage=$voltage, frequency=$frequency, amperage=$amperage, energy=$energy, pFactor=$pFactor where 1";
	echo $conn->query($query);
}else{
	$query = "select * from pzem";
	$result = $conn->query($query);
	$output=mysqli_fetch_assoc($result);
	
	$query = "select * from `buttons`";
	$result = $conn->query($query);

	while ($r = mysqli_fetch_assoc($result)) {
		switch ($r['id']) {
			case 1:
				$output['relayMain'] = $r['status'];
				break;
			case 2:
				$output['relay1'] = $r['status'];
				break;
			case 3:
				$output['relay2'] = $r['status'];
				break;
			case 4:
				$output['relay3'] = $r['status'];
				break;
		}
	}

	echo json_encode($output);
}
?>
