import React from 'react';
import Link from 'next/link';

interface CardProps {
  id: string;
  title: string;
  mars: string;
}

const Card: React.FC<CardProps> = ({ id, title, mars }) => {
  return (
    <Link
      href={`/marslar/${id}`}
      className="block border border-neutral-200 rounded-md p-4 shadow-sm hover:shadow-md transition bg-white cursor-pointer"
    >
      <h3 className="font-semibold text-lg text-neutral-800 mb-2">{title}</h3>
      <p className="text-neutral-600 text-sm line-clamp-2">{mars}</p>
    </Link>
  );
};

export default Card;