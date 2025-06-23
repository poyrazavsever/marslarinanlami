import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import MarsEkle from '@/components/MarsEkle'

const Profil = () => {
    const [user, setUser] = useState<any>(null)
    const [tab, setTab] = useState<'bekleyen' | 'onaylanan' | 'ekle'>('bekleyen')
    const [bekleyenMarslar, setBekleyenMarslar] = useState<any[]>([])
    const [onaylananMarslar, setOnaylananMarslar] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            const { data } = await supabase.auth.getUser()
            if (!data.user) {
                router.replace('/giris')
            } else {
                setUser(data.user)
            }
        }
        checkAuth()
    }, [])

    useEffect(() => {
        if (!user) return
        const fetchMarslar = async () => {
            setLoading(true)
            // Bekleyen marşlar (onaylanmamış)
            const { data: bekleyen, error: err1 } = await supabase
                .from('marslar')
                .select('*')
                .eq('approved', false)
                .eq('user_id', user.id)
                .order('id', { ascending: false })

            // Onaylanan marşlar
            const { data: onaylanan, error: err2 } = await supabase
                .from('marslar')
                .select('*')
                .eq('approved', true)
                .eq('user_id', user.id)
                .order('id', { ascending: false })

            setBekleyenMarslar(bekleyen || [])
            setOnaylananMarslar(onaylanan || [])
            setLoading(false)
        }
        fetchMarslar()
    }, [user])

    if (!user) {
        return null
    }

    return (
        <div className="py-10 px-4 sm:px-0">
            <h1 className="text-2xl font-medium mb-6 text-neutral-800">Profil</h1>
            <div className="flex gap-2 mb-6">
                <button
                    className={`px-4 py-2 rounded-md cursor-pointer text-sm font-medium ${tab === 'bekleyen' ? 'bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-700'}`}
                    onClick={() => setTab('bekleyen')}
                >
                    Bekleyen Marşlar
                </button>
                <button
                    className={`px-4 py-2 rounded-md cursor-pointer text-sm font-medium ${tab === 'onaylanan' ? 'bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-700'}`}
                    onClick={() => setTab('onaylanan')}
                >
                    Onaylanan Marşlar
                </button>
                <button
                    className={`px-4 py-2 rounded-md cursor-pointer text-sm font-medium ${tab === 'ekle' ? 'bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-700'}`}
                    onClick={() => setTab('ekle')}
                >
                    Marş Ekle
                </button>
            </div>

            {tab === 'bekleyen' && (
                <div>
                    <h2 className="text-lg font-semibold mb-3">Bekleyen Marşlar</h2>
                    {loading ? (
                        <p>Yükleniyor...</p>
                    ) : bekleyenMarslar.length === 0 ? (
                        <p>Bekleyen marşınız yok.</p>
                    ) : (
                        <ul className="space-y-3">
                            {bekleyenMarslar.map(mars => (
                                <li key={mars.id} className="border rounded p-3 bg-neutral-50">
                                    <div className="font-semibold">{mars.title}</div>
                                    <div className="text-sm text-neutral-600">{mars.author}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {tab === 'onaylanan' && (
                <div>
                    <h2 className="text-lg font-semibold mb-3">Onaylanan Marşlar</h2>
                    {loading ? (
                        <p>Yükleniyor...</p>
                    ) : onaylananMarslar.length === 0 ? (
                        <p>Onaylanan marşınız yok.</p>
                    ) : (
                        <ul className="space-y-3">
                            {onaylananMarslar.map(mars => (
                                <li key={mars.id} className="border rounded p-3 bg-neutral-50">
                                    <div className="font-semibold">{mars.title}</div>
                                    <div className="text-sm text-neutral-600">{mars.author}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {tab === 'ekle' && (
                <div>
                    <MarsEkle />
                </div>
            )}
        </div>
    )
}

export default Profil