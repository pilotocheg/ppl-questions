import { Route, Routes } from "react-router-dom";

import { QuestionsPage } from "./components/questions-page";
import questions from "./resources/questions.json";
import { MainPage } from "components/main-page";
import { useCallback, useState } from "react";
import { Question } from "types";

const titlesMap: Record<keyof typeof questions | "favorites", string> = {
  general: "Prawo Lotnicze",
  plane: "Ogólna wiedza o statku powietrznym",
  planning: "Osiągi i planowanie lotu",
  human: "Człowiek - możliwości i ograniczenia",
  meteorology: "Meteorologia",
  navigation: "Nawigacja",
  operational: "Procedure operacyjne",
  flight: "Zasady lotu",
  communication: "Łączność",
  favorites: "Ulubione",
};

const pagesList = Object.entries(titlesMap) as [
  keyof typeof questions | "favorites",
  string
][];

function App() {
  const [favorites, setFavorites] = useState<Question[]>(() => {
    const favorites = localStorage.getItem("favorites");
    return favorites ? JSON.parse(favorites) : [];
  });

  const addToFavorites = useCallback((question: Question) => {
    setFavorites((prev) => {
      const newFavorites = [...prev, question].toSorted((a, b) =>
        a.name.localeCompare(b.name)
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  const removeFromFavorites = useCallback((question: Question) => {
    setFavorites((prev) => {
      const newFavorites = prev.filter((q) => q.name !== question.name);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

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
              questions={topic === "favorites" ? favorites : questions[topic]}
              favorites={favorites}
              addToFavorites={addToFavorites}
              removeFromFavorites={removeFromFavorites}
            />
          }
        />
      ))}
    </Routes>
  );
}

export default App;
