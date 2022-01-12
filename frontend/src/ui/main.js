import React, { Suspense } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";

const SuspenseDemo = React.lazy(() => import('./suspensedemo'));
const QuerySchedulingDemo = React.lazy(() => import('./queryscheduling'));

export default () => (
    <Router>
        <Routes>
            <Route exact path="/suspensedemo" element={<SuspenseDemo />} />
            <Route path="/querydemo" element={<QuerySchedulingDemo />} />
            <Route exact path="/" element={
                <>
                    <Link to="/suspensedemo">
                        Suspense
                    </Link>

                    <Link to="/querydemo">
                        Query Demo
                    </Link>
                </>
            }/>
        </Routes>
    </Router>
);