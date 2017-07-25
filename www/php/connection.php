<?php
	header ('Access-Control-Allo-Origin: *');
$servername =  "localhost";
$username =  "root ";
$password =  "";
$dbname =  "announcement";
$conn = mysqli_connect('localhost','root','','announcement' );
if(!$conn){
		die("connection failed:".mysqli_connect_error());
	}
 ?>
