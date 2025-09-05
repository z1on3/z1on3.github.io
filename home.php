<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Carlo Vii | Portfolio</title>
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
    <link rel="stylesheet" href="css/portfolio.css?<?php echo time(); ?>">
    <!-- Leaflet CSS - For the map
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.4.0/leaflet.css">-->
    <!-- Favicon-->
    <link rel="shortcut icon" href="img/favicon.png">
    <!-- Tweaks for older IEs--><!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script><![endif]-->
  </head>
  <body>
    <!-- Reference item-->
    <!-- navbar-->
    <header class="header">
      <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container"><a href="#intro" class="navbar-brand scrollTo">Carlo Vii</a>
          <button type="button" data-toggle="collapse" data-target="#navbarcollapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler navbar-toggler-right"><span class="fa fa-bars"></span></button>
          <div id="navbarcollapse" class="collapse navbar-collapse">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item"><a href="/home" class="nav-link link-scroll activenow">Intro</a></li>
              <li class="nav-item"><a href="/about" class="nav-link link-scroll">About</a></li>
              <li class="nav-item"><a href="/services-stats" class="nav-link link-scroll">Services & Stats</a></li>
              <li class="nav-item"><a href="/projects" class="nav-link link-scroll">Projects</a></li>
              <!--<li class="nav-item"><a href="#customers" class="nav-link link-scroll">Clients</a></li>-->
              <li class="nav-item"><a href="/contactme" class="nav-link link-scroll">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <!-- Intro Image-->
    <section id="intro" style="background: url(img/home.jpg) center center no-repeat; background-size: cover;" class="intro-section pb-2">
      <div class="container text-center">
        <div data-animate="fadeInDown" class="logo"><img src="img/logo-big.png" alt="logo" width="130"></div>
        <h1 data-animate="fadeInDown" class="text-shadow mb-5">Hello, Hola!</h1>
        <p data-animate="slideInUp" class="h3 text-shadow text-400">I grind HTML and CSS and then weld them with PHP into beautiful and efficient websites, and after long day of work I drink Java then relax by listening to C# melodies.</p>
      </div>
    </section>

    <!-- Map-->
    <!--<div id="map"></div>-->
    <!-- FOOTER -->
    <footer class="main-footer">
      <div class="container">
        <div class="row">
          <div class="col-md-6 text-center text-lg-left">
            <p class="social">
                <a href="https://www.facebook.com/CarloV.ph" target="_blank" class="external wow fadeInUp"><i class="fa fa-facebook"></i></a>
                <a href="https://www.instagram.com/xcarlov/" target="_blank" data-wow-delay="0.2s" class="external wow fadeInUp"><i class="fa fa-instagram"></i></a>
                <a href="https://twitter.com/CarloViiii" target="_blank" data-wow-delay="0.4s" class="external wow fadeInUp"><i class="fa fa-twitter"></i></a>
                <a href="mailto:panercarlo99@gmail.com" target="_blank" data-wow-delay="0.6s" class="wow fadeInUp"><i class="fa fa-envelope"></i></a></p>
          </div>
          <!-- /.6-->
          <div class="col-md-6 text-center text-lg-right mt-4 mt-lg-0">
            <p>©<?php echo time("Y"); ?> - Carlo Vii. All rights reserved.</p>
          </div>
          <div class="col-12 mt-4 text-center">
            <p>Designed by <a href='https://www.facebook.com/CarloV.ph' target="_blank" >Carlo Vii</a></p>
          </div>
        </div>
      </div>
    </footer>
    <!-- JavaScript files-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <script src="vendor/jquery.cookie/jquery.cookie.js"> </script>
    <script src="vendor/owl.carousel/owl.carousel.min.js"></script>
    <script src="vendor/waypoints/lib/jquery.waypoints.min.js"></script>
    <script src="vendor/jquery.counterup/jquery.counterup.js"></script>
    <!--<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.4.0/leaflet.js"> </script>-->
    <script src="js/front.js"></script>
    <script src="js/detect.js"></script>
    <script type="text/javascript" src="js/custom.js"></script>
  </body>
</html>