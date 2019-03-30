import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Divider, Tag } from "antd";
import DocumentTitle from "react-document-title";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getTags, getArticles } from "../../actions/articleAction";
const monthsInEng = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const arrayInYear = array => {
  const result = [];
  let year = "";
  let month = "";
  for (let i = 0; i < array.length; i++) {
    let date = new Date(array[i].create_time);
    let dataYear = date.getFullYear();
    let dataMonth = date.getMonth();
    if (year !== dataYear) {
      year = dataYear;
      month = dataMonth;
      let yearTemp = { year: year, data: [{ month: month, articles: [] }] };
      yearTemp.data[0].articles.push(array[i]);
      result.push(yearTemp);
    } else if (month !== dataMonth) {
      month = dataMonth;
      let monthTemp = { month: month, articles: [array[i]] };
      result[result.length - 1].data.push(monthTemp);
    } else {
      let dataLength = result[result.length - 1].data.length;
      result[result.length - 1].data[dataLength - 1].articles.push(array[i]);
    }
  }
  return result;
};
class Sitemap extends Component {
  componentDidMount() {
    this.props.getTags();
    this.props.getArticles("");
  }
  //   style={{ width: "500px", position: "relative", left: "40px" }}
  render() {
    const { tags, articles } = this.props.article;
    const articleArray = arrayInYear(articles);
    return (
      <DocumentTitle title="sitemap | 银弹">
        <div className="sitemap">
          <Divider orientation="left">标签</Divider>
          <div style={{ width: "350px", position: "relative", left: "80px" }}>
            {tags.map((value, index) => (
              //   <Tag key={index} style={{ marginTop: "10px" }}>
              <span
                style={{
                  margin: "0.3rem",
                  textAlign: "-webkit-match-parent",
                  fontSize: "1rem"
                }}
                key={value._id}
              >
                <Link style={{ padding: ".4rem" }} to={`/tag/${value._id}`}>
                  {value.name} <span> ({value.articleCount})</span>
                </Link>
              </span>
              //   {/* </Tag> */}
            ))}
          </div>
          <Divider orientation="left">文章</Divider>
          <div className="sitemap-article-list">
            {articleArray.map((year, index) => (
              <div className="year-list" key={index}>
                <p className="year-name">{year.year}</p>
                {year.data.map((month, index) => (
                  <ul className="month-list" key={index}>
                    <p className="month-name">{monthsInEng[month.month]}</p>
                    {month.articles.map((article, index) => (
                      <li className="sitemap-list" key={index}>
                        <article>
                          <time>{article.create_time.slice(5, 10)}</time>
                          <Link
                            // style={{ color: "black", textDecoration: "underline" }}
                            to={`/article/${article.id}`}
                          >
                            {article.title}
                          </Link>
                        </article>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            ))}
            {/* {articles.length !== 0
              ? articles.map((value, index) => {
                  let tempDate = new Date(value.create_time);
                  let articleLi = (
                    <div style={{ position: "relative", left: "80px" }}>
                      <p
                        style={{
                          display: "inline-block",
                          width: "80px",
                          textAlign: "left"
                        }}
                      >
                        {tempDate.toLocaleDateString()}
                      </p>
                      <Link
                        style={{ color: "black", textDecoration: "underline" }}
                        to={`/article/${value._id}`}
                      >
                        {value.title}
                      </Link>
                    </div>
                  );
                  if (tempDate.getFullYear() !== year) {
                    year = tempDate.getFullYear();
                    month = tempDate.getMonth();
                    return (
                      <div key={index}>
                        <div style={{ fontSize: "25px", fontWeight: "800" }}>
                          {tempDate.getFullYear() + "年"}
                        </div>
                        <div
                          style={{
                            fontSize: "20px",
                            fontWeight: "600",
                            position: "relative",
                            left: "40px"
                          }}
                        >
                          {monthsInEng[month]}
                        </div>
                        {articleLi}
                      </div>
                    );
                  } else {
                    if (tempDate.getMonth() !== month) {
                      month = tempDate.getMonth();
                      return (
                        <div key={index}>
                          <div
                            style={{
                              fontSize: "20px",
                              fontWeight: "600",
                              position: "relative",
                              left: "40px"
                            }}
                          >
                            {monthsInEng[month]}
                          </div>
                          {articleLi}
                        </div>
                      );
                    } else {
                      return  articleLi ;
                    }
                  }
                })
              : null} */}
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

Sitemap.propTypes = {
  article: PropTypes.object.isRequired,
  getTags: PropTypes.func.isRequired,
  getArticles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  article: state.article
});

export default connect(
  mapStateToProps,
  { getTags, getArticles }
)(withRouter(Sitemap));
