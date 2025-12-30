import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'fa' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations: Record<Language, Record<string, string>> = {
  fa: {
    // Header
    'nav.support': 'حمایت',
    'nav.docs': 'مستندات',
    'nav.download': 'دانلود',
    'nav.issues': 'گزارش مشکلات',
    'nav.admin': 'پنل مدیریت',
    'nav.login': 'ورود',
    'nav.logout': 'خروج',
    'search': 'جستجو',
    
    // Hero
    'hero.title': 'آن کروآسان',
    'hero.subtitle': 'جعبه‌ابزار نهایی شطرنج',
    'hero.description': 'یک رابط کاربری شطرنج متن‌باز و چندپلتفرمی که هدفش قدرتمند، قابل تنظیم و آسان برای استفاده بودن است.',
    'hero.download': 'دانلود',
    'hero.github': 'مشاهده در گیت‌هاب',
    
    // Features
    'feature.analysis.title': 'تحلیل بازی',
    'feature.analysis.desc': 'گزارش تحلیل دقیق از بازی‌هایتان دریافت کنید، شامل نمودار ارزیابی در طول زمان، نقشه حرارتی صفحه و لیست بهترین حرکات.',
    'feature.database.title': 'پایگاه داده شخصی',
    'feature.database.desc': 'هم در Lichess و هم در Chess.com بازی می‌کنید؟ با آن کروآسان، می‌توانید به راحتی بازی‌هایتان را از هر دو پلتفرم وارد کرده و در یک مکان نگهداری کنید.',
    'feature.download.title': 'مدیر دانلود',
    'feature.download.desc': 'آن کروآسان دارای مدیر دانلود داخلی است که به شما امکان می‌دهد آخرین موتورها و پایگاه داده‌ها را با یک کلیک دریافت کنید.',
    
    // Showcase
    'showcase.caption': 'صفحه تحلیل آن کروآسان',
    
    // Support
    'support.title': 'حمایت از پروژه',
    'support.subtitle': 'اگر آن کروآسان را مفید می‌دانید، می‌توانید توسعه آن را حمایت کنید',
    'support.coffee': 'یک قهوه برایم بخر',
    'support.paypal': 'کمک از طریق پی‌پال',
    
    // Download
    'download.title': 'دانلود آن کروآسان',
    'download.subtitle': 'پلتفرم خود را انتخاب کنید',
    'download.windows': 'ویندوز',
    'download.mac': 'مک',
    'download.linux': 'لینوکس',
    'download.latest': 'آخرین نسخه',
    
    // Docs
    'docs.title': 'مستندات',
    'docs.getting-started': 'شروع کار',
    'docs.databases': 'پایگاه داده‌ها',
    'docs.engines': 'موتورها',
    'docs.guides': 'راهنماها',
    'docs.analyze-game': 'تحلیل بازی',
    'docs.manage-repertoire': 'مدیریت رپرتوار',
    'docs.configure-engines': 'پیکربندی موتورها',
    'docs.reference': 'مرجع',
    'docs.database-format': 'فرمت پایگاه داده',
    
    // Issues
    'issues.title': 'گزارش مشکلات',
    'issues.subtitle': 'مشکلات و پیشنهادات خود را ارسال کنید',
    'issues.new': 'تیکت جدید',
    'issues.my-tickets': 'تیکت‌های من',
    'issues.all-tickets': 'همه تیکت‌ها',
    'issues.type': 'نوع',
    'issues.type.bug': 'باگ',
    'issues.type.feature': 'پیشنهاد',
    'issues.type.question': 'سوال',
    'issues.priority': 'اولویت',
    'issues.priority.low': 'کم',
    'issues.priority.medium': 'متوسط',
    'issues.priority.high': 'بالا',
    'issues.status': 'وضعیت',
    'issues.status.open': 'باز',
    'issues.status.in-progress': 'در حال بررسی',
    'issues.status.resolved': 'حل شده',
    'issues.status.closed': 'بسته شده',
    'issues.title-label': 'عنوان',
    'issues.description': 'توضیحات',
    'issues.attachments': 'فایل‌های پیوست',
    'issues.upload': 'آپلود فایل',
    'issues.submit': 'ارسال تیکت',
    'issues.comment': 'کامنت',
    'issues.add-comment': 'افزودن کامنت',
    'issues.login-required': 'برای ارسال تیکت باید وارد شوید',
    'issues.no-tickets': 'هیچ تیکتی وجود ندارد',
    'issues.created-at': 'تاریخ ایجاد',
    
    // Auth
    'auth.login': 'ورود',
    'auth.signup': 'ثبت‌نام',
    'auth.email': 'ایمیل',
    'auth.password': 'رمز عبور',
    'auth.confirm-password': 'تکرار رمز عبور',
    'auth.name': 'نام',
    'auth.google': 'ورود با گوگل',
    'auth.no-account': 'حساب ندارید؟',
    'auth.have-account': 'حساب دارید؟',
    'auth.forgot-password': 'رمز عبور را فراموش کردید؟',
    'auth.reset-password': 'بازنشانی رمز عبور',
    'auth.logout': 'خروج',
    
    // Admin
    'admin.title': 'پنل مدیریت',
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
    'admin.not-authorized': 'شما دسترسی مدیریت ندارید',
    
    // Common
    'common.loading': 'در حال بارگذاری...',
    'common.error': 'خطا',
    'common.success': 'موفق',
    'common.cancel': 'انصراف',
    'common.save': 'ذخیره',
    'common.delete': 'حذف',
    'common.edit': 'ویرایش',
    'common.view': 'مشاهده',
    'common.back': 'بازگشت',
    'common.send': 'ارسال',
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
    
    // Docs
    'docs.title': 'Documentation',
    'docs.getting-started': 'Getting Started',
    'docs.databases': 'Databases',
    'docs.engines': 'Engines',
    'docs.guides': 'Guides',
    'docs.analyze-game': 'Analyze Game',
    'docs.manage-repertoire': 'Manage Repertoire',
    'docs.configure-engines': 'Configure Engines',
    'docs.reference': 'Reference',
    'docs.database-format': 'Database Format',
    
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
    'admin.not-authorized': 'You are not authorized to access admin panel',
    
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
    'common.send': 'Send',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'fa';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === 'fa' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
