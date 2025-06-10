import React from 'react'
import Card from '@/components/Card';

const marslar = [
  {
    "id": "1",
    "title": "İstiklal Marşı",
    "mars": "Korkma, sönmez bu şafaklarda yüzen al sancak..."
  },
  {
    "id": "2",
    "title": "10. Yıl Marşı",
    "mars": "Çıktık açık alınla on yılda her savaştan..."
  }
]

const Marslar = () => {
  return (
    <div className="max-w-2xl py-16">
      <h1 className="text-2xl font-bold mb-6 text-neutral-800">Marşlar</h1>
      <div className="space-y-4">
        {marslar.map((item) => (
          <Card key={item.id} id={item.id} title={item.title} mars={item.mars} />
        ))}
      </div>
    </div>
  )
}

export default Marslar