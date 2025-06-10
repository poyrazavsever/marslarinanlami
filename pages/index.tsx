export default function Home() {
  return (
    <div className="py-16 md:py-24 flex flex-col items-start gap-8">

      <h2 className="text-lg text-neutral-800">Nasıl Çalışır?</h2>

      <div className="flex items-center justify-between gap-6">

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

        <div className="flex flex-col items-start gap-8 py-8 px-12 rounded-md border border-neutral-300 w-1/2 min-h-96">

          <h3 className="text-neutral-900">Çehre</h3>

          <p className="italic text-neutral-600">Farsça çihre, çehre</p>

          <p className="italic text-neutral-600">1. isim ► yüz <br />
           "Ben şimdi o güzel çehreden başka / Ne bir yüz düşünür ne hatırlarım" - Necmettin Halil Onan</p>

          <p className="italic text-neutral-600">2. isim, mecaz ► görünüş</p>

        </div>
  
      </div>

      <div className="flex flex-col items-start gap-4 py-8 px-12 rounded-md border border-neutral-300 w-full">
        <h2 className="text-lg text-neutral-800">İstiklal Marşı'nın Hikayesi</h2>

        <p className="text-sm text-neutral-600 leading-relaxed">
          İstiklal Marşı, Türk milletinin bağımsızlık ve özgürlük mücadelesini anlatan, milli duyguları en güçlü şekilde yansıtan şiirdir. 
          1921 yılında Türkiye Büyük Millet Meclisi tarafından milli marş olarak kabul edilmiştir. Mehmet Akif Ersoy tarafından kaleme alınan 
          bu eser, Kurtuluş Savaşı'nın en zorlu günlerinde halkın moralini yükseltmek amacıyla yazılmıştır. Şair, marş için kendisine teklif edilen 
          para ödülünü kabul etmemiş, “İstiklal Marşı, para ile yazılamaz” diyerek ödülü Türk ordusuna bağışlamıştır.
        </p>
      </div>


    </div>
  );
}
