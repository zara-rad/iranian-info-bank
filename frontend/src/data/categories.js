export const categories = [
  {
    id: 1,
    name: 'Medical & Healthcare',
    nameGerman: 'Medizin & Gesundheit',
    namePersian: 'پزشکی و مراقبت از سلامت',
    icon: '🏥',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Find doctors, specialists, pharmacies and healthcare services',
    businessCount: 245,
    subcategories: [
      { id: 11, name: 'General Practitioners', nameGerman: 'Hausärzte', namePersian: 'پزشک عمومی', businessCount: 89 },
      { id: 12, name: 'Specialists', nameGerman: 'Fachärzte (Kardiologie, Dermatologie, Gynäkologie, etc.)', namePersian: 'متخصصان', businessCount: 67 },
      { id: 13, name: 'Dentists & Orthodontists', nameGerman: 'Zahnärzte & Kieferorthopäden', namePersian: 'دندانپزشک و ارتودنتیست', businessCount: 54 },
      { id: 14, name: 'Pharmacies', nameGerman: 'Apotheken', namePersian: 'داروخانه', businessCount: 35 },
      { id: 15, name: 'Physiotherapy, Chiropractic, Osteopathy', nameGerman: 'Physiotherapie, Chiropraktik, Osteopathie', namePersian: 'فیزیوتراپی، کایروپراکتیک، استئوپاتی', businessCount: 42 },
      { id: 16, name: 'Psychologists & Psychotherapists', nameGerman: 'Psychologen & Psychotherapeuten', namePersian: 'روانشناسان و روان‌درمانگران', businessCount: 38 },
      { id: 17, name: 'Speech Therapists', nameGerman: 'Logopädie', namePersian: 'گفتار درمانگران', businessCount: 23 },
      { id: 18, name: 'Midwives & Maternity Services', nameGerman: 'Hebammen & Geburtshilfe', namePersian: 'ماما و خدمات زایمان', businessCount: 19 },
      { id: 19, name: 'Nursing Homes & Elderly Care', nameGerman: 'Pflegeheime & Altenpflege', namePersian: 'خانه‌های سالمندان و مراقبت', businessCount: 31 },
      { id: 110, name: 'Emergency & Ambulance Services', nameGerman: 'Notfall & Rettungsdienst', namePersian: 'خدمات اورژانس و آمبولانس', businessCount: 12 },
      { id: 111, name: 'Alternative Medicine', nameGerman: 'Alternative Medizin (Homöopathie, Akupunktur, Naturheilkunde)', namePersian: 'طب جایگزین', businessCount: 28 },
      { id: 112, name: 'Medical Labs & Diagnostic Centers', nameGerman: 'Medizinische Labore & Diagnosezentren', namePersian: 'آزمایشگاه‌های پزشکی', businessCount: 16 }
    ]
  },
  {
    id: 2,
    name: 'Beauty, Wellness & Personal Care',
    nameGerman: 'Schönheit, Wellness & Körperpflege',
    namePersian: 'زیبایی، سلامتی و مراقبت شخصی',
    icon: '💇',
    image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Hair salons, beauty centers, spas and wellness services',
    businessCount: 189,
    subcategories: [
      { id: 21, name: 'Hairdressers / Barber Shops', nameGerman: 'Friseure / Barbershops', namePersian: 'آرایشگاه مردانه و زنانه', businessCount: 78 },
      { id: 22, name: 'Beauty Salons', nameGerman: 'Kosmetikstudios', namePersian: 'سالن زیبایی', businessCount: 65 },
      { id: 23, name: 'Nail Salons', nameGerman: 'Nagelstudios', namePersian: 'سالن ناخن', businessCount: 34 },
      { id: 24, name: 'Massage & Spa Centers', nameGerman: 'Massage & Spa Zentren', namePersian: 'مراکز ماساژ و اسپا', businessCount: 46 },
      { id: 25, name: 'Tattoo & Piercing Studios', nameGerman: 'Tattoo & Piercing Studios', namePersian: 'استودیو تتو و پیرسینگ', businessCount: 29 },
      { id: 26, name: 'Fitness, Tanning & Wellness Centers', nameGerman: 'Fitness, Solarium & Wellness Zentren', namePersian: 'مراکز تناسب اندام و سلامتی', businessCount: 52 }
    ]
  },
  {
    id: 3,
    name: 'Construction & Handwerk',
    nameGerman: 'Bau & Handwerk',
    namePersian: 'ساختمان و صنایع دستی',
    icon: '👷',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Skilled tradesmen, contractors and construction services',
    businessCount: 167,
    subcategories: [
      { id: 31, name: 'Electricians', nameGerman: 'Elektriker', namePersian: 'برقکار', businessCount: 45 },
      { id: 32, name: 'Plumbers / Heating Installers', nameGerman: 'Installateur, Sanitär, Heizung', namePersian: 'لوله‌کش و نصاب گرمایش', businessCount: 38 },
      { id: 33, name: 'Roofers', nameGerman: 'Dachdecker', namePersian: 'سقف‌کار', businessCount: 22 },
      { id: 34, name: 'Carpenters & Joiners', nameGerman: 'Tischler, Schreiner', namePersian: 'نجار', businessCount: 31 },
      { id: 35, name: 'Painters & Decorators', nameGerman: 'Maler, Lackierer', namePersian: 'نقاش و دکوراتور', businessCount: 29 },
      { id: 36, name: 'Bricklayers, Masons', nameGerman: 'Maurer', namePersian: 'بنا و سنگ‌کار', businessCount: 18 },
      { id: 37, name: 'Tilers', nameGerman: 'Fliesenleger', namePersian: 'کاشی‌کار', businessCount: 25 },
      { id: 38, name: 'Locksmiths & Metal Workers', nameGerman: 'Schlosser, Metallbauer', namePersian: 'قفل‌ساز و فلزکار', businessCount: 33 },
      { id: 39, name: 'Glaziers', nameGerman: 'Glaser', namePersian: 'شیشه‌کار', businessCount: 14 },
      { id: 310, name: 'Garden & Landscaping', nameGerman: 'Garten- und Landschaftsbau', namePersian: 'باغبانی و محوطه‌سازی', businessCount: 27 },
      { id: 311, name: 'Flooring', nameGerman: 'Bodenleger, Parkettleger', namePersian: 'کف‌پوش', businessCount: 19 },
      { id: 312, name: 'Upholsterers & Furniture Makers', nameGerman: 'Polsterer & Möbelbauer', namePersian: 'مبل‌ساز و صندلی‌کار', businessCount: 16 },
      { id: 313, name: 'Blacksmiths, Stonemasons, Restorers', nameGerman: 'Schmiede, Steinmetze, Restauratoren', namePersian: 'آهنگر، سنگ‌تراش، مرمت‌کار', businessCount: 12 }
    ]
  },
  {
    id: 4,
    name: 'Gastronomy, Restaurants & Food',
    nameGerman: 'Gastronomie, Restaurants & Lebensmittel',
    namePersian: 'رستوران‌ها، غذاخوری‌ها و مواد غذایی',
    icon: '🍴',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Persian restaurants, cafes, bakeries and food services',
    businessCount: 134,
    subcategories: [
      { id: 41, name: 'Restaurants by Cuisine', nameGerman: 'Restaurants (Deutsch, Italienisch, Persisch, Türkisch, etc.)', namePersian: 'رستوران‌های مختلف', businessCount: 67 },
      { id: 42, name: 'Cafés & Coffee Shops', nameGerman: 'Cafés & Kaffeehäuser', namePersian: 'کافه و قهوه‌خانه', businessCount: 34 },
      { id: 43, name: 'Bars, Pubs, Nightclubs', nameGerman: 'Bars, Kneipen, Nachtclubs', namePersian: 'بار، میخانه، کلوپ شبانه', businessCount: 28 },
      { id: 44, name: 'Fast Food & Snack Bars', nameGerman: 'Fast Food & Imbiss', namePersian: 'فست فود و غذاهای سریع', businessCount: 45 },
      { id: 45, name: 'Bakeries', nameGerman: 'Bäckereien', namePersian: 'نانوایی', businessCount: 23 },
      { id: 46, name: 'Butchers', nameGerman: 'Metzgereien', namePersian: 'قصابی', businessCount: 19 },
      { id: 47, name: 'Confectioneries & Pastry Shops', nameGerman: 'Konditoreien & Süßwarengeschäfte', namePersian: 'شیرینی‌پزی و قنادی', businessCount: 16 },
      { id: 48, name: 'Catering Services', nameGerman: 'Catering Services', namePersian: 'خدمات پذیرایی', businessCount: 21 },
      { id: 49, name: 'Food Delivery Services', nameGerman: 'Lieferdienste', namePersian: 'خدمات تحویل غذا', businessCount: 18 }
    ]
  },
  {
    id: 5,
    name: 'Retail & Shops',
    nameGerman: 'Einzelhandel & Geschäfte',
    namePersian: 'خرده‌فروشی و مغازه‌ها',
    icon: '🛍️',
    image: 'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Shops, stores and retail businesses',
    businessCount: 198,
    subcategories: [
      { id: 51, name: 'Supermarkets & Grocery Stores', nameGerman: 'Supermärkte & Lebensmittelgeschäfte', namePersian: 'سوپرمارکت و فروشگاه مواد غذایی', businessCount: 45 },
      { id: 52, name: 'Convenience Shops & Kiosks', nameGerman: 'Convenience Shops & Kioske (Späti)', namePersian: 'فروشگاه‌های محلی و کیوسک', businessCount: 38 },
      { id: 53, name: 'Clothing & Shoe Stores', nameGerman: 'Bekleidung & Schuhgeschäfte', namePersian: 'فروشگاه پوشاک و کفش', businessCount: 52 },
      { id: 54, name: 'Jewelry & Watch Shops', nameGerman: 'Schmuck & Uhrengeschäfte', namePersian: 'جواهرات و ساعت‌فروشی', businessCount: 29 },
      { id: 55, name: 'Electronics & Mobile Shops', nameGerman: 'Elektronik & Handygeschäfte', namePersian: 'فروشگاه الکترونیک و موبایل', businessCount: 41 },
      { id: 56, name: 'Bookstores & Stationery Shops', nameGerman: 'Buchhandlungen & Schreibwarengeschäfte', namePersian: 'کتاب‌فروشی و لوازم‌التحریر', businessCount: 22 },
      { id: 57, name: 'Furniture & Interior Decor', nameGerman: 'Möbel & Inneneinrichtung', namePersian: 'مبلمان و دکوراسیون داخلی', businessCount: 34 },
      { id: 58, name: 'Household Goods Shops', nameGerman: 'Haushaltswarengeschäfte', namePersian: 'فروشگاه لوازم خانگی', businessCount: 26 },
      { id: 59, name: 'Toy Shops', nameGerman: 'Spielwarengeschäfte', namePersian: 'اسباب‌بازی‌فروشی', businessCount: 18 },
      { id: 510, name: 'Pet Shops & Pet Supplies', nameGerman: 'Tierhandlungen & Tierbedarf', namePersian: 'فروشگاه حیوانات خانگی', businessCount: 15 },
      { id: 511, name: 'Flower Shops', nameGerman: 'Blumenläden', namePersian: 'گل‌فروشی', businessCount: 21 }
    ]
  },
  {
    id: 6,
    name: 'Transport, Logistics & Auto',
    nameGerman: 'Transport, Logistik & Auto',
    namePersian: 'حمل و نقل، لجستیک و خودرو',
    icon: '🚗',
    image: 'https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Transportation, moving services and logistics',
    businessCount: 156,
    subcategories: [
      { id: 61, name: 'Taxi Services', nameGerman: 'Taxi Services', namePersian: 'خدمات تاکسی', businessCount: 34 },
      { id: 62, name: 'Bus & Coach Services', nameGerman: 'Bus & Reisebus Services', namePersian: 'خدمات اتوبوس', businessCount: 18 },
      { id: 63, name: 'Moving Companies', nameGerman: 'Umzugsservice', namePersian: 'شرکت‌های اسباب‌کشی', businessCount: 42 },
      { id: 64, name: 'Courier & Delivery Services', nameGerman: 'Kurier & Lieferdienste (DHL, Hermes, UPS, etc.)', namePersian: 'خدمات پیک و تحویل', businessCount: 29 },
      { id: 65, name: 'Trucking & Freight Logistics', nameGerman: 'LKW & Frachtlogistik', namePersian: 'حمل بار و لجستیک', businessCount: 23 },
      { id: 66, name: 'Car Repair & Auto Workshops', nameGerman: 'Kfz-Werkstätten', namePersian: 'تعمیرگاه خودرو', businessCount: 38 },
      { id: 67, name: 'Car Dealerships & Used Car Sales', nameGerman: 'Autohändler & Gebrauchtwagen', namePersian: 'نمایندگی و فروش خودرو', businessCount: 31 },
      { id: 68, name: 'Car Rental & Leasing', nameGerman: 'Autovermietung & Leasing', namePersian: 'اجاره خودرو', businessCount: 19 },
      { id: 69, name: 'Car Wash & Detailing', nameGerman: 'Autowäsche & Detailing', namePersian: 'شستشوی خودرو', businessCount: 25 },
      { id: 610, name: 'Driving Schools', nameGerman: 'Fahrschulen', namePersian: 'آموزشگاه رانندگی', businessCount: 27 },
      { id: 611, name: 'Bicycle Shops & Repair', nameGerman: 'Fahrradgeschäfte & Reparatur', namePersian: 'فروشگاه و تعمیر دوچرخه', businessCount: 16 },
      { id: 612, name: 'Motorcycle Services', nameGerman: 'Motorrad Services', namePersian: 'خدمات موتورسیکلت', businessCount: 14 }
    ]
  },
  {
    id: 7,
    name: 'Education & Training',
    nameGerman: 'Bildung & Ausbildung',
    namePersian: 'آموزش و تربیت',
    icon: '📚',
    image: 'https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Schools, language courses and educational services',
    businessCount: 89,
    subcategories: [
      { id: 71, name: 'Schools & Kindergartens', nameGerman: 'Schulen & Kindergärten', namePersian: 'مدارس و مهدکودک', businessCount: 23 },
      { id: 72, name: 'Universities & Colleges', nameGerman: 'Universitäten & Hochschulen', namePersian: 'دانشگاه‌ها و کالج‌ها', businessCount: 12 },
      { id: 73, name: 'Language Schools', nameGerman: 'Sprachschulen (Deutsch, Englisch, Persisch, etc.)', namePersian: 'آموزشگاه زبان', businessCount: 34 },
      { id: 74, name: 'Private Tutoring', nameGerman: 'Nachhilfe', namePersian: 'تدریس خصوصی', businessCount: 28 },
      { id: 75, name: 'Music Schools & Teachers', nameGerman: 'Musikschulen & Lehrer', namePersian: 'آموزشگاه موسیقی', businessCount: 19 },
      { id: 76, name: 'Art, Dance & Drama Schools', nameGerman: 'Kunst-, Tanz- & Theaterschulen', namePersian: 'آموزشگاه هنر، رقص و تئاتر', businessCount: 16 },
      { id: 77, name: 'Professional Training & Certification', nameGerman: 'Berufsausbildung & Zertifizierung', namePersian: 'آموزش حرفه‌ای و گواهینامه', businessCount: 21 },
      { id: 78, name: 'Adult Education Centers', nameGerman: 'Volkshochschulen', namePersian: 'مراکز آموزش بزرگسالان', businessCount: 15 }
    ]
  },
  {
    id: 8,
    name: 'Insurance, Finance & Business',
    nameGerman: 'Versicherung, Finanzen & Business',
    namePersian: 'بیمه، امور مالی و کسب‌وکار',
    icon: '🛡️',
    image: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Financial services, insurance and banking',
    businessCount: 123,
    subcategories: [
      { id: 81, name: 'Insurance Agencies', nameGerman: 'Versicherungsagenturen', namePersian: 'آژانس‌های بیمه', businessCount: 45 },
      { id: 82, name: 'Banks & Savings Institutions', nameGerman: 'Banken & Sparkassen', namePersian: 'بانک‌ها و موسسات پس‌انداز', businessCount: 23 },
      { id: 83, name: 'Tax Advisors', nameGerman: 'Steuerberater', namePersian: 'مشاوران مالیاتی', businessCount: 38 },
      { id: 84, name: 'Accountants & Bookkeeping', nameGerman: 'Buchhalter & Buchhaltungsservice', namePersian: 'حسابداران و خدمات حسابداری', businessCount: 29 },
      { id: 85, name: 'Business Consulting', nameGerman: 'Unternehmensberatung', namePersian: 'مشاوره کسب‌وکار', businessCount: 31 },
      { id: 86, name: 'Investment & Wealth Management', nameGerman: 'Investment & Vermögensverwaltung', namePersian: 'سرمایه‌گذاری و مدیریت ثروت', businessCount: 18 },
      { id: 87, name: 'Employment Agencies & Recruitment', nameGerman: 'Arbeitsagenturen & Personalvermittlung', namePersian: 'آژانس‌های کاریابی', businessCount: 26 }
    ]
  },
  {
    id: 9,
    name: 'Legal & Public Services',
    nameGerman: 'Rechtsdienste & Öffentliche Dienste',
    namePersian: 'خدمات حقوقی و عمومی',
    icon: '⚖️',
    image: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Lawyers, legal advice and court services',
    businessCount: 67,
    subcategories: [
      { id: 91, name: 'Lawyers', nameGerman: 'Rechtsanwälte (Einwanderung, Familie, Strafrecht, Wirtschaftsrecht)', namePersian: 'وکلای دادگستری', businessCount: 42 },
      { id: 92, name: 'Notary Offices', nameGerman: 'Notarbüros', namePersian: 'دفاتر اسناد رسمی', businessCount: 15 },
      { id: 93, name: 'Public Offices', nameGerman: 'Öffentliche Ämter (Bürgeramt, Ausländerbehörde, Jobcenter)', namePersian: 'ادارات دولتی', businessCount: 8 },
      { id: 94, name: 'Embassies & Consulates', nameGerman: 'Botschaften & Konsulate', namePersian: 'سفارتخانه‌ها و کنسولگری‌ها', businessCount: 3 },
      { id: 95, name: 'Police, Fire Brigade, Civil Protection', nameGerman: 'Polizei, Feuerwehr, Katastrophenschutz', namePersian: 'پلیس، آتش‌نشانی، حفاظت مدنی', businessCount: 6 }
    ]
  },
  {
    id: 10,
    name: 'Cleaning & Facility Services',
    nameGerman: 'Reinigung & Facility Services',
    namePersian: 'خدمات نظافت و تسهیلات',
    icon: '🧽',
    image: 'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Cleaning services and facility management',
    businessCount: 78,
    subcategories: [
      { id: 101, name: 'Household Cleaning', nameGerman: 'Haushaltsreinigung', namePersian: 'نظافت منزل', businessCount: 34 },
      { id: 102, name: 'Office Cleaning', nameGerman: 'Büroreinigung', namePersian: 'نظافت اداری', businessCount: 28 },
      { id: 103, name: 'Window Cleaning', nameGerman: 'Fensterreinigung', namePersian: 'شیشه‌شویی', businessCount: 19 },
      { id: 104, name: 'Carpet & Upholstery Cleaning', nameGerman: 'Teppich- & Polsterreinigung', namePersian: 'قالیشویی و مبل‌شویی', businessCount: 16 },
      { id: 105, name: 'Laundry & Dry Cleaning', nameGerman: 'Wäscherei & Chemische Reinigung', namePersian: 'خشکشویی و لباسشویی', businessCount: 23 },
      { id: 106, name: 'Janitorial Services', nameGerman: 'Hausmeisterservice', namePersian: 'خدمات سرایداری', businessCount: 21 },
      { id: 107, name: 'Pest Control', nameGerman: 'Schädlingsbekämpfung', namePersian: 'مبارزه با آفات', businessCount: 12 }
    ]
  },
  {
    id: 11,
    name: 'Childcare & Family',
    nameGerman: 'Kinderbetreuung & Familie',
    namePersian: 'مراقبت از کودکان و خانواده',
    icon: '👶',
    image: 'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Childcare and family support services',
    businessCount: 56,
    subcategories: [
      { id: 111, name: 'Daycare Centers', nameGerman: 'Kindertagesstätten (Kita)', namePersian: 'مراکز مراقبت روزانه کودکان', businessCount: 28 },
      { id: 112, name: 'Babysitting & Nanny Services', nameGerman: 'Babysitting & Nanny Services', namePersian: 'خدمات پرستار کودک', businessCount: 19 },
      { id: 113, name: 'After-school Programs', nameGerman: 'Hort', namePersian: 'برنامه‌های بعد از مدرسه', businessCount: 15 },
      { id: 114, name: 'Child Psychologists & Speech Therapists', nameGerman: 'Kinderpsychologen & Logopäden', namePersian: 'روانشناسان کودک و گفتار درمانگران', businessCount: 12 }
    ]
  },
  {
    id: 12,
    name: 'Elderly & Social Care',
    nameGerman: 'Altenpflege & Soziale Betreuung',
    namePersian: 'مراقبت از سالمندان و خدمات اجتماعی',
    icon: '👵',
    image: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Elderly care and social support services',
    businessCount: 43,
    subcategories: [
      { id: 121, name: 'Senior Homes & Assisted Living', nameGerman: 'Seniorenheime & Betreutes Wohnen', namePersian: 'خانه‌های سالمندان', businessCount: 18 },
      { id: 122, name: 'Home Care Services', nameGerman: 'Pflegedienste', namePersian: 'خدمات مراقبت در منزل', businessCount: 23 },
      { id: 123, name: 'Disability Support Services', nameGerman: 'Behindertenhilfe', namePersian: 'خدمات حمایت از معلولان', businessCount: 12 },
      { id: 124, name: 'Social Work Organizations', nameGerman: 'Sozialarbeitsorganisationen', namePersian: 'سازمان‌های کار اجتماعی', businessCount: 8 }
    ]
  },
  {
    id: 13,
    name: 'Arts, Culture, Media & Communication',
    nameGerman: 'Kunst, Kultur, Medien & Kommunikation',
    namePersian: 'هنر، فرهنگ، رسانه و ارتباطات',
    icon: '🎨',
    image: 'https://images.pexels.com/photos/1047540/pexels-photo-1047540.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Creative services, media and communication',
    businessCount: 92,
    subcategories: [
      { id: 131, name: 'Graphic & Web Design', nameGerman: 'Grafik & Webdesign', namePersian: 'طراحی گرافیک و وب', businessCount: 34 },
      { id: 132, name: 'Marketing & Advertising Agencies', nameGerman: 'Marketing & Werbeagenturen', namePersian: 'آژانس‌های بازاریابی و تبلیغات', businessCount: 28 },
      { id: 133, name: 'Photographers & Videographers', nameGerman: 'Fotografen & Videografen', namePersian: 'عکاسان و فیلم‌برداران', businessCount: 41 },
      { id: 134, name: 'Printing Services', nameGerman: 'Druckereien', namePersian: 'خدمات چاپ', businessCount: 19 },
      { id: 135, name: 'Journalists & Publishers', nameGerman: 'Journalisten & Verlage', namePersian: 'روزنامه‌نگاران و ناشران', businessCount: 15 },
      { id: 136, name: 'Radio & TV Production', nameGerman: 'Radio & TV Produktion', namePersian: 'تولید رادیو و تلویزیون', businessCount: 8 },
      { id: 137, name: 'Musicians, DJs, Event Performers', nameGerman: 'Musiker, DJs, Event-Künstler', namePersian: 'موسیقی‌دانان، دی‌جی‌ها، هنرمندان', businessCount: 23 },
      { id: 138, name: 'Art Galleries & Cultural Centers', nameGerman: 'Kunstgalerien & Kulturzentren', namePersian: 'گالری‌های هنری و مراکز فرهنگی', businessCount: 12 }
    ]
  },
  {
    id: 14,
    name: 'Sports & Fitness',
    nameGerman: 'Sport & Fitness',
    namePersian: 'ورزش و تناسب اندام',
    icon: '🏋️',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Fitness centers, sports clubs and training',
    businessCount: 67,
    subcategories: [
      { id: 141, name: 'Gyms & Fitness Studios', nameGerman: 'Fitnessstudios', namePersian: 'باشگاه‌های بدنسازی', businessCount: 32 },
      { id: 142, name: 'Yoga & Pilates Centers', nameGerman: 'Yoga & Pilates Zentren', namePersian: 'مراکز یوگا و پیلاتس', businessCount: 24 },
      { id: 143, name: 'Martial Arts & Boxing Schools', nameGerman: 'Kampfsport & Boxschulen', namePersian: 'آموزشگاه‌های رزمی و بوکس', businessCount: 18 },
      { id: 144, name: 'Dance Schools', nameGerman: 'Tanzschulen', namePersian: 'آموزشگاه‌های رقص', businessCount: 15 },
      { id: 145, name: 'Personal Trainers', nameGerman: 'Personal Trainer', namePersian: 'مربیان شخصی', businessCount: 21 },
      { id: 146, name: 'Sports Clubs & Associations', nameGerman: 'Sportvereine', namePersian: 'باشگاه‌ها و انجمن‌های ورزشی', businessCount: 19 }
    ]
  },
  {
    id: 15,
    name: 'Animals & Pet Care',
    nameGerman: 'Tiere & Haustierpflege',
    namePersian: 'حیوانات و مراقبت از حیوانات خانگی',
    icon: '🐾',
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Veterinary services and pet care',
    businessCount: 45,
    subcategories: [
      { id: 151, name: 'Veterinarians', nameGerman: 'Tierärzte', namePersian: 'دامپزشکان', businessCount: 23 },
      { id: 152, name: 'Pet Grooming', nameGerman: 'Haustierpflege', namePersian: 'آرایش حیوانات خانگی', businessCount: 16 },
      { id: 153, name: 'Pet Boarding / Daycare', nameGerman: 'Tierpension / Tagesbetreuung', namePersian: 'پانسیون و مراقبت روزانه حیوانات', businessCount: 12 },
      { id: 154, name: 'Dog Trainers', nameGerman: 'Hundetrainer', namePersian: 'مربیان سگ', businessCount: 9 },
      { id: 155, name: 'Pet Shops', nameGerman: 'Tierhandlungen', namePersian: 'فروشگاه حیوانات خانگی', businessCount: 8 }
    ]
  },
  {
    id: 16,
    name: 'Travel & Tourism',
    nameGerman: 'Reisen & Tourismus',
    namePersian: 'سفر و گردشگری',
    icon: '✈️',
    image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Travel agencies and tourism services',
    businessCount: 38,
    subcategories: [
      { id: 161, name: 'Travel Agencies', nameGerman: 'Reisebüros', namePersian: 'آژانس‌های مسافرتی', businessCount: 19 },
      { id: 162, name: 'Tour Operators', nameGerman: 'Reiseveranstalter', namePersian: 'تور اپراتورها', businessCount: 12 },
      { id: 163, name: 'Hotels & Guesthouses', nameGerman: 'Hotels & Pensionen', namePersian: 'هتل‌ها و مهمان‌خانه‌ها', businessCount: 15 },
      { id: 164, name: 'Holiday Rentals', nameGerman: 'Ferienwohnungen', namePersian: 'اجاره واحدهای تعطیلات', businessCount: 8 },
      { id: 165, name: 'Tourist Guides', nameGerman: 'Reiseführer', namePersian: 'راهنمایان گردشگری', businessCount: 6 }
    ]
  },
  {
    id: 17,
    name: 'Other Services',
    nameGerman: 'Sonstige Dienstleistungen',
    namePersian: 'سایر خدمات',
    icon: '🔄',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Various other professional services',
    businessCount: 84,
    subcategories: [
      { id: 171, name: 'IT Support & Computer Repair', nameGerman: 'IT Support & Computerreparatur', namePersian: 'پشتیبانی فناوری و تعمیر کامپیوتر', businessCount: 28 },
      { id: 172, name: 'Mobile Phone Repair', nameGerman: 'Handyreparatur', namePersian: 'تعمیر تلفن همراه', businessCount: 23 },
      { id: 173, name: 'Tailors & Alterations', nameGerman: 'Schneider & Änderungen', namePersian: 'خیاطی و تعمیرات لباس', businessCount: 19 },
      { id: 174, name: 'Locksmith Services', nameGerman: 'Schlüsseldienst', namePersian: 'خدمات قفل‌سازی', businessCount: 16 },
      { id: 175, name: 'Waste Disposal & Recycling', nameGerman: 'Müllentsorgung & Recycling', namePersian: 'دفع زباله و بازیافت', businessCount: 12 },
      { id: 176, name: 'Event Rentals', nameGerman: 'Eventverleih (Stühle, Zelte, Tontechnik)', namePersian: 'اجاره تجهیزات مراسم', businessCount: 14 }
    ]
  }
]