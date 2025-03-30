import { useMemo } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  const shuffledAnswers = useMemo(() => {
    const shuffled = [...answers];
    shuffled.sort(() => Math.random() - 0.5);
    return shuffled;
  }, [answers]);

  return (
    <ul id="answers">
      {shuffledAnswers.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";

        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          answerState === "correct" ||
          (answerState === "wrong" && isSelected)
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={!!answerState}
            >
              {answerState === "correct" && isSelected && (
                <span className="icon">✔️</span>
              )}
              {answerState === "wrong" && isSelected && (
                <span className="icon">❌</span>
              )}
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
