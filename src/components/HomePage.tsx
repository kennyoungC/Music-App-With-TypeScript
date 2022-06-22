import React, { useState } from "react"
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

interface Track {
  id: number
  readable: boolean
  title: string
  title_short: string
  title_version: string
  link: string
  duration: number
  rank: number
  explicit_lyrics: boolean
  explicit_content_lyrics: number
  explicit_content_cover: number
  preview: string
  md5_image: string
  artist: Artist
  album: Album
  type: string
}
export interface TrackDetail extends Track {
  isrc: string
  share: string
  track_position: number
  disk_number: number
  release_date: Date
  bpm: number
  gain: number
  available_countries: string[]
  contributors: Artist[]
}

interface Album {
  id: number
  title: string
  cover: string
  cover_small: string
  cover_medium: string
  cover_big: string
  cover_xl: string
  md5_image: string
  tracklist: string
  type: string
}

interface Artist {
  id: number
  name: string
  link: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  tracklist: string
  type: string
}

const HomePage = () => {
  const [query, setQuery] = useState("")
  const [musicData, setMusicData] = useState<Track[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + query
      )

      if (!response.ok) {
        throw new Error("Network response was not ok.")
      }
      const { data } = await response.json()
      setMusicData(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} className="w-50">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Search for your favourite Artist</Form.Label>
          <Form.Control
            type="search"
            placeholder="Search here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      <Row>
        <Col>
          <Row>
            {musicData.map((track) => (
              <Col xs={10} md={4} key={track.id}>
                <Link to={`details/${track.id}`}>
                  <Card>
                    <Card.Img variant="top" src={track.album.cover_medium} />
                    <Card.Body>
                      <Card.Title>{track.title}</Card.Title>
                      <Card.Text>{track.artist.name}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
export default HomePage
