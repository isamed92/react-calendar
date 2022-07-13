import { createSlice } from '@reduxjs/toolkit';


import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'cumple de monka',
    notes: 'hay que comprar ingredientes',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Fernando',
    },
  }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent,
        ],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload
        },
        onAddNewEvent: (state, {payload}) => {
            state.events.push(payload)
            state.activeEvent = null
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent} = calendarSlice.actions;