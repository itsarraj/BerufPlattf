import React from 'react';
import { Button } from '@/components/ui/Button';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  employmentType: string;
  onApply: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  salary,
  employmentType,
  onApply
}) => {
  return (
    <div className="card-style flex flex-col items-center gap-4">
      <h3 className="text-heading-4 text-center">{title}</h3>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-body">{company}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-body">{location}</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        <span className="tag-style">{salary}</span>
        <span className="tag-style">{employmentType}</span>
      </div>

      <Button
        variant="primary"
        size="md"
        onClick={onApply}
        className="w-full max-w-[160px]"
      >
        Apply
      </Button>
    </div>
  );
};