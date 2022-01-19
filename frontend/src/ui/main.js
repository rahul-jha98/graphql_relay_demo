import React, { Suspense } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    NavLink
  } from "react-router-dom";
import Home from './view';

const SuspenseDemo = React.lazy(() => import('./suspensedemo'));
const QuerySchedulingDemo = React.lazy(() => import('./queryscheduling'));
const BooksApp = React.lazy(() => import('./booksapp'));
const BooksAppLazy = React.lazy(() => import('./booksapplazy'));

const TopAppBar = () => (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Relay Concepts Demo
            </Typography>
            <Button><NavLink to="/" style={{textDecoration: "none", color: "white"}}>Home</NavLink></Button>
            </Toolbar>
        </AppBar>
    </Box>
);

const ContentArea = () => (
    <Routes>
        <Route exact path="/suspensedemo" element={<SuspenseDemo />} />
        <Route path="/querydemo" element={<QuerySchedulingDemo />} />
        <Route path="/bookapp" element={<BooksApp />} />
        <Route path="/bookapplazy" element={<BooksAppLazy />} />
        <Route exact path="/" element={<Home />}/>
    </Routes>
);

export default () => (
    <Router>
        <TopAppBar />
        <Suspense fallback={"Loading content ..."}>
            <ContentArea />
        </Suspense>
    </Router>
);