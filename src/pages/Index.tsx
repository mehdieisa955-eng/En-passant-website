import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import logo from '@/assets/large-logo.webp';
import showcase from '@/assets/showcase.webp';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                <span className="text-primary">En Croissant</span>
              </h1>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                The Ultimate Chess Toolkit
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                An open-source, cross-platform chess GUI that aims to be powerful, customizable and easy to use.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/download"
                  className="px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Download
                </Link>
                <a
                  href="https://github.com/franciscoBSalgueiro/en-croissant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-secondary text-foreground font-medium rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  View on Github
                </a>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src={logo}
                alt="En Croissant Logo"
                className="w-64 h-64 lg:w-80 lg:h-80 object-contain"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              emoji="📈"
              title="Game Analysis"
              description="Get a detailed analysis report of your games, including a graph of the evaluation over time, a heatmap of the board and a list of the best moves."
            />
            <FeatureCard
              emoji="📁"
              title="Personal database"
              description="Do you play both in Lichess and Chess.com? With En Croissant, you can easily import your games from both platforms and keep them up to date in a single place."
            />
            <FeatureCard
              emoji="📥"
              title="Download manager"
              description="En Croissant comes with a built-in download manager that allows you to get the latest engines and databases with a single click."
            />
          </div>
        </section>

        {/* Showcase Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-xl overflow-hidden border border-border">
            <img
              src={showcase}
              alt="En Croissant's analysis screen"
              className="w-full"
            />
          </div>
          <p className="text-center text-muted-foreground mt-4">
            En Croissant's analysis screen
          </p>
        </section>
      </main>
    </div>
  );
};

export default Index;
