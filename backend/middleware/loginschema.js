const z=require("zod")

function loginmiddleware(req,res,next){

    const loginschema=z.object({
        email:z.string().email(),
        password:z.string().min(6)
    })

    const response=loginschema.safeParse(req.body)

    if(response.success){
        next()
    }
    else{
        res.status(411).json(" validation failed")
    }
}
module.exports={loginmiddleware}