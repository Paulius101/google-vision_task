const _data = require('../../data');
const helpers = require('../../helpers');

const handlers = {}

handlers.users = (data, callback) => {
    const acceptableMethods = ['get', 'post', 'put', 'delete'];

    if (acceptableMethods.includes(data.httpMethod)) {
        return handlers._users[data.httpMethod](data, callback);
    }

    return callback(405, { error: 'Nepriimtinas uzklausos metodas' })
}

handlers._vision = {}

handlers._vision.get = async (data, callback) => {
    // gaunam user info
    const email = data.queryStringObject.get('email');

    if (email === '') {
        return callback(400, {
            error: 'Nenurodytas email parametras',
        })
    }

    const content = await _data.read('users', email);
    if (content === '') {
        return callback(400, {
            error: 'Nurodytas vartotojas nerastas',
        })
    }

    const contentObj = helpers.parseJsonToObject(content);


    return callback(200, {
        success: contentObj,
    })
}

handlers._vision.post = async (data, callback) => {
    // irasom user info
    const { username, email, password } = data.payload;


    const userObject = {
        username,
        email,
        hashedPassword,
        registerDate: Date.now(),
    }

    const res = await _data.create('users', email, userObject);

    if (res !== true) {
        return callback(400, {
            error: 'Nepavyko sukurti vartotojo',
        })
    }

    return callback(200, {
        success: 'Vartotojas sukurtas',
    })
}



handlers._vision.delete = async (data, callback) => {
    // istrinam user info
    const email = data.queryStringObject.get('email');

    if (email === '') {
        return callback(400, {
            error: 'Nenurodytas email parametras',
        })
    }

    const res = await _data.delete('users', email);
    if (res) {
        return callback(200, {
            success: 'Nurodytas vartotojas istrintas',
        })
    } else {
        return callback(400, {
            error: 'Ivyko klaida bandant istrinti vartotoja',
        })
    }
}

module.exports = handlers;