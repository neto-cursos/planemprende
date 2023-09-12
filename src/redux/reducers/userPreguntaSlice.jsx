import { createSlice, nanoid } from '@reduxjs/toolkit'
import {
    initUsersPregs, getUsersPregs, updateUsersPregs,
    deleteUsersPregs, createUsersPregs, listUsersPregs, checkInitUsersPregs
} from './../actions/userPreguntaActions'

const initialState = {
    loaded: false,
    usrPregs: [],
    // usrPreg: [
    //     {
    //         usr_preg_id: '',
    //         modu_id: '',
    //         id:'',
    //         empr_id:'',
    //         usr_preg_nume:'',
    //         usr_preg_text:'',
    //         usr_preg_desc:'',
    //         usr_preg_esta:'',
    //     }
    // ],
    byModule: false,
    estado: 'loading',
    usr_preg_id_temp: -1,
}
export const usersPregSlice = createSlice({
    name: 'userspreg',
    //initialState:[],
    initialState: initialState,
    reducers: {
        resetUsersPreg: (state, action) => {
            state = initialState;
            return state;
        },
        setUsersPreg: (state, action) => {
            console.log(state, action);
            action.payload.map(data => {
                state.usrPregs = state.usrPregs.concat(data);
            });
        },
        addUsersPreg: (state, action) => {
            console.log(state, action);
            if (state.usr_preg_id_temp !== -1) {
                const preg = {
                    usr_preg_id: state.usr_preg_id_temp,
                    ...action.payload,
                }
                console.log(preg);
                state.usrPregs.push(preg);
                state.estado="copied";
            } else {
                state.usrPregs.push(action.payload);
            }
        },
        deleteUsersPreg: (state, action) => {
            console.log(action.payload);
            const nodo = state.usrPregs.find(usrPreg => usrPreg.usr_preg_id === action.payload)
            if (nodo) {
                state.usrPregs.splice(state.usrPregs.indexOf(nodo), 1)
            }
        },
        updateUsersPreg: (state, action) => {
            const { usr_preg_id,
                modu_id,
                id,
                empr_id,
                usr_preg_nume,
                usr_preg_text,
                usr_preg_desc,
                usr_preg_esta } = action.payload;
            const usersPregTask = state.usrPregs.find(usrPreg => usrPreg.usr_preg_id === usr_preg_id)
            if (usersPregTask) {
                usersPregTask.usr_preg_id = usr_preg_id;
                usersPregTask.modu_id = modu_id;
                usersPregTask.id = id;
                usersPregTask.empr_id = empr_id;
                usersPregTask.usr_preg_nume = usr_preg_nume;
                usersPregTask.usr_preg_text = usr_preg_text;
                usersPregTask.usr_preg_desc = usr_preg_desc;
                usersPregTask.usr_preg_esta = usr_preg_esta;
            }
        },
    },
    extraReducers(builder) {
        // login user
        builder
            // init usersPregs
            .addCase(initUsersPregs.pending, (state, action) => {
                console.log("init userpregs Pending");
            })
            .addCase(initUsersPregs.fulfilled, (state, action) => {
                console.log("init userpregs FullFilled");
                if (state.estado == "notinitiated") {
                    state.estado = "copied";
                    return state;
                }
            })
            .addCase(initUsersPregs.rejected, (state, action) => {
                console.log("init userpregs Rejected");
                action.error ? console.log(action.error) : '';
            })
            // checkinit usersPregs
            .addCase(checkInitUsersPregs.pending, (state, action) => {
                console.log("checkinit userpregs Pending");
            })
            .addCase(checkInitUsersPregs.fulfilled, (state, action) => {
                console.log("checkinit userpregs FullFilled");
                console.log(action.payload);

                if (action.payload.count > 0) {
                    state.estado = 'copied';
                    console.log("entro masq cerp");
                }
                else if (action.payload.count == 0) {
                    state.estado = 'notinitiated';
                    console.log("entro 0");
                }
                return state;
            })
            .addCase(checkInitUsersPregs.rejected, (state, action) => {
                console.log("checkinit userPregs Rejected");
                action.error ? console.log(action.error) : '';
            })
            // Get UsersPregs
            .addCase(getUsersPregs.pending, (state, action) => {
                console.log("GetUserPregs Pending");
            })
            .addCase(getUsersPregs.fulfilled, (state, action) => {
                state.usrPregs.length = 0;
                console.log("GetUserPregs Fullfilled");
                console.log(state, action);
                //state.push(action.payload);
                action.payload.map(data => {

                    console.log("data from get userspreg:")
                    console.log(data);
                    //state=state.push(data);
                    if (!state.usrPregs.find(usrPreg => usrPreg.usr_preg_id === data.usr_preg_id))
                        state.usrPregs.push(data);
                    //console.log("state from get userspreg:")
                    //console.log(state);
                });
                state.loaded = true;
                state.byModule = true;
            })
            .addCase(getUsersPregs.rejected, (state, action) => {
                console.log("GetUserPregs Rejected");
            })
            // register user
            .addCase(createUsersPregs.pending, (state, action) => {
                console.log("CreateUserPregs Pending");
            })
            .addCase(createUsersPregs.fulfilled, (state, action) => {
                console.log("CreateUserPregs FullFilled");
                console.log(action.payload);
                if (action.payload.usr_preg_id) {
                    state.usr_preg_id_temp = action.payload.usr_preg_id;
                    state.estado="addquestions";
                }
                // state=initialState;
                return state;
            })
            .addCase(createUsersPregs.rejected, (state, action) => {
                console.log("CreateUserPregs Rejected");
            })
            // get user details
            .addCase(updateUsersPregs.pending, (state, action) => {
                console.log("updateUsersPregs Pending");
            })
            .addCase(updateUsersPregs.fulfilled, (state, { payload }) => {
                console.log("updateUsersPregs FullFilled");
            })
            .addCase(updateUsersPregs.rejected, (state, { payload }) => {
                console.log("updateUsersPregs Rejected");
            })
            // check if user is loggedIn
            .addCase(deleteUsersPregs.pending, (state, action) => {
                console.log("DeleteUserPregs Pending");
            })
            .addCase(deleteUsersPregs.fulfilled, (state, { payload }) => {
                console.log("DeleteUserPregs FullFilled");

            })
            .addCase(deleteUsersPregs.rejected, (state, { payload }) => {
                console.log("DeleteUserPregs Rejected");
            })
            .addCase(listUsersPregs.pending, (state, action) => {
                console.log("ListUserPregs Pending");
            })
            .addCase(listUsersPregs.fulfilled, (state, action) => {
                console.log("ListUserPregs FullFilled");
                state.usrPregs.length = 0;
                console.log(action.payload);
                action.payload.map(data => {
                    if (!state.usrPregs.find(usrPreg => usrPreg.usr_preg_id === data.usr_preg_id))
                        state.usrPregs.push(data);
                });
                state.loaded = true;
                state.byModule = false;
            })
            .addCase(listUsersPregs.rejected, (state, { payload }) => {
                console.log("ListUserPregs Rejected");
            })
    },
})
export const { addUsersPreg, deleteUsersPreg, updateUsersPreg, resetUsersPreg } = usersPregSlice.actions
export default usersPregSlice.reducer;