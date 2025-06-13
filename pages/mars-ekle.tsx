import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
import 'react-markdown-editor-lite/lib/index.css';
import toast from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';
import MarkdownIt from 'markdown-it';

const MarsEkle = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [mars, setMars] = useState('');
  const [hikaye, setHikaye] = useState('');
  const [loading, setLoading] = useState(false);
  const mdParser = new MarkdownIt();

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        toast.error('Bu sayfaya erişmek için giriş yapmalısınız.');
        router.replace('/giris');
      }
    };
    checkAuth();
  }, []);

  function convertLinesToParagraphs(text: string) {
    const lines = text.split('\n');
    let html = '';
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.length > 0) {
        html += `<p>${line}</p>`;
      } else {
        html += '<br />';
      }
    }
    return html;
  }

  const handleSave = async () => {
    if (!title.trim() || !mars.trim()) {
      toast.error('Lütfen başlık ve marş (şiir) alanlarını doldurun.');
      return;
    }

    if (title.length > 100) {
      toast.error('Başlık 100 karakterden uzun olamaz.');
      return;
    }

    if (author.length > 50) {
      toast.error('Yazar adı 50 karakterden uzun olamaz.');
      return;
    }

    setLoading(true);
    const marsHtml = convertLinesToParagraphs(mars);

    const { error } = await supabase.from('marslar').insert([
      {
        title,
        author: author || null,
        mars: marsHtml,
        hikaye: hikaye || null,
        approved: false,
      },
    ]);
    setLoading(false);

    if (error) {
      toast.error('Bir hata oluştu: ' + error.message);
    } else {
      toast.success('Marş başarıyla eklendi!');
      setTitle('');
      setAuthor('');
      setMars('');
      setHikaye('');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-16 px-4 sm:px-6 md:px-8">
      <div className="space-y-6 bg-white border border-neutral-200 rounded-md p-4 sm:p-6">
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

        {/* Yazar (Opsiyonel) */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Yazar <span className="text-neutral-400 font-normal">(opsiyonel)</span>
          </label>
          <input
            type="text"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
            placeholder="Yazar adı"
          />
        </div>

        {/* Marş (Zorunlu) */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Marş (Şiir)</label>
          <textarea
            value={mars}
            onChange={e => setMars(e.target.value)}
            rows={10}
            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-neutral-500"
            placeholder="Marşı buraya yazın..."
          />
        </div>

        {/* Hikaye (Markdown, Opsiyonel) */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Hikayesi <span className="text-neutral-400 font-normal">(opsiyonel)</span>
          </label>
          <MdEditor
            value={hikaye}
            style={{ height: '200px' }}
            renderHTML={text => mdParser.render(text)}
            onChange={({ text }) => setHikaye(text)}
            view={{
              menu: true,
              md: true,
              html: typeof window !== 'undefined' && window.innerWidth >= 768, // md: true, html: false on mobile
            }}
            placeholder="Marşın hikayesini yazın..."
          />
        </div>

        <p className="text-sm text-neutral-500 pt-2">
          Gönderdiğiniz bu marş (şiir), moderatörler tarafından onaylandıktan sonra yayınlanacaktır. İlginiz ve katkınız için teşekkür ederiz.
        </p>

        {/* Kaydet Butonu */}
        <button
          className="w-full mt-4 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition cursor-pointer text-sm font-medium"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Kaydediliyor...' : 'Kaydet'}
        </button>
      </div>
    </div>
  );
};

export default MarsEkle;
