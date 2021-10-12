const bcrypt = require('bcrypt')

const data = [
    {
        "id": 0,
        "username": "test1",
        "password": "0000"
    },
    {
        "id": 1,
        "username": "test2",
        "password": "0001"
    }
]

console.log(data)

data.map(u => {
    const pwcrypt = bcrypt.hash(u.password, 10).then(result => console.log(u.username, result))
})