import { memo } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import styles from "./styles.module.scss";

type Props = {
  pages: [string, string][];
};

export const MainPage = memo((props: Props) => {
  const { pages } = props;

  return (
    <div className={styles.page}>
      <Helmet>
        <title>PPL(A)</title>
      </Helmet>
      <h1 className={styles.title}>PPL(A) - Rozdzialy:</h1>
      <ul className={styles.list}>
        {pages.map(([path, title]) => (
          <li className={styles.listItem} key={path}>
            <Link className={styles.listItemLink} to={path}>
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
});
