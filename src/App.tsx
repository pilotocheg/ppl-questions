import { Route, Routes } from "react-router-dom";

import { QuestionsPage } from "./components/questions-page";
import questions from "./resources/questions.json";
import { MainPage } from "components/main-page";

const titlesMap: Record<keyof typeof questions, string> = {
  general: "Prawo Lotnicze",
  plane: "Ogólna wiedza o statku powietrznym",
  planning: "Osiągi i planowanie lotu",
  human: "Człowiek - możliwości i ograniczenia",
  meteorology: "Meteorologia",
  navigation: "Nawigacja",
  operational: "Procedure operacyjne",
  flight: "Zasady lotu",
  communication: "Łączność",
};

const pagesList = Object.entries(titlesMap) as [
  keyof typeof questions,
  string
][];

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage pages={pagesList} />} />
      {pagesList.map(([topic, title]) => (
        <Route
          key={topic}
          path={topic}
          element={
            <QuestionsPage
              title={title}
              questions={questions[topic as keyof typeof questions]}
            />
          }
        />
      ))}
    </Routes>
  );
}

export default App;
