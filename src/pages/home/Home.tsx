import { useNavigate } from "react-router";
import Header from "../../shared/components/Header";
import { useAuth } from "../../shared/hooks/useAuth";
import firstSectionImage from "../../assets/firstsection.png";
import {
  GatekeeperIcon,
  VisibilityIcon,
  FormattingIcon,
} from "../../icons/ImportanceCardIcons";

const steps = [
  {
    number: "First",
    title: "Choose a template",
    description:
      "Start with an ATS-friendly or professional layout that fits your style.",
  },
  {
    number: "Second",
    title: "Fill in your details",
    description:
      "Add your experience, education, skills, and summary in a guided flow.",
  },
  {
    number: "Third",
    title: "Download and share",
    description:
      "Preview your resume, make adjustments, and export a polished final CV.",
  },
];

const atsCards = [
  {
    title: "HR Digital Assistant",
    description:
      "An Applicant Tracking System (ATS) is a software application used by recruiters and employers to manage the hiring process and organize large volumes of job applications efficiently.",
    accent: "from-[#ff9f1a] to-[#ffb84d]",
  },
  {
    title: "The Automated Scanner",
    description:
      "It acts as a digital filter that reads, parses, and extracts raw text from your resume. The system automatically categorizes your information into sections like work experience, education, and skills.",
    accent: "from-[#2951A3] to-[#6f8fe0]",
  },
  {
    title: "The Keyword Matcher",
    description:
      "The system scores and ranks your resume based on how well your extracted data matches the specific keywords, skills, and qualifications outlined in the employer's job description.",
    accent: "from-[#ff9f1a] to-[#ffcc66]",
  },
];

const importanceCards = [
  {
    title: "Passing the First Gatekeeper",
    description:
      "Over 90% of large companies use an ATS. If your CV is not ATS-friendly, it might be automatically rejected and discarded before a human recruiter ever gets the chance to read it.",
    icon: GatekeeperIcon,
  },
  {
    title: "Maximizing Your Visibility",
    description:
      "A well-structured ATS CV ensures that your most important qualifications and achievements are accurately read by the system, significantly increasing your chances of getting shortlisted for an interview.",
    icon: VisibilityIcon,
  },
  {
    title: "Preventing Formatting Errors",
    description:
      "Complex designs, graphics, tables, or unusual fonts can confuse the system. Using an ATS-optimized format guarantees your data is extracted flawlessly without losing critical information during the parsing process.",
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

  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <Header />

      <main>
        <section className="bg-gradient-to-b from-white via-[#fbfcff] to-[#eef3ff]">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:px-8 lg:py-20">
            <div className="flex-1 pt-2 lg:pt-0">
              <div className="max-w-xl">
                <h1 className="text-4xl font-normal leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
                  Build your
                  <br />
                  own <span className="font-bold">ATS Resume</span>
                  <br />
                  <span className="font-bold text-[#2951A3]">
                    In one click.
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
                        Loading...
                      </span>
                    ) : (
                      "Create Now!"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleLearnAboutIt}
                    className="rounded-2xl border-2 border-[#2951A3] bg-white px-6 py-3 text-sm font-semibold text-[#2951A3] transition hover:bg-[#2951A3] hover:text-white"
                  >
                    Learn about it
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-1 justify-center lg:justify-end">
              <div className="relative w-full max-w-[620px]">
                <img
                  src={firstSectionImage}
                  alt="Resume builder preview"
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
                What is ATS?
              </p>
            </div>

            <div className="mt-8 space-y-5">
              {atsCards.map((card, index) => (
                <div
                  key={card.title}
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
                        {card.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                        {card.description}
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
                Why ATS Important for Curriculum Vitae?
              </p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                Write a CV that gets seen, read, and shortlisted.
              </h2>
            </div>

            <div className="mt-8 space-y-5">
              {importanceCards.map((card) => (
                <div
                  key={card.title}
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
                        {card.title}
                      </h3>
                      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                        {card.description}
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
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                Few steps to a finished resume.
              </h2>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#2951A3] text-sm font-bold text-white">
                      0{index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#2951A3]">
                        {step.number}
                      </p>
                      <h3 className="text-xl font-bold text-slate-900">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">
                    {step.description}
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
