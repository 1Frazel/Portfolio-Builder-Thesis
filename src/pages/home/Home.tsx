import { useNavigate } from "react-router";
import Header from "../../shared/components/Header";
import { useAuth } from "../../shared/hooks/useAuth";
import firstSectionImage from "../../assets/firstsection.png";
import {
  GatekeeperIcon,
  VisibilityIcon,
  FormattingIcon,
} from "../../icons/ImportanceCardIcons";
import { useTranslation } from "react-i18next";

const steps = [
  {
    numberKey: "steps.first.number",
    titleKey: "steps.first.title",
    descriptionKey: "steps.first.description",
  },
  {
    numberKey: "steps.second.number",
    titleKey: "steps.second.title",
    descriptionKey: "steps.second.description",
  },
  {
    numberKey: "steps.third.number",
    titleKey: "steps.third.title",
    descriptionKey: "steps.third.description",
  },
];

const atsCards = [
  {
    titleKey: "atsCards.digitalAssistant.title",
    descriptionKey: "atsCards.digitalAssistant.description",
    accent: "from-[#ff9f1a] to-[#ffb84d]",
  },
  {
    titleKey: "atsCards.automatedScanner.title",
    descriptionKey: "atsCards.automatedScanner.description",
    accent: "from-[#2951A3] to-[#6f8fe0]",
  },
  {
    titleKey: "atsCards.keywordMatcher.title",
    descriptionKey: "atsCards.keywordMatcher.description",
    accent: "from-[#ff9f1a] to-[#ffcc66]",
  },
];

const importanceCards = [
  {
    titleKey: "importanceCards.gatekeeper.title",
    descriptionKey: "importanceCards.gatekeeper.description",
    icon: GatekeeperIcon,
  },
  {
    titleKey: "importanceCards.visibility.title",
    descriptionKey: "importanceCards.visibility.description",
    icon: VisibilityIcon,
  },
  {
    titleKey: "importanceCards.formatting.title",
    descriptionKey: "importanceCards.formatting.description",
    icon: FormattingIcon,
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { user, handleLogin, loading } = useAuth();

  const handleCreateNow = async () => {
    if (loading) {
      return;
    }

    if (!user) {
      await handleLogin();
      return;
    }

    navigate("/creation");
  };

  const handleLearnAboutIt = () => {
    const section = document.getElementById("what-ats");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const { t } = useTranslation("homepage");
  const { t: tCommon } = useTranslation("common");

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <Header />

      <main>
        <section className="bg-gradient-to-b from-white via-[#fbfcff] to-[#eef3ff]">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-20">
            <div className="flex-1 pt-2 lg:pt-0">
              <div className="max-w-xl">
                <h1 className="text-4xl font-normal leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
                  {t('hero.sentence1')}
                  <br />
                  {t('hero.sentence2')} <span className="font-bold">{t('hero.sentence2Highlight')}</span>
                  <br />
                  <span className="font-bold text-[#2951A3]">
                    {t('hero.sentence3')}
                  </span>
                </h1>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleCreateNow}
                    disabled={loading}
                    className="rounded-2xl bg-[#2951A3] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f3f82] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          />
                        </svg>
                        {tCommon("loading")}
                      </span>
                    ) : (
                      t('hero.button1')
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleLearnAboutIt}
                    className="rounded-2xl border-2 border-[#2951A3] bg-white px-6 py-3 text-sm font-semibold text-[#2951A3] transition hover:bg-[#2951A3] hover:text-white"
                  >
                    {t('hero.button2')}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-1 justify-center lg:justify-end">
              <div className="relative w-full max-w-[620px]">
                <img
                  src={firstSectionImage}
                  alt={t("hero.imageAlt")}
                  className="h-auto w-full object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="what-ats"
          className="bg-gradient-to-b from-[#eef3ff] via-[#9cb2e8] to-[#2951A3] py-14 text-slate-900 sm:py-16 lg:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2951A3]">
                {t("atsSection.label")}
              </p>
            </div>

            <div className="mt-8 space-y-5">
              {atsCards.map((card, index) => (
                <div
                  key={card.titleKey}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
                >
                  <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[180px_1fr] md:items-center md:p-8">
                    <div className="flex justify-center md:justify-start">
                      <div
                        className={`flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-br ${card.accent} shadow-md`}
                      >
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/90 text-[#2951A3]">
                          <span className="text-3xl font-bold">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {t(card.titleKey)}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                        {t(card.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-[#2951A3] via-[#6d8fd6] to-[#eef3ff] py-14 text-white sm:py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                {t("importanceSection.label")}
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                {t("importanceSection.title")}
              </h2>
            </div>

            <div className="mt-8 space-y-5">
              {importanceCards.map((card) => (
                <div
                  key={card.titleKey}
                  className="rounded-2xl bg-white p-6 text-slate-900 shadow-lg"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-[180px_1fr] md:items-center md:p-2">
                    <div className="flex justify-center md:justify-start">
                      <div className="flex h-30 w-30 items-center justify-center">
                        <card.icon />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {t(card.titleKey)}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                        {t(card.descriptionKey)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-[#eef3ff] via-white to-[#eef3ff]">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#2951A3]">
                {t("stepsSection.label")}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                {t("stepsSection.title")}
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.numberKey}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2951A3] text-sm font-bold text-white">
                      0{index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2951A3]">
                        {t(step.numberKey)}
                      </p>
                      <h3 className="text-xl font-bold text-slate-900">
                        {t(step.titleKey)}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {t(step.descriptionKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
