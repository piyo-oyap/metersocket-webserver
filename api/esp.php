<?php
$conn = new mysqli("localhost","metersocket","FabLab2.0","meter_socket") or die("Database conncection failed".mysqli_connect_error());
$result = $conn->query("select * from buttons");
while($r=mysqli_fetch_assoc($result))
    echo $r['status'];
?>
