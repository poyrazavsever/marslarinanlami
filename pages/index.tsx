export default function Home() {
  return (
    <div className="py-16 md:py-24 flex flex-col items-start gap-8">

      <h2 className="text-lg text-neutral-800">Nasıl Çalışır?</h2>

      <div className="flex items-center justify-between gap-6">

        {/* Marş */} 
        <div className="flex flex-col items-start gap-8 py-8 px-12 rounded-md border border-neutral-300 w-1/2 min-h-96">

          <h3 className="text-neutral-900">İstiklal Marşı</h3>

          <div className="flex flex-col items-start gap-4 text-neutral-600">

            <p>
            Korkma! Sönmez bu şafaklarda yüzen al sancak, <br />
            Sönmeden yurdumun üstünde tüten en son ocak.  <br />
            O benim milletimin yıldızıdır, parlayacak;  <br />
            O benimdir, o benim milletimindir ancak.  <br />
            </p>

            <p>
            Çatma, kurban olayım, <span className="font-semibold text-neutral-900">çehreni</span> ey nazlı hilal! <br />
            Kahraman ırkıma bir gül; ne bu şiddet, bu celal?  <br />
            Sana olmaz dökülen kanlarımız sonra helal...  <br />
            Hakkıdır, Hakk’a tapan milletimin istiklal!  <br />
            </p>

          </div>


        </div>

        {/* Açıklama */} 
        <div className="flex flex-col items-start gap-8 py-8 px-12 rounded-md border border-neutral-300 w-1/2 min-h-96">

        <h3 className="text-neutral-900">Çehre</h3>

        <p className="italic text-neutral-600">Farsça çihre, çehre</p>

        <p className="italic text-neutral-600">1. isim ► yüz <br />
         "Ben şimdi o güzel çehreden başka / Ne bir yüz düşünür ne hatırlarım" - Necmettin Halil Onan</p>

        <p className="italic text-neutral-600">2. isim, mecaz ► görünüş</p>

        </div>
  
      </div>


    </div>
  );
}
