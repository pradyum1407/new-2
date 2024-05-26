const bcrypt=require("bcrypt")

function registerhash(password){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
return hash
}

function loginhash(password,hash){
    const compare =bcrypt.compareSync(password, hash);
    return compare
}
module.exports={registerhash,loginhash}