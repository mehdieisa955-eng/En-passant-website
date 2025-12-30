import { useLanguage } from '@/contexts/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'fa' ? 'en' : 'fa')}
      className="px-3 py-1.5 bg-secondary rounded-md text-sm font-medium text-foreground hover:bg-secondary/80 transition-colors"
    >
      {language === 'fa' ? 'EN' : 'فا'}
    </button>
  );
};

export default LanguageSwitcher;
