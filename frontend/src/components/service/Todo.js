import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
    ListItem,
    ListItemText,
    InputBase,
    Checkbox,
    ListItemSecondaryAction,
    IconButton,
} from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";

const Todo = (props) => {
    const [item, setItem] = useState(props.item);
    const [readOnly, setReadOnly] = useState(true);
    const deleteItem = props.deleteItem;
    const editItem = props.editItem;

    const editEventHandler = (e) => {
        setItem({ ...item, title: e.target.value });
    };

    const checkboxEventHandler = (e) => {
        item.done = e.target.checked;
        editItem(item);
    };

    const deleteEventHandler = () => {
        deleteItem(item);
    };

    const turnOffReadOnly = () => {
        setReadOnly(false);
    };

    const turnOnReadOnly = (e) => {
        if (e.key === "Enter" && readOnly === false) {
            setReadOnly(true);
            editItem(item);
        }
    };

    return (
        <ListItem>
            <Checkbox
                icon={<AiOutlineStar />}
                checkedIcon={<AiFillStar />}
                checked={item.done}
                onChange={checkboxEventHandler}
                style={{ background: "#DADDE2"}}
            />
            <ListItemText>
                <InputBase
                    inputProps={{
                        "aria-label": "naked",
                        readOnly: readOnly
                    }}
                    onClick={turnOffReadOnly}
                    onKeyDown={turnOnReadOnly}
                    onAbort={editEventHandler}
                    type="text"
                    id={item.id}
                    name={item.id}
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                    style={{ background: "#DADDE2" }}
                />
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton
                    aria-label="Delete-Todo"
                    onClick={deleteEventHandler}
                >
                    <DeleteOutlined />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default Todo;