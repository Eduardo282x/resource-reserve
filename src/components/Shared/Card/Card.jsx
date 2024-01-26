import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, } from "@nextui-org/react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import PropTypes from "prop-types";
import "./card.css";

export const Card = ({ title, dataTable, columns, colMap, sendFunc, customBtn }) => {
  let editBtn = columns.find(column => column.key === 'Edit');
  let deleteBtn = columns.find(column => column.key === 'Delete');
  const navigate = useNavigate();

  const back = () => { navigate(-1); };

  const onEdit = (data) => {
    sendFunc({ name: "edit", data: data });
  };

  const onSearch = (event) => {
    sendFunc({ name: "search", data: event.target.value });
  }

  const onAdd = () => {
    sendFunc({ name: "add" });
  };

  const onDelete = (data) => {
    sendFunc({ name: "delete", data: data });
  };

  const parseDate = (dateParse) => {
    const date = new Date(dateParse);
    const formattedDate = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })
    return formattedDate;
  }

  const parseTime = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  const parseIcon = (icon, rows) => {

    if (icon == 'Edit') return (
      <IconButton
        aria-label="toggle password visibility"
        color="primary"
        edge="end"
        onClick={() => onEdit(rows)}
      >
        {<EditIcon />}
      </IconButton>
    )
    if (icon == 'Delete') return (
      <IconButton
        aria-label="toggle password visibility"
        color="error"
        edge="end"
        onClick={() => onDelete(rows.Id)}
      >
        {<DeleteIcon />}
      </IconButton>
    )
  }

  return (
    <div className="cardDisplay">
      <div className="titleCard">
        <div className="flex items-center justify-center">
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

        <div className="flex items-center justify-center">
          {customBtn[1] && (
            <div>
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <Input
                  // type="text"
                  label="Buscar"
                  className="inputSearch"
                  onChange={onSearch}
                  size="sm"
                />
              </div>
            </div>
          )}

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
      </div>

      <div className="bodyCard">
        <Table
          aria-label="users"
          selectionMode="single"
          defaultSelectedKeys={["2"]}
          color="primary"
          className="tableStyle"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key} className="headerTable">
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody className="maxContent">
            {dataTable.map((item, index) => (
              <TableRow key={index} className="textTable">
                {colMap.map((col) => (
                  <TableCell key={col.columnName}>
                    {col.type == "string" ? (item[col.columnName] ? item[col.columnName] : '-') : ''}
                    {col.type == "date" ? parseDate(item[col.columnName]) : ''}
                    {col.type == "time" ? parseTime(item[col.columnName]) : ''}
                    {col.type == "icon" ? parseIcon(col, item) : ''}
                  </TableCell>
                ))}

                {editBtn != null && (
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
                )}

                {deleteBtn != null && (
                  <TableCell>
                    <IconButton
                      aria-label="toggle password visibility"
                      color="error"
                      edge="end"
                      onClick={() => onDelete(item.Id)}
                    >
                      {<DeleteIcon />}
                    </IconButton>
                  </TableCell>)}
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
  colMap: PropTypes.array,
  sendFunc: PropTypes.func,
  customBtn: PropTypes.array = [false, false],
};

