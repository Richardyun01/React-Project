import React from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { signin, socialLogin } from "../api/ApiService";
import { FaGoogle } from "react-icons/fa";

function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");
        const password = data.get("password");
        signin({ username: username, password: password });
        const handleSocialLogin = (provider) => {
            socialLogin(provider);
        };
    }

    const handleSocialLogin = (provider) => {
        socialLogin(provider);
    };

    return (
        <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">로그인</Typography>
                </Grid>
            </Grid>
            <Grid>
                <form noValidate onSubmit={handleSubmit}>
                    {""}
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="username"
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
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                label="패스워드"
                                style={{background: "#DADDE2"}}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            로그인
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button onClick={() => handleSocialLogin("github")} fullWidth variant="contained" style={{backgroundColor: "#000"}}>
                            <FaGithub style={{marginRight: "8px"}} />
                            깃허브로 로그인하기
                        </Button>
                    </Grid>
                    <Grid>
                        <Link to="/signup" variant="body2" style={{ textDecoration: "none", color: "#2196F3" }}>
                            계정이 없습니까? 여기서 가입하세요.
                        </Link>
                    </Grid>
                </form>
            </Grid>
        </Container>
    );
}

export default Login;