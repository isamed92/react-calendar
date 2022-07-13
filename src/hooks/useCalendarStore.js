import { useDispatch, useSelector } from 'react-redux';
import { onAddNewEvent, onSetActiveEvent } from '../store';

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const dispatch = useDispatch()


  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = (calendarEvent) => {

    //TODO: llegar al backend
    
    //TODO: todo bien

    if(calendarEvent._id){
      //actualizando
    } else {
      //creando
      dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
    }

  }


  return {
    // * propiedades
    events,
    activeEvent,
    // * metodos
    setActiveEvent,
    startSavingEvent,
  };
};
