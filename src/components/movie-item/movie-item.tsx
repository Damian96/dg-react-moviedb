import React, {useEffect, useId, useRef, useState} from 'react';
import {MovieItemWrapper} from './movie-item.styled';
import {Movie} from "../../types/movie";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import {faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from "react-redux";
import {selectIsFavorite} from "../../redux/selectors/favorites";
import configurestore, {RootState} from "../../redux/configurestore";
import {addFavorite, removeFavorite} from "../../redux/reducers/favorites";
import lottie, {AnimationItem} from 'lottie-web';

export interface MovieItemProps {
  movie: Movie
}

function MovieItem(props: MovieItemProps) {
  let {movie} = props;

  const isFavorite = useSelector((state: RootState) => {
    return selectIsFavorite(state, movie);
  });

  const lottieContainerID = useId();
  const lottieRef =
    useRef<HTMLDivElement>(document.getElementById(lottieContainerID) as HTMLDivElement);
  const lottieInstance = useRef<AnimationItem | null>(null);
  const [showLottie, setShowLottie] = useState(isFavorite)
  const [playLottie, setPlayLottie] = useState(false)

  useEffect(() => {
    if (!showLottie && !isFavorite) return;

    lottieInstance.current = lottie.loadAnimation({
      container: document.getElementById(lottieContainerID)! as Element,
      renderer: 'svg',
      loop: false,
      autoplay: playLottie,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
        progressiveLoad: true
      },
      animationData: require('../../assets/animations/add-favorite.json')
    });

    if (isFavorite && !playLottie) {
      lottieInstance.current?.addEventListener('DOMLoaded', () => {
        lottieInstance.current?.goToAndStop(80, true);
      })
    }

    // Return clean up function here
    return () => lottieInstance ? lottieInstance.current?.destroy() : void (0);
  }, [playLottie, isFavorite, showLottie, lottieInstance, lottieContainerID]);

  const handleToggleFavorite = () => {
    setShowLottie(!isFavorite)
    setPlayLottie(true)
    configurestore.dispatch(isFavorite ? removeFavorite(movie) : addFavorite(movie))
  };

  return (
    <MovieItemWrapper>
      <div className="item position-relative" title={movie.title}>
        <img src={process.env.REACT_APP_TMDB_POSTERS_500 + movie.poster_path} alt={movie.title}
             className="img-fluid"/>
        <div className="item-actions">
          {!showLottie ? <FontAwesomeIcon icon={isFavorite ? fasHeart : faHeart} size="2x"
                                          onClick={handleToggleFavorite}></FontAwesomeIcon> :
            <div ref={lottieRef} id={lottieContainerID} className="lottie-container w-50"
                 onClick={handleToggleFavorite}></div>}
        </div>
      </div>
    </MovieItemWrapper>
  );
}

export default MovieItem;
