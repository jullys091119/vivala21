import { useState, useMemo } from 'react';
import styles from '@/app/components/Pagination/Pagination.module.css';

const Pagination = ({ totalItems, itemsPerPage = 10, maxVisiblePages = 5, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const showLeftDots = useMemo(() => currentPage > 4, [currentPage]);
  const showRightDots = useMemo(() => currentPage < totalPages - 3, [currentPage]);

  const middlePages = useMemo(() => {
    const pages = [];
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      start = 2;
      end = Math.min(4, totalPages - 1);
    }

    if (currentPage >= totalPages - 2) {
      start = Math.max(totalPages - 3, 2);
      end = totalPages - 1;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage, totalPages]);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      if (onPageChange) onPageChange(page);
    }
  };

  return (
    <div className={styles.pagination}>
      <button className={`${styles.pageNumber} ${currentPage === 1 && styles.disabled}`} onClick={() => changePage(currentPage - 1)}>Anterior</button>
      <button className={`${styles.pageNumber} ${currentPage === 1 && styles.active}`} onClick={() => changePage(1)}>1</button>

      {showLeftDots && <span className={styles.pageDots}>...</span>}

      {middlePages.map(page => (
        <button key={page} className={`${styles.pageNumber} ${currentPage === page && styles.active}`} onClick={() => changePage(page)}>
          {page}
        </button>
      ))}

      {showRightDots && <span className={styles.pageDots}>...</span>}

      {totalPages > 1 && (
        <button className={`${styles.pageNumber} ${currentPage === totalPages && styles.active}`} onClick={() => changePage(totalPages)}>{totalPages}</button>
      )}

      <button className={`${styles.pageNumber} ${currentPage === totalPages && styles.disabled}`} onClick={() => changePage(currentPage + 1)}>Siguiente</button>
    </div>
  );
};

export default Pagination;
