import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getAllActivities } from '../apis/ActivitiesCRUD';
import { getAllDays } from '../apis/ScheduleCRUD';
import { Decimal } from '@prisma/client/runtime/library';

interface SavedAccommodation {
  /* ...unchanged... */
}

interface FsqPlace {
  /* ...unchanged... */
}

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

interface TransportItineraryProps {
  token: string;
  itineraryId: number;
}

interface ScheduleDay {
  id: number;
  date: string;
}

export default function TransportItinerary() {
  const [days, setDays] = useState<ScheduleDay[]>([]);
  const [selectedDayId, setSelectedDayId] = useState<number| null>(null);
  const [transports, setTransports] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem('token');
          const { id } = useParams();

  // 1) load available days for this itinerary
  useEffect(() => {
    async function loadDays() {
      if (!token || !id) return;
      try {
        const resp = await getAllDays(token, id.toString());
        const d = resp.data || resp;
        setDays(d);
        if (d.length) setSelectedDayId(d[0].id);
      } catch (e) {
        console.error('Error loading days', e);
      }
    }
    loadDays();
  }, [token, id]);

  // 2) when selectedDayId changes, fetch transport activities
  useEffect(() => {
    async function fetchTransports() {
      if (!token || !selectedDayId) return;
      setLoading(true);
      try {
        const resp = await getAllActivities(token, selectedDayId.toString());
        const data: Activity[] = resp.data || resp;
        // only transport types
        const filtered = data.filter(a => a.type === 'Transportation');
        console.log('Loaded transport activities for day', selectedDayId, filtered);
        setTransports(filtered);
      } catch (err) {
        console.error('Error loading transport activities', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTransports();
  }, [token, selectedDayId]);

  if (!days.length) return <p>Loading days…</p>;

  return (
    <div className="space-y-4">
      <div>
        <select
          value={selectedDayId ?? undefined}
          onChange={e => setSelectedDayId(Number(e.target.value))}
          className="bg-[#167DE5] text-white rounded px-2 py-3 text-sm flex w-[25%] mb-5"
        >
          {days.map((d, idx) => (
            <option key={d.id} value={d.id}>
              Day {idx+1} – {new Date(d.date).toLocaleDateString()}
            </option>
          ))}
        </select>
      </div>

      {/* transport list */}
      {loading && <p>Loading transportation…</p>}
      {!loading && transports.length === 0 && (
        <p>No transportation scheduled for this day.</p>
      )}
      {!loading && transports.map(act => (
        <div key={act.id} className="border p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">{act.name}</h3>
          <p className="text-sm text-gray-600">
            {new Date(act.start_time).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}
            {' '}–{' '}
            {new Date(act.end_time).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}
          </p>
          {act.method && (
            <p className="mt-1">
              <span className="font-medium">Method:</span> {act.method}
              {/* {act.method === 'Flight' && act.flightNumber && (
                <span className="ml-2">(Flight No. {act.flightNumber})</span>
              )} */}
            </p>
          )}
          <div className="mt-2">
            <p className="font-medium">From:</p>
            <p className="text-sm">{act.location_name}</p>
            {act.location_link && (
              <a
                href={act.location_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline text-sm"
              >
                View on map
              </a>
            )}
          </div>
          {act.location_name2 && (
            <div className="mt-2">
              <p className="font-medium">To:</p>
              <p className="text-sm">{act.location_name2}</p>
              {act.location_link2 && (
                <a
                  href={act.location_link2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline text-sm"
                >
                  View on map
                </a>
              )}
            </div>
          )}
          <div>
        {act.method === 'flight' && (act as any).flightNumber && (
          <a
            href={`https://flightaware.com/live/flight/${(act as any).flightNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Track Flight {(act as any).flightNumber}
          </a>
        )}

        {(act.method === 'train' || act.method === 'Bus' || act.method === 'Public Transport') && act.location_address && act.location_address2 && (
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(act.location_address)}&destination=${encodeURIComponent(act.location_address2)}&travelmode=transit`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            View Transit Directions
          </a>
        )}

        {(act.method === 'car' || act.method === 'Driving' || act.method === 'Rental Car') && act.location_address && act.location_address2 && (
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(act.location_address)}&destination=${encodeURIComponent(act.location_address2)}&travelmode=driving`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-2 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            View Driving Directions
          </a>
        )}
      </div>
        </div>
      ))}
    </div>
  );
}
