import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';

const DetailPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const [mars, setMars] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedWord, setSelectedWord] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;
		const fetchMars = async () => {
			setLoading(true);
			const { data, error } = await supabase
				.from('marslar')
				.select('id, title, mars, hikaye')
				.eq('id', id)
				.eq('approved', true)
				.single();
			if (!error && data) setMars(data);
			setLoading(false);
		};
		fetchMars();
	}, [id]);

	if (loading) {
		return <div className="flex items-center justify-center h-[80vh]">
			<div className="flex flex-col items-center space-y-4">
				<div className="w-12 h-12 border-4 border-neutral-700 border-t-white rounded-full animate-spin"></div>
				<p className="text-neutral-300 text-lg font-medium">Yükleniyor...</p>
			</div>
		</div>;
	}

	if (!mars) {
		return <div className="w-full h-[80vh] flex items-center justify-center py-8 px-4 text-5xl font-medium italic text-neutral-500">Marş bulunamadı.</div>;
	}

	// HTML'i React bileşenlerine çeviren fonksiyon
	const renderClickablePoem = (html: string) => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
		const paragraphs = Array.from(doc.querySelectorAll('p'));

		return paragraphs.map((p, i) => (
			<p key={i} className="mb-1">
				{p.textContent?.split(' ').map((word, idx) =>
					word ? (
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
					) : ' '
				)}
			</p>
		));
	};

	return (
		<div className="py-16">
			<h1 className="text-2xl font-medium mb-4 text-neutral-800 text-center">
				{mars.title}
			</h1>
			<div className="mb-6 text-neutral-700 border border-neutral-300 p-4 rounded-md leading-relaxed text-center py-8">
				{renderClickablePoem(mars.mars)}
			</div>
			<h2 className="text-xl text-neutral-800 mt-24 mb-4">Hikayesi</h2>
			<div
				className="text-neutral-700 border border-neutral-300 p-4 rounded-md leading-relaxed"
				dangerouslySetInnerHTML={{ __html: mars.hikaye }}
			/>
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