const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.static(path.join(__dirname, '.storybook/build')))
app.get('*', (request, response, next) => {
    if (request.url == '/storybook') return next()
    return response.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.get('/storybook', (request, response) => {
    return response.sendFile(path.join(__dirname, '.storybook/build', 'index.html'))
})

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))