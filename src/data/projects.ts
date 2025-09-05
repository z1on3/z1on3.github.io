export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'webdesign' | 'seo' | 'marketing' | 'personal';
  image: string;
  images: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 'covid-tracker',
    title: 'Covid-19 Tracker LITE',
    description: 'A helpful very lightweight tool to track COVID-19 cases in realtime.',
    longDescription: 'Accurate data is important for medical research and for public information on this pandemic. Although there already many Covid-19 tracker out there, they are usually slow loading because of heavy data and traffic they consume. I come up with my very own Covid-19 tracker to solve that problem especially here in the Philippines where the internet speed is slow. My webapp is a lightweight and straightforward Covid-19 tracker and it can load for less than a second. It automatically gathers data on Covid-19 cases on all country of the world and give confirmed cases, deaths, and recoveries.',
    category: 'personal',
    image: '/img/tc19-1.jpg',
    images: ['/img/proj1/tc19-1.jpg', '/img/proj1/tc19-2.jpg', '/img/proj1/tc19-3.jpg'],
    technologies: ['PHP', 'JavaScript', 'APIs', 'Bootstrap'],
    liveUrl: 'tracker-v2.php',
    caseStudyUrl: '/pdf/Covid-19 Tracker Lite.pdf',
    featured: true
  },
  {
    id: 'election-2022',
    title: 'Election 2022 - National Results',
    description: 'Shows realtime partial and unofficial results of 2022 national elections.',
    longDescription: 'A quick project that shows the realtime partial and unofficial results of the May 9, 2022 election. #OneNightBuilds',
    category: 'personal',
    image: '/img/election2022.png',
    images: ['/img/election2022/e2022-1.png'],
    technologies: ['PHP', 'JavaScript', 'Real-time Data'],
    liveUrl: 'https://gamersportal.ml/election2022',
    featured: true
  },
  {
    id: 'fragp',
    title: 'FRAGP',
    description: 'Face Recognition with Age and Gender Prediction.',
    longDescription: 'This is a powerful and highly accurate Face Recognition system, designed with Python programming language. It can accurately detect faces in real-time and predict both the age and gender of the person, making it ideal for a wide range of applications. With its ability to process images quickly and accurately, you can be sure that your results will be reliable and accurate every time.',
    category: 'personal',
    image: '/img/fragp/fragpmenu.png',
    images: ['/img/fragp/fragpscr1.png', '/img/fragp/fragpscr2.png', '/img/fragp/fragpscr3.png'],
    technologies: ['Python', 'Machine Learning', 'Computer Vision', 'OpenCV'],
    liveUrl: 'https://www.youtube.com/watch?v=tPq5MbQ4fP4',
    featured: true
  },
  {
    id: 'project-template-1',
    title: 'Marketing Project Template',
    description: 'Short project description goes here...',
    longDescription: 'Projecting surrounded literature yet delightful alteration but bed men. Open are from long why cold. If must snug by upon sang loud left. As me do preference entreaties compliment motionless ye literature. Day behaviour explained law remainder. Produce can cousins account you pasture. Peculiar delicate an pleasant provided do perceive.',
    category: 'marketing',
    image: '/img/portfolio-4.jpg',
    images: ['/img/main-slider1.jpg', '/img/main-slider2.jpg', '/img/main-slider3.jpg'],
    technologies: ['Marketing', 'Strategy'],
    featured: false
  },
  {
    id: 'project-template-2',
    title: 'Web Design Project Template',
    description: 'Short project description goes here...',
    longDescription: 'Projecting surrounded literature yet delightful alteration but bed men. Open are from long why cold. If must snug by upon sang loud left. As me do preference entreaties compliment motionless ye literature.',
    category: 'webdesign',
    image: '/img/portfolio-5.jpg',
    images: ['/img/main-slider1.jpg', '/img/main-slider2.jpg', '/img/main-slider3.jpg'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    featured: false
  },
  {
    id: 'project-template-3',
    title: 'SEO Project Template',
    description: 'Short project description goes here...',
    longDescription: 'Projecting surrounded literature yet delightful alteration but bed men. Open are from long why cold. If must snug by upon sang loud left.',
    category: 'seo',
    image: '/img/portfolio-7.jpg',
    images: ['/img/main-slider1.jpg', '/img/main-slider2.jpg', '/img/main-slider3.jpg'],
    technologies: ['SEO', 'Analytics'],
    featured: false
  }
];

export const projectCategories = [
  { id: 'all', label: 'All' },
  { id: 'webdesign', label: 'Webdesign' },
  { id: 'seo', label: 'SEO' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'personal', label: 'Personal Projects' }
] as const;