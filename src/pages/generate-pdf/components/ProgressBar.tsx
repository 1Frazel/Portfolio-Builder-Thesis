interface ProgressStep {
  id: string;
  title: string;
}

const CheckmarkIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.3991 8.89321C23.2338 7.70232 21.3451 7.70232 20.1797 8.89321L9.73021 19.6481L7.09343 16.9593C5.92808 15.7757 4.03858 15.7757 2.87401 16.9593C1.70866 18.1503 1.70866 20.0791 2.87401 21.2627L7.62087 26.1068C8.78627 27.2977 10.6749 27.2977 11.8402 26.1068L24.4991 13.1966C25.6645 12.0057 25.6645 10.0768 24.3991 8.89321Z"
      fill="white"
    />
  </svg>
);

const ProgressBar = ({
  steps,
  currentStepIndex,
  onStepClick,
}: {
  steps: ProgressStep[];
  currentStepIndex: number;
  onStepClick?: (stepIndex: number) => void;
}) => {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-4">
      <div className="flex items-center justify-center gap-0 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-0 flex-shrink-0">
            {/* Step box */}
            <button
              onClick={() => onStepClick?.(index)}
              className={`relative flex h-[42px] w-[42px] items-center justify-center rounded-[10px] transition-all duration-200 flex-shrink-0 ${
                index < currentStepIndex
                  ? "bg-[#2951A3] hover:bg-blue-700"
                  : index === currentStepIndex
                    ? "bg-[#2951A3]"
                    : "bg-[#889290]"
              }`}
            >
              {index < currentStepIndex ? (
                <CheckmarkIcon />
              ) : (
                <div
                  className={`h-[19px] w-[19px] rounded-[5px] ${
                    index === currentStepIndex ? "bg-white" : "bg-white"
                  }`}
                />
              )}
            </button>

            {/* Connector line - not after last step */}
            {index < steps.length - 1 && (
              <svg
                width="70"
                height="3"
                viewBox="0 0 70 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-shrink-0"
              >
                <path
                  d="M0 1.5H70"
                  stroke={index < currentStepIndex ? "#2951A3" : "#889290"}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="10 5"
                />
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Step titles below */}
      <div className="mt-3 flex items-start justify-center gap-0 overflow-x-auto">
        <div className="flex gap-0 flex-shrink-0">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-center gap-0 flex-shrink-0"
            >
              <div className="text-center w-[42px]">
                <p
                  className={`text-xs font-medium transition-colors duration-200 ${
                    index === currentStepIndex
                      ? "text-[#2951A3]"
                      : index < currentStepIndex
                        ? "text-[#2951A3]"
                        : "text-[#889290]"
                  }`}
                >
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && <div className="w-[70px]" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
