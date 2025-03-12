import { memo, useMemo, useState } from "react";
import classNames from "classnames";

import { Question } from "types";
import { shuffle } from "utils";

import styles from "./styles.module.scss";

type Props = Question;

export const QuestionsBlock = memo((props: Props) => {
  const { name, text, q1, q2, q3, q4 } = props;

  const [selected, setSelected] = useState<string>("");

  const correctQuestion = q1;

  const questions = useMemo(() => shuffle([q1, q2, q3, q4]), [q1, q2, q3, q4]);

  return (
    <li className={styles.container} key={name}>
      <p className={styles.questionName}>{name}</p>
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
