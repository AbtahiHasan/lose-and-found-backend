import { TLoseItem } from './lost-item.interface';
import LoseItem from './lose-item.model';

const createLoseItem = async (payload: TLoseItem) => {
  const result = await LoseItem.create(payload);

  return result;
};
const getAllLoseItem = async () => {
  const result = await LoseItem.find().sort({ createdAt: -1 });

  return result;
};

const loseItemServices = {
  createLoseItem,
  getAllLoseItem,
};
export default loseItemServices;
