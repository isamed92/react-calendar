import { NavBar, CalendarEvent, CalendarModal, FabAddNew, FabDelete} from '../';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessagesES, localizer } from '../../helpers';
import { useEffect, useState } from 'react';
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks';


export const CalendarPage = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
  const {openDateModal} = useUiStore()
  const {user} = useAuthStore()
  const {events, setActiveEvent, startLoadingEvents}  = useCalendarStore()
   
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
  }

  const eventStartGetter = (event, start, end, isSelected) => {


    const isMyEvent = (user.uid === event.user.uid) || (user.uid === event.user._id)

    const style = {
      backgroundColor: isMyEvent ? '#347CF7' : '#aa45da',
      borderRadius: '0px',
      opacity: 0.8, 
      color: 'white'
    }
    return {
      style
    }
  }

  useEffect(() => {
    startLoadingEvents()
  }, [])
  
  
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
      <FabDelete/>
      <FabAddNew/>
    </>
  );
};
