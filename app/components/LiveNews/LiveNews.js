import styles from '@/app/components/LiveNews/LiveNews.module.css';

const LiveNews = () => {
  return (
    <div className={styles.liveNews}>
      <div className={styles.liveNewsHeader}>
        <h2 className={styles.liveTitle}>En Vivo</h2>
      </div>
      <div className={styles.liveNewsBody}>
        <iframe
          src="https://www.facebook.com/plugins/video.php?height=314&amp;href=https%3A%2F%2Fwww.facebook.com%2Fvivalanoticia%2Fvideos%2F490423167170881%2F&amp;show_text=false&amp;width=560&amp;t=0"
          width="560"
          height="190"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Live News Video"
        />
      </div>
    </div>
  );
};

export default LiveNews;