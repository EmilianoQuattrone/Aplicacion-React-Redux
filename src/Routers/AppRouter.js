import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';

import { firebase } from '../firebase/firebase-config'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

//Routes reemplaza al Swicth en reac router en la v6.
export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    useEffect(() => {

        firebase.auth().onAuthStateChanged(async (user) => {

            // console.log(user);

            if (user?.uid) {

                dispatch(login(user.uid, user.displayName));
                dispatch(startLoadingNotes(user.uid));
            }

            setChecking(false);
        })

    }, [dispatch, setChecking]);


    if (checking) {

        return (

            <div>
                <h1>Espere...</h1>
            </div>
        )
    }

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={
                    <PrivateRoute>
                        <JournalScreen />
                    </PrivateRoute>}
                />
                <Route path="/*" element={
                    <PublicRoute>
                        <AuthRouter />
                    </PublicRoute>}
                />
            </Routes>
        </BrowserRouter>
    )
}