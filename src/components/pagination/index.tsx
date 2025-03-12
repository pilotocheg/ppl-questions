import { ChangeEvent, memo, useRef, useState } from "react";

import styles from "./styles.module.scss";

type Props = {
  page: number;
  maxPage: number;
  onPageChange: (page: number) => void;
};

export const Pagination = memo((props: Props) => {
  const { page: actualPage, onPageChange, maxPage } = props;

  const [page, setPage] = useState(actualPage);

  const timeout = useRef<number | undefined>(undefined);

  const handlePageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPage(Number(e.target.value));

    clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      onPageChange(page);
    }, 500);
  };

  const handleBtnClick = (newPage: number) => {
    setPage(newPage);
    onPageChange(newPage);
  };

  return (
    <div className={styles.pagination}>
      <p>
        Strona {page} z {maxPage}
      </p>
      <div className={styles.sliderContainer}>
        <button
          disabled={page === 1}
          className={styles.arrowBtn}
          onClick={() => handleBtnClick(page - 1)}
        >
          <span>←</span>
        </button>
        <input
          type="range"
          min={1}
          value={page}
          className={styles.slider}
          max={maxPage}
          onChange={handlePageChange}
        />
        <button
          disabled={page === maxPage}
          className={styles.arrowBtn}
          onClick={() => handleBtnClick(page + 1)}
        >
          <span>→</span>
        </button>
      </div>
    </div>
  );
});
