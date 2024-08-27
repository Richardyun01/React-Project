import React from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { signup } from "../api/api-config";
import { Link } from "react-router-dom";

function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");
        const password = data.get("password");
        signup({ username: username, password: password }).then((response) => {
            window.location.href = "/login";
        });
    };

    return (
        <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">계정 생성</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="fname"
                        name="username"
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="아이디"
                        autoFocus
                        style={{background: "#DADDE2"}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="패스워드"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        style={{background: "#DADDE2"}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        계정 생성
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Link to="/login" variant="body2" style={{ textDecoration: "none", color: "#2196F3" }}>
                        이미 계정이 있습니까? 로그인 하세요.
                    </Link>
                </Grid>
            </form>
        </Container>
    );
};

export default SignUp;