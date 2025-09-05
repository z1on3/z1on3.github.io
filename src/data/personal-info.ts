export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  period: string;
  motivation: string;
  bio: string;
  skills: Skill[];
  socialLinks: SocialLink[];
}

export interface Skill {
  name: string;
  level: number; // 0-100
  color: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const personalInfo: PersonalInfo = {
  name: 'CARLO VICENTE PANER VILLANOBOS',
  role: 'PROGRAMMER/DEVELOPER',
  location: 'DIPOLOG CITY, ZAMBOANGA DEL NORTE',
  period: '2016 - PRESENT',
  motivation: 'PASSION',
  bio: 'I grind HTML and CSS and then weld them with PHP into beautiful and efficient websites, and after long day of work I drink Java then relax by listening to C# melodies.',
  skills: [
    {
      name: 'PHP',
      level: 80,
      color: '#8892BF'
    },
    {
      name: 'Javascript',
      level: 70,
      color: '#F7DF1E'
    },
    {
      name: 'HTML coding',
      level: 70,
      color: '#E34F26'
    },
    {
      name: 'Java',
      level: 70,
      color: '#ED8B00'
    },
    {
      name: 'Python',
      level: 60,
      color: '#3776AB'
    }
  ],
  socialLinks: [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/CarloV.ph',
      icon: '📘'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/xcarlov/',
      icon: '📸'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/CarloViiii',
      icon: '🐦'
    },
    {
      name: 'Email',
      url: 'mailto:panercarlo99@gmail.com',
      icon: '📧'
    }
  ]
};

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: 'Consulting',
    description: 'You can consult me for your website security. I have experience on website penetration testing so you can count on me.',
    icon: '🔍'
  },
  {
    title: 'HTML coding',
    description: 'I am experienced in HTML coding. I can build responsive websites although I am not skillful on front-end thing.',
    icon: '🌐'
  },
  {
    title: 'PHP web development',
    description: 'PHP is my forte. I don\'t use frameworks yet as I stick to native.',
    icon: '⚡'
  }
];