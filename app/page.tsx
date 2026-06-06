export default function Home() {
  const menu = [
    { name: "پیتزا مخصوص", price: "۳۹۵,۰۰۰ تومان" },
    { name: "برگر دبل", price: "۲۸۵,۰۰۰ تومان" },
    { name: "پاستا آلفردو", price: "۳۱۵,۰۰۰ تومان" },
    { name: "استیک گریل", price: "۶۴۵,۰۰۰ تومان" },
  ];

  return (
    <main className="bg-black text-white min-h-screen">
      {/* Hero */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-6xl font-bold mb-6">
          رستوران رویال
        </h1>

        <p className="text-xl text-gray-300 max-w-xl">
          تجربه‌ای متفاوت از طعم، کیفیت و فضای لوکس
        </p>

        <button className="mt-8 bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition">
          رزرو میز
        </button>
      </section>

      {/* About */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold mb-8">
          درباره ما
        </h2>

        <p className="text-gray-300 leading-8">
          رستوران رویال با بیش از ۱۰ سال سابقه در ارائه غذاهای
          باکیفیت و فضایی مدرن، آماده میزبانی از شما و عزیزانتان است.
        </p>
      </section>

      {/* Menu */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold mb-10">
          منوی محبوب
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {menu.map((item) => (
            <div
              key={item.name}
              className="border border-gray-800 rounded-2xl p-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl">{item.name}</h3>
                <span className="text-yellow-400">
                  {item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold mb-10">
          گالری
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-zinc-800 h-64 rounded-2xl"></div>
          <div className="bg-zinc-700 h-64 rounded-2xl"></div>
          <div className="bg-zinc-800 h-64 rounded-2xl"></div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold mb-8">
          تماس با ما
        </h2>

        <div className="space-y-3 text-gray-300">
          <p>📍 تهران - خیابان مثال</p>
          <p>📞 ۰۹۱۲۱۲۳۴۵۶۷</p>
          <p>🕒 هر روز ۱۲ تا ۲۴</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500">
        © 2026 Royal Restaurant
      </footer>
    </main>
  );
}