<?php
include 'connection.php';
$id = $_GET['id'];

mysqli_query($conn,"DELETE FROM addannouncement Where announcementid = '$id'");
echo "$id";

?>
