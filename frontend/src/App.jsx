
import{Routes,Route} from "react-router-dom"
import { Navbar } from "./component/Navbar"
import { Register} from "./pages/Register"
import { Login} from "./pages/Login"
import { Home} from "./pages/Home"
import "../src/style.scss"

const App = () => {
  return (
<>
<Navbar/>
<Routes> 
<Route path="/login" element={<Login/>}></Route>
<Route path="/register" element={<Register/>}></Route>
<Route path="/" element={<Home/>}></Route>
</Routes>
</>
)
}

export default App