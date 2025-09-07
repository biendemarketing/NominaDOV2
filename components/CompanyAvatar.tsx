import React from 'react';
import { Company } from '../types';

interface CompanyAvatarProps {
  company: Company;
  size?: 'small' | 'medium' | 'large';
}

const colors = [
    'bg-red-200 text-red-800', 'bg-yellow-200 text-yellow-800', 'bg-green-200 text-green-800', 
    'bg-blue-200 text-blue-800', 'bg-indigo-200 text-indigo-800', 'bg-purple-200 text-purple-800',
    'bg-pink-200 text-pink-800', 'bg-teal-200 text-teal-800'
];

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
}

const getColorForString = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

const CompanyAvatar: React.FC<CompanyAvatarProps> = ({ company, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-8 h-8 text-xs',
    medium: 'w-10 h-10 text-sm',
    large: 'w-12 h-12 text-base',
  };

  if (company.logoUrl) {
    return (
      <img
        src={company.logoUrl}
        alt={`${company.name} logo`}
        className={`${sizeClasses[size]} rounded-lg object-contain`}
      />
    );
  }

  const initials = getInitials(company.name);
  const colorClass = getColorForString(company.id);

  return (
    <div
      className={`${sizeClasses[size]} ${colorClass} rounded-lg flex items-center justify-center font-bold`}
    >
      <span>{initials}</span>
    </div>
  );
};

export default CompanyAvatar;