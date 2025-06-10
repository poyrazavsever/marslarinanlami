import React, { useState } from 'react';
import { useRouter } from 'next/router';

// Örnek veri
const marsData = [
	{
		id: '1',
		title: 'İstiklal Marşı',
		mars: `Korkma sönmez bu şafaklarda yüzen al sancak.
		 Sönmeden yurdumun üstünde tüten en son ocak
	     O benim milletimin yıldızıdır, parlayacak;
		 O benimdir, o benim milletimindir ancak.`,
		hikaye: 'İstiklal Marşı, Türk milletinin bağımsızlık mücadelesini anlatır.',
	},
	{
		id: '2',
		title: '10. Yıl Marşı',
		mars: 'Çıktık açık alınla on yılda her savaştan.',
		hikaye: '10. Yıl Marşı, Cumhuriyetin 10. yılı için yazılmıştır.',
	},
];

const DetailPage = () => {
	const router = useRouter();
	const { id } = router.query;

	// Seçili marşı bul
	const mars = marsData.find((item) => item.id === id);

	// Modal için state
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedWord, setSelectedWord] = useState<string | null>(null);

	if (!mars)
		return (
			<div className="max-w-2xl mx-auto py-8 px-4">Marş bulunamadı.</div>
		);

	// Marşı kelimelere böl ve tıklanabilir yap
	const marsWords = mars.mars.split(' ').map((word, idx) => (
		<span
			key={idx}
			className="cursor-pointer hover:underline"
			onClick={() => {
				setSelectedWord(word);
				setModalOpen(true);
			}}
		>
			{word}{' '}
		</span>
	));

	return (
		<div className="max-w-2xl py-16">
			<h1 className="text-2xl font-medium mb-4 text-neutral-800">
				{mars.title}
			</h1>
			<div className="mb-6 text-neutral-600">{marsWords}</div>
			<h2 className="text-xl mb-2 text-neutral-800">Hikayesi</h2>
			<p className="text-neutral-600">{mars.hikaye}</p>

			{/* Modal */}
			{modalOpen && selectedWord && (
				<div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
					<div className="bg-white border border-neutral-300 rounded-md p-6 min-w-[300px]">
						<h3 className="text-lg text-neutral-800 mb-2">{selectedWord}</h3>
						<p className="text-neutral-600 mb-4">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
							varius enim in eros elementum tristique.
						</p>
						<button
							className="mt-2 px-4 py-1 bg-neutral-800 text-white rounded hover:bg-red-800 transition-all cursor-pointer"
							onClick={() => setModalOpen(false)}
						>
							Kapat
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DetailPage;