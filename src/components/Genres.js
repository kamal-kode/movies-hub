import axios from 'axios'
import React, { useEffect } from 'react'
import Chip from '@mui/material/Chip';

const Genres = ({
    type,
    selectGeneres,
    setSelectGeneres,
    genres,
    setGenres,
    setPage
}) => {
    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        setGenres(data.genres)
    }
    useEffect(() => {
        fetchGenres()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleAdd = (genre) => {
        setSelectGeneres([...selectGeneres, genre])
        setGenres(genres.filter((g) => g.id !== genre.id))
        setPage(1)
    }
    const handleRemove = (genre) => {
        setSelectGeneres(
            selectGeneres.filter((selected) => selected.id !== genre.id)
        )
        setGenres([...genres, genre])
        setPage(1)
    }
    return (
        <div style={{ padding: '6px 0' }}>
            {
                selectGeneres && selectGeneres.map((genre) =>
                    <Chip
                        label={genre.name}
                        style={{ margin: 2 }}
                        clickable
                        size="small"
                        key={genre.id}
                        onDelete={() => handleRemove(genre)}
                    />
                )}
            {
                genres && genres.map((genre) =>
                    <Chip
                        label={genre.name}
                        style={{ margin: 2 }}
                        clickable
                        size="small"
                        key={genre.id}
                        onClick={() => handleAdd(genre)}
                    />
                )}
        </div>
    )
}
export default Genres