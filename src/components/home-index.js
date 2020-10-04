import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class Index extends Component{
    constructor(props) {
        super(props);
        this.state = {
            portfolioredirect: "/portfolio",
            blogredirect: "/blogs",
            bulletJournalredirect: '/bullet-journal'
        }
    }
    render() {
        return (
            <div className="index-section">
                <header>
                    <h1>Lauren's Routes</h1>
                </header>
                <div className="index-flex">
                    <Link to= {this.state.portfolioredirect}>
                        <section className="portfolio">
                            <h1> Portfolio</h1>
                        </section>
                    </Link>
                    <Link to= {this.state.blogredirect}>
                        <section className="blog">
                            <h1> Blog</h1>
                        </section>
                    </Link>
                    <Link to={this.state.bulletJournalredirect}>
                        <section className="bullet-journal">
                            <h1> Bullet Journal</h1>
                        </section>
                    </Link>
                </div>
            </div>
        );
    }
}