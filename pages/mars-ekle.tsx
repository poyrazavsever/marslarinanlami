import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

const MarsEkle = () => {
  const [title, setTitle] = useState('');
  const [mars, setMars] = useState('');
  const [hikaye, setHikaye] = useState('');

  return (
    <div className="max-w-3xl py-16 px-4 mx-auto">
      <div className="space-y-6 bg-white border border-neutral-200 rounded-md p-6">
        
        {/* Başlık */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Başlık</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
            placeholder="Marş başlığı"
          />
        </div>
        
        {/* Marş (Markdown Editor) */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Marş (Markdown destekli)</label>
          <MdEditor
            value={mars}
            style={{ height: '200px' }}
            renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}
            onChange={({ text }) => setMars(text)}
            view={{ menu: true, md: true, html: false }}
            placeholder="Marşı buraya yazın..."
          />
        </div>
        
        {/* Hikaye */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Hikayesi (Markdown destekli)</label>
          <MdEditor
            value={hikaye}
            style={{ height: '200px' }}
            renderHTML={text => <ReactMarkdown>{text}</ReactMarkdown>}
            onChange={({ text }) => setHikaye(text)}
            view={{ menu: true, md: true, html: false }}
            placeholder="Marşın hikayesini yazın..."
          />
        </div>
        
        {/* Kaydet Butonu */}
        <button
          className="w-full mt-4 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition cursor-pointer"
          onClick={() => {
            toast.success('Marş başarıyla eklendi!');
          }}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default MarsEkle;