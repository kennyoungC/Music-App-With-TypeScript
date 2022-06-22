import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"
import { TrackDetail } from "./HomePage"

const DetailsPage = () => {
  const { musicId } = useParams()

  const [details, setDetails] = useState<TrackDetail | null>(null)

  useEffect(() => {
    fetchMusicDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const fetchMusicDetails = async () => {
    try {
      const response = await fetch(
        "https://striveschool-api.herokuapp.com/api/deezer/track/" + musicId
      )
      if (!response.ok) {
        throw new Error("Something went wrong")
      }
      const musicData = await response.json()
      setDetails(musicData)
    } catch (error) {
      console.log(error)
    }
  }

  return details ? (
    <Container>
      <Row>
        <Col xs={10}>
          <img className="img-fluid" alt="/" src={details.album.cover_big} />
          <h4>{details.title}</h4>
          <h6>{details.artist.name}</h6>
        </Col>
      </Row>
    </Container>
  ) : null
}
export default DetailsPage
