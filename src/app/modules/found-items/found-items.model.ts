import { Schema, model } from 'mongoose';

import { TFoundItem } from './found-items.interface';

const FoundItemSchema = new Schema<TFoundItem>(
  {
    userId: { type: String },
    category: { type: String },
    description: { type: String },
    date: { type: String },
    location: { type: String },
    email: { type: String },
    status: { type: String, enum: ['found', 'not found'] },
    image: { type: String },
  },
  { timestamps: true },
);

const FoundItem = model<TFoundItem>('FoundItem', FoundItemSchema);

export default FoundItem;
