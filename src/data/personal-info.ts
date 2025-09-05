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
  name: 'Carlo Vicente Paner Villanobos',
  role: 'Full Stack Developer',
  location: 'Dipolog City, Zamboanga del Norte',
  period: '2016 - Present',
  motivation: 'Innovation & Excellence',
  bio: 'Experienced full stack developer specializing in web applications and modern technologies. Dedicated to creating efficient, scalable solutions that drive business growth.',
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
      icon: 'FaFacebook'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/xcarlov/',
      icon: 'FaInstagram'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/CarloViiii',
      icon: 'FaTwitter'
    },
    {
      name: 'Email',
      url: 'mailto:panercarlo99@gmail.com',
      icon: 'FaEnvelope'
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
    title: 'Security Consulting',
    description: 'Comprehensive security assessments and penetration testing services to protect your digital assets and ensure compliance.',
    icon: 'FaSearch'
  },
  {
    title: 'Frontend Development',
    description: 'Modern responsive web development using HTML5, CSS3, and JavaScript frameworks to create engaging user experiences.',
    icon: 'FaCode'
  },
  {
    title: 'Backend Development',
    description: 'Robust server-side development using PHP and modern frameworks, creating scalable APIs and database solutions.',
    icon: 'FaBolt'
  }
];