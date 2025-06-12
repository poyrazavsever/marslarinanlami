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
      className="block border border-neutral-300 rounded-md p-4 hover:shadow-sm hover:border-neutral-400 transition bg-white cursor-pointer"
    >
      <h3 className="font-medium text-lg text-neutral-800 mb-2">{title}</h3>
      <div
        className="text-neutral-600 text-sm line-clamp-4"
        dangerouslySetInnerHTML={{ __html: mars }}
      />
    </Link>
  );
};

export default Card;