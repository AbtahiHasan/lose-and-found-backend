import { Schema, model } from 'mongoose';

import { TLoseItem } from './lost-item.interface';

const LoseItemSchema = new Schema<TLoseItem>(
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

const LoseItem = model<TLoseItem>('LoseItem', LoseItemSchema);

export default LoseItem;
