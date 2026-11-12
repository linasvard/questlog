import QuestlogLogo from '../assets/icons/QuestlogLogo';

const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-20rem)] flex flex-col justify-center items-center">
      <h1 className="sr-only">Questlog</h1>
      <p className="text-pink text-center max-w-110 mb-6 text-sm md:text-xl font-pixel">
        Track and log your games.
      </p>
      <QuestlogLogo className="h-auto w-100 md:w-110 stroke-dark stroke-3" />
    </section>
  );
};

export default HeroSection;
