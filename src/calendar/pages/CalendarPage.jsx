import { NavBar, CalendarEvent, CalendarModal, FabAddNew} from '../';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessagesES, localizer } from '../../helpers';
import { useState } from 'react';
import { useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
  const {openDateModal} = useUiStore()
  const {events, activeEvent, setActiveEvent}  = useCalendarStore()
   
  const onDoubleClick = (event) => {

    // console.log({doubleClick: event})
    openDateModal()
  }
  const onSelect = (event) => {
    setActiveEvent(event)
  
  }
  const onViewChange = (event) => {
    localStorage.setItem('lastView',event )
    setLastView(event)
    // console.log({viewChange: event})
  }

  const eventStartGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8, 
      color: 'white'
    }
    return {
      style
    }
  }
  
  return (
    <>
      <NavBar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessagesES()}
        eventPropGetter={eventStartGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}

      />
      <CalendarModal/>
      <FabAddNew/>
    </>
  );
};
