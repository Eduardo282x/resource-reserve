import PropTypes from "prop-types";
import "./card.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export const Card = ({ title, dataTable, columns, sendFunc, customBtn }) => {
  const navigate = useNavigate();

  const back = () => {
    navigate(-1);
  };

  const onEdit = (data) => {
    sendFunc({ name: "edit", data: data });
  };

  const onAdd = () => {
    sendFunc({ name: "add" });
  };

  const onDelete = (data) => {
    sendFunc({ name: "delete", data: data });
  };

  return (
    <div className="cardDisplay">
      <div className="titleCard">
        <div className="mainTitle">
          <Button
            color="primary"
            variant="light"
            onClick={back}
            radius="full"
            size="sm"
          >
            <ArrowBackIcon className="btnBack" />
          </Button>
          <h1>{title}</h1>
        </div>

        {customBtn[0] && (
          <div>
            <Button
              color="primary"
              variant="light"
              onClick={onAdd}
              radius="full"
              size="sm"
            >
              <AddIcon />
            </Button>
          </div>
        )}
      </div>
      <div className="bodyCard">
        <Table
          aria-label="users"
          selectionMode="single"
          defaultSelectedKeys={["2"]}
          color="primary"
          // bottomContent={
          //   <div className="flex w-full justify-center">
          //     <Pagination
          //       isCompact
          //       showControls
          //       showShadow
          //       color="secondary"
          //       page={page}
          //       total={pages}
          //       onChange={(page) => setPage(page)}
          //     />
          //   </div>
          // }
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key} className="headerTable">
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody className="maxContent">
            {dataTable.map((item) => (
              <TableRow key={item.Id} className="textTable">
                <TableCell>{item.Name}</TableCell>
                <TableCell>{item.Lastname}</TableCell>
                <TableCell>{item.Rol}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="toggle password visibility"
                    color="primary"
                    edge="end"
                    onClick={() => onEdit(item)}
                  >
                    {<EditIcon />}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="toggle password visibility"
                    color="error"
                    edge="end"
                    onClick={() => onDelete(item.Id)}
                  >
                    {<DeleteIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  dataTable: PropTypes.any,
  columns: PropTypes.array,
  sendFunc: PropTypes.func,
  customBtn: PropTypes.array,
};
