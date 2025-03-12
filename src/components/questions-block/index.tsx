import { memo, useMemo, useState } from "react";
import classNames from "classnames";

import starEmptyIcon from "images/star-empty.svg";
import starFilledIcon from "images/star-filled.svg";

import { Question } from "types";
import { shuffle } from "utils";

import styles from "./styles.module.scss";

type Props = {
  question: Question;
  addToFavorites: (question: Question) => void;
  removeFromFavorites: (question: Question) => void;
  isFavorite: boolean;
};

export const QuestionsBlock = memo((props: Props) => {
  const { question, addToFavorites, removeFromFavorites, isFavorite } = props;
  const { name, text, q1, q2, q3, q4 } = question;

  const [selected, setSelected] = useState<string>("");

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(question);
    } else {
      addToFavorites(question);
    }
  };

  const correctQuestion = q1;

  const questions = useMemo(() => shuffle([q1, q2, q3, q4]), [q1, q2, q3, q4]);

  return (
    <li className={styles.container} key={name}>
      <div className={styles.nameContainer}>
        <p className={styles.questionName}>{name}</p>
        <button onClick={handleFavoriteClick} className={styles.favoriteBtn}>
          <img src={isFavorite ? starFilledIcon : starEmptyIcon} alt="star" />
        </button>
      </div>
      <h2 className={styles.questionTitle}>{text}</h2>
      <ul>
        {questions.map((question) => (
          <li
            dangerouslySetInnerHTML={{ __html: question }}
            onClick={() => setSelected(question)}
            className={classNames(styles.questionItem, {
              [styles.correct]:
                selected === question && question === correctQuestion,
              [styles.incorrect]:
                selected === question && question !== correctQuestion,
            })}
            key={question}
          />
        ))}
      </ul>
    </li>
  );
});
