const mongoose = require('mongoose')
const Category = require('../models/Category')
const Event = require('../models/Event')
const User = require('../models/User')
require('dotenv').config()

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/iranian-directory')

const categories = [
  {
    name: 'Medical & Healthcare',
    nameGerman: 'Medizin & Gesundheit',
    namePersian: 'پزشکی و مراقبت از سلامت',
    description: 'Find doctors, specialists, pharmacies and healthcare services',
    descriptionGerman: 'Finden Sie Ärzte, Spezialisten, Apotheken und Gesundheitsdienste',
    descriptionPersian: 'پزشکان، متخصصان، داروخانه‌ها و خدمات بهداشتی را پیدا کنید',
    icon: '🏥',
    image: 'https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=500',
    slug: 'medical-healthcare',
    sortOrder: 1,
    subcategories: [
      {
        name: 'General Practitioners',
        nameGerman: 'Hausärzte',
        namePersian: 'پزشک عمومی',
        description: 'Family doctors and general practitioners',
        slug: 'general-practitioners'
      },
      {
        name: 'Specialists',
        nameGerman: 'Fachärzte',
        namePersian: 'متخصصان',
        description: 'Medical specialists in various fields',
        slug: 'medical-specialists'
      },
      {
        name: 'Dentists & Orthodontists',
        nameGerman: 'Zahnärzte & Kieferorthopäden',
        namePersian: 'دندانپزشک و ارتودنتیست',
        description: 'Dental care and orthodontic services',
        slug: 'dentists-orthodontists'
      },
      {
        name: 'Pharmacies',
        nameGerman: 'Apotheken',
        namePersian: 'داروخانه',
        description: 'Pharmacies and medication services',
        slug: 'pharmacies'
      }
    ]
  },
  {
    name: 'Beauty, Wellness & Personal Care',
    nameGerman: 'Schönheit, Wellness & Körperpflege',
    namePersian: 'زیبایی، سلامتی و مراقبت شخصی',
    description: 'Hair salons, beauty centers, spas and wellness services',
    descriptionGerman: 'Friseursalons, Schönheitszentren, Spas und Wellness-Services',
    descriptionPersian: 'آرایشگاه، مراکز زیبایی، اسپا و خدمات سلامتی',
    icon: '💇‍♀️',
    image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=500',
    slug: 'beauty-wellness',
    sortOrder: 2,
    subcategories: [
      {
        name: 'Hairdressers & Barber Shops',
        nameGerman: 'Friseure & Barbershops',
        namePersian: 'آرایشگاه مردانه و زنانه',
        description: 'Hair styling, cutting and treatment services',
        slug: 'hairdressers-barbers'
      },
      {
        name: 'Beauty Salons',
        nameGerman: 'Kosmetikstudios',
        namePersian: 'سالن زیبایی',
        description: 'Beauty treatments and cosmetic services',
        slug: 'beauty-salons'
      },
      {
        name: 'Massage & Spa Centers',
        nameGerman: 'Massage & Spa Zentren',
        namePersian: 'مراکز ماساژ و اسپا',
        description: 'Relaxation and therapeutic massage services',
        slug: 'massage-spa'
      }
    ]
  },
  {
    name: 'Construction & Handwerk',
    nameGerman: 'Bau & Handwerk',
    namePersian: 'ساختمان و صنایع دستی',
    description: 'Skilled tradesmen, contractors and construction services',
    descriptionGerman: 'Handwerker, Auftragnehmer und Bauleistungen',
    descriptionPersian: 'صنعتگران ماهر، پیمانکاران و خدمات ساختمانی',
    icon: '🔨',
    image: 'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=500',
    slug: 'construction-handwerk',
    sortOrder: 3,
    subcategories: [
      {
        name: 'Electricians',
        nameGerman: 'Elektriker',
        namePersian: 'برقکار',
        description: 'Electrical installation and repair services',
        slug: 'electricians'
      },
      {
        name: 'Plumbers',
        nameGerman: 'Klempner',
        namePersian: 'لوله‌کش',
        description: 'Plumbing and heating services',
        slug: 'plumbers'
      },
      {
        name: 'Painters & Decorators',
        nameGerman: 'Maler & Dekorateure',
        namePersian: 'نقاش و دکوراتور',
        description: 'Painting and interior decoration services',
        slug: 'painters-decorators'
      }
    ]
  },
  {
    name: 'Gastronomy, Restaurants & Food',
    nameGerman: 'Gastronomie, Restaurants & Lebensmittel',
    namePersian: 'رستوران‌ها، غذاخوری‌ها و مواد غذایی',
    description: 'Persian restaurants, cafes, bakeries and food services',
    descriptionGerman: 'Persische Restaurants, Cafés, Bäckereien und Lebensmittelservice',
    descriptionPersian: 'رستوران‌های ایرانی، کافه‌ها، نانوایی‌ها و خدمات غذایی',
    icon: '🍽️',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=500',
    slug: 'gastronomy-restaurants',
    sortOrder: 4,
    subcategories: [
      {
        name: 'Persian Restaurants',
        nameGerman: 'Persische Restaurants',
        namePersian: 'رستوران‌های ایرانی',
        description: 'Authentic Persian and Iranian cuisine',
        slug: 'persian-restaurants'
      },
      {
        name: 'Cafés & Coffee Shops',
        nameGerman: 'Cafés & Kaffeehäuser',
        namePersian: 'کافه و قهوه‌خانه',
        description: 'Coffee shops and casual dining',
        slug: 'cafes-coffee'
      },
      {
        name: 'Bakeries',
        nameGerman: 'Bäckereien',
        namePersian: 'نانوایی',
        description: 'Persian and international bakeries',
        slug: 'bakeries'
      }
    ]
  }
]

const sampleEvents = [
  {
    title: 'Nowruz Celebration 2025',
    titleGerman: 'Nowruz Feier 2025',
    titlePersian: 'جشن نوروز ۲۰۲۵',
    description: 'Join us for the Persian New Year celebration with traditional music, food, and cultural performances. Experience the beauty of Iranian culture with families from across Germany.',
    descriptionGerman: 'Begleiten Sie uns zur persischen Neujahrsfeier mit traditioneller Musik, Essen und kulturellen Aufführungen. Erleben Sie die Schönheit der iranischen Kultur mit Familien aus ganz Deutschland.',
    descriptionPersian: 'در جشن سال نو فارسی با موسیقی سنتی، غذا و اجراهای فرهنگی به ما بپیوندید. زیبایی فرهنگ ایرانی را با خانواده‌هایی از سراسر آلمان تجربه کنید.',
    image: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=800',
    startDate: new Date('2025-03-20T18:00:00.000Z'),
    endDate: new Date('2025-03-20T23:00:00.000Z'),
    venue: 'Persian Cultural Center',
    address: 'Kulturzentrum Persien, Hauptstraße 123, 10115 Berlin',
    city: 'Berlin',
    contactPhone: '+49 30 12345678',
    contactEmail: 'nowruz@persian-culture.de',
    eventType: 'cultural',
    isFree: false,
    ticketPrice: 25,
    organizer: {
      name: 'Persian Cultural Association Berlin',
      phone: '+49 30 12345678',
      email: 'info@persian-culture.de'
    },
    status: 'published',
    isFeatured: true,
    tags: ['nowruz', 'persian', 'culture', 'celebration', 'new-year']
  },
  {
    title: 'Iranian Business Networking Event',
    titleGerman: 'Iranisches Business Networking Event',
    titlePersian: 'رویداد شبکه‌سازی کسب‌وکار ایرانی',
    description: 'Connect with Iranian entrepreneurs and business owners across Germany. Share experiences, find partnerships, and grow your network.',
    descriptionGerman: 'Vernetzen Sie sich mit iranischen Unternehmern und Geschäftsinhabern in ganz Deutschland. Teilen Sie Erfahrungen, finden Sie Partnerschaften und erweitern Sie Ihr Netzwerk.',
    descriptionPersian: 'با کارآفرینان و صاحبان کسب‌وکار ایرانی در سراسر آلمان ارتباط برقرار کنید. تجربیات را به اشتراک بگذارید، شراکت‌ها پیدا کنید و شبکه خود را گسترش دهید.',
    image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800',
    startDate: new Date('2025-02-15T19:00:00.000Z'),
    endDate: new Date('2025-02-15T22:00:00.000Z'),
    venue: 'Business Center Hamburg',
    address: 'Geschäftszentrum Hamburg, Mönckebergstraße 7, 20095 Hamburg',
    city: 'Hamburg',
    contactPhone: '+49 40 87654321',
    contactEmail: 'networking@iranian-business.de',
    eventType: 'business',
    isFree: true,
    organizer: {
      name: 'Iranian Business Network Germany',
      phone: '+49 40 87654321',
      email: 'info@iranian-business.de'
    },
    status: 'published',
    tags: ['business', 'networking', 'entrepreneurs', 'iranian']
  }
]

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...')

    // Clear existing data
    console.log('🗑️  Clearing existing data...')
    await Category.deleteMany({})
    await Event.deleteMany({})

    // Seed categories
    console.log('📂 Seeding categories...')
    for (const categoryData of categories) {
      const category = new Category(categoryData)
      await category.save()
      console.log(`✅ Created category: ${category.name}`)
    }

    // Seed events
    console.log('🎉 Seeding events...')
    for (const eventData of sampleEvents) {
      const event = new Event(eventData)
      await event.save()
      console.log(`✅ Created event: ${event.title}`)
    }

    // Create admin user if not exists
    console.log('👤 Checking admin user...')
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL })
    if (!adminExists) {
      const adminUser = new User({
        fullName: 'Super Admin',
        email: process.env.ADMIN_EMAIL || 'admin@iranianinfo.de',
        password: process.env.ADMIN_PASSWORD || 'admin123',
        role: 'super_admin',
        isVerified: true,
        acceptedTerms: true,
        acceptedPrivacy: true,
        acceptedAt: new Date()
      })
      await adminUser.save()
      console.log('✅ Created admin user')
    } else {
      console.log('ℹ️  Admin user already exists')
    }

    console.log('🎉 Database seeding completed successfully!')
    console.log(`📊 Created ${categories.length} categories`)
    console.log(`🎪 Created ${sampleEvents.length} events`)

  } catch (error) {
    console.error('❌ Error seeding database:', error)
  } finally {
    mongoose.connection.close()
  }
}

// Run seeding
seedDatabase()