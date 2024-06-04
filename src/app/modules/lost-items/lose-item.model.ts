import { Schema, model } from 'mongoose';

import { TLoseItem } from './lost-item.interface';

const LoseItemSchema = new Schema<TLoseItem>(
  {
    category: { type: String },
    description: { type: String },
    date: { type: String },
    location: { type: String },
    email: { type: String },
    status: { type: String, enum: ['found', 'not found'] },
  },
  { timestamps: true },
);

const LoseItem = model<TLoseItem>('LoseItem', LoseItemSchema);

export default LoseItem;
