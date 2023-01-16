import { useState, useLayoutEffect, Suspense } from 'react';
import reactLogo from './assets/svg/react.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes as Switch, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { SideBarComp } from "./components/SideBar";
import { Children } from "./components/SideBar/SideBar.Style";
import { setDataFromLocalSave } from './redux/reducers/userSlice';
import RequireAuth from './components/RequireAuth/RequireAuth';
import RequireNoAuth from './components/RequireNoAuth/RequireNoAuth';
import Signup from './pages/Signup';
import MainMenu from './pages/MainMenu';
import SecondMenu from './pages/SecondMenu';
import RegisterEmprendimiento from './pages/RegisterEmprendimiento';
import MbCanvas from './pages/MbCanvas';
import MisEmprendimientos from './pages/MisEmprendimientos';
import EmprendUpdate from './components/Crud/CrudEmprend/EmprendUpdate';
import EmprendList from './components/Crud/CrudEmprend/EmprendList';
import LogOut from './components/LogOut';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import loadable from '@loadable/component';
import AnimatedRoute from './components/Animation/AnimatedRoute';
import ModelCanvasPreguntas from './pages/ModelCanvasPreguntas';
import Cronogramas from './pages/Cronogramas';
import SideBar2 from './components/SideBar2/SideBar2';
import ChkWindowSize from './components/ChkWindowSize';
import { getWindowSize } from './utils/checkWindow';
// import PdfViewer from './pages/PdfViewer';
import ContactForm from './pages/ContactForm';
import AboutUs from './pages/AboutUs';
import VideoModal from './components/VideoPlayer/VideoModal';
// const Home = loadable(() => import('./pages/Home'));
// const Login = loadable(() => import('./pages/Login'));
function App() {  
  // const [auth, setAuth] = useState(false);
  const { auth } = useSelector(state => state.usuarios);
  const [count, setCount] = useState(0);
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [windowSize, setWindowSize] = useState(getWindowSize());
  // const { auth } = useSelector(state => state.usuarios);
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    // console.log("ingreso a useLayoutEffect on App.js")

    if (sessionStorage.getItem('auth')) {

      //console.log("auth detected")
      dispatch(setDataFromLocalSave());
    }
  }, [auth]);
//
//

  return (<>
    <ChkWindowSize setWindowSize={setWindowSize}></ChkWindowSize>
    <Router>
      {!auth ? <NavBar showLogin={false} auth={auth}></NavBar> :
        <NavBar showLogin={true} auth={auth}></NavBar> }
      <div id="main">
        {(auth && windowSize.innerWidth>720)&&(<SideBarComp displaySidebar={displaySidebar} setDisplaySidebar={setDisplaySidebar}>
        </SideBarComp>)}
        <Children displaySidebar={displaySidebar} sidebar={auth ? true : false}>
          <AnimatedRoute>
            <Switch>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/loadingscreen" element={<LoadingScreen />} />
              <Route exact path="/videomodal" element={<VideoModal />} />
              <Route exact path="/contacto" element={<ContactForm />} />
              <Route exact path="/sobrenosotros" element={<AboutUs />} />
              <Route exact path="/login" element={<RequireNoAuth><Login /></RequireNoAuth>} />
              <Route exact path="/signup" element={<RequireNoAuth><Signup /></RequireNoAuth>} />
              <Route exact path="/welcome" element={
                <Suspense fallback={<LoadingScreen />}>
                  <RequireAuth><MainMenu windowSize={windowSize}/></RequireAuth>
                </Suspense>} />
              <Route exact path="/emprendimiento/:empr_id" element={<RequireAuth><SecondMenu /></RequireAuth>}></Route>
              <Route exact path="/nuevoemprendimiento" element={<RequireAuth><RegisterEmprendimiento /></RequireAuth>}></Route>
              <Route exact path="/emprendimiento/:empr_id/update" element={<RequireAuth><EmprendUpdate /></RequireAuth>}></Route>
              <Route exact path="/emprendimiento/:empr_id/bmc" element={<RequireAuth><MbCanvas /></RequireAuth>}></Route>
              <Route exact path="/logout" element={<LogOut />} />
              {/* <Route exact path="/pdfview" element={<PdfViewer />} /> */}
              <Route exact path="/misemprendimientos" element={<RequireAuth><MisEmprendimientos /></RequireAuth>} />
              <Route exact path="/emprendimiento/:empr_id/cronograma" element={<Cronogramas></Cronogramas>} />
              <Route exact path="/misemprendimientos/:user_id" element={<RequireAuth><EmprendList /></RequireAuth>} />
              <Route exact path="/misemprendimientos/fill/:empr_id/:modu_nume/:bmc_type"
                element={<RequireAuth><ModelCanvasPreguntas /></RequireAuth>} />
              <Route path="*"
                element={<main style={{ padding: "1rem" }}><p>No hay nada aquí!</p></main>} />
            </Switch>
          </AnimatedRoute>
        </Children>
      </div>
      <Footer windowSize={windowSize}></Footer>
    </Router>

  </>
  )
}
export default App

