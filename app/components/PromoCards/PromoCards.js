import { useState, useEffect } from 'react';
import styles from '@/app/components/PromoCards/PromoCards.module.css';
import PromoCard from '@/app/components/PromoCard/PromoCard';

const PromoCards = () => {
  const [cards, setCards] = useState([]);
  const [cardsWithMedia, setCardsWithMedia] = useState([]);

  const sortedCards = [...cardsWithMedia].sort((a, b) => a.id - b.id);

  const fetchMediaUrl = async (mediaId) => {
    try {
      const response = await fetch(`URL_DE_API/wp/v2/media/${mediaId}`);
      const media = await response.json();
      return media.source_url;
    } catch (error) {
      console.error('Error fetching media:', error);
      return '';
    }
  };

  const fetchCards = async () => {
    try {
      const response = await fetch(`URL_DE_API/wp/v2/promo-card?per_page=8&orderby=id&order=asc`);
      const data = await response.json();
      setCards(data);

      const cardsWithUrls = await Promise.all(
        data.map(async (card) => ({
          ...card,
          imageUrl: await fetchMediaUrl(card.acf.imagen),
        }))
      );
      setCardsWithMedia(cardsWithUrls);
    } catch (error) {
      console.error('Error fetching promo cards:', error);
    }
  };

  useEffect(() => {
    fetchCards();
    const interval = setInterval(() => {
      fetchCards();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.promoCards}>
      {sortedCards.map((card) => (
        <PromoCard key={card.id} title={card.title.rendered} image={card.imageUrl} link={card.acf.promobanner_link} />
      ))}
    </div>
  );
};

export default PromoCards;
