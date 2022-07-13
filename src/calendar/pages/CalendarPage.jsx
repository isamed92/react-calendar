import { NavBar, CalendarEvent, CalendarModal} from '../';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getMessagesES, localizer } from '../../helpers';
import { addHours } from 'date-fns';
import { useState } from 'react';

const events = [
  {
    title: 'cumple de monka',
    notes: 'hay que comprar ingredientes',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Fernando',
    },
  },
];

export const CalendarPage = () => {
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')
  
  
  const onDoubleClick = (event) => {

    console.log({doubleClick: event})
  
  }
  const onSelect = (event) => {
  
    console.log({click: event})
  
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
    </>
  );
};
