import './App.css';
import Todo from './components/service/Todo';
import React, { useState, useEffect } from 'react';
import { Container, List, Paper, Grid, Button, AppBar, Toolbar, Typography } from '@mui/material';
import { call, signout } from './components/api/ApiService';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { reset } from 'styled-reset';
import { lightTheme, darkTheme } from './components/theme/Theme';
import AddTodo from './components/service/AddTodo';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    background-color: ${(props) => props.theme.body};
    color: ${(props) => props.theme.text};
  }
`;

function App() {
  const [isDartkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  }
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    call().then((res) => {
      setItems(res.data);
      setLoading(false);
    });
  }, []);

  const addItem = (item) => {
    call("/todo", "POST", item)
      .then((response) => setItems(response.data));
  };

  const editItem = (item) => {
    call("/todo", "PUT", item)
      .then((response) => setItems(response.data));
  };

  const deleteItem = (item) => {
    call("/todo", "DELETE", item)
      .then((response) => setItems(response.data));
  };

  let todoItems = items.length > 0 && (
    <Paper style={{marginRight: '10px', marginTop: '30px', backgroundColor: '#DADDE2', width: '100%'}}>
      <List>
        {items.map((item) => (
          <Todo key={item.id} item={item} editItem={editItem} deleteItem={deleteItem} />
        ))}
      </List>
    </Paper>
  );

  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">나의 일정 관리</Typography>
          </Grid>
        </Grid>
        <Grid item container justifyContent="flex-end" alignItems="center">
          <Grid item>
            <Grid theme style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <header>
                <Button variant='contained' style={{ backgroundColor: '#2196f3', color: 'white' }} onClick={toggleDarkMode}>
                  {isDartkMode ? <BsFillSunFill /> : <BsFillMoonFill />}
                  테마 변경
                </Button>
              </header>
              <ThemeProvider theme={isDartkMode ? darkTheme : lightTheme}>
                <GlobalStyle />
              </ThemeProvider>
            </Grid>
          </Grid>
          &nbsp;
          <Grid item>
            <Button variant="contained" onClick={signout} style={{ backgroundColor: '#2196f3' }}>로그아웃</Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem}/>
        <div className='TodoList'>{todoItems}</div>
      </Container>
    </div>
  );

  let loadingPage = <h1> 로딩중... </h1>;
  let content = loadingPage;

  if (!loading) {
    /* 로딩중이 아니면 todoListPage를 선택*/
    content = todoListPage;
  }

  return (
    <div className="App">
      {content}
    </div>
  );
}

export default App;
