import QuestlogLogo from '../assets/icons/QuestlogLogo';

const HeroSection = () => {
  return (
    <section className="min-h-[calc(100vh-20rem)] sm:min-h-[calc(100vh-20rem)] md:min-h-[calc(100vh-18rem)] flex flex-col justify-center items-center">
      <div className="md:mt-[-5%] sm:mt-[-10%] mt-[-10%] flex flex-col items-center gap-6">
        <h1 className="sr-only">Questlog</h1>
        <p className="text-pink text-center max-w-110 text-md md:text-xl font-pixel">
          Track and log your games.
        </p>
        <QuestlogLogo className="h-auto max-w-90 sm:max-w-200 md:max-w-130 stroke-dark stroke-2" />
      </div>
    </section>
  );
};

export default HeroSection;
