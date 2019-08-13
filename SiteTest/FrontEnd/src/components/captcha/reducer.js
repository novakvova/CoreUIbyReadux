
const initialState = {
    key: {
        data: null,
        error: false,
        loading: false,
        success: false
    },
}

export const captchaReducer = (state = initialState, action) => {
    let newState = state;

    switch (action.type) {

        default: {
            return newState;
        }
    }

    //return newState;
}