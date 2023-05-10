export default {
    namespace: "home",

    state: {
        activeIndex: 0,
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                // console.log(location.pathname)
                // console.log(location)
                // console.log(history)
                // history.push(location.pathname)
                dispatch({
                    type: "updateActiveIndex",
                    payload: location.pathname,
                });
            });
        },
    },

    reducers: {
        updateActiveIndex(state, action) {
            let pathname = action.payload;
            let activeIndex = 0;
            // console.log(window)
            if (/orders/.test(pathname)) {
                activeIndex = 1;
                // window.location.href = pathname
            } else if (/storage/.test(pathname)) {
                activeIndex = 2;
            } else if (/stock/.test(pathname)) {
                activeIndex = 3;
            } else if (/funds/.test(pathname)) {
                activeIndex = 4;
            } else if (/manage/.test(pathname)) {
                activeIndex = 5;
            } else {
                activeIndex = 0;
            }
            return { ...state, activeIndex: activeIndex };
        },
    },
};

/*switch(pathname){
 case '/':
 activeIndex=0;
 break;
 case '/orders':
 case '/orders/addorder':
 activeIndex=1;
 break;
 case '/storage':
 activeIndex=2;
 break;
 case '/stock':
 activeIndex=3;
 break;
 case '/funds':
 activeIndex=4;
 break;
 case '/manage':
 activeIndex=5;
 break;
 default:
 break;
 }*/
