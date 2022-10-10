import {
  BridgeActionDeps,
  BridgeActionProps,
} from './actions';
import {
  CreateWindowAction,
} from './createWindow';

type CreateWindowTest1 = CreateWindowAction<''>;
//               ^? type CreateWindowTest1 = CreateWindowAction<"">

type CreateWindowTest1Type = CreateWindowTest1['type'];
//               ^? type CreateWindowTest1Type = "createWindow"

type CreateWindowTest1Path = CreateWindowTest1['path'];
//               ^? type CreateWindowTest1Path = ""

type CreateWindowTest1Props = BridgeActionProps<CreateWindowTest1>;
//               ^? type CreateWindowTest1Props = {
//                      path: "";
//                  }

type CreateWindowTest1Deps = BridgeActionDeps<CreateWindowTest1>;
//               ^? type CreateWindowTest1Deps = {
//                      createWindow: BridgeActionProps<CreateWindowTest1>;
//                  }

type CreateWindowTest2 = CreateWindowAction<'foo'>;
//              ^? type CreateWindowTest2 = CreateWindowAction<"foo">

type CreateWindowTest2Type = CreateWindowTest2['type'];
//               ^? type CreateWindowTest2Type = "createWindow"

type CreateWindowTest2Path = CreateWindowTest2['path'];
//               ^? type CreateWindowTest2Path = "foo"

type CreateWindowTest2Deps = BridgeActionDeps<CreateWindowTest2>;
//               ^? type CreateWindowTest2Deps = {
//                      createWindow: BridgeActionProps<CreateWindowTest2>;
//                  }

type CreateWindowTest3 = CreateWindowAction<'foo' | 'bar'>;
//              ^? type CreateWindowTest3 = CreateWindowAction<"foo" | "bar">

type CreateWindowTest3Type = CreateWindowTest3['type'];
//               ^? type CreateWindowTest3Type = "createWindow"

type CreateWindowTest3Path = CreateWindowTest3['path'];
//               ^? type CreateWindowTest3Path = "foo" | "bar"

type CreateWindowTest3Deps = BridgeActionDeps<CreateWindowTest3>;
//               ^? type CreateWindowTest3Deps = {
//                      createWindow: BridgeActionProps<CreateWindowTest3>;
//                  }
