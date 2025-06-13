import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';
import ReactMarkdown from 'react-markdown';

const DetailPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const [mars, setMars] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedWord, setSelectedWord] = useState<string | null>(null);
	const [wordInfo, setWordInfo] = useState<string>('');
	const [wordLoading, setWordLoading] = useState(false);

	useEffect(() => {
		if (!id) return;
		const fetchMars = async () => {
			setLoading(true);
			const { data, error } = await supabase
				.from('marslar')
				.select('id, title, mars, hikaye, author')
				.eq('id', id)
				.eq('approved', true)
				.single();
			if (!error && data) setMars(data);
			setLoading(false);
		};
		fetchMars();
	}, [id]);

	const handleWordClick = async (word: string, context: string) => {
		setSelectedWord(word);
		setModalOpen(true);
		setWordLoading(true);
		setWordInfo('');
		try {
			const response = await fetch('/api/gemini', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ mars: context, word }),
			});
			const data = await response.json();
			setWordInfo(data.answer);
		} catch (e) {
			setWordInfo('Bir hata oluştu.');
		}
		setWordLoading(false);
	};

	const renderClickablePoem = (html: string) => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(`<div>${html}</div>`, 'text/html');
		const container = doc.body.firstChild as HTMLElement;
		const elements: React.ReactNode[] = [];

		if (!container) return null;

		container.childNodes.forEach((node, i) => {
			if (node.nodeName === 'P') {
				const text = node.textContent || '';
				elements.push(
					<p key={`p-${i}`} className="mb-1">
						{text.split(' ').map((word, idx) =>
							word ? (
								<span
									key={idx}
									className="cursor-pointer hover:underline"
									onClick={() => handleWordClick(word, text)}
								>
									{word}{' '}
								</span>
							) : ' '
						)}
					</p>
				);
			} else if (node.nodeName === 'BR') {
				elements.push(<br key={`br-${i}`} />);
			}
		});

		return elements;
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-[80vh]">
				<div className="flex flex-col items-center space-y-4">
					<div className="w-12 h-12 border-4 border-neutral-700 border-t-white rounded-full animate-spin"></div>
					<p className="text-neutral-300 text-lg font-medium">Yükleniyor...</p>
				</div>
			</div>
		);
	}

	if (!mars) {
		return (
			<div className="w-full h-[80vh] flex items-center justify-center py-8 px-4 text-5xl font-medium italic text-neutral-500 text-center">
				Marş bulunamadı.
			</div>
		);
	}

	return (
		<div className="py-8 sm:py-16 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
			{/* Başlık ve Geri Dön */}
			<div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mb-6">
				<h1 className="text-lg sm:text-2xl font-medium text-neutral-800 text-center sm:text-left">
					{mars.title}
				</h1>
				<a
					href="/marslar"
					className="px-4 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-600 transition-all text-xs sm:text-sm"
				>
					Geri Dön
				</a>
			</div>

			{/* Şiir */}
			<div className="mb-6 text-neutral-700 border border-neutral-300 p-4 rounded-md leading-relaxed text-center py-8 text-xs sm:text-sm md:text-base">
				{renderClickablePoem(mars.mars)}
				<p className="text-neutral-800 font-semibold pt-6">{mars.author}</p>
			</div>

			{/* Hikaye */}
			<h2 className="text-xl text-neutral-800 mt-16 mb-4">Hikayesi</h2>
			<div className="text-neutral-700 border border-neutral-300 p-4 rounded-md leading-relaxed markdown-custom text-sm sm:text-base">
				<ReactMarkdown>{mars.hikaye}</ReactMarkdown>
			</div>

			{/* Kelime Açıklama Modalı */}
			{modalOpen && selectedWord && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
					<div className="bg-white border border-neutral-300 rounded-md p-4 sm:p-6 w-full max-w-3xl md:max-h-[90vh] overflow-y-auto">
						<h3 className="text-lg sm:text-xl text-neutral-800 mb-2">{selectedWord}</h3>

						{wordLoading ? (
							<p className="text-neutral-600 mb-4">Yükleniyor...</p>
						) : (
							<div className="text-neutral-600 mb-4 prose prose-neutral max-w-none text-xs sm:text-base">
								<ReactMarkdown>{wordInfo}</ReactMarkdown>
							</div>
						)}

						<div className="flex justify-end">
							<button
								className="mt-2 px-4 py-2 bg-neutral-800 text-white rounded hover:bg-red-800 transition-all text-sm sm:text-base"
								onClick={() => setModalOpen(false)}
							>
								Kapat
							</button>
						</div>
					</div>
				</div>
			)}

		</div>
	);
};

export default DetailPage;
