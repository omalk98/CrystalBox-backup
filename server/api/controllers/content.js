import fs from 'fs';

const articles = JSON.parse(
  fs.readFileSync('./data/home-articles.json', 'utf8')
);

const footer = JSON.parse(
  fs.readFileSync('./data/creator-contact.json', 'utf8')
);

const homeController = (req, res) => {
  res.status(200).json(articles);
};

const footerController = (req, res) => {
  res.status(200).json(footer);
};

export { homeController, footerController };
