import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import "./layout.css";
export const Layout = () => {
  const navigate = useNavigate();

  const userLogin = JSON.parse(localStorage.getItem('userData'));

  const redirect = (path) => {
    if (path == "") {
      localStorage.removeItem("userData");
    }
    navigate("/" + path);
  };

  let items = [
    {
      key: "home",
      label: "Inicio",
    },
    {
      key: "inventory",
      label: "Inventario",
    },
    {
      key: "reserve",
      label: "Reserva",
    },
    {
      key: "users",
      label: "Usuarios",
    },
    {
      key: "profile",
      label: "Perfil",
    },
    {
      key: "",
      label: "Cerrar sesión",
      color: "delete",
    },
  ];

  if(userLogin.Rol != 1){
    items = items.filter(path => path.key != 'users')
  }

  return (
    <div>
      <div className="layout">
        <div className="homeIcon"></div>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="ghost" color="primary" className="text-black">
              Menu
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Dynamic Actions"
            onAction={(path) => redirect(path)}
            items={items}
          >
            {(item) => (
              <DropdownItem
                key={item.key}
                color={item.color == "delete" ? "danger" : "primary"}
                className="itemMenu"
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      </div>
      <Outlet />
    </div>
  );
};
