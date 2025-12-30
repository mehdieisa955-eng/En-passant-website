interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

const FeatureCard = ({ emoji, title, description }: FeatureCardProps) => {
  return (
    <div className="feature-card">
      <div className="text-3xl mb-4 bg-secondary rounded-lg w-12 h-12 flex items-center justify-center">
        {emoji}
      </div>
      <h3 className="text-foreground font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
