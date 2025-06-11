import React, { useEffect, useState } from 'react'
import Card from '@/components/Card'
import { supabase } from '@/lib/supabaseClient'

const Marslar = () => {
  const [marslar, setMarslar] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMarslar = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from('marslar')
        .select('id, title, mars')
        .eq('approved', true)
        .order('created_at', { ascending: false })
      if (!error && data) setMarslar(data)
      setLoading(false)
    }
    fetchMarslar()
  }, [])

  return (
    <div className="max-w-2xl py-16">
      <h1 className="text-2xl mb-6 text-neutral-800">Marşlar</h1>
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-[80vh]">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 border-4 border-neutral-700 border-t-white rounded-full animate-spin"></div>
              <p className="text-neutral-300 text-lg font-medium">Yükleniyor...</p>
            </div>
        </div>
        ) : (
          marslar.map((item) => (
            <Card key={item.id} id={item.id} title={item.title} mars={item.mars} />
          ))
        )}
      </div>
    </div>
  )
}

export default Marslar