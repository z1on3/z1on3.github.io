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
              <li class="nav-item"><a href="#intro" class="nav-link link-scroll">Intro</a></li>
              <li class="nav-item"><a href="#about" class="nav-link link-scroll">About</a></li>
              <li class="nav-item"><a href="#services" class="nav-link link-scroll">Services</a></li>
              <li class="nav-item"><a href="#statistics" class="nav-link link-scroll">Statistics</a></li>
              <li class="nav-item"><a href="#references" class="nav-link link-scroll">My work</a></li>
              <!--<li class="nav-item"><a href="#customers" class="nav-link link-scroll">Clients</a></li>-->
              <li class="nav-item"><a href="#contact" class="nav-link link-scroll">Contact</a></li>
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
    <!-- About-->
    <section id="about" class="about-section">
      <div class="container">
        <header class="text-center">
          <h2 data-animate="fadeInDown" class="title">About me</h2>
        </header>
        <?php include("aboutme.html");?>
      </div>
    </section>
    <!-- Service-->
    <section id="services" class="bg-gradient services-section">
      <div class="container">
        <header class="text-center">
          <h2 data-animate="fadeInDown" class="title">Services</h2>
        </header>
        <div class="row services text-center">
          <div data-animate="fadeInUp" class="col-lg-4">
            <div class="icon"><i class="fa fa-search"></i></div>
            <h3 class="heading mb-3 text-400">Consulting</h3>
            <p class="text-left description">You can consult me for your website security. I have experience on website penetration testing so you can count on me.</p>
          </div>
          <div data-animate="fadeInUp" class="col-lg-4">
            <div class="icon"><i class="fa fa-html5"></i></div>
            <h3 class="heading mb-3 text-400">HTML coding</h3>
            <p class="text-left description">I am experienced in HTML coding. I can build responsive websites although I am not skillful on front-end thing.</p>
          </div>
          <div data-animate="fadeInUp" class="col-lg-4">
            <div class="icon"><i class="fa fa-tachometer"></i></div>
            <h3 class="heading mb-3 text-400">PHP web development</h3>
            <p class="text-left description">PHP is my forte. I don't use frameworks yet as I stick to native.</p>
          </div>
        </div>
        <hr data-animate="fadeInUp">
        <div data-animate="fadeInUp" class="text-center">
          <p class="lead">Would you like to know more or just discuss something?</p>
          <p><a href="#contact" class="btn btn-outline-light link-scroll">Contact me</a></p>
        </div>
      </div>
    </section>
    <!-- Testimonials-->
    <!--<section id="testimonials" class="testimonials-section bg-gray">
      <div class="container">
        <header class="text-center mb-2">
          <h2 data-animate="fadeInUp" class="title">My Clients said<br><span>about me</span></h2>
          <p data-animate="fadeInUp" class="lead">I am always glad to hear that my clients leave satisfied. Some of them shared with you their insights on our cooperation.</p>
        </header>
        <div class="row">
          <div class="col-12 text-center">
        <ul data-animate="fadeInUp" class="owl-carousel owl-theme testimonials equalize-height">
          <li class="item">
            <div class="testimonial full-height">
              <div class="text">
                <p>He was very patient in answering my silly tech questions. He was quick in figuring out the problems and acting on the best solutions. Job well-done for a newbie here in UpWork!</p>
              </div>
              <div class="bottom">
                <div class="icon"><i class="fa fa-quote-left"></i></div>
                <div class="name-picture"><img alt="" src="img/person-1.jpg">
                  <h5>Alain Sojourner</h5>
                  <p>TORONTO, CANADA</p>
                </div>
              </div>
            </div>
          </li>
          <li class="item">
            <div class="testimonial full-height">
              <div class="text">
                <p>He is a passionate and smart engineer to work with. I'll definitely work with him again someday!</p>
              </div>
              <div class="bottom">
                <div class="icon"><i class="fa fa-quote-left"></i></div>
                <div class="name-picture"><img alt="" src="img/person-1.jpg">
                  <h5>Jin Tak Lee</h5>
                  <p>INCHEON, SOUTH KOREA</p>
                </div>
              </div>
            </div>
          </li>
        </ul>
        </div>
      </div>
      </div>
    </section>-->
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
              <h5 class="text-400 mt-4 text-uppercase"><span class="counter">5</span><br>Projects</h5>
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
    <!--
    *** REFERENCES IMAGE ***
    _________________________________________________________
    -->
    <section id="references">
      <div class="container">
        <div class="col-sm-12">
          <div class="mb-5 text-center">
            <h2 data-animate="fadeInUp" class="title">My work</h2>
            <p data-animate="fadeInUp" class="lead">I have 2 personal projects and 3 private projects. So some of the content below are just a template for future projects.</p>
          </div>
          <ul id="filter" data-animate="fadeInUp">
            <li class="active"><a href="#" data-filter="all">All</a></li>
            <li><a href="#" data-filter="webdesign">Webdesign</a></li>
            <li><a href="#" data-filter="seo">SEO</a></li>
            <li><a href="#" data-filter="marketing">Marketing</a></li>
            <li><a href="#" data-filter="personal">Personal Projects</a></li>
          </ul>
          <div id="detail">
            <div class="row">
              <div class="col-lg-10 mx-auto"><span class="close">×</span>
                <div id="detail-slider" class="owl-carousel owl-theme"></div>
                <div class="text-center">
                  <h1 id="detail-title" class="title"></h1>
                </div>
                <div id="detail-content"></div>
              </div>
            </div>
          </div>
          <!-- Reference detail-->
          <div id="references-masonry" data-animate="fadeInUp">
            <div class="row">
                  <div data-category="personal" class="reference-item col-lg-3 col-md-6">
                    <div class="reference"><a href="#"><img src="img/tc19-1.jpg" alt="" class="img-fluid">
                        <div class="overlay">
                          <div class="inner">
                            <h3 class="h4 reference-title">Covid-19 Tracker LITE</h3>
                            <p>A helpful very lightweight tool to track COVID-19 cases in realtime.</p>
                          </div>
                        </div></a>
                      <div data-images="img/proj1/tc19-1.jpg,img/proj1/tc19-2.jpg,img/proj1/tc19-3.jpg" class="sr-only reference-description">
                        <p>Accurate data is important for medical research and for public information on this pandemic. Although there already many Covid-19 tracker out there, they are usually slow loading because of heavy data and traffic they consume. I come up with my very own Covid-19 tracker to solve that problem especially here in the Philippines where the internet speed is slow. My webapp is a lightweight and straightforward Covid-19 tracker and it can load for less than a second. It automatically gathers data on Covid-19 cases on all country of the world and give confirmed cases, deaths, and recoveries.</p>
                        <p class="buttons text-center"><a href="tracker-v2.php" class="btn btn-outline-primary"><i class="fa fa-globe"></i> Visit website</a><a href="/pdf/Covid-19 Tracker Lite.pdf" class="btn btn-outline-primary"><i class="fa fa-download"></i> Download case study</a></p>
                      </div>
                    </div>
                  </div>
                  <div data-category="personal" class="reference-item col-lg-3 col-md-6">
                    <div class="reference"><a href="#"><img src="img/election2022.png" alt="" class="img-fluid">
                        <div class="overlay">
                          <div class="inner">
                            <h3 class="h4 reference-title">Election 2022 - National Results</h3>
                            <p>Shows realtime partial and unofficial results of 2022  national elections.</p>
                          </div>
                        </div></a>
                      <div data-images="img/election2022/e2022-1.png" class="sr-only reference-description">
                        <p>A quick project that shows the realtime partial and unofficial results of the May 9, 2022 election. #OneNightBuilds</p>
                        <p class="buttons text-center"><a href="https://gamersportal.ml/election2022" class="btn btn-outline-primary"><i class="fa fa-globe"></i> Visit website</a><a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-download"></i> Download case study</a></p>
                      </div>
                    </div>
                  </div>
                  <div data-category="personal" class="reference-item col-lg-3 col-md-6">
                    <div class="reference"><a href="#"><img src="img/fragp/fragpmenu.png" alt="" class="img-fluid">
                        <div class="overlay">
                          <div class="inner">
                            <h3 class="h4 reference-title">FRAGP</h3>
                            <p>Face Recognition with Age and Gender Prediction.</p>
                          </div>
                        </div></a>
                      <div data-images="img/fragp/fragpscr1.png,img/fragp/fragpscr2.png,img/fragp/fragpscr3.png" class="sr-only reference-description">
                        <p>This is a powerful and highly accurate Face Recognition system, designed with Python programming language. It can accurately detect faces in real-time and predict both the age and gender of the person, making it ideal for a wide range of applications. With its ability to process images quickly and accurately, you can be sure that your results will be reliable and accurate every time.</p>
                        <p class="buttons text-center"><a href="https://www.youtube.com/watch?v=tPq5MbQ4fP4" target="_blank" class="btn btn-outline-primary"><i class="fa fa-globe"></i> Watch Demo</a><a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-download"></i> Download case study</a></p>
                      </div>
                    </div>
                  </div>
                  <div data-category="marketing" class="reference-item col-lg-3 col-md-6">
                    <div class="reference"><a href="#"><img src="img/portfolio-4.jpg" alt="" class="img-fluid">
                        <div class="overlay">
                          <div class="inner">
                            <h3 class="h4 reference-title">Project name 4</h3>
                            <p>Short project description goes here...</p>
                          </div>
                        </div></a>
                      <div data-images="img/main-slider1.jpg,img/main-slider2.jpg,img/main-slider3.jpg" class="sr-only reference-description">
                        <p>Projecting surrounded literature yet delightful alteration but bed men. Open are from long why cold. If must snug by upon sang loud left. As me do preference entreaties compliment motionless ye literature. Day behaviour explained law remainder. Produce can cousins account you pasture. Peculiar delicate an pleasant provided do perceive.</p>
                        <p>Sitting mistake towards his few country ask. You delighted two rapturous six depending objection happiness something the. Off nay impossible dispatched partiality unaffected. Norland adapted put ham cordial. Ladies talked may shy basket narrow see. Him she distrusts questions sportsmen. Tolerably pretended neglected on my earnestly by. Sex scale sir style truth ought.</p>
                        <p class="buttons text-center"><a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-globe"></i> Visit website</a><a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-download"></i> Download case study</a></p>
                      </div>
                    </div>
                  </div>
                  <div data-category="webdesign" class="reference-item col-lg-3 col-md-6">
                    <div class="reference"><a href="#"><img src="img/portfolio-5.jpg" alt="" class="img-fluid">
                        <div class="overlay">
                          <div class="inner">
                            <h3 class="h4 reference-title">Project name 5</h3>
                            <p>Short project description goes here...</p>
                          </div>
                        </div></a>
                      <div data-images="img/main-slider1.jpg,img/main-slider2.jpg,img/main-slider3.jpg" class="sr-only reference-description">
                        <p>Projecting surrounded literature yet delightful alteration but bed men. Open are from long why cold. If must snug by upon sang loud left. As me do preference entreaties compliment motionless ye literature. Day behaviour explained law remainder. Produce can cousins account you pasture. Peculiar delicate an pleasant provided do perceive.</p>
                        <p>Sitting mistake towards his few country ask. You delighted two rapturous six depending objection happiness something the. Off nay impossible dispatched partiality unaffected. Norland adapted put ham cordial. Ladies talked may shy basket narrow see. Him she distrusts questions sportsmen. Tolerably pretended neglected on my earnestly by. Sex scale sir style truth ought.</p>
                        <p class="buttons text-center"><a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-globe"></i> Visit website</a><a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-download"></i> Download case study</a></p>
                      </div>
                    </div>
                  </div>
                  <div data-category="personal" class="reference-item col-lg-3 col-md-6">
                    <div class="reference"><a href="#"><img src="img/portfolio-6.jpg" alt="" class="img-fluid">
                        <div class="overlay">
                          <div class="inner">
                            <h3 class="h4 reference-title">Project name 6</h3>
                            <p>Short project description goes here...</p>
                          </div>
                        </div></a>
                      <div data-images="img/main-slider1.jpg,img/main-slider2.jpg,img/main-slider3.jpg" class="sr-only reference-description">
                        <p>Projecting surrounded literature yet delightful alteration but bed men. Open are from long why cold. If must snug by upon sang loud left. As me do preference entreaties compliment motionless ye literature. Day behaviour explained law remainder. Produce can cousins account you pasture. Peculiar delicate an pleasant provided do perceive.</p>
                        <p>Sitting mistake towards his few country ask. You delighted two rapturous six depending objection happiness something the. Off nay impossible dispatched partiality unaffected. Norland adapted put ham cordial. Ladies talked may shy basket narrow see. Him she distrusts questions sportsmen. Tolerably pretended neglected on my earnestly by. Sex scale sir style truth ought.</p>
                        <p class="buttons text-center"><a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-globe"></i> Visit website</a><a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-download"></i> Download case study</a></p>
                      </div>
                    </div>
                  </div>
                  <div data-category="seo" class="reference-item col-lg-3 col-md-6">
                    <div class="reference"><a href="#"><img src="img/portfolio-7.jpg" alt="" class="img-fluid">
                        <div class="overlay">
                          <div class="inner">
                            <h3 class="h4 reference-title">Project name</h3>
                            <p>Short project description goes here...</p>
                          </div>
                        </div></a>
                      <div data-images="img/main-slider1.jpg,img/main-slider2.jpg,img/main-slider3.jpg" class="sr-only reference-description">
                        <p>Projecting surrounded literature yet delightful alteration but bed men. Open are from long why cold. If must snug by upon sang loud left. As me do preference entreaties compliment motionless ye literature. Day behaviour explained law remainder. Produce can cousins account you pasture. Peculiar delicate an pleasant provided do perceive.</p>
                        <p>Sitting mistake towards his few country ask. You delighted two rapturous six depending objection happiness something the. Off nay impossible dispatched partiality unaffected. Norland adapted put ham cordial. Ladies talked may shy basket narrow see. Him she distrusts questions sportsmen. Tolerably pretended neglected on my earnestly by. Sex scale sir style truth ought.</p>
                        <p class="buttons text-center"><a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-globe"></i> Visit website</a><a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-download"></i> Download case study</a></p>
                      </div>
                    </div>
                  </div>
                  <div data-category="webdesign" class="reference-item col-lg-3 col-md-6">
                    <div class="reference"><a href="#"><img src="img/portfolio-8.jpg" alt="" class="img-fluid">
                        <div class="overlay">
                          <div class="inner">
                            <h3 class="h4 reference-title">Project name</h3>
                            <p>Short project description goes here...</p>
                          </div>
                        </div></a>
                      <div data-images="img/main-slider1.jpg,img/main-slider2.jpg,img/main-slider3.jpg" class="sr-only reference-description">
                        <p>Projecting surrounded literature yet delightful alteration but bed men. Open are from long why cold. If must snug by upon sang loud left. As me do preference entreaties compliment motionless ye literature. Day behaviour explained law remainder. Produce can cousins account you pasture. Peculiar delicate an pleasant provided do perceive.</p>
                        <p>Sitting mistake towards his few country ask. You delighted two rapturous six depending objection happiness something the. Off nay impossible dispatched partiality unaffected. Norland adapted put ham cordial. Ladies talked may shy basket narrow see. Him she distrusts questions sportsmen. Tolerably pretended neglected on my earnestly by. Sex scale sir style truth ought.</p>
                        <p class="buttons text-center"><a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-globe"></i> Visit website</a><a href="javascript:void(0);" class="btn btn-outline-primary"><i class="fa fa-download"></i> Download case study</a></p>
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <hr>
    <!-- Customers
    <section id="customers" class="customers-section bg-gray">
      <div class="container">
        <div class="col-md-12">
          <div class="row align-items-center">
            <div class="col-lg-2 col-md-4 col-sm-6">
              <div class="customer"><img src="img/customers/logo-1.svg" title="brand logo" data-placement="bottom" data-toggle="tooltip" alt="" class="img-fluid d-block mx-auto"></div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-6">
              <div class="customer"><img src="img/customers/logo-2.svg" title="brand logo" data-placement="bottom" data-toggle="tooltip" alt="" class="img-fluid d-block mx-auto"></div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-6">
              <div class="customer"><img src="img/customers/logo-3.svg" title="brand logo" data-placement="bottom" data-toggle="tooltip" alt="" class="img-fluid d-block mx-auto"></div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-6">
              <div class="customer"><img src="img/customers/logo-4.svg" title="brand logo" data-placement="bottom" data-toggle="tooltip" alt="" class="img-fluid d-block mx-auto"></div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-6">
              <div class="customer"><img src="img/customers/logo-5.svg" title="brand logo" data-placement="bottom" data-toggle="tooltip" alt="" class="img-fluid d-block mx-auto"></div>
            </div>
            <div class="col-lg-2 col-md-4 col-sm-6">
              <div class="customer"><img src="img/customers/logo-6.svg" title="brand logo" data-placement="bottom" data-toggle="tooltip" alt="" class="img-fluid d-block mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </section>-->
    <!-- Contact-->
    <section id="contact" data-animate="bounceIn" class="contact-section contact">
      <div class="container">
        <header class="text-center">
          <h2 class="title">Contact me</h2>
        </header>
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <form id="contact-form" method="post" action="contact">
              <div class="messages"></div>
              <div class="controls">
                <div class="row">
                  <div class="col-md-6">
                    <input type="text" name="name" placeholder="Your firstname *" required="required" class="form-control">
                  </div>
                  <div class="col-md-6">
                    <input type="text" name="surname" placeholder="Your lastname *" required="required" class="form-control">
                  </div>
                  <div class="col-md-6">
                    <input type="text" name="email" placeholder="Your email *" required="required" class="form-control">
                  </div>
                  <div class="col-md-6">
                    <input type="text" name="subject" placeholder="Subject" class="form-control">
                  </div>
                  <div class="col-md-12">
                    <textarea name="message" placeholder="Message for me *" rows="4" required="required" class="form-control"></textarea>
                  </div>
                  <div class="col-md-12 text-center">
                    <button type="submit" class="btn btn-outline-primary">Send message</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
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
            <p>© <?php echo date("Y"); ?> - Carlo Vii. All rights reserved.</p>
          </div>
          <div class="col-12 mt-4">
            <p class="template-bootstrapious">By <a href='https://bootstrapious.com/p/bootstrap-carousel' target="_blank" >Bootstrapious</a> & <a href="https://fity.cz/ostrava" target="_blank" >Fity</a></p>
            <p class="template-bootstrapious">Redesigned by <a href='https://www.facebook.com/CarloV.ph' target="_blank" >Carlo Vii</a></p>

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