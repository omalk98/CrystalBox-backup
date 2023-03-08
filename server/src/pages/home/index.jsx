import React, { useEffect, useState, useRef } from 'react';
import { Alert, Button } from 'react-bootstrap';

import Requests from '../../requests';
import Icons from '../../resources/icons';
import { Loader, setTitle } from '../../components/common';

import './home.css';

function Article({ title, text }) {
  const [isLong] = useState(text?.length > 250);
  const [isExpanded, setIsExpanded] = useState(false);
  const paragraph = useRef();
  return (
    <article className="home-section">
      <h4 className="home-title">{title}</h4>
      <div
        className="home-text-container"
        style={{
          height: isExpanded ? `${paragraph.current?.clientHeight}px` : '200px'
        }}
      >
        <p
          ref={paragraph}
          className="home-text"
        >
          {text}
        </p>
      </div>
      {isLong && (
        <>
          {!isExpanded && <div className="home-text-hider" />}
          <Button
            variant={`outline-${isExpanded ? 'danger' : 'primary'}`}
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            {isExpanded ? 'Read Less...' : 'Read More...'}
          </Button>
        </>
      )}
    </article>
  );
}

export default function Home() {
  setTitle('');
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const getArticles = async () => {
      try {
        if (articles.length) return;
        const res = await Requests.Public.Get.homeArticles(controller.signal);
        if (res.status !== 200) throw new Error("Couldn't get home data");
        setArticles(res.data);
      } catch {
        setArticles([]);
      }
    };

    getArticles();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="home-page">
      <div className="home-page-brand">
        <Icons.Logo className="logo-icon" />
        <h1 className="home-page-title"> CrystalBox </h1>
      </div>

      <Alert variant="success">
        Your fully automated door system with Security and Monitoring
      </Alert>

      <div className="home-content">
        <section className="home-sections">
          {articles?.length ? (
            articles.map((item, index) => (
              <Article
                key={index}
                {...item}
              />
            ))
          ) : (
            <div className="home-article-loader">
              {Loader('', 'success', 'border')}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
