import "../assets/css/core/menu/menu-types/vertical-menu-modern.module.css";
import "../assets/css/core/colors/palette-gradient.module.css";
import { useRouter } from "next/router";
import { Session } from "@/services/userService";
import { useEffect, useState } from "react";
export default function Menu() {
  const [user, setUser] = useState({
    name: "Jose",
    email: "jose@gmail.com",
    employeeNumber: "123123",
  });
  const router = useRouter();
  const userAvatar = "./user-avatar.png";
  useEffect(() => {
    setUser({
      name: (user.name = "Jose"),
      email: "jose@gmail.com",
      employeeNumber: "123123",
    });
  }, []);
  const logout = () => () => {
    Session.endSession();
    router.push("/");
  };

  const redirect = (path: string) => () => {
    console.log(`/${path}`);
    router.replace(`/${path}`);
  };
  return (
    <div>
      <nav className="header-navbar navbar-expand-lg navbar navbar-with-menu navbar-without-dd-arrow fixed-top navbar-semi-dark navbar-shadow">
        <div className="navbar-wrapper">
          <div className="navbar-header">
            <ul className="nav navbar-nav flex-row">
              <li className="nav-item mobile-menu d-lg-none mr-auto">
                <a
                  className="nav-link nav-menu-main menu-toggle hidden-xs"
                  href="#"
                >
                  <i className="ft-menu font-large-1"></i>
                </a>
              </li>
              <li className="nav-item mr-auto">
                <a className="navbar-brand" onClick={redirect("home")}>
                  <h5 className="brand-text">Portal de Personal</h5>
                </a>
              </li>
              <li className="nav-item d-lg-none">
                <a
                  className="nav-link open-navbar-container"
                  data-toggle="collapse"
                  data-target="#navbar-mobile"
                >
                  <i className="la la-ellipsis-v"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="navbar-container content">
            <div className="collapse navbar-collapse" id="navbar-mobile">
              <ul className="nav navbar-nav mr-auto float-left"></ul>
              <ul className="nav navbar-nav float-right">
                <li
                  className="dropdown dropdown-user nav-item"
                  onClick={redirect("profile")}
                >
                  <a
                    className="dropdown-toggle nav-link dropdown-user-link"
                    href="#"
                    data-toggle="dropdown"
                  >
                    <span className="user-name">
                      {user.name.split(" ").at(2)}
                    </span>
                    <span className="avatar avatar-online">
                      <img src={userAvatar} alt="avatar" />
                      <i></i>
                    </span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={logout()}>
                    <i className="ft-power danger"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div
        className="main-menu menu-fixed menu-dark menu-accordion menu-shadow"
        data-scroll-to-active="true"
      >
        <div className="main-menu-content">
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            <li>
              <a className="menu-item" onClick={redirect("home")}>
                <i className="la la-home"></i>
                <span data-i18n="Inicio"> Dashboard</span>
              </a>
            </li>
            <li>
              <a className="menu-item" onClick={redirect("empRequestForm")}>
                <i className="la la-file-text"></i>
                <span data-i18n="Solicitud"> Crear Solicitud</span>
              </a>
            </li>
            <li>
              <a className="menu-item" onClick={redirect("myRequests")}>
                <i className="la la-calendar"></i>
                <span data-i18n="MisSolicitudes"> Mis Solicitudes</span>
              </a>
            </li>
            <li>
              <a className="menu-item" onClick={redirect("profile")}>
                <i className="la la-user"></i>
                <span data-i18n="Perfil"> Perfil</span>
              </a>
            </li>
            <li>
              <a className="menu-item" onClick={redirect("profile")}>
                <i className="la la-user"></i>
                <span data-i18n="Perfil"> Perfil</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
