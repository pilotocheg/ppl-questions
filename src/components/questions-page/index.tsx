import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { memo, useCallback, useEffect, useState } from "react";
import { Question } from "types";

import { QuestionsBlock } from "components/questions-block";
import { Pagination } from "components/pagination";

import styles from "./styles.module.scss";

type Props = {
  title: string;
  questions: Question[];
  addToFavorites: (question: Question) => void;
  removeFromFavorites: (question: Question) => void;
  favorites: Question[];
};

const PAGE_SIZE = 5;

export const QuestionsPage = memo((props: Props) => {
  const { title, questions, favorites, addToFavorites, removeFromFavorites } =
    props;

  const maxPage = Math.ceil(questions.length / PAGE_SIZE);

  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem(`${title}_page`);
    const initialPage = Number(storedPage) || 1;

    return Math.min(initialPage, maxPage);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page);
      localStorage.setItem(`${title}_page`, String(page));
    },
    [title]
  );

  const sliceStart = (page - 1) * PAGE_SIZE;

  return (
    <div className={styles.page}>
      <Helmet>
        <title>PPL(A) | {title}</title>
      </Helmet>
      <nav className={styles.nav}>
        <NavLink className={styles.link} to="/">
          Rozdziały
        </NavLink>
        {" / "}
        <span className={styles.linkDisabled}>{title}</span>
      </nav>
      {questions.length ? (
        <>
          <ul>
            {questions
              .slice(sliceStart, sliceStart + PAGE_SIZE)
              .map((question) => (
                <QuestionsBlock
                  key={question.name}
                  question={question}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                  isFavorite={favorites.some((q) => q.name === question.name)}
                />
              ))}
          </ul>
          <Pagination
            page={page}
            maxPage={maxPage}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <div className={styles.empty}>
          <p>Brak pytań w tej kategorii</p>
        </div>
      )}
    </div>
  );
});
