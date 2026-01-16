import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, BookOpen, TrendingUp, Users, Award, Mail, Phone, MapPin, Check } from 'lucide-react';

const SATMathWebsite = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    level: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.level) {
      alert('გთხოვთ შეავსოთ ყველა სავალდებულო ველი');
      return;
    }

    const mailtoLink = `mailto:your-email@example.com?subject=SAT Math Registration - ${formData.name}&body=სახელი: ${formData.name}%0D%0Aელ.ფოსტა: ${formData.email}%0D%0Aტელეფონი: ${formData.phone}%0D%0Aდონე: ${formData.level}%0D%0Aშეტყობინება: ${formData.message}`;

    window.location.href = mailtoLink;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }
        .float { animation: float 6s ease-in-out infinite; }
        .float-delayed { animation: float 6s ease-in-out 2s infinite; }
        .fade-in { opacity: 0; transform: translateY(30px); transition: all 0.8s ease; }
        .fade-in.animate-in { opacity: 1; transform: translateY(0); }
        .glass { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .glow-card:hover { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4); transform: translateY(-5px); }
        .cube-3d {
          transform-style: preserve-3d;
          animation: rotate3d 20s linear infinite;
        }
        @keyframes rotate3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent cursor-pointer">
            SAT Math Pro
          </a>

          <div className="hidden md:flex gap-8">
            {['მთავარი', 'კურსები', 'ჩვენს შესახებ', 'რეგისტრაცია'].map((item, i) => (
              <a key={i} href={`#${['home', 'courses', 'about', 'register'][i]}`}
                className="hover:text-blue-400 transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden glass mt-4 py-4 px-4 space-y-4">
            {['მთავარი', 'კურსები', 'ჩვენს შესახებ', 'რეგისტრაცია'].map((item, i) => (
              <a key={i} href={`#${['home', 'courses', 'about', 'register'][i]}`}
                className="block hover:text-blue-400 transition-colors"
                onClick={() => setMenuOpen(false)}>
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl float"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-cyan-500 rounded-full opacity-20 blur-3xl float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cube-3d opacity-10">
            <div className="w-64 h-64 bg-gradient-to-br from-blue-600 to-cyan-600"></div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent pb-2">
            SAT Math<br />სრულყოფილი მომზადება
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            მიაღწიე შენს მაქსიმალურ ქულას პროფესიონალი ინსტრუქტორების დახმარებით
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#register" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
              დაიწყე ახლავე
            </a>
            <a href="#courses" className="px-8 py-4 glass rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
              გაიგე მეტი
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: 'სრული პროგრამა', desc: 'SAT Math-ის ყველა თემა დეტალურად' },
              { icon: Users, title: 'ინდივიდუალური მიდგომა', desc: 'პერსონალური სასწავლო გეგმა' },
              { icon: TrendingUp, title: 'სწრაფი პროგრესი', desc: 'შედეგი 2-3 თვეში' },
              { icon: Award, title: 'გარანტირებული წარმატება', desc: '95%+ სტუდენტებს აქვთ 700+ ქულა' }
            ].map((feature, i) => (
              <div key={i} className="fade-in glass p-6 rounded-2xl glow-card transition-all duration-300">
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 fade-in">სასწავლო პროგრამა</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'ალგებრა', topics: ['წრფივი განტოლებები', 'ფუნქციები', 'უთანასწორობები'] },
              { title: 'გეომეტრია', topics: ['სამკუთხედები', 'წრეწირები', 'მოცულობები'] },
              { title: 'მონაცემები', topics: ['ალბათობა', 'სტატისტიკა', 'გრაფიკები'] },
              { title: 'რთული მათემატიკა', topics: ['კვადრატული', 'პოლინომები', 'ტრიგონომეტრია'] }
            ].map((item, i) => (
              <div key={i} className="fade-in glass p-6 rounded-2xl hover:bg-white/5 transition-all duration-300 border-l-4 border-blue-500">
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {item.topics.map((t, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section id="courses" className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 fade-in">სწავლის პირობები</h2>

          <div className="max-w-lg mx-auto">
            <div className="fade-in glass p-8 rounded-2xl ring-2 ring-blue-500 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-semibold inline-block mb-6">
                  სრული კურსი
                </div>
                <h3 className="text-3xl font-bold mb-4">SAT Math Masterclass</h3>
                <div className="text-5xl font-bold text-blue-400">350₾<span className="text-xl text-gray-400 font-normal">/თვე</span></div>
              </div>

              <ul className="space-y-4 mb-8">
                {['ონლაინ ვიდეო კურსები', 'ყოველკვირეული ლაივ შეხვედრა', '24/7 კითხვა-პასუხი', 'პირადი კონსულტაციები', 'პრაქტიკული სავარჯიშოები', 'საგამოცდო სტრატეგიები'].map((feature, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="#register" className="block w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-center font-bold text-lg hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] transition-all duration-300">
                დარეგისტრირდი
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">რატომ მე?</h2>
              <p className="text-gray-300 text-lg mb-6">
                ვარ SAT Math-ის გამოცდილი ინსტრუქტორი. ჩემი პროგრამა აერთიანებს თანამედროვე სწავლების მეთოდებს და ინდივიდუალურ მიდგომას თითოეული მოსწავლისადმი.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">სერტიფიცირებული პედაგოგი</h3>
                    <p className="text-gray-400">მუდმივი პროფესიული განვითარება</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">დამტკიცებული შედეგები</h3>
                    <p className="text-gray-400">სტუდენტები აღწევენ საშუალოდ 750+ ქულას</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fade-in relative">
              <div className="glass p-8 rounded-2xl">
                <div className="text-6xl font-bold text-blue-400 mb-2">500+</div>
                <p className="text-xl text-gray-300 mb-4">წარმატებული სტუდენტი</p>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 w-[95%]"></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">95% წარმატების მაჩვენებელი</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="register" className="py-20 px-4 bg-black/20">
        <div className="max-w-3xl mx-auto">
          <div className="fade-in text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">დარეგისტრირდი ახლავე</h2>
            <p className="text-gray-300 text-lg">შეავსე ქვემოთ მოცემული ფორმა</p>
          </div>

          <div className="fade-in glass p-8 rounded-2xl space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all peer placeholder-transparent"
                  placeholder="სახელი"
                  id="name"
                />
                <label htmlFor="name" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-blue-400 peer-focus:text-xs -top-6 text-xs">
                  სახელი და გვარი *
                </label>
              </div>

              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all peer placeholder-transparent"
                  placeholder="ტელეფონი"
                  id="phone"
                />
                <label htmlFor="phone" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-blue-400 peer-focus:text-xs -top-6 text-xs">
                  ტელეფონი *
                </label>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all peer placeholder-transparent"
                  placeholder="ელ. ფოსტა"
                  id="email"
                />
                <label htmlFor="email" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-blue-400 peer-focus:text-xs -top-6 text-xs">
                  ელ. ფოსტა *
                </label>
              </div>

              <div className="relative">
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-gray-300 appearance-none"
                >
                  <option value="" className="bg-slate-900">აირჩიე დონე</option>
                  <option value="beginner" className="bg-slate-900">საწყისი</option>
                  <option value="intermediate" className="bg-slate-900">საშუალო</option>
                  <option value="advanced" className="bg-slate-900">მაღალი</option>
                </select>
                <div className="absolute right-4 top-3.5 pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all peer placeholder-transparent"
                placeholder="შეტყობინება"
                id="message"
              ></textarea>
              <label htmlFor="message" className="absolute left-4 top-3 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-blue-400 peer-focus:text-xs -top-6 text-xs">
                დამატებითი ინფორმაცია
              </label>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.02] transition-all duration-300 transform"
            >
              შერჩევა და გაგზავნა
            </button>

            {submitted && (
              <div className="text-center bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-400 font-semibold animate-fade-in">
                ✓ მესიჯი წარმატებით გაიგზავნა!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                SAT Math Pro
              </h3>
              <p className="text-gray-400">
                შენი წარმატება SAT-ში იწყება აქ
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">კონტაქტი</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  <span>info@satmathpro.ge</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  <span>+995 555 123 456</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>თბილისი, საქართველო</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">სწრაფი ბმულები</h4>
              <div className="space-y-2">
                {['მთავარი', 'კურსები', 'ჩვენს შესახებ', 'რეგისტრაცია'].map((item, i) => (
                  <a key={i} href={`#${['home', 'courses', 'about', 'register'][i]}`}
                    className="block text-gray-400 hover:text-blue-400 transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center text-gray-500 pt-8 border-t border-white/10">
            © 2026 SAT Math Pro. ყველა უფლება დაცულია.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SATMathWebsite;
