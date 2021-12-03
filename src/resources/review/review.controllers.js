import { reviewCrudControllers } from "../../utils/crud/review.crud";
import { Review } from './review.model';
import { ReviewIndex } from './reviewIndex.model';

export default reviewCrudControllers(Review, ReviewIndex);
