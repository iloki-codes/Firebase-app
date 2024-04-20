/**
 * @format
 */

import {AppRegistry} from 'react-native';
import RootApp from './src/RootApp';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RootApp);

// const functions = require('firebase-functions');

// exports.makeUppercase = functions.firestore.document('/messages/{documentId}')
//     .onCreate((snap, context) => {
//       const original = snap.data().original;
//       console.log('Uppercasing', context.params.documentId, original);
//       const uppercase = original.toUpperCase();
//       return snap.ref.set({uppercase}, {merge: true});
//     });

