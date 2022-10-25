import {
  Flat,
} from './generic';

type FlatTest1 = Flat<{ a: 1 } & { b: 2 }>;
//    ^? type FlatTest1 = {
//           a: 1;
//           b: 2;
//       }

type FlatTest2Input = { [Key in 'a']: 21 } & { [Key in 'b']: 22 };
//    ^? type FlatTest2Input = {
//           a: 21;
//       } & {
//           b: 22;
//       }

type FlatTest2 = Flat<FlatTest2Input>;
//    ^? type FlatTest2 = {
//           a: 21;
//           b: 22;
//       }
