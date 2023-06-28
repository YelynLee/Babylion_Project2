import { Routes, Route, Outlet, useLocation } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from './store/thunkFunctions'
import ProtectedPage from './pages/ProtectedPage'
import ProtectedRoutes from './components/ProtectedRoutes'
import NotAuthRoutes from './components/NotAuthRoutes'

function Layout() {
  return (
    <div className="flex flex-col h-screen justify-between">

      <ToastContainer
        position='bottom-right'
        theme='light'
        pauseOnHover
        autoClose={1500}
      />

      <Navbar />
      <main className="mb-auto w-10/12 max-w-4xl mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

function App() {

  //Auth이 잘 되었는지 재확인
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth); //true or false
  const { pathname }  = useLocation();

  useEffect(() => {
    if(isAuth) { //true(로그인에 성공했을 때)일 때만 올바른 token인지 재확인
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch])

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />}/>

{/* 로그인한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}> {/* ProtectedRoutes의 outlet이 protected page가 됨 */}
          <Route path='/protected' element={<ProtectedPage />}/>
        </Route>

{/* 로그인한 사람만 갈 수 없는 경로 */}
        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path='/login' element={<LoginPage />}/> 
          <Route path='/register' element={<RegisterPage />}/> {/* 마찬가지 */}
        </Route>


      </Route>
    </Routes>
  )
}

export default App
