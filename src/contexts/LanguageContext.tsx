import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fa' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fa: {
    // Header
    'nav.support': 'حمایت',
    'nav.docs': 'مستندات',
    'nav.download': 'دانلود',
    'nav.issues': 'گزارش مشکلات',
    'nav.admin': 'پنل ادمین',
    'nav.login': 'ورود',
    'nav.logout': 'خروج',
    'search': 'جستجو',
    
    // Hero
    'hero.title': 'آن کروسان',
    'hero.subtitle': 'جعبه‌ابزار نهایی شطرنج',
    'hero.description': 'یک رابط کاربری گرافیکی شطرنج متن‌باز و چندپلتفرمی که هدف آن قدرتمند، قابل تنظیم و استفاده آسان است.',
    'hero.download': 'دانلود',
    'hero.github': 'مشاهده در گیت‌هاب',
    
    // Features
    'feature.analysis.title': 'تحلیل بازی',
    'feature.analysis.desc': 'گزارش تحلیل دقیق بازی‌های خود را دریافت کنید، شامل نمودار ارزیابی در طول زمان، نقشه حرارتی صفحه و لیست بهترین حرکات.',
    'feature.database.title': 'پایگاه داده شخصی',
    'feature.database.desc': 'آیا هم در Lichess و هم در Chess.com بازی می‌کنید؟ با آن کروسان می‌توانید به راحتی بازی‌های خود را از هر دو پلتفرم وارد کرده و در یک مکان نگهداری کنید.',
    'feature.download.title': 'مدیر دانلود',
    'feature.download.desc': 'آن کروسان با یک مدیر دانلود داخلی ارائه می‌شود که به شما امکان می‌دهد آخرین موتورها و پایگاه‌های داده را با یک کلیک دریافت کنید.',
    
    // Showcase
    'showcase.caption': 'صفحه تحلیل آن کروسان',
    
    // Support
    'support.title': 'حمایت از پروژه',
    'support.subtitle': 'اگر آن کروسان را مفید می‌دانید، می‌توانید از توسعه آن حمایت کنید',
    'support.coffee': 'برای من یک قهوه بخر',
    'support.paypal': 'کمک مالی از طریق PayPal',
    
    // Download
    'download.title': 'دانلود آن کروسان',
    'download.subtitle': 'پلتفرم خود را انتخاب کنید',
    'download.windows': 'ویندوز',
    'download.mac': 'مک‌او‌اس',
    'download.linux': 'لینوکس',
    'download.latest': 'آخرین نسخه',
    'download.windows-desc': 'دانلود نصب‌کننده برای ویندوز ۱۰ یا بالاتر.',
    'download.mac-desc': 'دانلود DMG برای macOS 10.15 یا بالاتر.',
    'download.linux-desc': 'دانلود AppImage یا .deb برای توزیع‌های لینوکس.',
    'download.download-for': 'دانلود برای',
    'download.all-releases': 'مشاهده همه نسخه‌ها در',
    
    // Docs
    'docs.title': 'مستندات',
    'docs.getting-started': 'شروع کار',
    'docs.assets': 'منابع',
    'docs.databases': 'پایگاه‌های داده',
    'docs.engines': 'موتورها',
    'docs.guides': 'راهنماها',
    'docs.analyze-game': 'تحلیل بازی',
    'docs.manage-repertoire': 'مدیریت رپرتوار',
    'docs.configure-engines': 'پیکربندی موتورها',
    'docs.reference': 'مرجع',
    'docs.database-format': 'فرمت پایگاه داده',
    'docs.on-this-page': 'در این صفحه',
    'docs.prev-page': 'صفحه قبلی',
    'docs.next-page': 'صفحه بعدی',
    'docs.what-is': 'آن کروسان چیست؟',
    'docs.features': 'ویژگی‌ها',
    'docs.feature-1': 'ذخیره و تحلیل بازی‌های شما از',
    'docs.feature-2': 'تحلیل چند موتوره. پشتیبانی از تمام موتورهای UCI',
    'docs.feature-3': 'آماده‌سازی رپرتوار با کاوشگر گشایش',
    'docs.feature-4': 'نصب و مدیریت ساده موتور و پایگاه داده',
    'docs.and': 'و',
    'docs.databases-desc': 'آن کروسان با مجموعه‌ای از پایگاه‌های داده ارائه می‌شود که می‌توانید با یک کلیک دانلود کنید. در اینجا لیست پایگاه‌های داده موجود آمده است:',
    'docs.games': 'بازی‌ها',
    'docs.players': 'بازیکنان',
    'docs.download': 'دانلود',
    'docs.engines-desc': 'آن کروسان از تمام موتورهای شطرنج سازگار با UCI پشتیبانی می‌کند. در اینجا چند گزینه محبوب آمده است:',
    'docs.stockfish-desc': 'قوی‌ترین موتور شطرنج متن‌باز در جهان.',
    'docs.lc0-desc': 'یک موتور شطرنج مبتنی بر شبکه عصبی که الهام گرفته از AlphaZero است.',
    'docs.komodo-desc': 'یک موتور شطرنج قدرتمند که به خاطر بازی موقعیتی‌اش شناخته شده است.',
    'docs.analyze-intro': 'یاد بگیرید چگونه بازی‌های شطرنج خود را با ابزارهای تحلیل قدرتمند آن کروسان تحلیل کنید.',
    'docs.importing-games': 'وارد کردن بازی‌ها',
    'docs.importing-games-desc': 'می‌توانید بازی‌ها را از فایل‌های PGN وارد کنید یا مستقیماً بازی‌های خود را از Lichess و Chess.com همگام‌سازی کنید.',
    'docs.running-analysis': 'اجرای تحلیل',
    'docs.running-analysis-desc': 'یک بازی را انتخاب کرده و روی دکمه تحلیل کلیک کنید تا تحلیل موتور را شروع کنید. می‌توانید چندین موتور را برای مقایسه انتخاب کنید.',
    'docs.repertoire-intro': 'رپرتوار گشایش خود را با ابزارهای داخلی آن کروسان بسازید و مدیریت کنید.',
    'docs.creating-repertoire': 'ایجاد رپرتوار',
    'docs.creating-repertoire-desc': 'به تب رپرتوار بروید و یک رپرتوار جدید ایجاد کنید. می‌توانید از صفر شروع کنید یا از بازی‌های موجود وارد کنید.',
    'docs.opening-explorer': 'کاوشگر گشایش',
    'docs.opening-explorer-desc': 'از کاوشگر گشایش استفاده کنید تا ببینید حرکات در سطح استادی چگونه بازی می‌شوند. این به شما کمک می‌کند تا در ساخت رپرتوار تصمیمات آگاهانه بگیرید.',
    'docs.configure-intro': 'یاد بگیرید چگونه موتورهای شطرنج را در آن کروسان نصب و پیکربندی کنید.',
    'docs.installing-engines': 'نصب موتورها',
    'docs.installing-engines-desc': 'از مدیر دانلود داخلی برای نصب موتورهای محبوب مانند Stockfish استفاده کنید. همچنین می‌توانید هر موتور سازگار با UCI را به صورت دستی اضافه کنید.',
    'docs.engine-settings': 'تنظیمات موتور',
    'docs.hash-size': 'پیکربندی اندازه جدول هش',
    'docs.cpu-threads': 'تنظیم تعداد رشته‌های CPU',
    'docs.analysis-depth': 'تنظیم عمق و محدودیت‌های زمانی تحلیل',
    'docs.syzygy': 'فعال‌سازی پایگاه‌های جدول Syzygy',
    'docs.format-intro': 'آن کروسان از یک فرمت پایگاه داده سفارشی بهینه‌سازی شده برای بازی‌های شطرنج استفاده می‌کند.',
    'docs.supported-formats': 'فرمت‌های پشتیبانی شده',
    'docs.pgn-desc': 'فرمت استاندارد نماد شطرنج',
    'docs.ecdb-desc': 'فرمت پایگاه داده بومی آن کروسان',
    'docs.import-games-desc': 'می‌توانید بازی‌ها را از فایل‌های PGN وارد کنید یا مستقیماً از حساب‌های Lichess و Chess.com خود.',
    
    // Issues
    'issues.title': 'گزارش مشکلات',
    'issues.subtitle': 'مشکلات و پیشنهادات خود را ارسال کنید',
    'issues.new': 'تیکت جدید',
    'issues.my-tickets': 'تیکت‌های من',
    'issues.all-tickets': 'همه تیکت‌ها',
    'issues.type': 'نوع',
    'issues.type.bug': 'باگ',
    'issues.type.feature': 'درخواست ویژگی',
    'issues.type.question': 'سوال',
    'issues.priority': 'اولویت',
    'issues.priority.low': 'کم',
    'issues.priority.medium': 'متوسط',
    'issues.priority.high': 'بالا',
    'issues.status': 'وضعیت',
    'issues.status.open': 'باز',
    'issues.status.in-progress': 'در حال انجام',
    'issues.status.resolved': 'حل شده',
    'issues.status.closed': 'بسته شده',
    'issues.title-label': 'عنوان',
    'issues.description': 'توضیحات',
    'issues.attachments': 'پیوست‌ها',
    'issues.upload': 'آپلود فایل',
    'issues.submit': 'ارسال تیکت',
    'issues.comment': 'نظر',
    'issues.add-comment': 'افزودن نظر',
    'issues.login-required': 'برای ارسال تیکت باید وارد شوید',
    'issues.no-tickets': 'تیکتی یافت نشد',
    'issues.created-at': 'تاریخ ایجاد',
    
    // Auth
    'auth.login': 'ورود',
    'auth.signup': 'ثبت‌نام',
    'auth.email': 'ایمیل',
    'auth.password': 'رمز عبور',
    'auth.confirm-password': 'تأیید رمز عبور',
    'auth.name': 'نام',
    'auth.google': 'ادامه با گوگل',
    'auth.no-account': 'حساب کاربری ندارید؟',
    'auth.have-account': 'قبلاً حساب دارید؟',
    'auth.forgot-password': 'رمز عبور را فراموش کردید؟',
    'auth.reset-password': 'بازیابی رمز عبور',
    'auth.logout': 'خروج',
    
    // Admin
    'admin.title': 'پنل ادمین',
    'admin.dashboard': 'داشبورد',
    'admin.tickets': 'تیکت‌ها',
    'admin.users': 'کاربران',
    'admin.stats': 'آمار',
    'admin.total-tickets': 'کل تیکت‌ها',
    'admin.open-tickets': 'تیکت‌های باز',
    'admin.resolved-tickets': 'تیکت‌های حل شده',
    'admin.total-users': 'کل کاربران',
    'admin.reply': 'پاسخ',
    'admin.change-status': 'تغییر وضعیت',
    
    // Common
    'common.loading': 'در حال بارگذاری...',
    'common.error': 'خطا',
    'common.success': 'موفقیت',
    'common.cancel': 'انصراف',
    'common.save': 'ذخیره',
    'common.delete': 'حذف',
    'common.edit': 'ویرایش',
    'common.view': 'مشاهده',
    'common.back': 'بازگشت',
  },
  en: {
    // Header
    'nav.support': 'Support',
    'nav.docs': 'Documentation',
    'nav.download': 'Download',
    'nav.issues': 'Issues',
    'nav.admin': 'Admin Panel',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    'search': 'Search',
    
    // Hero
    'hero.title': 'En Croissant',
    'hero.subtitle': 'The Ultimate Chess Toolkit',
    'hero.description': 'An open-source, cross-platform chess GUI that aims to be powerful, customizable and easy to use.',
    'hero.download': 'Download',
    'hero.github': 'View on Github',
    
    // Features
    'feature.analysis.title': 'Game Analysis',
    'feature.analysis.desc': 'Get a detailed analysis report of your games, including a graph of the evaluation over time, a heatmap of the board and a list of the best moves.',
    'feature.database.title': 'Personal database',
    'feature.database.desc': 'Do you play both in Lichess and Chess.com? With En Croissant, you can easily import your games from both platforms and keep them up to date in a single place.',
    'feature.download.title': 'Download manager',
    'feature.download.desc': 'En Croissant comes with a built-in download manager that allows you to get the latest engines and databases with a single click.',
    
    // Showcase
    'showcase.caption': "En Croissant's analysis screen",
    
    // Support
    'support.title': 'Support the Project',
    'support.subtitle': 'If you find En Croissant useful, you can support its development',
    'support.coffee': 'Buy me a coffee',
    'support.paypal': 'Donate via PayPal',
    
    // Download
    'download.title': 'Download En Croissant',
    'download.subtitle': 'Choose your platform',
    'download.windows': 'Windows',
    'download.mac': 'macOS',
    'download.linux': 'Linux',
    'download.latest': 'Latest version',
    'download.windows-desc': 'Download the installer for Windows 10 or later.',
    'download.mac-desc': 'Download the DMG for macOS 10.15 or later.',
    'download.linux-desc': 'Download the AppImage or .deb for Linux distributions.',
    'download.download-for': 'Download for',
    'download.all-releases': 'View all releases on',
    
    // Docs
    'docs.title': 'Documentation',
    'docs.getting-started': 'Getting Started',
    'docs.assets': 'Assets',
    'docs.databases': 'Databases',
    'docs.engines': 'Engines',
    'docs.guides': 'Guides',
    'docs.analyze-game': 'Analyze Game',
    'docs.manage-repertoire': 'Manage Repertoire',
    'docs.configure-engines': 'Configure Engines',
    'docs.reference': 'Reference',
    'docs.database-format': 'Database Format',
    'docs.on-this-page': 'On this page',
    'docs.prev-page': 'Previous page',
    'docs.next-page': 'Next page',
    'docs.what-is': 'What is En Croissant?',
    'docs.features': 'Features',
    'docs.feature-1': 'Store and analyze your games from',
    'docs.feature-2': 'Multi-engine analysis. Supports all UCI engines',
    'docs.feature-3': 'Prepare a repertoire with the opening explorer',
    'docs.feature-4': 'Simple engine and database installation and management',
    'docs.and': 'and',
    'docs.databases-desc': 'En Croissant comes with a selection of databases to download with a single click. Here\'s a list of the databases currently available:',
    'docs.games': 'Games',
    'docs.players': 'Players',
    'docs.download': 'Download',
    'docs.engines-desc': 'En Croissant supports all UCI-compatible chess engines. Here are some popular options:',
    'docs.stockfish-desc': 'The strongest open-source chess engine in the world.',
    'docs.lc0-desc': 'A neural network-based chess engine inspired by AlphaZero.',
    'docs.komodo-desc': 'A powerful chess engine known for its positional play.',
    'docs.analyze-intro': 'Learn how to analyze your chess games using En Croissant\'s powerful analysis tools.',
    'docs.importing-games': 'Importing Games',
    'docs.importing-games-desc': 'You can import games from PGN files or sync your games directly from Lichess and Chess.com.',
    'docs.running-analysis': 'Running Analysis',
    'docs.running-analysis-desc': 'Select a game and click the analyze button to start engine analysis. You can choose multiple engines for comparison.',
    'docs.repertoire-intro': 'Build and manage your opening repertoire with En Croissant\'s built-in tools.',
    'docs.creating-repertoire': 'Creating a Repertoire',
    'docs.creating-repertoire-desc': 'Go to the Repertoire tab and create a new repertoire. You can start from scratch or import from existing games.',
    'docs.opening-explorer': 'Opening Explorer',
    'docs.opening-explorer-desc': 'Use the opening explorer to see how moves are played at the master level. This helps you make informed decisions when building your repertoire.',
    'docs.configure-intro': 'Learn how to install and configure chess engines in En Croissant.',
    'docs.installing-engines': 'Installing Engines',
    'docs.installing-engines-desc': 'Use the built-in download manager to install popular engines like Stockfish. You can also manually add any UCI-compatible engine.',
    'docs.engine-settings': 'Engine Settings',
    'docs.hash-size': 'Configure hash table size',
    'docs.cpu-threads': 'Set number of CPU threads',
    'docs.analysis-depth': 'Adjust analysis depth and time limits',
    'docs.syzygy': 'Enable Syzygy tablebases',
    'docs.format-intro': 'En Croissant uses a custom database format optimized for chess games.',
    'docs.supported-formats': 'Supported Formats',
    'docs.pgn-desc': 'Standard chess notation format',
    'docs.ecdb-desc': 'En Croissant\'s native database format',
    'docs.import-games-desc': 'You can import games from PGN files or directly from your Lichess and Chess.com accounts.',
    
    // Issues
    'issues.title': 'Issues',
    'issues.subtitle': 'Submit your issues and suggestions',
    'issues.new': 'New Ticket',
    'issues.my-tickets': 'My Tickets',
    'issues.all-tickets': 'All Tickets',
    'issues.type': 'Type',
    'issues.type.bug': 'Bug',
    'issues.type.feature': 'Feature Request',
    'issues.type.question': 'Question',
    'issues.priority': 'Priority',
    'issues.priority.low': 'Low',
    'issues.priority.medium': 'Medium',
    'issues.priority.high': 'High',
    'issues.status': 'Status',
    'issues.status.open': 'Open',
    'issues.status.in-progress': 'In Progress',
    'issues.status.resolved': 'Resolved',
    'issues.status.closed': 'Closed',
    'issues.title-label': 'Title',
    'issues.description': 'Description',
    'issues.attachments': 'Attachments',
    'issues.upload': 'Upload File',
    'issues.submit': 'Submit Ticket',
    'issues.comment': 'Comment',
    'issues.add-comment': 'Add Comment',
    'issues.login-required': 'You must be logged in to submit a ticket',
    'issues.no-tickets': 'No tickets found',
    'issues.created-at': 'Created at',
    
    // Auth
    'auth.login': 'Login',
    'auth.signup': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirm-password': 'Confirm Password',
    'auth.name': 'Name',
    'auth.google': 'Continue with Google',
    'auth.no-account': "Don't have an account?",
    'auth.have-account': 'Already have an account?',
    'auth.forgot-password': 'Forgot password?',
    'auth.reset-password': 'Reset Password',
    'auth.logout': 'Logout',
    
    // Admin
    'admin.title': 'Admin Panel',
    'admin.dashboard': 'Dashboard',
    'admin.tickets': 'Tickets',
    'admin.users': 'Users',
    'admin.stats': 'Statistics',
    'admin.total-tickets': 'Total Tickets',
    'admin.open-tickets': 'Open Tickets',
    'admin.resolved-tickets': 'Resolved Tickets',
    'admin.total-users': 'Total Users',
    'admin.reply': 'Reply',
    'admin.change-status': 'Change Status',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.back': 'Back',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('fa');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'fa' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
