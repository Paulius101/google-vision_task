const _data = require('../../data')

async function homePageHandler(data) {
    const HTML = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vision</title>
</head>

<body>
    <form>
        <label for="picture_analyser">Picture analyser</label>
        <input id="picture_analyser" type="url">
    </form>
</body>

</html>`

    return { HTML }
}

module.exports = homePageHandler;