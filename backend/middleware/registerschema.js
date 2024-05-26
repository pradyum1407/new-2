const z=require("zod")

function registermiddleware(req,res,next){

    const registerschema=z.object({
        username:z.string(),
        email:z.string().email(),
        password:z.string().min(6)
    })

    const response=registerschema.safeParse(req.body)

    if(response.success){
        next()
    }
    else{
        res.status(411).json(" validation failed")
    }
}
module.exports={registermiddleware}