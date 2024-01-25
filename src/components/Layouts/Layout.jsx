import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {Dropdown,DropdownTrigger,DropdownMenu,DropdownItem,Button,} from "@nextui-org/react";
import {menuLayout} from './layout.data'
import {parseJwt} from '../jwtGet';
import "./layout.css";

export const Layout = () => {
  const navigate = useNavigate();
  let menu = menuLayout;
  
  const redirect = (path) => {
    if (path == "") {
      localStorage.removeItem("userData");
    }
    navigate("/" + path);
  };

  const tokenUncoded = parseJwt()
  if(tokenUncoded.payload.Rol != 1){
    menu = menu.filter(path => path.key != 'users')
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
            items={menu}
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


