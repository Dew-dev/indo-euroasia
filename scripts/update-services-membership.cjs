const fs = require('fs')
const path = require('path')

const servicesEn = {
  eyebrow: 'One-Stop Hub',
  title: 'Our Services',
  lead: 'Six core pillars supporting trade, investment, and partnership development between Indonesia and Eurasia.',
  items: {
    digital: {
      title: 'Digital Business Platform',
      tagline: 'One Platform. Unlimited Business Opportunities.',
      desc: 'The Indonesia–Euroasia Pavilion Digital Business Platform is an integrated online ecosystem connecting businesses, investors, government institutions, and strategic partners across Indonesia and Eurasia. Through a single platform, members can access exclusive resources, connect with verified companies, and participate in Pavilion programs.',
      listLabel: 'Features',
      list: [
        'Member Dashboard',
        'Verified Business Directory',
        'Company & Product Showcase',
        'Business Opportunity Board',
        'Market Intelligence Library',
        'Event Registration',
      ],
    },
    matching: {
      title: 'Business Matching',
      tagline: 'Connecting the Right Businesses Through Curated Events',
      desc: 'Our Business Matching program connects businesses, investors, buyers, suppliers, and government institutions through carefully curated networking events and one-on-one meetings. Every session is designed to create meaningful partnerships and real business opportunities.',
      listLabel: 'Programs',
      list: [
        'B2B Business Matching',
        'B2G Business Meetings',
        'Investor Matching Sessions',
        'CEO Roundtables',
        'Business Networking Events',
        'Business Delegations',
      ],
    },
    promotion: {
      title: 'Trade Promotion',
      tagline: 'Promoting Businesses Across International Markets',
      desc: 'The Pavilion organizes international trade promotion activities to increase market exposure, strengthen business relationships, and support cross-border trade between Indonesia and Eurasia.',
      listLabel: 'Programs',
      list: [
        'International Trade Missions',
        'Trade Exhibitions & Expos',
        'Business Forums',
        'Product Showcases',
        'Investment Forums',
        'Networking Receptions',
      ],
    },
    intelligence: {
      title: 'Market Intelligence',
      tagline: 'Exclusive Market Insights for Pavilion Members',
      desc: 'Gain access to reliable business intelligence, economic analysis, and market reports designed to support strategic business decisions. Premium reports and resources are available according to each membership tier.',
      listLabel: 'Resources',
      list: [
        'Country Market Reports',
        'Industry Reports',
        'Trade Statistics',
        'Regulatory Updates',
        'Investment Opportunities',
        'Quarterly Market Outlook',
      ],
    },
    investment: {
      title: 'Investment Facilitation',
      tagline: 'Connecting Capital with Opportunities',
      desc: 'We support investors and project owners by facilitating strategic partnerships, connecting investment opportunities, and assisting cross-border investment initiatives between Indonesia and Eurasia.',
      listLabel: 'Services',
      list: [
        'Investment Matchmaking',
        'Joint Venture Facilitation',
        'Project Promotion',
        'Government Coordination',
        'Investment Advisory',
        'Investor Networking',
      ],
    },
    export: {
      title: 'Export–Import Assistance',
      tagline: 'Supporting Successful International Trade',
      desc: 'Our export-import assistance helps businesses navigate international trade requirements, ensuring smoother market entry and operational efficiency across borders.',
      listLabel: 'Services',
      list: [
        'Export & Import Documentation',
        'Customs Guidance',
        'Logistics Coordination',
        'Product Compliance',
        'Halal Certification Support',
        'Trade Consultation',
      ],
    },
  },
}

const membershipEn = {
  eyebrow: 'Join Us',
  title: 'Membership',
  lead: 'Unlock Exclusive Business Opportunities',
  body: 'Become part of an exclusive business community connecting Indonesia and Eurasia. Membership provides access to premium market intelligence, networking events, business matching programs, and Pavilion services tailored to support international growth.',
  tiersLabel: 'Membership Tiers',
  benefitsLabel: 'Benefits',
  cta: 'Start Cooperation Today',
  tiers: {
    explorer: {
      name: 'Explorer',
      desc: 'Perfect for startups and SMEs exploring international business opportunities.',
    },
    professional: {
      name: 'Professional',
      desc: 'Designed for exporters, importers, and growing companies seeking market expansion and strategic partnerships.',
    },
    corporate: {
      name: 'Corporate',
      desc: 'A premium membership for corporations, investors, financial institutions, chambers of commerce, and multinational organizations requiring priority access, executive networking, and dedicated business support.',
    },
  },
  table: {
    headers: ['Benefits', 'Explorer', 'Professional', 'Corporate'],
    rows: [
      { benefit: 'Business Directory', explorer: '✓', professional: '✓', corporate: '✓' },
      { benefit: 'Company Profile', explorer: '✓', professional: '✓', corporate: '✓' },
      { benefit: 'Product Showcase', explorer: 'Basic', professional: 'Advanced', corporate: 'Unlimited' },
      { benefit: 'Market Intelligence', explorer: 'Basic', professional: 'Full Access', corporate: 'Premium Access' },
      { benefit: 'Business Matching', explorer: '—', professional: '✓', corporate: 'Priority Access' },
      { benefit: 'Trade Promotion Events', explorer: 'Standard', professional: 'Priority', corporate: 'VIP' },
      { benefit: 'Business Consultation', explorer: '—', professional: '✓', corporate: 'Unlimited' },
      {
        benefit: 'Dedicated Relationship Manager',
        explorer: '—',
        professional: '—',
        corporate: '✓',
      },
    ],
  },
}

const servicesId = {
  eyebrow: 'Pusat Terpadu',
  title: 'Layanan Kami',
  lead: 'Enam pilar inti yang mendukung perdagangan, investasi, dan pengembangan kemitraan antara Indonesia dan Eurasia.',
  items: {
    digital: {
      title: 'Platform Bisnis Digital',
      tagline: 'Satu Platform. Peluang Bisnis Tanpa Batas.',
      desc: 'Platform Bisnis Digital Indonesia–Euroasia Pavilion adalah ekosistem online terpadu yang menghubungkan bisnis, investor, lembaga pemerintah, dan mitra strategis di Indonesia serta Eurasia. Melalui satu platform, anggota dapat mengakses sumber daya eksklusif, terhubung dengan perusahaan terverifikasi, dan berpartisipasi dalam program Pavilion.',
      listLabel: 'Fitur',
      list: [
        'Dashboard Anggota',
        'Direktori Bisnis Terverifikasi',
        'Showcase Perusahaan & Produk',
        'Papan Peluang Bisnis',
        'Perpustakaan Market Intelligence',
        'Registrasi Event',
      ],
    },
    matching: {
      title: 'Business Matching',
      tagline: 'Menghubungkan Bisnis yang Tepat melalui Event Terkurasi',
      desc: 'Program Business Matching kami menghubungkan bisnis, investor, pembeli, pemasok, dan lembaga pemerintah melalui event networking serta pertemuan one-on-one yang terkurasi. Setiap sesi dirancang untuk menciptakan kemitraan bermakna dan peluang bisnis nyata.',
      listLabel: 'Program',
      list: [
        'Business Matching B2B',
        'Pertemuan Bisnis B2G',
        'Sesi Investor Matching',
        'CEO Roundtables',
        'Event Networking Bisnis',
        'Delegasi Bisnis',
      ],
    },
    promotion: {
      title: 'Promosi Perdagangan',
      tagline: 'Mempromosikan Bisnis di Pasar Internasional',
      desc: 'Pavilion menyelenggarakan aktivitas promosi perdagangan internasional untuk meningkatkan eksposur pasar, memperkuat hubungan bisnis, dan mendukung perdagangan lintas negara antara Indonesia dan Eurasia.',
      listLabel: 'Program',
      list: [
        'Misi Dagang Internasional',
        'Pameran & Expo Perdagangan',
        'Forum Bisnis',
        'Showcase Produk',
        'Forum Investasi',
        'Resepsi Networking',
      ],
    },
    intelligence: {
      title: 'Intelijen Pasar',
      tagline: 'Insight Pasar Eksklusif untuk Anggota Pavilion',
      desc: 'Dapatkan akses ke intelijen bisnis, analisis ekonomi, dan laporan pasar yang andal untuk mendukung keputusan bisnis strategis. Laporan dan sumber daya premium tersedia sesuai tingkatan keanggotaan.',
      listLabel: 'Sumber Daya',
      list: [
        'Laporan Pasar Negara',
        'Laporan Industri',
        'Statistik Perdagangan',
        'Update Regulasi',
        'Peluang Investasi',
        'Outlook Pasar Kuartalan',
      ],
    },
    investment: {
      title: 'Fasilitasi Investasi',
      tagline: 'Menghubungkan Modal dengan Peluang',
      desc: 'Kami mendukung investor dan pemilik proyek dengan memfasilitasi kemitraan strategis, menghubungkan peluang investasi, serta mendampingi inisiatif investasi lintas negara antara Indonesia dan Eurasia.',
      listLabel: 'Layanan',
      list: [
        'Investment Matchmaking',
        'Fasilitasi Joint Venture',
        'Promosi Proyek',
        'Koordinasi Pemerintah',
        'Advisory Investasi',
        'Networking Investor',
      ],
    },
    export: {
      title: 'Bantuan Ekspor–Impor',
      tagline: 'Mendukung Perdagangan Internasional yang Sukses',
      desc: 'Bantuan ekspor-impor kami membantu bisnis menavigasi persyaratan perdagangan internasional agar market entry lebih lancar dan operasional lintas batas lebih efisien.',
      listLabel: 'Layanan',
      list: [
        'Dokumentasi Ekspor & Impor',
        'Panduan Bea Cukai',
        'Koordinasi Logistik',
        'Kepatuhan Produk',
        'Dukungan Sertifikasi Halal',
        'Konsultasi Perdagangan',
      ],
    },
  },
}

const membershipId = {
  eyebrow: 'Bergabung',
  title: 'Keanggotaan',
  lead: 'Buka Peluang Bisnis Eksklusif',
  body: 'Menjadi bagian dari komunitas bisnis eksklusif yang menghubungkan Indonesia dan Eurasia. Keanggotaan memberikan akses ke market intelligence premium, event networking, program business matching, serta layanan Pavilion untuk mendukung pertumbuhan internasional.',
  tiersLabel: 'Tingkatan Keanggotaan',
  benefitsLabel: 'Manfaat',
  cta: 'Mulai Kerja Sama Hari Ini',
  tiers: {
    explorer: {
      name: 'Explorer',
      desc: 'Cocok untuk startup dan UMKM yang menjelajahi peluang bisnis internasional.',
    },
    professional: {
      name: 'Professional',
      desc: 'Dirancang untuk eksportir, importir, dan perusahaan berkembang yang mencari ekspansi pasar serta kemitraan strategis.',
    },
    corporate: {
      name: 'Corporate',
      desc: 'Keanggotaan premium untuk korporasi, investor, lembaga keuangan, kamar dagang, dan organisasi multinasional yang membutuhkan akses prioritas, networking eksekutif, serta dukungan bisnis khusus.',
    },
  },
  table: {
    headers: ['Manfaat', 'Explorer', 'Professional', 'Corporate'],
    rows: [
      { benefit: 'Direktori Bisnis', explorer: '✓', professional: '✓', corporate: '✓' },
      { benefit: 'Profil Perusahaan', explorer: '✓', professional: '✓', corporate: '✓' },
      { benefit: 'Showcase Produk', explorer: 'Basic', professional: 'Advanced', corporate: 'Unlimited' },
      { benefit: 'Market Intelligence', explorer: 'Basic', professional: 'Full Access', corporate: 'Premium Access' },
      { benefit: 'Business Matching', explorer: '—', professional: '✓', corporate: 'Priority Access' },
      { benefit: 'Event Promosi Perdagangan', explorer: 'Standard', professional: 'Priority', corporate: 'VIP' },
      { benefit: 'Konsultasi Bisnis', explorer: '—', professional: '✓', corporate: 'Unlimited' },
      {
        benefit: 'Relationship Manager Khusus',
        explorer: '—',
        professional: '—',
        corporate: '✓',
      },
    ],
  },
}

const servicesRu = {
  eyebrow: 'Единый хаб',
  title: 'Наши услуги',
  lead: 'Шесть ключевых направлений поддержки торговли, инвестиций и развития партнёрств между Индонезией и Евразией.',
  items: {
    digital: {
      title: 'Цифровая бизнес-платформа',
      tagline: 'Одна платформа. Безграничные бизнес-возможности.',
      desc: 'Цифровая бизнес-платформа Indonesia–Euroasia Pavilion — интегрированная онлайн-экосистема, соединяющая бизнес, инвесторов, государственные институты и стратегических партнёров Индонезии и Евразии. Через единую платформу участники получают доступ к эксклюзивным ресурсам, связываются с проверенными компаниями и участвуют в программах Pavilion.',
      listLabel: 'Возможности',
      list: [
        'Кабинет участника',
        'Проверенный бизнес-каталог',
        'Витрина компаний и продуктов',
        'Доска бизнес-возможностей',
        'Библиотека рыночной аналитики',
        'Регистрация на мероприятия',
      ],
    },
    matching: {
      title: 'Бизнес-матчинг',
      tagline: 'Соединяем нужные компании через курируемые мероприятия',
      desc: 'Программа бизнес-матчинга соединяет компании, инвесторов, покупателей, поставщиков и государственные институты через тщательно отобранные networking-мероприятия и индивидуальные встречи. Каждая сессия направлена на создание значимых партнёрств и реальных бизнес-возможностей.',
      listLabel: 'Программы',
      list: [
        'B2B бизнес-матчинг',
        'B2G деловые встречи',
        'Сессии матчинга инвесторов',
        'CEO Roundtables',
        'Бизнес-networking',
        'Бизнес-делегации',
      ],
    },
    promotion: {
      title: 'Продвижение торговли',
      tagline: 'Продвижение бизнеса на международных рынках',
      desc: 'Pavilion организует международные мероприятия по продвижению торговли, чтобы повысить рыночную видимость, укрепить деловые связи и поддержать трансграничную торговлю между Индонезией и Евразией.',
      listLabel: 'Программы',
      list: [
        'Международные торговые миссии',
        'Торговые выставки и экспо',
        'Бизнес-форумы',
        'Презентации продукции',
        'Инвестиционные форумы',
        'Networking-приёмы',
      ],
    },
    intelligence: {
      title: 'Рыночная аналитика',
      tagline: 'Эксклюзивная рыночная информация для участников Pavilion',
      desc: 'Получите доступ к надёжной бизнес-аналитике, экономическим обзорам и рыночным отчётам для поддержки стратегических решений. Премиальные материалы доступны в соответствии с уровнем членства.',
      listLabel: 'Ресурсы',
      list: [
        'Страновые рыночные отчёты',
        'Отраслевые отчёты',
        'Торговая статистика',
        'Обновления регулирования',
        'Инвестиционные возможности',
        'Квартальный рыночный outlook',
      ],
    },
    investment: {
      title: 'Содействие инвестициям',
      tagline: 'Соединяем капитал с возможностями',
      desc: 'Мы поддерживаем инвесторов и владельцев проектов, способствуя стратегическим партнёрствам, соединяя инвестиционные возможности и сопровождая трансграничные инвестиционные инициативы между Индонезией и Евразией.',
      listLabel: 'Услуги',
      list: [
        'Инвестиционный матчинг',
        'Содействие совместным предприятиям',
        'Продвижение проектов',
        'Координация с государством',
        'Инвестиционный advisory',
        'Networking инвесторов',
      ],
    },
    export: {
      title: 'Поддержка экспорта и импорта',
      tagline: 'Поддержка успешной международной торговли',
      desc: 'Наша поддержка экспорта и импорта помогает компаниям ориентироваться в требованиях международной торговли, обеспечивая более гладкий выход на рынок и эффективность трансграничных операций.',
      listLabel: 'Услуги',
      list: [
        'Экспортная и импортная документация',
        'Таможенное сопровождение',
        'Координация логистики',
        'Соответствие продукции',
        'Поддержка халяль-сертификации',
        'Торговые консультации',
      ],
    },
  },
}

const membershipRu = {
  eyebrow: 'Присоединяйтесь',
  title: 'Членство',
  lead: 'Откройте эксклюзивные бизнес-возможности',
  body: 'Станьте частью эксклюзивного бизнес-сообщества, соединяющего Индонезию и Евразию. Членство даёт доступ к премиальной рыночной аналитике, networking-мероприятиям, программам бизнес-матчинга и услугам Pavilion для международной экспансии.',
  tiersLabel: 'Уровни членства',
  benefitsLabel: 'Преимущества',
  cta: 'Начать сотрудничество сегодня',
  tiers: {
    explorer: {
      name: 'Explorer',
      desc: 'Идеально для стартапов и МСП, изучающих международные бизнес-возможности.',
    },
    professional: {
      name: 'Professional',
      desc: 'Для экспортёров, импортёров и растущих компаний, стремящихся к расширению рынков и стратегическим партнёрствам.',
    },
    corporate: {
      name: 'Corporate',
      desc: 'Премиальное членство для корпораций, инвесторов, финансовых институтов, торгово-промышленных палат и мультинациональных организаций, которым нужен приоритетный доступ, executive networking и выделенная поддержка.',
    },
  },
  table: {
    headers: ['Преимущества', 'Explorer', 'Professional', 'Corporate'],
    rows: [
      { benefit: 'Бизнес-каталог', explorer: '✓', professional: '✓', corporate: '✓' },
      { benefit: 'Профиль компании', explorer: '✓', professional: '✓', corporate: '✓' },
      { benefit: 'Витрина продуктов', explorer: 'Basic', professional: 'Advanced', corporate: 'Unlimited' },
      { benefit: 'Рыночная аналитика', explorer: 'Basic', professional: 'Full Access', corporate: 'Premium Access' },
      { benefit: 'Бизнес-матчинг', explorer: '—', professional: '✓', corporate: 'Priority Access' },
      { benefit: 'Мероприятия продвижения торговли', explorer: 'Standard', professional: 'Priority', corporate: 'VIP' },
      { benefit: 'Бизнес-консультации', explorer: '—', professional: '✓', corporate: 'Unlimited' },
      {
        benefit: 'Выделенный Relationship Manager',
        explorer: '—',
        professional: '—',
        corporate: '✓',
      },
    ],
  },
}

const locales = {
  en: { services: servicesEn, membership: membershipEn, navMembership: 'Membership' },
  id: { services: servicesId, membership: membershipId, navMembership: 'Keanggotaan' },
  ru: { services: servicesRu, membership: membershipRu, navMembership: 'Членство' },
}

for (const [code, payload] of Object.entries(locales)) {
  const file = path.join('src', 'i18n', 'locales', `${code}.json`)
  const data = JSON.parse(fs.readFileSync(file, 'utf8'))
  data.nav.membership = payload.navMembership
  data.services = payload.services
  data.membership = payload.membership
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n')
  console.log('updated', code)
}
