const express = require('express');
const nunjucks = require('nunjucks');

const app = express();

/** Basic configuration */
nunjucks.configure('views', {
  watch: true,
  express: app,
});

app.set('view engine', 'njk');
app.use(express.urlencoded({ extended: false }));

/** Middlewares */
const checkHasAgeParamMiddleware = (req, res, next) => {
  const { age } = req.query;
  if (!age) {
    return res.redirect('/');
  }

  return next();
};

/** Routes */
app.get('/', (req, res) => res.render('index'));

app.post('/check', (req, res) => {
  const { age } = req.body;
  if (age < 18) return res.redirect(`/minor?age=${age}`);
  return res.redirect(`/major?age=${age}`);
});

app.get('/major', checkHasAgeParamMiddleware, (req, res) => res.render('major', { age: req.query.age }));
app.get('/minor', checkHasAgeParamMiddleware, (req, res) => res.render('minor', { age: req.query.age }));

app.listen(3000);
