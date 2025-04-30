"use client";
import { useState, useEffect } from "react";
import styles from "@/app/components/TabNews/TabNews.module.css";

const tabs = [
  { id: "latest", title: "Últimas noticias" },
  { id: "popular", title: "Populares" },
  { id: "comments", title: "Comentarios" },
];

const TabNews = () => {
  const [currentTab, setCurrentTab] = useState("latest");
  const [posts, setPosts] = useState([]);
  const [latestComments, setLatestComments] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!apiUrl) {
          console.error("Error: La variable de entorno API URL es undefined");
          return;
        }

        if (currentTab === "comments") {
          const response = await fetch(`${apiUrl}wp/v2/comments?per_page=3&order=desc&orderby=date&status=approve`);
          const data = await response.json();
          setLatestComments(data);
        } else {
          const response = await fetch(`${apiUrl}wp/v2/posts?_embed&per_page=10`);
          const data = await response.json();
          setPosts(data);
        }
      } catch (error) {
        console.error(`Error fetching ${currentTab === "comments" ? "comments" : "posts"}:`, error);
      }
    };

    fetchData();
  }, [currentTab]);

  return (
    <div className={styles.tabNews}>
      <div className={styles.tabNewsHeader}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`${styles.tab} ${currentTab === tab.id ? styles.active : ""}`}
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>

      {currentTab !== "comments" ? (
        <div className={styles.tabNewsBodyWrapper}>
          {posts.slice(0, 3).map((post) => (
            <div key={post.id} className={styles.tabNewsBody}>
              <div className={styles.tabNewsItem}>
                <div className={styles.comments}>
                  <img
                    src={post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "/images/placeholder.jpg"}
                    alt={post.title.rendered}
                  />
                  <p className={styles.newsDescription}>{post.title.rendered}</p>
                </div>
                <a href={`/noticias/${post.id}`} className={styles.leerMasLink}>
                  Leer más
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.commentsList}>
          {latestComments.map((comment) => (
            <div key={comment.id} className={styles.commentItem}>
              <p>
                {comment.author_name}: {comment.content.rendered}
              </p>
              <a href={`/noticias/${comment.post}`} className={styles.leerMasLink}>
                Ver comentario
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TabNews;
