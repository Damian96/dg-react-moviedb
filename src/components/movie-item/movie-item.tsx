import { useState } from 'react';
import Lottie from "react-lottie";
import { useSelector } from "react-redux";
import configurestore, { RootState } from "../../redux/configurestore";
import { addFavorite, removeFavorite } from "../../redux/reducers/favorites";
import { selectIsFavorite } from "../../redux/selectors/favorites";
import { Movie } from "../../types/movie";
import { MovieItemWrapper } from './movie-item.styled';

export interface MovieItemProps {
  movie: Movie
}

function MovieItem(props: MovieItemProps) {
  let { movie } = props;

  const isFavorite = useSelector((state: RootState) => {
    return selectIsFavorite(state, movie);
  });

  const [playLottie, setPlayLottie] = useState(false)
  const [lottieDirection, setLottieDirection] = useState(isFavorite ? 1 : -1);

  const lottieOptions = {
    loop: false,
    autoplay: false,
    animationData: require('../../assets/animations/add-favorite.json'),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const onMovieItemLoad = () => {
    if (isFavorite && !playLottie) {
      setPlayLottie(true);
    }
  }

  const handleToggleFavorite = () => {
    setTimeout(() => {
      configurestore.dispatch(isFavorite ? removeFavorite(movie) : addFavorite(movie))
    }, 800);
    setLottieDirection(lottieDirection * -1)
    setPlayLottie(true);
  };

  return (
    <MovieItemWrapper>
      <div className="item position-relative" title={movie.title}>
        <img src={process.env.REACT_APP_TMDB_POSTERS_500 + movie.poster_path} alt={movie.title}
          className="img-fluid" />
        <div className="item-actions row">
          <div onClick={handleToggleFavorite} className="favorite-action cursor-pointer col-6" title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
            <Lottie options={lottieOptions} direction={lottieDirection} isPaused={!playLottie}
              eventListeners={[{
                eventName: 'DOMLoaded',
                callback: onMovieItemLoad
              }]}></Lottie>
          </div>
        </div>
      </div>
    </MovieItemWrapper>
  );
}

export default MovieItem;
