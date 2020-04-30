# Contact

## mail

almartin@student.42.fr

# Code

## Stack & BackEnd

A simple Dashboard using
[Webpack](https://webpack.js.org/) and [Babel](https://babeljs.io/)
[React](https://reactjs.org/), 
[Redux](https://redux.js.org/)
[Redux-Saga](https://redux-saga.js.org/)
[EmotionJS](https://emotion.sh/docs/introduction)
[MaterialUi](https://material-ui.com/)
[ApexCharts](https://apexcharts.com/) and [FusionCharts](https://www.fusioncharts.com/fusiontime/examples)
[Eslint](https://eslint.org/) and [Prettier](https://prettier.io/)
[StoryBook](https://storybook.js.org/)
[Jest](https://jestjs.io/) and [React-testing-library](https://testing-library.com/)

the project uses [Concurrently](https://github.com/kimmobrunfeldt/concurrently) to run client and server at the same time

### BackEnd mock

Your provided back-end is includes in the project, it has been modify in order to fix CORS problem with Chrome. (```frontend-test-backend/mock-backend/``` , line 136)

```javascript
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
  next()
})
```

## More

all informations in order to run the project can be found in the [README.md](https://github.com/alice42/Dashboard/blob/master/README.md)


### Charts

There two charts librairies included.
The default view uses ApexCharts, each chart has its own time-serie: 
the toolbar on the top right allows to select, reset the selection, zoom and more.
When the magnifying glass icon is active, simply select your date range on the chart, hold and slide to change time range.
Click the house icon to reset the selection.

The alternative view uses FusionCharts, the time-serie is mutual to all charts as in the provided exemple,
a date picker is available on the top right

### Typescript

I had never use Typescript, so I thought it was not a very good idea to get started with it for this test
but I'm really want to get into it! 

### Test && Stories

I not comfortable at all with Jest and React-Testing-Library (...or with testing :/ ) but I tried some tests, it's really not relevant
I have absolutly no experience with Puppeteer
I ran out of time, being currently on multiple project, so there no stories. 
