import { TLoseItem } from './lost-item.interface';
import LoseItem from './lose-item.model';

const createLoseItem = async (payload: TLoseItem, userId: string) => {
  const result = await LoseItem.create({ ...payload, userId });

  return result;
};
const getAllLoseItem = async () => {
  const result = await LoseItem.find().sort({ createdAt: -1 });

  return result;
};
const getMyLoseItems = async (userId: string) => {
  const result = await LoseItem.find({ userId }).sort({ createdAt: -1 });

  return result;
};

const loseItemServices = {
  createLoseItem,
  getAllLoseItem,
  getMyLoseItems,
};
export default loseItemServices;
