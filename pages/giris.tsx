import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { supabase } from '../lib/supabaseClient'; // Supabase client import


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        toast.error('Zaten giriş yaptınız!');
        router.replace('/');
      }
    };
    checkUser();
  }, [router]);

  const handleProviderLogin = (provider: 'google' | 'github') => {
    toast.error(`${provider.toUpperCase()} ile giriş şuan için desteklenmiyor.`);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Lütfen e-posta ve şifre girin.');
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success(`Hoş geldin, ${email.split('@')[0]}!`);
      router.push('/');
      
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-md p-8 space-y-6 border border-neutral-300">
        <h2 className="text-2xl text-center text-neutral-800">Giriş Yap</h2>
        <p className="text-center text-sm text-neutral-500">Devam etmek için bir yöntem seçin</p>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-neutral-600">
              E-posta
            </label>
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
            <label htmlFor="password" className="text-sm text-neutral-600">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-neutral-600 text-white py-2 rounded-md text-sm font-medium hover:bg-neutral-700 transition mt-4"
          >
            Giriş Yap
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


        {/* Social Logins */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => handleProviderLogin('google')}
            className="flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition cursor-pointer"
          >
            <FcGoogle className="text-xl" />
            <span className="text-sm text-neutral-700">Google ile Giriş Yap</span>
          </button>

          <button
            onClick={() => handleProviderLogin('github')}
            className="flex items-center justify-center gap-3 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition cursor-pointer"
          >
            <FaGithub className="text-xl text-gray-800" />
            <span className="text-sm text-neutral-700">GitHub ile Giriş Yap</span>
          </button>
        </div>
        

        <p className="text-xs text-center text-neutral-600">
          Daha kayıt olmadınız mı? <a href='/kayit' className="underline cursor-pointer font-medium">Hemen Kayıt Olun!</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
