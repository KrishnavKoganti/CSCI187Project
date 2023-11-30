import { useState, MouseEvent,useEffect } from "react"
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider } from "@mui/material"
import { auth, db } from './firebase'; 
import { collection, addDoc, getDocs, query, where, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Calendar, type Event, dateFnsLocalizer } from "react-big-calendar"

import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"

import "react-big-calendar/lib/css/react-big-calendar.css"

import EventInfo from "./EventInfo"
import AddEventModal from "./AddEventModal"
import EventInfoModal from "./EventInfoModal"
import { AddTodoModal } from "./AddTodoModal"
import AddDatePickerEventModal from "./AddDatePickerEventModal"

const locales = {
  "en-US": enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
}) 

export interface ITodo {
  _id: string
  title: string
  color?: string
}

export interface IEventInfo extends Event {
  _id: string
  description: string
  todoId?: string
}

export interface EventFormData {
  description: string
  todoId?: string
}

export interface DatePickerEventFormData {
  description: string
  todoId?: string
  allDay: boolean
  start?: Date
  end?: Date
}

export const generateId = () => (Math.floor(Math.random() * 10000) + 1).toString()

const initialEventFormState: EventFormData = {
  description: "",
  todoId: undefined,
}

const initialDatePickerEventFormData: DatePickerEventFormData = {
  description: "",
  todoId: undefined,
  allDay: false,
  start: undefined,
  end: undefined,
}

const EventCalendar = () => {
    const fetchEvents = async () => {
        if (!auth.currentUser?.uid) {
            console.log('User not authenticated');
            return;
          }
      const q = query(collection(db, 'events'), where('userId', '==', auth.currentUser?.uid));
      const querySnapshot = await getDocs(q);
      const events = querySnapshot.docs.map(doc => {
        const data = doc.data();
        let endDate;
        if (typeof data.end === 'number') {
          // Unix timestamp in milliseconds
          endDate = new Date(data.end);
        } else if (data.end.seconds) {
          // Firestore-like Timestamp
          endDate = new Date(data.end.seconds * 1000);
        } else {
          console.error('Unexpected type for data.end:', typeof data.end);
        }
        return {
          _id: data._id,
          description: data.description,
          start: data.start.toDate(),
          end: endDate,
          // add other properties here if needed
        };
      });
      setEvents(events);
    };
    
    useEffect(() => {
        
        
    
        fetchEvents();
      }, [auth.currentUser?.uid]);

      useEffect(() => {
        fetchEvents();
      }, []);

      useEffect(() => {
        // Set up the auth state changed listener
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, fetch events
            fetchEvents();
          } else {
            // User is signed out
            console.log('User not authenticated');
          }
        });
      
        // Clean up the listener when the component is unmounted
        return unsubscribe;
      }, []);
      
      
  const [openSlot, setOpenSlot] = useState(false)
  const [openDatepickerModal, setOpenDatepickerModal] = useState(false)
  const [openTodoModal, setOpenTodoModal] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<Event | IEventInfo | null>(null)

  const [eventInfoModal, setEventInfoModal] = useState(false)

  const [events, setEvents] = useState<IEventInfo[]>([])
  const [todos, setTodos] = useState<ITodo[]>([])

  const [eventFormData, setEventFormData] = useState<EventFormData>(initialEventFormState)

  const [datePickerEventFormData, setDatePickerEventFormData] =
    useState<DatePickerEventFormData>(initialDatePickerEventFormData)

  const handleSelectSlot = (event: Event) => {
    setOpenSlot(true)
    setCurrentEvent(event)
  }

  const handleSelectEvent = (event: IEventInfo) => {
    setCurrentEvent(event)
    setEventInfoModal(true)
  }

  const handleClose = () => {
    setEventFormData(initialEventFormState)
    setOpenSlot(false)
  }

  const handleDatePickerClose = () => {
    setDatePickerEventFormData(initialDatePickerEventFormData)
    setOpenDatepickerModal(false)
  }

   const onAddEvent = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: IEventInfo = {
      ...eventFormData,
      _id: generateId(),
      start: currentEvent?.start,
      end: currentEvent?.end,
      todoId: eventFormData.todoId || 'default',
    }

  
    
    const docRef = await addDoc(collection(db, 'events'), {
        ...data,
        userId: auth.currentUser?.uid, // add the user's ID to the event data
      });
    
      // Set the _id property to the ID of the document in Firestore
      data._id = docRef.id;
    
      // Add the event to the local state
      const newEvents = [...events, data]
      setEvents(newEvents)
    
      console.log('Document written with ID: ', docRef.id);
      handleClose();
    }
    
    
      
    
     



  const onAddEventFromDatePicker = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (!datePickerEventFormData.start) {
        alert('Please select a start date.');
        return;
      }
        if (!datePickerEventFormData.allDay && !datePickerEventFormData.end) {
            alert('Please select an end date.');
            return;
        }
    const addHours = (date: Date | undefined, hours: number) => {
      return date ? date.setHours(date.getHours() + hours) : undefined
    }

    const setMinToZero = (date: any) => {
      date.setSeconds(0)
 
      return date
    }

    const data: IEventInfo = {
      ...datePickerEventFormData,
      _id: generateId(),
      start: setMinToZero(datePickerEventFormData.start),
      end: datePickerEventFormData.allDay
        ? addHours(datePickerEventFormData.start, 12)
        : setMinToZero(datePickerEventFormData.end),
        todoId: datePickerEventFormData.todoId || 'default',
    }
    
    const newEvents = [...events, data]

    setEvents(newEvents)
    setDatePickerEventFormData(initialDatePickerEventFormData)
    try {
        const docRef = await addDoc(collection(db, 'events'), {
          ...data,
          userId: auth.currentUser?.uid, // add the user's ID to the event data
        });
        console.log('Document written with ID: ', docRef.id);
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    
      handleDatePickerClose();
    
  }

  const onDeleteEvent = async () => {
    const eventId = (currentEvent as IEventInfo)._id;
    console.log('Deleting event with ID:', eventId);
    if (!auth.currentUser?.uid) {
        console.log('User ID not available');
        return;
      }
  
    setEvents(() => [...events].filter((e) => e._id !== (currentEvent as IEventInfo)._id!))
    setEventInfoModal(false)
  
    // Delete the event from Firestore
    const eventRef = doc(db, 'events', eventId);
    try {
      await deleteDoc(eventRef);
      console.log('Event deleted');
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  }
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut().then(() => {
      console.log("Logged out");
      navigate('/'); // navigate to the login screen
    }).catch((error) => {
      console.error("Error logging out: ", error);
    });
  };

 
  

  return (
    <Box
      mt={2}
      mb={2}
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Card>
          <CardHeader title="Calendar" subheader="Create Events and Todos and manage them easily" />
          <Divider />
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <ButtonGroup size="large" variant="contained" aria-label="outlined primary button group">
                <Button onClick={() => setOpenDatepickerModal(true)} size="small" variant="contained">
                  Add event
                </Button>
                <Button onClick={() => setOpenTodoModal(true)} size="small" variant="contained">
                  Create todo
                </Button>
                <Button onClick={logout} size="small" variant="contained">
                Logout
              </Button>
              </ButtonGroup>
            </Box>
            <Divider style={{ margin: 10 }} />
            <AddEventModal
              open={openSlot}
              handleClose={handleClose}
              eventFormData={eventFormData}
              setEventFormData={setEventFormData}
              onAddEvent={onAddEvent}
              todos={todos}
            />
            <AddDatePickerEventModal
              open={openDatepickerModal}
              handleClose={handleDatePickerClose}
              datePickerEventFormData={datePickerEventFormData}
              setDatePickerEventFormData={setDatePickerEventFormData}
              onAddEvent={onAddEventFromDatePicker}
              todos={todos}
            />
            <EventInfoModal
              open={eventInfoModal}
              handleClose={() => setEventInfoModal(false)}
              onDeleteEvent={onDeleteEvent}
              currentEvent={currentEvent as IEventInfo}
            />
            <AddTodoModal
              open={openTodoModal}
              handleClose={() => setOpenTodoModal(false)}
              todos={todos}
              setTodos={setTodos}
            />
            <Calendar
              localizer={localizer}
              events={events}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              startAccessor="start"
              components={{ event: EventInfo }}
              endAccessor="end"
              defaultView="week"
              eventPropGetter={(event) => {
                const hasTodo = todos.find((todo) => todo._id === event.todoId)
                return {
                  style: {
                    backgroundColor: hasTodo ? hasTodo.color : "#b64fc8",
                    borderColor: hasTodo ? hasTodo.color : "#b64fc8",
                  },
                }
              }}
              style={{
                height: 900,
              }}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}

export default EventCalendar
