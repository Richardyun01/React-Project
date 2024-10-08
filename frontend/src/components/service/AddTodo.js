import React, { useState } from "react";
import { Button, Grid, TextField } from "@mui/material";

const AddTodo = (props) => {
    //사용자의 입력을 저장할 오브젝트
    const [item, setItem] = useState({title: ""});
    const addItem = props.addItem;

    //onButtonClick 함수 작성
    const onButtonClick = () => {
        addItem(item);
        setItem({title: ""});
    };

    //onInputChange 함수 작성
    const onInputChange = (e) => {
        setItem({title: e.target.value});
        console.log(item);
    }

    //enterKeyEventHandler 함수
    const enterKeyEventHandler = (e) => {
        if(e.key === "Enter") {
            onButtonClick();
        }
    }

    //onInputChange 함수를 TextField 컴포넌트에 전달
    return (
        <Grid container style={{marginTop: 20}}>
            <Grid xs={11} md={11} item style={{paddingRight: 13, marginTop: '20px'}}>
                <TextField 
                    placeholder="여기에 할 일을 추가해 보세요!" fullWidth
                    onChange={onInputChange} 
                    onKeyPress={enterKeyEventHandler} 
                    value={item.title}
                    style={{background: "#DADDE2"}}
                />
            </Grid>
            <Grid xs={1} md={1} item>
                <Button 
                    fullWidth 
                    style={{marginBottom: '10px', marginTop: '20px', height: '74%', borderColor: '#2196f3', color: '#2196f3'}}
                    color="secondary"
                    variant="outlined"
                >
                    +
                </Button>
            </Grid>
        </Grid>
    );
}

export default AddTodo;