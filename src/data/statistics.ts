export interface Statistic {
  id: string;
  icon: string;
  value: number;
  label: string;
  suffix?: string;
}

export const statistics: Statistic[] = [
  {
    id: 'websites',
    icon: 'Globe',
    value: 20,
    label: 'Websites'
  },
  {
    id: 'clients',
    icon: 'Users',
    value: 10,
    label: 'Satisfied Clients'
  },
  {
    id: 'projects',
    icon: 'Briefcase',
    value: 5,
    label: 'Projects'
  },
  {
    id: 'apps',
    icon: 'Smartphone',
    value: 4,
    label: 'Apps'
  }
];