const movies = require('../db.json')
let globalId = 11;

module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies)
    }, 

    deleteMovie: (req, res) => {
        const { id } = req.params
        const idx = movies.findIndex(movie => movie.id === +id)
        if(idx >= 0){
            movies.splice(idx, 1)
            res.status(200).send(movies)
        } else {
            res.sendStatus(404)
        } 
    }, 

    updateMovie: (req, res) => {
        //destructure id from the route param
        //destructure the type from the body
        //loop through the movies array to find the movie with the id
        //if type is plus increment the movie rating by 1 else decrement rating by 1
        //if rating is alrady 5 do nothing or rating is 1
        //send the movies array back to the frontend
        const { id } = req.params
        const { type } = req.body
        const idx = movies.findIndex(movie => movie.id === +id)
        if(type === 'plus'){
            if(movies[idx].rating < 5) movies[idx].rating++
            res.status(200).send(movies)
        } else {
            if(movies[idx].rating > 1) movies[idx].rating--
            res.status(200).send(movies)
        }
    }, 
    addMovie: (req, res) => {
        //destructure body obj
        //check body to make sure all data exists
        //copy body obj and add new id
        //push copy to movies array
        //send status(200) with updated movies array
        const { title, rating, imageURL } = req.params
        if(!title || !rating || !imageURL){
            res.sendStatus(400)
        }
        const copy = {...req.body, id: globalId}
        movies.push(copy)
        globalId++
        res.status(200).send(movies)
    }
}
