import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { getItinerary } from '../apis/ItinerariesCRUD';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression, LeafletMouseEvent } from 'leaflet';
import { getAllDays, getDay } from '../apis/ScheduleCRUD';
import { createActivity, getAllActivities } from '../apis/ActivitiesCRUD';
import { Decimal } from '@prisma/client/runtime/library';

const AnyMapContainer = MapContainer as unknown as React.ComponentType<any>;
const AnyMarker = Marker as unknown as React.ComponentType<any>;

function LocationPicker({
  onSelect,
  initial = { lat: -6.2, lon: 106.8167 },
}: {
  onSelect: (loc: { address: string; lat: number; lon: number }) => void;
  initial?: { lat: number; lon: number };
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [markerPos, setMarkerPos] = useState<{ lat: number; lon: number }>(initial);

  // Fetch geocoding results
  useEffect(() => {
    if (query.length < 3) return;
    (async () => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setResults(data);
    })();
  }, [query]);

  // Handler for selecting a place from list
  const handleSelectPlace = (place: any) => {
    const lat = parseFloat(place.lat);
    const lon = parseFloat(place.lon);
    setMarkerPos({ lat, lon });
    setQuery(place.display_name);
    setResults([]);
    onSelect({ address: place.display_name, lat, lon });
  };

  // Handler for marker drag end
  const handleDragEnd = (e: any) => {
    const latLng = e.target.getLatLng();
    const lat = latLng.lat;
    const lon = latLng.lng;
    setMarkerPos({ lat, lon });
    onSelect({ address: '', lat, lon });
  };

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search location…"
        className="border p-2 rounded w-full border-[#167DE5]"
      />
      {results.length > 0 && (
        <ul className="border rounded max-h-40 overflow-y-auto">
          {results.slice(0, 5).map((place: any) => (
            <li
              key={place.place_id}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelectPlace(place)}
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
      <MapContainer
        center={[markerPos.lat, markerPos.lon] as LatLngExpression}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: 300, width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[markerPos.lat, markerPos.lon] as LatLngExpression}
          draggable={true}
          eventHandlers={{ dragend: handleDragEnd }}
        />
      </MapContainer>
    </div>
  );
}

export default function ActivitiesItinerary() {
      const [schedules, setSchedules] = useState<SchedulePerDay[]>([]);
      const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
      const [activities, setActivities] = useState<ScheduledActivity[]>([]);
      const [selectedActivity, setSelectedActivity] = useState<ScheduledActivity | null>(null);
      const [minDateTime, setMinDateTime] = useState<string>('');
      const [maxDateTime, setMaxDateTime] = useState<string>('');
      const [transportOptions, setTransportOptions] = useState<any[]>([]);
      const [formValues, setFormValues] = useState({
        name: '',
        description: '',
        start_time: '',
        end_time: '',
        type: 'Transportation',
        cost: 0.0,
        location_name: '',
        location_address: '',
        location_link: '',
        location_name2: '',
        location_address2: '',
        location_link2: '',
        method: '',
        
      });
      const token = localStorage.getItem('token');
        const { id } = useParams();


    interface Activity {
        id: number;
        name: string;
        description: string;
        start_time: Date;
        end_time: Date;
        type: string;
        cost: Decimal;
        day_id: number;
        location_name: string;
        location_address: string;
        location_name2?: string | null;
        location_link?: string;
        location_address2?: string | null;
        location_link2?:   string | null;
        method?: string | null;
      }
      
      // Extended with parsed Date objects
      interface ScheduledActivity extends Activity {
        start: Date;
        end: Date;
      }
      
      // Schedule_Per_Day model from backend
      interface SchedulePerDay {
        id: number;
        itinerary_id: number;
        date: string;
      }
      
      // Dummy data for testing
      const dummySchedules: SchedulePerDay[] = [
        { id: 1, itinerary_id: 1, date: "2025-05-05T00:00:00Z" },
        { id: 2, itinerary_id: 1, date: "2025-05-06T00:00:00Z" },
      ];
      
      
      // Hours to display on the timeline (4AM to 11PM)
      const HOURS: number[] = Array.from({ length: 24 }, (_, i) => i);
      
      interface ActivitySchedulerProps {
        itineraryId: number;
      }
      

useEffect(()  => {
    async function loadDays(){
    if(token && id){
    const response = await getAllDays(token, id);
    const days: SchedulePerDay[] = response.data;
    setSchedules(days);
    if (days.length > 0) setSelectedDayId(days[0].id);
      const dates = days.map(d => new Date(d.date));
      const sorted = dates.sort((a, b) => a.getTime() - b.getTime());
    }
  }
  if (token && id) loadDays();
  }, [id, token]);

  // Fetch activities for the selected schedule day
  useEffect(() => {
   
    loadActivities();
  }, [token, selectedDayId]);

  async function loadActivities() {
    if (!token || selectedDayId === null) return;
    try {
      const response = await getAllActivities(token, selectedDayId.toString());
      const day = await getDay(token, selectedDayId.toString());
      const dayData = day.data; 
      const dateObj = new Date(dayData.date);
      const iso = dateObj.toISOString().slice(0,10);
    setMinDateTime(`${iso}T00:00`);
    setMaxDateTime(`${iso}T23:59`);

      const activitiesData = response.data || response;
      const scheduled = activitiesData.map((a: any) => ({
        ...a,
        start: new Date(a.start_time),
        end: new Date(a.end_time)
      }));
      setActivities(scheduled);
      setSelectedActivity(null);
    } catch (err) {
      console.error('Failed to load activities', err);
    }
  }

  // Convert Date to pixel offset from 4AM (48px / hour)
  const toPx = (date: Date): number => {
    const hoursUTC = date.getUTCHours();
    const minutesUTC = date.getUTCMinutes();
    const base = (hoursUTC + minutesUTC / 60) * 48;
    return base + 24;
  };

  const showAddActivity = () =>{
    setSelectedActivity(null)
  }


  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: name === 'cost' ? Number(value) : value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDayId === null) return;
    if(token === null) return;
    try{
      const message = await createActivity(token, selectedDayId.toString(), formValues.name, formValues.description, new Date(formValues.start_time  + 'Z'), new Date(formValues.end_time  + 'Z'), formValues.type, formValues.cost, formValues.location_name, formValues.location_address, formValues.location_link, formValues.location_name2, formValues.location_address2, formValues.location_link2, formValues.method);
      console.log(message);
      setFormValues({ name: '', description: '', start_time: '', end_time: '', type: 'Transportation', cost: 0,location_name: '', location_address: '', location_link: '',location_name2: '', location_address2: '', location_link2: '', method: '', });
      loadActivities();
    }catch(error){

    }
    
  };

  return (
    <>
    <p className='mb-1'>Add Guest</p>
    <div className='flex  gap-20'>
      <div className='flex flex-col basis-[50%]'>
        <div className='flex justify-between items-center mb-2'>
            <select
                value={selectedDayId ?? undefined}
                onChange={(e) => setSelectedDayId(Number(e.target.value))}
                className="bg-[#167DE5] text-white rounded px-2 py-1 text-sm "
            >
                {schedules.map((sched, idx) => (
                <option key={sched.id} value={sched.id}>
                    Day {idx + 1} – {new Date(sched.date).toLocaleDateString()}
                </option>
                ))}
            </select>
            <button onClick={showAddActivity} className='text-white bg-[#167DE5] rounded-[50%] p-2 w-10 h-10 mb-'>
                +
            </button>
        </div>
        
        <div className="relative h-[60vh] border-2 border-[#167DE5] rounded-lg  overflow-y-auto">
          {/* Hour rows */}
          
          {HOURS.map((h) => (
            <div key={h} className="h-12 flex items-center">
              <div className="w-16 text-xs text-gray-500 pl-2">
                {h % 12 === 0 ? 12 : h % 12}{h < 12 ? "AM" : "PM"}
              </div>
              <div className="flex-1 border-b border-gray-300" />
            </div>
          ))}

          {/* Activity blocks */}
          {activities.map((act) => {
                const typeToColor: Record<Activity["type"], string> = {
                  Transportation: "bg-green-200",
                  Entertainment:   "bg-red-200",
                  Culinary:        "bg-yellow-200",
                  Accommodation:   "bg-purple-200",
                  Others:          "bg-blue-200",
                };
                const top = toPx((act as any).start);
                const height = toPx((act as any).end) - top;
                const color  = typeToColor[act.type] ?? "bg-gray-200";
                return (
                  <div
                    key={act.id}
                    className={`absolute left-16 right-2 ${color} rounded-xl items-center flex px-2 rounded p-1 cursor-pointer hover:bg-[#EE4266] transition duration-100 hover:text-white text-gray-800`}
                    style={{ top: `${top}px`, height: `${height}px` }}
                    onClick={() => setSelectedActivity(act)}
                  >
                    <span className="text-xs font-medium">{act.name}</span>
                  </div>
                );
              })}
        </div>

      </div>
      <div className='flex flex-col basis-[50%]'>
        {selectedActivity ? (
          <p className='text-3xl font-bold text-[#EE4266] flex items-center mb-3'>Activity Detail</p>
        ) : (
          <p className='text-3xl font-bold text-[#EE4266] flex items-center mb-3'>Create Activity</p>
        )}
        
        <div className='flex flex-col p-5 border-2 border-[#167DE5] h-[60vh] mb-1 rounded-lg overflow-y-auto'>
          {selectedActivity ? (
            <>            
              <h2 className="text-2xl font-semibold mb-4">{selectedActivity.name}</h2>
              <div className="flex space-x-2 mb-4">
                {["Transportation", "Entertainment", "Culinary", "Accommodation", "Others"].map((t) => (
                  <span
                    key={t}
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${
                      selectedActivity.type === t ? "bg-[#EE4266] text-white border-red-500" : "bg-gray-200 text-gray-600 border-transparent"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mb-4">
                <h3 className="font-medium">Location</h3>
                <p className="text-xl font-medium text-gray-700">{selectedActivity.location_name}</p>
                <p className="text-sm text-gray-700">{selectedActivity.location_address}</p>
                {selectedActivity.location_link && (
                  <a href={selectedActivity.location_link} target="_blank" rel="noreferrer" className="text-sm text-blue-500 underline">
                    View on map
                  </a>
                )}
                <p className="text-sm text-gray-700">{selectedActivity.location_address2}</p>
              </div>
              <div className="mb-4">
                <h3 className="font-medium">Description</h3>
                <div className='shadow-md rounded-lg p-5'>
                    <p className="text-sm text-gray-700">{selectedActivity.description}</p>
                </div>
                
              </div>
              <div className="text-sm text-gray-500">Cost: ${selectedActivity.cost.toString()}</div>
            </>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
              <div className='flex flex-col'>
              <label htmlFor="type"><p className='text-[#EE4266] font-medium'>Activity Type</p></label>
              <select
                name="type"
                value={formValues.type}
                onChange={handleInputChange}
                className="border p-2 border-[#167DE5] rounded"
              >
                {['Transportation','Entertainment','Culinary','Accommodation','Others'].map(t=><option key={t} value={t}>{t}</option>)}
              </select>
              </div>
              
              <div className='flex flex-col'>
              <label htmlFor="name"><p className='text-[#EE4266] font-medium'>Activity Name</p></label>
              <input
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="border p-2 border-[#167DE5] rounded"
                required
              />
              </div>
              
              <div className='flex flex-col'>
              <label htmlFor="description"><p className='text-[#EE4266] font-medium'>Activity Description</p></label>
              <textarea
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="border p-2 border-[#167DE5] rounded"
                required
              />
              </div>
              <div className='flex justify-between gap-10'>
                <div className='flex flex-col basis-[50%]'>
                  <label htmlFor="start_time"><p className='text-[#EE4266] font-medium'>Activity Start Time</p></label>
                  <input type="datetime-local" name="start_time" value={formValues.start_time} onChange={handleInputChange} className="border p-2 border-[#167DE5] rounded"
                  min={minDateTime} max={maxDateTime} required />
                </div>
                <div className='flex flex-col basis-[50%]'>
                  <label htmlFor="end_time"><p className='text-[#EE4266] font-medium'>Activity End Time</p></label>
                  <input type="datetime-local" name="end_time" value={formValues.end_time} onChange={handleInputChange} className="border p-2 border-[#167DE5] rounded"
                    min={minDateTime} max={maxDateTime} required />
                </div>
              </div>
              <div className='flex flex-col'>
              <label htmlFor="cost"><p className='text-[#EE4266] font-medium'>Activity Cost</p></label>
                <input
                  type="number"
                  name="cost"
                  step="0.01"
                  value={formValues.cost}
                  onChange={handleInputChange}
                  placeholder="Cost"
                  className="border p-2 border-[#167DE5] rounded"
                />
              </div>
              <div className='flex justify-between gap-5'>
                <div className={`flex flex-col ${formValues.type === 'Transportation' ? 'basis-[50%]' : 'basis-[100%]'}`}>
                <p className='text-[#EE4266] font-medium'>Activity Location 1</p>
                <LocationPicker onSelect={({address, lat, lon}) =>
                {
                  const [namePart, ...rest] = address.split(',');
                  const addrPart = rest.join(',').trim();
                  setFormValues(prev => ({
                    ...prev,
                    location_name: namePart.trim(),
                    location_address: addrPart,
                    location_link: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
                  }));
                }
              } />
                {formValues.location_address && (
                  <a
                    href={formValues.location_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View on Google Maps
                  </a>
                )}
                </div>
                {formValues.type === 'Transportation' && (
                  <div className='flex flex-col basis-[50%]'>
                    <p className='text-[#EE4266] font-medium'>Activity Location 2</p>
                    <LocationPicker onSelect={({address: address, lat, lon}) =>
                      {
                        const [namePart, ...rest] = address.split(',');
                        const addrPart = rest.join(',').trim();
                        setFormValues(prev => ({
                          ...prev,
                          location_name2: namePart.trim(),
                          location_address2: addrPart,
                          location_link2: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
                        }));
                      }
                    } />
                    {formValues.location_address2 && (
                      <a href={formValues.location_link2!} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        View return on Google Maps
                      </a>
                    )}
                  </div>
                )}
              </div>
              {formValues.type === 'Transportation' && (
                <div className='flex flex-col'>
                  <label htmlFor="method"><p className='text-[#EE4266] font-medium'>Activity Transportation Method</p></label>
                  <select name="method" value={formValues.method} onChange={handleInputChange} className="border p-2  border-[#167DE5] rounded">
                    {['Flight','Car','Train','Bus', 'Walk'].map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              )}
              <button
                onClick={handleFormSubmit}
                className="bg-[#167DE5] text-white py-2 rounded"
              >
                Add Activity
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
