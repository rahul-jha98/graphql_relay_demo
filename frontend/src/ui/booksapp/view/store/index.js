// @flow strict-local

import { createStore, createContainer, createHook } from 'react-sweet-state';


const initialState = {
    selectedUserId: '',
    currentUserId: '',
    selectedBookId: '',
    userType: ''
};

const actions = {
    setSelectedUserId: (newUserId) => ({ setState }) => {
        setState({selectedUserId: newUserId});
    },
    setSelectedBookId: (newBookId) => ({ setState }) => {
        setState({selectedBookId: newBookId});
    },
    setUserType: (userType) => ({ setState }) => {
        setState({ userType })
    }
}
const store = createStore({
    initialState,
    actions,
    name: 'globalstore',
});

export const StoreContainer = createContainer(store, {
    onInit:
        () =>
        ({ setState }, { currentUserId }) => {
            setState({
                selectedUserId: currentUserId,
                currentUserId: currentUserId
            });
        },
    onUpdate:
        () =>
        ({ setState }, { currentUserId }) => {
            setState({
                selectedUserId: currentUserId,
                currentUserId: currentUserId
            });
        },
});

export const useSelectedUserId = createHook(store, {
    selector: (state) => state.selectedUserId,
});

export const useSelectedBookId = createHook(store, {
    selector: (state) => state.selectedBookId,
});

export const useCurrentUserId = createHook(store, {
    selector: (state) => state.currentUserId,
});

export const useUserType = createHook(store, {
    selector: (state) => state.userType,
});

export const useStoreActions = createHook(store, { selector: null });