const saltRounds = 10;
const registerHandler = (req, res, db, bcrypt, ) => {

    const {name, email, password} = req.body
    if (!name || !email || !password){
        return res.status(400).json("Wrong register submittion!")
    }
    // Hashing
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                db.transaction(trx => {
                    trx.insert({
                        hash: hash,
                        email: email
                    })
                    .into("login")
                    .returning("email")
                    .then(LoginEmail =>{
                        trx('users')
                        .returning("*")
                        .insert(
                            {
                            email: LoginEmail[0],
                            name: name,
                            joined: new Date()
                            }
                        )
                        .then(user => { res.status(200).json(user[0]) })
                        .then(trx.commit)
                        .catch(trx.rollback)
                    })
                }).catch(err => res.status(400).json("Unable to register"))
            });
        });
    }

module.exports = {
    registerHandler: registerHandler
}