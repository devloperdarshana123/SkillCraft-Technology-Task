import React, { useState } from "react";
import "./App.css";

const QUESTIONS = [
  // Astronomy
  {
    section: "Astronomy",
    type: "single",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
  },
  // Math
  {
    section: "Math",
    type: "multiple",
    question: "Select all prime numbers:",
    options: ["2", "3", "4", "5"],
    answer: ["2", "3", "5"],
  },
  // Geography
  {
    section: "Geography",
    type: "fill",
    question: "Fill in the blank: The capital of France is _____.",
    answer: "Paris",
  },
  // Technology
  {
    section: "Technology",
    type: "single",
    question: "Which language runs in a web browser?",
    options: ["Python", "Java", "C++", "JavaScript"],
    answer: "JavaScript",
  },
  // History
  {
    section: "History",
    type: "single",
    question: "Who was the first President of the United States?",
    options: ["Abraham Lincoln", "George Washington", "John Adams", "Thomas Jefferson"],
    answer: "George Washington",
  },
  // Biology
  {
    section: "Biology",
    type: "fill",
    question: "The powerhouse of the cell is the _____.",
    answer: "mitochondria",
  },
  // Nature
  {
    section: "Nature",
    type: "single",
    question: "Which is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    answer: "Blue Whale",
  },
  // Geography
  {
    section: "Geography",
    type: "single",
    question: "Mount Everest is located in which mountain range?",
    options: ["Andes", "Rockies", "Himalayas", "Alps"],
    answer: "Himalayas",
  },
  // Math
  {
    section: "Math",
    type: "fill",
    question: "What is the value of Pi (to 2 decimal places)?",
    answer: "3.14",
  },
  // Science
  {
    section: "Science",
    type: "single",
    question: "What is H2O commonly known as?",
    options: ["Oxygen", "Hydrogen", "Water", "Salt"],
    answer: "Water",
  },
  // Technology
  {
    section: "Technology",
    type: "multiple",
    question: "Which of the following are programming languages?",
    options: ["HTML", "Python", "CSS", "Java"],
    answer: ["Python", "Java"],
  },
  // Sports
  {
    section: "Sports",
    type: "single",
    question: "How many players are there in a football (soccer) team?",
    options: ["9", "10", "11", "12"],
    answer: "11",
  },
  // Literature
  {
    section: "Literature",
    type: "fill",
    question: "Who wrote 'Romeo and Juliet'?",
    answer: "William Shakespeare",
  },
  // History
  {
    section: "History",
    type: "multiple",
    question: "Which of the following were ancient civilizations?",
    options: ["Maya", "Roman", "Viking", "Inca"],
    answer: ["Maya", "Roman", "Inca"],
  },
  // Nature
  {
    section: "Nature",
    type: "single",
    question: "Which tree is known for its acorns?",
    options: ["Maple", "Oak", "Pine", "Birch"],
    answer: "Oak",
  },
  // Science
  {
    section: "Science",
    type: "fill",
    question: "The process by which plants make food using sunlight is called _____.",
    answer: "photosynthesis",
  },
  // Math
  {
    section: "Math",
    type: "single",
    question: "What is 7 x 8?",
    options: ["54", "56", "58", "64"],
    answer: "56",
  },
  // Biology
  {
    section: "Biology",
    type: "multiple",
    question: "Which of the following are reptiles?",
    options: ["Frog", "Snake", "Lizard", "Salamander"],
    answer: ["Snake", "Lizard"],
  },
  // Geography
  {
    section: "Geography",
    type: "single",
    question: "Which continent is the Sahara Desert located in?",
    options: ["Asia", "Africa", "Australia", "Europe"],
    answer: "Africa",
  },
  // Technology
  {
    section: "Technology",
    type: "fill",
    question: "The company that created the iPhone is _____.",
    answer: "Apple",
  },
  // Sports
  {
    section: "Sports",
    type: "multiple",
    question: "Which of the following are Olympic sports?",
    options: ["Swimming", "Chess", "Basketball", "Cricket"],
    answer: ["Swimming", "Basketball"],
  },
  // Literature
  {
    section: "Literature",
    type: "single",
    question: "Who is the author of 'Harry Potter'?",
    options: ["J.R.R. Tolkien", "J.K. Rowling", "C.S. Lewis", "Roald Dahl"],
    answer: "J.K. Rowling",
  },
  // Science
  {
    section: "Science",
    type: "single",
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: "Carbon Dioxide",
  },
  // History
  {
    section: "History",
    type: "fill",
    question: "The Great Wall of China was primarily built to protect against _____.",
    answer: "Mongols",
  },
];

function arraysEqual(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((v) => b.includes(v))
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [input, setInput] = useState("");
  const [showScore, setShowScore] = useState(false);

  const current = QUESTIONS[step];

  function handleOptionChange(e) {
    if (current.type === "single") {
      setSelected([e.target.value]);
    } else if (current.type === "multiple") {
      const val = e.target.value;
      setSelected((prev) =>
        prev.includes(val)
          ? prev.filter((v) => v !== val)
          : [...prev, val]
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    let answer;
    if (current.type === "fill") {
      answer = input.trim();
      setUserAnswers([...userAnswers, answer]);
      setInput("");
    } else {
      answer = selected;
      setUserAnswers([...userAnswers, answer]);
      setSelected([]);
    }
    if (step === QUESTIONS.length - 1) {
      setShowScore(true);
    } else {
      setStep(step + 1);
    }
  }

  function getScore() {
    let score = 0;
    for (let i = 0; i < QUESTIONS.length; i++) {
      const q = QUESTIONS[i];
      const a = userAnswers[i];
      if (q.type === "single" && a[0] === q.answer) score++;
      else if (q.type === "multiple" && arraysEqual(a, q.answer)) score++;
      else if (q.type === "fill" && a.trim().toLowerCase() === q.answer.toLowerCase()) score++;
    }
    return score;
  }

  function restart() {
    setStep(0);
    setUserAnswers([]);
    setSelected([]);
    setInput("");
    setShowScore(false);
  }

  return (
    <div className="quiz-bg">
      <div className="quiz-container">
        <h2>
          <i className="fa-solid fa-question-circle"></i> Quiz Game
        </h2>
        {!showScore ? (
          <form onSubmit={handleSubmit}>
            <div className="quiz-question">
              <span>
                Q{step + 1}. {current.question}
              </span>
            </div>
            <div className="quiz-options">
              {current.type === "single" &&
                current.options.map((opt, i) => (
                  <label key={i} className="quiz-option">
                    <input
                      type="radio"
                      name="option"
                      value={opt}
                      checked={selected[0] === opt}
                      onChange={handleOptionChange}
                      required
                    />
                    {opt}
                  </label>
                ))}
              {current.type === "multiple" &&
                current.options.map((opt, i) => (
                  <label key={i} className="quiz-option">
                    <input
                      type="checkbox"
                      value={opt}
                      checked={selected.includes(opt)}
                      onChange={handleOptionChange}
                    />
                    {opt}
                  </label>
                ))}
              {current.type === "fill" && (
                <input
                  type="text"
                  className="quiz-fill"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your answer"
                  required
                />
              )}
            </div>
            <button className="quiz-btn" type="submit">
              {step === QUESTIONS.length - 1 ? "Finish" : "Next"}
            </button>
          </form>
        ) : (
          <div className="quiz-score">
            <h3>
              <i className="fa fa-star"></i> Your Score: {getScore()} / {QUESTIONS.length}
            </h3>
            <button className="quiz-btn" onClick={restart}>
              Restart Quiz
            </button>
            <div className="quiz-review">
              <h4>Review:</h4>
              <ul>
                {QUESTIONS.map((q, i) => (
                  <li key={i}>
                    <b>Q{i + 1}:</b> {q.question}
                    <br />
                    <span>
                      <b>Your answer:</b>{" "}
                      {q.type === "multiple"
                        ? (userAnswers[i] || []).join(", ")
                        : Array.isArray(userAnswers[i])
                        ? userAnswers[i][0]
                        : userAnswers[i]}
                    </span>
                    <br />
                    <span>
                      <b>Correct:</b>{" "}
                      {q.type === "multiple"
                        ? q.answer.join(", ")
                        : q.answer}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}