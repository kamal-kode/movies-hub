import {createTheme, ThemeProvider} from '@material-ui/core'
import Pagination from '@mui/material/Pagination';
import React from 'react'

const CustomPagination = ({setPage, numOfPages = 10}) => {

const handlePageChange =(page) =>{
    setPage(page)
    window.scroll(0,0)
}
const darkTheme = createTheme({
    palette: {
        type: 'dark',
        primary:{
          main:'#fff'
        }
    }
})
  return (
    <div style={{
        window:'100%',
        display: 'flex',
        justifyContent: 'center', 
        marginTop:10
    }}>
    <ThemeProvider theme={darkTheme}>
    <Pagination 
    hideNextButton
    hidePrevButton
    color='primary'
    count={numOfPages}
     onChange={(e)=> handlePageChange(e.target.textContent)}/>
    </ThemeProvider>
    </div>
  )
}

export default CustomPagination