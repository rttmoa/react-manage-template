// import

export default {

    namespace: 'example',

    state: {},

    subscriptions: {
        setup({dispatch, history}) {},
    },

    effects: {
        *fetchRemote({payload}, {select, call, put}) {},
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.payload};
        },
    },

}
