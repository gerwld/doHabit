export const ADD_HABBIT = 'habbits/ADD_HABBIT';

export const addHabbit = (data) => {    
   return {
    type: ADD_HABBIT,
    payload: data,
}};
