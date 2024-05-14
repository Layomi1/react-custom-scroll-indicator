import { useEffect, useState } from "react";

import styles from "./ScrollIndicator.module.css";

const ScrollIndicator = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    async function fetchData(getUrl) {
      try {
        setLoading(true);
        const response = await fetch(getUrl);
        const data = await response.json();
        if (data && data.products && data.products.length > 0) {
          setData(data.products);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
        setErrorMessage(err.message);
      }
    }
    fetchData(url);
  }, [url]);

  function handleScrollPercentage() {
    const amountOfScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    setScrollPercentage((amountOfScroll / height) * 100);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScrollPercentage);
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  if (errorMessage) {
    return <div>Error! {errorMessage}</div>;
  }

  if (loading) {
    return <div>Loading data! Please wait.</div>;
  }

  return (
    <div className={styles["scroll-indicator"]}>
      <div className={styles["top-container"]}>
        <h1>Custom Scroll Indicator </h1>
        <div className={styles["scroll-progress-container"]}>
          <div
            className={styles["current-progress-bar"]}
            style={{ width: `${scrollPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className={styles["data-container"]}>
        {data && data.length > 0
          ? data.map((dataItem) => <p key={dataItem.id}>{dataItem.title}</p>)
          : null}
      </div>
    </div>
  );
};

export default ScrollIndicator;
