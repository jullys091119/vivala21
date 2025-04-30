'use client';
import React, { useState, useEffect, useCallback } from 'react'; // Importa useCallback para evitar problemas de dependencia
import Image from 'next/image'; // Importa Image de Next.js
import styles from '@/app/components/commentsBox/commentsBox.module.css';

const CommentBox = ({ postId, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [sortOrder, setSortOrder] = useState('oldest');
  const isAuthenticated = user?.isAuthenticated || false;
  const userAvatar = user?.avatar || 'https://via.placeholder.com/50';

  // Usa useCallback para evitar que la función se recree en cada renderizado
  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`/api/comments?post=${postId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }, [postId]); // Asegúrate de agregar postId como dependencia

  useEffect(() => {
    fetchComments();
  }, [fetchComments]); // Agrega fetchComments como dependencia

  const submitComment = async () => {
    if (!newComment.trim()) {
      alert('El comentario no puede estar vacío.');
      return;
    }

    try {
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, content: newComment }),
      });

      if (!response.ok) throw new Error('Failed to submit comment');

      const newCommentResponse = await response.json();
      setComments([...comments, newCommentResponse]);
      setNewComment('');
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const sortComments = () => {
    setComments([...comments].sort((a, b) =>
      sortOrder === 'newest'
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={styles.commentSection}>
      <h3>Deja un Comentario</h3>
      <div className={styles.commentsStats}>
        <div className={styles.commentsCount}>
          <p>{comments.length} Comentario{comments.length !== 1 && 's'}</p>
        </div>
        <div className={styles.sortComments}>
          <label htmlFor="sort">Ordenar por:</label>
          <select id="sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="oldest">Los más antiguos</option>
            <option value="newest">Los más recientes</option>
          </select>
        </div>
      </div>

      <div className={styles.commentBox}>
        <Image src={userAvatar} alt="User Avatar" className={styles.userAvatar} width={50} height={50} /> {/* Usamos Image aquí */}
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escribe tu comentario aquí..."
          className={`${styles.commentInput} ${!isAuthenticated && styles.disabled}`}
          disabled={!isAuthenticated}
        />
      </div>

      <div className={styles.buttonContainer}>
        <button
          onClick={submitComment}
          className={`${styles.submitButton} ${!isAuthenticated && styles.disabled}`}
          disabled={!isAuthenticated}
        >
          {isAuthenticated ? 'Enviar' : 'Inicia sesión para comentar'}
        </button>
      </div>

      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles.commentItem}>
            <div className={styles.commentHeader}>
              <div className={styles.authorInfo}>
                <Image
                  src={comment.author_avatar_urls['48']}
                  alt={comment.author_name}
                  className={styles.authorAvatar}
                  width={48}
                  height={48}
                />
                <span className={styles.authorName}>{comment.author_name}</span>
              </div>
              <span className={styles.commentDate}>{formatDate(comment.date)}</span>
            </div>
            <div className={styles.commentContent} dangerouslySetInnerHTML={{ __html: comment.content.rendered }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentBox;
