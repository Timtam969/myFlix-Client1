import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export const MovieView = ({ movies, user, renderMovies }) => {
  const [movie, setMovie] = useState(null)

  const { movieId } = useParams()

  const keypressCallback = (event) => {
    console.log(event.key);
  }

  useEffect(() => {
    document.addEventListener('keypress', keypressCallback);

    () => {
      document.removeEventListener('keypress', keypressCallback);
    }
  }, [])

  useEffect(() => {
    setMovie(movies.find((m) => m._id === movieId))
  }, [movies])


  const addFavorite = () => {
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    console.log(movie);
    console.log(token);

    axios
      .post(
        `https://melsflix.herokuapp.com/users/${username}/movies/${movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response.data);
        alert(`${movie.Title} has beeen added to your favorites.`);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const removeFavorite = () => {
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    axios
      .delete(`https://melsflix.herokuapp.com/users/${username}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        alert(`${movie.Title} has been removed from your favorites.`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(movies)
  if (!!movie) {
    return (
      <Container fluid className="movieViewContainer">
        <Row>
          <Col>
            <div className="movie-poster">
              <img crossOrigin="anonymous" src={movie.ImagePath} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-director-name">
              <span className="label">Director: </span>
              <span className="value">{movie.Director.Name}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="movie-gernre-name">
              <span className="label">Genre: </span>
              <span className="value">{movie.Genre.Name}</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
            <Button
              className="ml-2 my-2"
              onClick={() => {
                addFavorite();
              }}
            >
              Add to Favorites
            </Button>
            <Button
              className="ml-2"
              onClick={() => {
                removeFavorite();
              }}
            >
              Remove from Favorites
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
  <div className="main-view" />


}

MovieView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string,
  }).isRequired)
};
