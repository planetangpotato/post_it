<?php
	include('connection.php');

	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	$username = $request ->username;
	$password = $request ->password;

	$data = array();

	$accounts = mysqli_query($conn,"SELECT * FROM login WHERE username ='$username' AND password ='$password'");
	$row = mysqli_fetch_assoc($accounts);
	$id = $row['username'];
	if($id != ""){
			array_push($data,$id);
	}else{
		array_push($data, "Account Doesn't exist!");
	}
	echo json_encode($data);
?>
