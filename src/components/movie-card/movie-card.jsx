import React from 'react';
import { Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container fluid className="movieCardContainer">
        <Row>
          <Col>
            <CardGroup>
              <Card className="movie-card">
                <Card.Img crossOrigin="anonymous" variant="top" src={movie.ImagePath} />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Open</Button>
                  </Link>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string.isRequired,
		ImagePath: PropTypes.string,
	}).isRequired,
};
