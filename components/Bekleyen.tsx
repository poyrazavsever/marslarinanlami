import React, { useEffect, useState } from 'react'
import Card from '@/components/Card'
import { supabase } from '@/lib/supabaseClient'

const BekleyenMarslar = ({ userId }: { userId: string }) => {
    const [marslar, setMarslar] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return
        const fetchMarslar = async () => {
            setLoading(true)
            const { data, error } = await supabase
                .from('marslar')
                .select('id, title, mars')
                .eq('approved', false)
                .eq('user_id', userId)
                .order('created_at', { ascending: false })
            if (!error && data) setMarslar(data)
            setLoading(false)
        }
        fetchMarslar()
    }, [userId])

    return (
        <div className="space-y-4">
            {loading ? (
                <div className="flex items-center justify-center min-h-[30vh]">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 border-4 border-neutral-700 border-t-white rounded-full animate-spin"></div>
                        <p className="text-neutral-400 text-lg font-medium">Yükleniyor...</p>
                    </div>
                </div>
            ) : marslar.length === 0 ? (
                <p className="text-neutral-500">Bekleyen marşınız yok.</p>
            ) : (
                marslar.map((item) => (
                    <Card key={item.id} id={item.id} title={item.title} mars={item.mars} />
                ))
            )}
        </div>
    )
}

export default BekleyenMarslar