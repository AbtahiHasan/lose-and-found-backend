import { TFoundItem } from './found-items.interface';
import FoundItem from './found-items.model';

const createFoundItem = async (payload: TFoundItem) => {
  const result = await FoundItem.create(payload);

  return result;
};
const getAllFoundItem = async () => {
  const result = await FoundItem.find().sort({ createdAt: -1 });

  return result;
};
const getMyFoundItems = async (userId: string) => {
  const result = await FoundItem.find({ userId }).sort({ createdAt: -1 });

  return result;
};

const FoundItemServices = {
  createFoundItem,
  getAllFoundItem,
  getMyFoundItems,
};
export default FoundItemServices;
