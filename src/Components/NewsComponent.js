import React, { Component } from 'react'
import { Grid, Typography } from '@mui/material'
import '../App.css';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
// import { styles } from '../constants';
// import { NewsApiUrl } from '../constants'

export class NewsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      pageSize: 6,
      loading: false,
      category: props.category,
      totalResults: 0,

    }
  }

  async componentDidMount() {
    const NewsApiUrl = `https://newsapi.org/v2/top-headlines?country=in&category=${this.state.category}&apiKey=09388c6af07b48dca5922e5b19b5e6c9&page=${this.state.page}&pageSize=${this.state.pageSize}`
    // const NewsApiUrl = `https://newsapi.org/v2/everything?q=keyword&apiKey=09388c6af07b48dca5922e5b19b5e6c9&page=1`
    this.setState({ loading: true })
    // let data = await fetch(NewsApiUrl)
    await fetch(NewsApiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          articles: data.articles,
          loading: false,
          totalResults:data.totalResults
        })
      })
      .catch((error) => { alert(error + ' Something went wrong') })
  }

  fetchMoreData = async () => {
    const NewsApiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=09388c6af07b48dca5922e5b19b5e6c9&page=${this.state.page + 1}&pageSize=${this.state.pageSize}`
    // const NewsApiUrl = `https://newsapi.org/v2/everything?q=keyword&apiKey=09388c6af07b48dca5922e5b19b5e6c9&page=1`
    let data = await fetch(NewsApiUrl);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      page: this.state.page + 1,
    })
    console.log(this.state.articles.length);
    console.log(NewsApiUrl);
  }

  render() {
    return (
      <>
        <Typography sx={{ marginTop: 4, marginBottom: 2, fontSize: 30 }}>
          Top Headlines {this.props.category === 'general' ? " " : ` - ${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}`}
        </Typography>
        {this.state.loading && <Spinner />}

        {/* <InfiniteScroll
          dataLength={this.state.NewsApi.length}
          next={this.fetchMoreData}
          hasMore={this.state.NewsApi.length !== this.state.totalResults}
          loader={<Spinner />}> */}
          <InfiniteScroll
          dataLength={this.state.articles?.length}
          next={this.fetchMoreData}
          hasMore={(this.state.articles?.length === this.state.totalResults)?false:true}
          loader={<Spinner />}
        >
          <Grid container>
            {this.state.articles?.map((elem, index) => {
              return (
                <NewsItem
                  className="NewsItem"
                  Count={index}
                  sources={elem.source.name}
                  Title={elem.title}
                  Image={elem.urlToImage ? elem.urlToImage : "https://assets.entrepreneur.com/content/3x2/2000/1634059137-shutterstock-1906238173.jpg"}
                  Time={elem.publishedAt}
                  Desc={elem.description}
                  Content={elem.content}
                  Url={elem.url} />
              )
            })
            }
          </Grid>
        </InfiniteScroll>
        {/* <Grid container sx={{ justifyContent: 'space-between', padding: 4 }}>
          <Button className="mdc-button" variant="outlined" disabled={this.state.page <= 1} onClick={this.PrevPageClickhandler}>&larr; Previous
          </Button>
          <Typography className="md" h6>Currently on Page : {this.state.page}</Typography>
          <Button className="mdc-button" disabled={this.state.isDisable} variant="outlined" onClick={this.NextPageClickhandler}>Next &rarr;
          </Button>
        </Grid> */}
      </>
    )
  }
}


export default NewsComponent
