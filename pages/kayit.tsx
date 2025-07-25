import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        toast.error('Zaten kayıt oldunuz!');
        router.replace('/');
      }
    };
    checkUser();
  }, [router]);

  const handleProviderRegister = (provider: 'google' | 'github') => {
    toast.error(`${provider} ile kayıt şu an için desteklenmiyor.`);
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirm) {
      toast.error('Lütfen tüm alanları doldurun.');
      return;
    }
    if (password !== confirm) {
      toast.error('Şifreler uyuşmuyor.');
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Kayıt başarılı! Hoş geldin, ${email.split('@')[0]}!`);
      router.push('/');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 md:px-8 py-12">
      <div className="w-full max-w-md rounded-md p-6 sm:p-8 space-y-6 border border-neutral-300 bg-white">
        <h2 className="text-2xl text-center text-neutral-800">Kayıt Ol</h2>
        <p className="text-center text-sm text-neutral-500">Devam etmek için bir yöntem seçin</p>

        <form onSubmit={handleEmailRegister} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-neutral-600">E-posta</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
              placeholder="ornek@mail.com"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-neutral-600">Şifre</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="confirm" className="text-sm text-neutral-600">Şifre Tekrar</label>
            <input
              type="password"
              id="confirm"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-neutral-600 text-white py-2 rounded-md text-sm font-medium hover:bg-neutral-700 transition mt-4"
          >
            Kayıt Ol
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-200" />
          </div>
          <div className="relative flex justify-center text-sm text-neutral-500">
            <span className="bg-white px-6">veya</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleProviderRegister('google')}
            className="flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            <FcGoogle className="text-xl" />
            <span className="text-sm text-neutral-700">Google ile Kayıt Ol</span>
          </button>

          <button
            onClick={() => handleProviderRegister('github')}
            className="flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            <FaGithub className="text-xl text-gray-800" />
            <span className="text-sm text-neutral-700">GitHub ile Kayıt Ol</span>
          </button>
        </div>

        <p className="text-xs text-center text-neutral-600">
          Zaten bir hesabınız var mı?{' '}
          <a href="/giris" className="underline font-medium">Giriş Yapın</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
