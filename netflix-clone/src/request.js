
const requests = {
    fetchTrending: `http://localhost:9292/trendings`,
    fetchNetflixOriginals: `http://localhost:9292/netflix_originals`,
    fetchTopRated: `http://localhost:9292/top_rateds`,
   fetchComedyMovies: `http://localhost:9292/comedies`,

}

const categoryComments = {
    netflixOriginalComments: "/netflix_original_comments",
    trendingComments: "/trending_comments",

}
export { requests, categoryComments }