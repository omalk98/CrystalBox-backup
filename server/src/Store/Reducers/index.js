import { combineReducers } from 'redux';
import UserReducer from './user';
import ThemeReducer from './theme';
import ClipboardReducer from './clipboard';
import AppleDeviceReducer from './apple-device';
import AuthenticationReducer from './authentication';

const Reducers = combineReducers({
  user: UserReducer,
  theme: ThemeReducer,
  clipboard: ClipboardReducer,
  isApple: AppleDeviceReducer,
  auth: AuthenticationReducer
});

export default Reducers;
