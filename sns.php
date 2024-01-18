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
              <li class="nav-item"><a href="/home" class="nav-link link-scroll">Intro</a></li>
              <li class="nav-item"><a href="/about" class="nav-link link-scroll">About</a></li>
              <li class="nav-item"><a href="/services-stats" class="nav-link link-scroll activenow">Services & Stats</a></li>
              <li class="nav-item"><a href="/projects" class="nav-link link-scroll">Projects</a></li>
              <!--<li class="nav-item"><a href="#customers" class="nav-link link-scroll">Clients</a></li>-->
              <li class="nav-item"><a href="/contactme" class="nav-link link-scroll">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
    <!-- Service-->
    <section id="services" class="services-section" style="margin-top:20px;">
      <div class="container">
        <header class="text-center">
          <h2 data-animate="fadeInDown" class="title">Services</h2>
        </header>
        <div class="row services text-center">
          <div data-animate="fadeInUp" class="col-lg-4">
            <div class="sicon"><i class="fa fa-search"></i></div>
            <h3 class="heading mb-3 text-400">Consulting</h3>
            <p class="text-left description">You can consult me for your website security. I have experience on website penetration testing so you can count on me.</p>
          </div>
          <div data-animate="fadeInUp" class="col-lg-4">
            <div class="sicon"><i class="fa fa-html5"></i></div>
            <h3 class="heading mb-3 text-400">HTML coding</h3>
            <p class="text-left description">I am experienced in HTML coding. I can build responsive websites although I am not skillful on front-end thing.</p>
          </div>
          <div data-animate="fadeInUp" class="col-lg-4">
            <div class="sicon"><i class="fa fa-tachometer"></i></div>
            <h3 class="heading mb-3 text-400">PHP web development</h3>
            <p class="text-left description">PHP is my forte. I don't use frameworks yet as I stick to native.</p>
          </div>
        </div>
        <hr data-animate="fadeInUp">
        <div data-animate="fadeInUp" class="text-center">
          <p class="lead">Would you like to know more or just discuss something?</p>
          <p><a href="#contact" class="btn btn-contact link-scroll">Contact me</a></p>
        </div>
      </div>
    </section>
    
    <!-- Statistics-->
    <section id="statistics" data-dir="up" style="background: url(&quot;img/parallax.jpg&quot;);" class="statistics-section text-white parallax parallax">
      <div class="container">
        <div class="row showcase text-center"> 
          <div data-animate="fadeInUp" class="col-lg-3 col-md-6">
            <div class="item">
              <div class="icon"><i class="fa fa-align-justify"></i></div>
              <h5 class="text-400 mt-4 text-uppercase"><span class="counter">4</span><br>Websites</h5>
            </div>
          </div>
          <div data-animate="fadeInUp" class="col-lg-3 col-md-6">
            <div class="item">
              <div class="icon"><i class="fa fa-users"></i></div>
              <h5 class="text-400 mt-4 text-uppercase"><span class="counter">2</span><br>Satisfied Clients</h5>
            </div>
          </div>
          <div data-animate="fadeInUp" class="col-lg-3 col-md-6">
            <div class="item">
              <div class="icon"><i class="fa fa-copy"></i></div>
              <h5 class="text-400 mt-4 text-uppercase"><span class="counter">4</span><br>Projects</h5>
            </div>
          </div>
          <div data-animate="fadeInUp" class="col-lg-3 col-md-6">
            <div class="item">
              <div class="icon"><i class="fa fa-font"></i></div>
              <h5 class="text-400 mt-4 text-uppercase"><span class="counter">2</span><br>Apps</h5>
            </div>
          </div>
        </div>
      </div>
      <div class="dark-mask"></div>
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
            <p>© 2021 - Carlo Vii. All rights reserved.</p>
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