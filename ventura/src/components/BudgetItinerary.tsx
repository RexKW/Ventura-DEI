import React, { useState, useEffect, useMemo } from 'react'
import { Decimal } from 'decimal.js'
import { useParams } from 'react-router-dom';
import { getAllActivities } from '../apis/ActivitiesCRUD';
import { getAllDays } from '../apis/ScheduleCRUD';

// API response for each budgeted item
export interface BudgetResponse {
  id: number
  type: string
  estimated_budget: Decimal
  actual_budget: Decimal
  // you can extend with name, description, times, locations, etc.
}

const typeOrder = [
    'Accommodation',
    'Transportation',
    'Culinary',
    'Entertainment',
    'Others',
  ]

  interface Activity {
    id: number
    name: string
    description: string
    start_time: string   // ISO datetime string
    end_time: string     // ISO datetime string
    type: string         // 'Accommodation' | 'Transportation' | 'Culinary' | 'Entertainment' | 'Others'
    cost: number
    day_id: number
    location_name: string
    location_address: string
    location_link: string
    location_name2?: string | null
    location_address2?: string | null
    location_link2?: string | null
    method?: string | null
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
  


function BudgetItinerary() {
    const token = localStorage.getItem('token');
    const { id } = useParams();
    const [activities, setActivities] = useState<Activity[]>([])
     const [schedules, setSchedules] = useState<SchedulePerDay[]>([]);
    const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
    
    async function loadActivities() {
        if (!token || selectedDayId === null) return;
        try {
          const response = await getAllActivities(token, selectedDayId.toString());

    
          const activitiesData = response.data || response;
          const scheduled = activitiesData.map((a: any) => ({
            ...a,
            start: new Date(a.start_time),
            end: new Date(a.end_time)
          }));
          setActivities(scheduled);
        } catch (err) {
          console.error('Failed to load activities', err);
        }
      }

      useEffect(() => {
         
          loadActivities();
        }, [token, selectedDayId]);
      
    
      // Group activities by type
      const grouped = useMemo(() => {
        const map: Record<string, Activity[]> = {}
        activities.forEach(act => {
          if (!map[act.type]) map[act.type] = []
          map[act.type].push(act)
        })
        return map
      }, [activities])
    
      // Compute total cost per category
      const totals = useMemo(() => {
        return Object.fromEntries(
          typeOrder.map(type => {
            const list = grouped[type] || []
            // Extract cost values
            const costs = list.map(a => a.cost)
            // Sum costs without an explicit initializer: only if there are costs
            const sum = costs.length > 0 ? costs.reduce((acc, cur) => acc + cur) : 0
            return [type, sum]
          })
        ) as Record<string, number>
      }, [grouped])
    

      useEffect(()  => {
        // setSchedules(dummySchedules);
        //   setSelectedDayId(dummySchedules[0].id);
        async function loadDays(){
        if(token && id){
        const response = await getAllDays(token, id);
        const days: SchedulePerDay[] = response.data;
        setSchedules(days);
        if (days.length > 0) setSelectedDayId(days[0].id);
              // Compute min/max from itinerary dates using the fetched array directly
          const dates = days.map(d => new Date(d.date));
          const sorted = dates.sort((a, b) => a.getTime() - b.getTime());
          // fetch(`/api/schedule-per-day?itineraryId=${id}`)
          //   .then((res) => res.json())
          //   .then((data: SchedulePerDay[]) => {
          //     setSchedules(data);
          //     if (data.length > 0) setSelectedDayId(data[0].id);
          //   })
          //   .catch(console.error);
        }
      }
      if (token && id) loadDays();
      }, [id, token]);
    
    
  return (
    <>
       <select
                value={selectedDayId ?? undefined}
                onChange={(e) => setSelectedDayId(Number(e.target.value))}
                className="bg-[#167DE5] text-white rounded px-2 py-3 text-sm flex w-[25%] mb-5"
            >
                {schedules.map((sched, idx) => (
                <option key={sched.id} value={sched.id}>
                    Day {idx + 1} – {new Date(sched.date).toLocaleDateString()}
                </option>
                ))}
            </select>
      <div className="grid grid-cols-4 border border-blue-400 rounded-t-lg bg-white">
        <div className="px-4 py-2 text-pink-500 font-medium">Activity</div>
        <div className="px-4 py-2 text-pink-500 font-medium">Activity Detail</div>
        <div className="px-4 py-2 text-pink-500 font-medium">Total Cost</div>
        <div className="px-4 py-2 text-pink-500 font-medium">Cost</div>
      </div>

      {/* Category Groups with Dividers */}
      <div className="mt-2 space-y-4">
        {typeOrder.map((type, idx) => {
          const group = grouped[type] || []
          if (!group.length) return null
          return (
            <div key={type}>
              <div className="relative border-2 border-blue-400 rounded-lg">
                {/* Category badge */}
                <span className="absolute top-0  left-0 bg-pink-500 text-white text-xs font-medium px-3 py-1 rounded-tl-lg rounded-br-lg">
                  {type}
                </span>

                {/* Activity rows */}
                {group.map((act, index) => (
                  <div
                    key={act.id}
                    className={`grid grid-cols-4 ${index > 0 ? 'border-t border-blue-400' : ''}`}
                  >
                    <div className="px-4 py-10 border-r text-gray-800">{act.name}</div>
                    <div className="px-4 py-10 border-r text-gray-600 text-sm text-start">{act.description}</div>
                    <div className="px-4 py-10 border-r text-gray-900">
                      {index === 0 ? `$ ${totals[type]}` : ''}
                    </div>
                    <div className="px-4 py-10 text-gray-900">$ {act.cost}</div>
                  </div>
                ))}
              </div>

            </div>
          )
        })}
      </div>
    </>
  )
}

export default BudgetItinerary
