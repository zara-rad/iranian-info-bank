// src/data/sampleEvents.js
export const sampleEvents = [
  {
    id: 1,
    title: "Nowruz Celebration 2025",
    titleGerman: "Nowruz Feier 2025",
    titlePersian: "جشن نوروز ۲۰۲۵",
    description:
      "Join us for the Persian New Year celebration with traditional music, food, and cultural performances.",
    descriptionGerman:
      "Begleiten Sie uns zur persischen Neujahrsfeier mit traditioneller Musik, Essen und kulturellen Aufführungen.",
    descriptionPersian:
      "در جشن سال نو فارسی با موسیقی سنتی، غذا و اجراهای فرهنگی به ما بپیوندید.",
    image:
      "https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "2025-03-20",
    time: "18:00 - 23:00",
    location: "Berlin",
    venue: "Persian Cultural Center",
    address: "Kulturzentrum Persien, Hauptstraße 123, 10115 Berlin",
    contactPhone: "+49 30 12345678",
    contactEmail: "nowruz@persian-culture.de",
    website: "www.persian-culture.de",
    eventType: "cultural",
    isFree: false,
    ticketPrice: 25,
    organizer: {
      name: "Persian Cultural Association Berlin",
      phone: "+49 30 12345678",
      email: "info@persian-culture.de",
    },
    tags: ["nowruz", "persian", "culture", "celebration", "new-year"],
  },
  {
    id: 2,
    title: "Iranian Business Networking",
    titleGerman: "Iranisches Business Networking",
    titlePersian: "شبکه‌سازی کسب‌وکار ایرانی",
    description:
      "Connect with Iranian entrepreneurs and business owners across Germany.",
    descriptionGerman:
      "Vernetzen Sie sich mit iranischen Unternehmern und Geschäftsinhabern in ganz Deutschland.",
    descriptionPersian:
      "با کارآفرینان و صاحبان کسب‌وکار ایرانی در سراسر آلمان ارتباط برقرار کنید.",
    image:
      "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "2025-02-15",
    time: "10:00 - 16:00",
    location: "Hamburg",
    venue: "Business Center Hamburg",
    address: "Business Center Hamburg, Hafenstraße 45, 20457 Hamburg",
    contactEmail: "network@iran-business.de",
    isFree: true,
    organizer: { name: "Iranian Business Club" },
    tags: ["business", "networking", "entrepreneurs"],
  },
  {
    id: 3,
    title: "Persian Poetry Night",
    titleGerman: "Persische Poesie Nacht",
    titlePersian: "شب شعر فارسی",
    description:
      "An evening celebrating Persian literature and poetry with renowned poets.",
    descriptionGerman:
      "Ein Abend zur Feier der persischen Literatur und Poesie mit renommierten Dichtern.",
    descriptionPersian: "شبی برای جشن ادبیات و شعر فارسی با شاعران مشهور.",
    image:
      "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800",
    date: "2025-02-28",
    time: "19:00 - 22:00",
    location: "Munich",
    venue: "Cultural Hall Munich",
    address: "Kulturhalle München, Königsplatz 12, 80333 München",
    isFree: false,
    ticketPrice: 15,
    organizer: { name: "Persian Literature Society" },
    tags: ["poetry", "literature", "persian"],
  },
];
