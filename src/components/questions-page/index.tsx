import { NavLink } from "react-router-dom";
import { Helmet } from "react-helmet";
import { memo, useCallback, useState } from "react";
import { Question } from "types";

import { QuestionsBlock } from "components/questions-block";
import { Pagination } from "components/pagination";

import styles from "./styles.module.scss";

type Props = {
  title: string;
  questions: Question[];
};

const PAGE_SIZE = 5;

export const QuestionsPage = memo((props: Props) => {
  const { title, questions } = props;

  const [page, setPage] = useState(() => {
    const storedPage = localStorage.getItem(`${title}_page`);
    return Number(storedPage) || 1;
  });

  const handlePageChange = useCallback(
    (page: number) => {
      setPage(page);
      localStorage.setItem(`${title}_page`, String(page));
    },
    [title]
  );

  const maxPage = Math.ceil(questions.length / PAGE_SIZE);
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
      <ul>
        {questions.slice(sliceStart, sliceStart + PAGE_SIZE).map((question) => (
          <QuestionsBlock key={question.name} {...question} />
        ))}
      </ul>
      <Pagination
        page={page}
        maxPage={maxPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
});
