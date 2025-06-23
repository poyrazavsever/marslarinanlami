import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
import MarsEkle from '@/components/MarsEkle'
import BekleyenMarslar from '@/components/Bekleyen'
import OnaylananMarslar from '@/components/Onaylanan'

const Profil = () => {
    const [user, setUser] = useState<any>(null)
    const [tab, setTab] = useState<'bekleyen' | 'onaylanan' | 'ekle'>('bekleyen')
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

    if (!user) {
        return null
    }

    return (
        <div className="py-10 px-4 sm:px-0">
            <h1 className="text-2xl font-medium mb-6 text-neutral-800 dark:text-neutral-100">Profil</h1>
            <div className="flex gap-2 mb-6">
                <button
                    className={`px-4 py-2 rounded-md cursor-pointer text-sm font-medium border transition-colors
                        ${tab === 'ekle'
                            ? 'bg-neutral-800 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-800 dark:border-neutral-100 shadow'
                            : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-700'}
                    `}
                    onClick={() => setTab('ekle')}
                >
                    Marş Ekle
                </button>
                <button
                    className={`px-4 py-2 rounded-md cursor-pointer text-sm font-medium border transition-colors
                        ${tab === 'bekleyen'
                            ? 'bg-neutral-800 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-800 dark:border-neutral-100 shadow'
                            : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-700'}
                    `}
                    onClick={() => setTab('bekleyen')}
                >
                    Bekleyen Marşlar
                </button>
                <button
                    className={`px-4 py-2 rounded-md cursor-pointer text-sm font-medium border transition-colors
                        ${tab === 'onaylanan'
                            ? 'bg-neutral-800 text-white dark:bg-neutral-100 dark:text-neutral-900 border-neutral-800 dark:border-neutral-100 shadow'
                            : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-700'}
                    `}
                    onClick={() => setTab('onaylanan')}
                >
                    Onaylanan Marşlar
                </button>
            </div>

            {tab === 'bekleyen' && (
                <BekleyenMarslar userId={user.id} />
            )}

            {tab === 'onaylanan' && (
                <OnaylananMarslar userId={user.id} />
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