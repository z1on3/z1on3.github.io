<?php
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;

	require 'includes/Exception.php';
	require 'includes/PHPMailer.php';
	require 'includes/SMTP.php';
	//include('includes/db_conn.php');
	//to connect use>> $conn
	if(isset($_POST["email"]) == true){
		
		
		$fname=$_POST["name"];
		$surname=$_POST["surname"];
		$fullname=$fname." ".$surname;
		$email=$_POST["email"];
		$subject=$_POST["subject"];
		$message=$_POST["message"];
		$title="Message Sent";

		/*$sql = "INSERT INTO `techcarlodb`.`messages` (`Date`, `Fullname`, `Phone`, `Email`, `Message`) VALUES (CURRENT_DATE(),'$fullname', '$phone', '$email','$message')";
		mysqli_query($conn, $sql);
		mysqli_close($conn);*/

		//PHPMailer Object
        $mail = new PHPMailer;
        include("includes/smtpgmail.php");
        //From email address and name
        $mail->From = $email;
        $mail->FromName = $fullname;
        //To address and name
        $mail->addAddress("panercarlo99@gmail.com", "Carlo Vicente");
        //$mail->addAddress("recepient1@example.com"); //Recipient name is optional
        //Address to which recipient will reply
        $mail->addReplyTo($email, "Reply");
        //Send HTML or Plain Text email
        $mail->isHTML(true);

        $mail->Subject = $subject." | Portfolio Contact Page";
        $mail->Body = $message;
        //$mail->AltBody = "This is the plain text version of the email content";


    	if(!$mail->send()) 
    	{
        	echo "Mailer Error: " . $mail->ErrorInfo;

    	} 
    	else 
    	{
            
    	}
		

	}else{


		$fname="null";
		$surname="null";
		$fullname=$fname." ".$surname;
		$email="null";
		$subject="null";
		$message="null";
		$title="Direct Access not allowed";

	}

?>

<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?php echo $title; ?></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="all,follow">
    <!-- Bootstrap CSS-->
    <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css">
    <!-- Font Awesome CSS-->
    <link rel="stylesheet" href="vendor/font-awesome/css/font-awesome.min.css">
    <!-- Google fonts - Roboto + Roboto Slab-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,700%7CRoboto:400,700,300">
    <!-- owl carousel-->
    <link rel="stylesheet" href="vendor/owl.carousel/assets/owl.carousel.css">
    <link rel="stylesheet" href="vendor/owl.carousel/assets/owl.theme.default.css">
    <!-- animate.css-->
    <link rel="stylesheet" href="vendor/animate.css/animate.css">
    <!-- theme stylesheet-->
    <link rel="stylesheet" href="css/style.gray.css" id="theme-stylesheet">
    <!-- Custom stylesheet - for your changes-->
    <link rel="stylesheet" href="css/custom.css?<?php echo time(); ?>">
    <!-- Leaflet CSS - For the map-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.4.0/leaflet.css">
    <!-- Favicon-->
    <link rel="shortcut icon" href="img/favicon.png">
    
    <!-- Tweaks for older IEs--><!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><![endif]-->
  </head>

  <body class="bg-1">
  	
  	<br>
  	<div class="bg-2 container">

 		<div class="row">
 			<div class="col-md-1"></div>
 			<div class="col-md-1"></div>
 			
 			
 			<div class="col-md-8"><header class="text-center"><h1 class="title"><?php echo $title; ?></h1></header></div>
 			
 			
 			<div class="col-md-1"></div>
 			<div class="col-md-1"><a id="goback" href="/"><button class="button2"></button></a></div>
 		</div>

 		<div class="row">
 			
 			<div class="col-md-2"></div>
			<div class="col-md-1"></div>
			<div class="col-md-1"></div>
			<div class="col-md-1"><p class="right-align">Name:</p></div>
			<div class="col-md-3"><?php echo $fullname; ?></div>
			<div class="col-md-2"></div>
 			<div class="col-md-2"></div>

 		</div>

 		<div class="row">
 			
 			<div class="col-md-2"></div>
			<div class="col-md-1"></div>
			<div class="col-md-1"></div>
			<div class="col-md-1"><p class="right-align">Email:</p></div>
			<div class="col-md-3"><?php echo $email; ?></div>
			<div class="col-md-2"></div>
 			<div class="col-md-2"></div>

 		</div>

 		<div class="row">
 			
 			<div class="col-md-2"></div>
			<div class="col-md-1"></div>
			<div class="col-md-1"></div>
			<div class="col-md-1"><p class="right-align">Suject:</p></div>
			<div class="col-md-3"><?php echo $subject; ?></div>
			<div class="col-md-2"></div>
 			<div class="col-md-2"></div>

 		</div>

 		<div class="row">
 			
 			<div class="col-md-2"></div>
			<div class="col-md-1"></div>
			<div class="col-md-1"></div>
			<div class="col-md-1"><p class="right-align">Message:</p></div>
			<div class="col-md-3"><?php echo $message; ?></div>
			<div class="col-md-2"></div>
 			<div class="col-md-2"></div>

 		</div>
 		<br>
<!--
 		<div class="row">
 			<div class="col-md-2"></div>
 			<div class="col-md-2"></div>
 			<div class="col-md-4 text-center"><a id="goback" onclick="redirectTo()"><button class="button1">Go Back</button></a></div>
 			<div class="col-md-2"></div>
 			<div class="col-md-2"></div>
 		</div>
-->


  	</div>
  	<br>
<script type="text/javascript" src="js/custom.js"></script>
  </body>

 </html>
