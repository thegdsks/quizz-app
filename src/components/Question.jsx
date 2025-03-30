import QuestionTimer from "./QuestionTImer.jsx";
import Answers from "./Answers.jsx";
import { useEffect, useState } from "react";
import QUESTIONS from "../question.js";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);

  const currentQuestion = QUESTIONS[index];

  useEffect(() => {
    // 👇 Reset states when moving to next question
    setSelectedAnswer("");
    setIsCorrect(null);
  }, [index]);

  let timer = 10000;
  if (selectedAnswer) timer = 1000;
  if (isCorrect !== null) timer = 2000;

  function handleSelect(answer) {
    setSelectedAnswer(answer);
    const correct = currentQuestion.answers[0] === answer;
    setTimeout(() => {
      setIsCorrect(correct);
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";
  if (selectedAnswer && isCorrect === null) {
    answerState = "answered";
  } else if (selectedAnswer && isCorrect !== null) {
    answerState = isCorrect ? "correct" : "wrong";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{currentQuestion.text}</h2>
      <Answers
        answers={currentQuestion.answers}
        selectedAnswer={selectedAnswer}
        answerState={answerState}
        onSelect={handleSelect}
      />
    </div>
  );
}
