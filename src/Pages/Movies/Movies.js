import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Genres from '../../components/Genres'
import CustomPagination from '../../components/Pagination/CustomPagination'
import SingleContent from '../../components/SingleConent/SingleContent'
import useGenres from '../../hooks/useGenres'

const Movies = () => {

  const [content, setContent] = useState([])
  const [page, setPage] = useState(1)
  const [numOfPages, setNumOfPages] = useState(1)
  const [selectGeneres, setSelectGeneres] = useState([])
  const [genres, setGenres] = useState([])
  const genreforURL = useGenres(selectGeneres)

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    );
    setContent(data.results)
    setNumOfPages(data.total_pages)
  }
  useEffect(() => {
    fetchMovies()
  }, [page, genreforURL])

  return (
    <>
      <span className='pageTitle'>Movies</span>
      <Genres
        type='movie'
        selectGeneres={selectGeneres}
        setSelectGeneres={setSelectGeneres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
      <div className="trending">
        {
          content && content.map((c) => {
            return <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.release_date || c.first_air_date}
              media_type='Movie'
              vote_average={c.vote_average}
            />
          })
        }
        {numOfPages > 1 && (
          <CustomPagination setPage={setPage} numOfPages={numOfPages} />
        )}
    </div>
    </>
  )
}
export default Movies
