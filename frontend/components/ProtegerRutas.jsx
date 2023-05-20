import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = () => { 
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      var token = sessionStorage.getItem(window.$nombre_session);
      var url = window.$url_api + "/validar";

      if(!token) setIsAuth(false);

      try {
        const res = await axios.post(url, {"token" : token})

        if(res.data.success == true) {
          setIsAuth(true);
        }     
      }
      catch(e) {
        console.log(e);
        setIsAuth(false);
      }

   };
   fetchData();
 }, []);      

  return isAuth;
};

const ProtegerRutas = () => {
  const isAuth = useAuth();

  if (isAuth === null)
    return null;

  return isAuth ? <Outlet /> : <Navigate to="/ingreso" />;
};

export default ProtegerRutas;