"use client";

import Link from "next/link";
import styles from "@/app/components/SimpleCard/SimpleCard.module.css";
import PropTypes from "prop-types";

const SimpleCard = ({ title, id, excerpt, color, category, date, author }) => {
  return (
    <div className={styles.simpleCard}>
      <div className={styles.simpleCardHeader}>
        <div className={styles.categoryTag} style={{ color }}>
          {category === "policiaca"
            ? "POLICÍACA"
            : category === "espectaculo"
              ? "ESPECTÁCULOS"
              : category.toUpperCase()}
        </div>
        <Link href={`/noticias/${id}`} className={styles.simpleCardTitle}>
          <h2>{title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}</h2>
        </Link>
      </div>

      {date && <p>{date}</p>}
      {author && <p>{author}</p>}
    </div>
  );
};

// ✅ Definiendo los tipos de props
SimpleCard.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  excerpt: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string,
  author: PropTypes.string,
};

export default SimpleCard;
