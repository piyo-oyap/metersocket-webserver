<?php
$conn = new mysqli("localhost","metersocket","FabLab2.0","meter_socket") or die("Database conncection failed".mysqli_connect_error());
$query = "";
if(isset($_GET['id']) && isset($_GET['status'])){
	$id = $_GET['id'];
	$status = $_GET['status'];
	$query = "update buttons set status=$status where id=$id";
	echo $conn->query($query);
}else if(isset($_GET['voltage']) && isset($_GET['frequency']) && isset($_GET['amperage']) && isset($_GET['energy']) && isset($_GET['pFactor'])){
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
	$rows = array();
	while($r=mysqli_fetch_assoc($result)){
		$rows[] = $r;
	}
	echo json_encode($rows);
}
?>
