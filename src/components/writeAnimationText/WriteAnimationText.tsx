import { FC, useEffect, useRef, useState } from "react";
import styles from "./writeAnimationText.module.scss";
type WriteAnimationTextProps = {
  values: string[];
};

const WriteAnimationDynamicText: FC<WriteAnimationTextProps> = ({ values }) => {
  const [stringIdx, setStringIdx] = useState(0);

  const valueIdxRef = useRef(0);
  const directionRef = useRef(1);

  useEffect(() => {
    var interval = Math.random() * 150 + 100;
    const valueIdx = valueIdxRef.current;

    const curStringLen = values[valueIdx].length;

    if (stringIdx == curStringLen - 1) {
      directionRef.current *= -1;
      interval *= 15;
    }

    if (stringIdx == 0) {
      directionRef.current *= -1;
      valueIdxRef.current = (valueIdx + 1) % values.length;
    }

    const nextStringIdx =
      (stringIdx + directionRef.current) % values[valueIdx].length;

    const timer = setTimeout(() => {
      setStringIdx(nextStringIdx);
    }, interval);

    return () => clearInterval(timer);
  }, [values, stringIdx]);
  return <span>{values[valueIdxRef.current].substring(0, stringIdx + 1)}</span>;
};

const WriteAnimationText: FC<WriteAnimationTextProps> = ({ values }) => {
  return (
    <div className={styles.writeAnimationText}>
      <WriteAnimationDynamicText values={values} />
      <span className={styles.writeAnimationTextCaret}>|</span>
    </div>
  );
};

export default WriteAnimationText;
