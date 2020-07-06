import { combineReducers } from "redux";

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { clients } from './clients.reducer';
import { alert } from './alert.reducer';
import { products } from './products.reducer';

export default combineReducers({
  authentication,
  registration,
  users,
  clients,
  products,
  alert
});


// const rootReducer = combineReducers({
//   auth: authReducer,
//   errors: errorReducer,
//   authentication,
//   registration,
//   users,
//   alert
// });

// export default rootReducer;