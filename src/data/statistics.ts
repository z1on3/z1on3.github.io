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
    icon: '📄',
    value: 4,
    label: 'Websites'
  },
  {
    id: 'clients',
    icon: '👥',
    value: 2,
    label: 'Satisfied Clients'
  },
  {
    id: 'projects',
    icon: '📋',
    value: 5,
    label: 'Projects'
  },
  {
    id: 'apps',
    icon: '📱',
    value: 2,
    label: 'Apps'
  }
];