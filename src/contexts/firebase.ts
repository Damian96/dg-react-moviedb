// FirebaseContext.js

import { createContext } from 'react';
import {getAuth} from "firebase/auth";

const FirebaseContext = createContext<typeof getAuth | null>(null);

export default FirebaseContext;
