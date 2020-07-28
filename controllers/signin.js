const signinHandler = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password){
        return res.status(400).json("Wrong register submittion!")
    }
    db("login")
    .select("email", "hash")
    .where({email})
    .then(async data =>{
        const isValidPassword = bcrypt.compareSync(password, data[0].hash);
        if (isValidPassword && data.length ){
            const user = await db.select("*").from("users").where({ email });
            return res.json(user[0]);
        } else {
            res.status(400).json("Wrong password " + email + "!")
        }
    })
    .catch(err => res.status(400).json("Wrong credentials!"))
}

module.exports = {
    signinHandler: signinHandler
}