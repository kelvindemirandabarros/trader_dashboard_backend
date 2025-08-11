import mongoose, { Schema, Document } from 'mongoose';

export interface Event {
  userId: string;
  type: string;
  value: number;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

const event_schema = new Schema<Event & Document>(
  {
    userId: { type: String, required: true },
    type: { type: String, required: true },
    value: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    metadata: { type: Object }
  },
  {
    timestamps: true
  }
);

export const EventModel = mongoose.model<Event & Document>(
  'Event',
  event_schema
);
