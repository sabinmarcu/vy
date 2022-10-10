import {
  ApplyCustomBridgeAction,
  ApplyCustomBridgeActions,
  BridgeAction,
  BridgeActionDeps,
  BridgeActionPackage,
  BridgeActionProps,
  BridgeActionFromList,
  CustomBridgeActionDeps,
  ExtractFromBridgeActions,
  MergeBridgeActionsDeps,
} from './actions';

type BasicAction = BridgeAction<'basic'>;
//    ^? type BasicAction = {
//           type: "basic";
//       }

type BasicActionType = BasicAction['type'];
//    ^? type BasicActionType = "basic"

type BasicActionProps = BridgeActionProps<BasicAction>;
//   ^? type BasicActionProps = {}

type BasicActionPackage = BridgeActionDeps<BasicAction>;
//   ^? type BasicActionPackage = {
//          basic: BridgeActionProps<BridgeActionType<"basic">>;
//      }

type BasicActionPackageItem = BasicActionPackage['basic'];
//   ^? type BasicActionPackageItem = {}

type TestAction = BridgeAction<'test'> & { testInput: string };
//    ^? type TestAction = BridgeActionType<"test"> & {
//           testInput: string;
//       }

type TestActionType = TestAction['type'];
//    ^? type TestActionType = "test"

type TestActionProps = BridgeActionProps<TestAction>;
//   ^? type TestActionProps = {
//          testInput: string;
//      }

type TestActionPackage = BridgeActionDeps<TestAction>;
//   ^? type TestActionPackage = {
//          test: BridgeActionProps<TestAction>;
//      }

type TestActionPackageItem = TestActionPackage['test'];
//   ^? type TestActionPackageItem = {
//          testInput: string;
//      }

type CoolAction = BridgeAction<'cool'> & { coolInput: boolean, stuff: 'awesome' };
//    ^? type CoolAction = BridgeActionType<"cool"> & {
//           coolInput: boolean;
//           stuff: 'awesome';
//       }

type CoolActionType = CoolAction['type'];
//    ^? type CoolActionType = "cool"

type CoolActionProps = BridgeActionProps<CoolAction>;
//   ^? type CoolActionProps = {
//          coolInput: boolean;
//          stuff: 'awesome';
//      }

type CoolActionPackage = BridgeActionDeps<CoolAction>;
//   ^? type CoolActionPackage = {
//          cool: BridgeActionProps<CoolAction>;
//      }

type CoolActionPackageItem = CoolActionPackage['cool'];
//   ^? type CoolActionPackageItem = {
//          coolInput: boolean;
//          stuff: 'awesome';
//      }

type ActionsList = [BasicAction, TestAction, CoolAction];
//    ^? type ActionsList = [BridgeActionType<"basic">, TestAction, CoolAction]

type MergedDeps = MergeBridgeActionsDeps<ActionsList>;
//   ^? type MergedDeps = BridgeActionDeps<BridgeActionType<"basic">> & BridgeActionDeps<BridgeActionType<"test"> & {
//          testInput: string;
//      }> & BridgeActionDeps<...>

type MergedDepsKeys = keyof MergedDeps;
//   ^? type MergedDepsKeys = "basic" | "test" | "cool"

type MergedDepsBasic = MergedDeps['basic'];
//   ^? type MergedDepsBasic = {}

type MergedDepsTest = MergedDeps['test'];
//   ^? type MergedDepsTest = {
//          testInput: string;
//      }

type ExactMergedDepsTest = { testInput: 'awesome' };
//    ^? type ExactMergedDepsTest = {
//           testInput: 'awesome';
//       }

type ExactMergedDepsTestCheck = ExactMergedDepsTest extends MergedDepsTest ? true : false;
//   ^? type ExactMergedDepsTestCheck = true

type MergedDepsCool = MergedDeps['cool'];
//   ^? type MergedDepsCool = {
//          coolInput: boolean;
//          stuff: 'awesome';
//      }

type BridgeActions = BridgeActionFromList<ActionsList>;
//   ^? type BridgeActions = BridgeActionType<"basic"> | (BridgeActionType<"test"> & {
//          testInput: string;
//      }) | (BridgeActionType<"cool"> & {
//          coolInput: boolean;
//          stuff: 'awesome';
//      })

type BridgeActionsTypes = BridgeActions['type'];
//   ^? type BridgeActionsTypes = "basic" | "test" | "cool"

type ExtractBasicFromActions = ExtractFromBridgeActions<BridgeActions, 'basic'>;
//   ^? type ExtractBasicFromActions = {
//          type: "basic";
//      }

type ExtractTestFromActions = ExtractFromBridgeActions<BridgeActions, 'test'>;
//   ^? type ExtractTestFromActions = BridgeActionType<"test"> & {
//          testInput: string;
//      }

type ExtractCoolFromActions = ExtractFromBridgeActions<BridgeActions, 'cool'>;
//   ^? type ExtractCoolFromActions = BridgeActionType<"cool"> & {
//          coolInput: boolean;
//          stuff: 'awesome';
//      }

type ApplyBasic = ApplyCustomBridgeAction<BasicAction>;
//   ^? type ApplyBasic = GenericObject<any> & BridgeActionType<"basic">

type ApplyTest1 = ApplyCustomBridgeAction<TestAction, { testInput: 'awesome' }>;
//   ^? type ApplyTest1 = {
//          testInput: 'awesome';
//      } & BridgeActionType<"test">

type ApplyTest2 = ApplyCustomBridgeAction<TestAction, { testInput: 23 }>;
//   ^? type ApplyTest2 = never

type ApplyCool1 = ApplyCustomBridgeAction<CoolAction, { coolInput: true, stuff: 'awesome' }>;
//   ^? type ApplyCool1 = {
//          coolInput: true;
//          stuff: 'awesome';
//      } & BridgeActionType<"cool">

type ApplyCool2 = ApplyCustomBridgeAction<CoolAction, { coolInput: true }>;
//   ^? type ApplyCool2 = never

type ApplyCool3 = ApplyCustomBridgeAction<CoolAction, { coolInput: true, stuff: 32 }>;
//   ^? type ApplyCool3 = never

type CustomDeps = {
  basic: { },
  test: { testInput: 'awesome' | 'stuff' },
  cool: { coolInput: true, stuff: 'awesome' },
};

type ApplyCustomList = ApplyCustomBridgeActions<ActionsList, CustomDeps>;
//   ^? type ApplyCustomList = BridgeActionType<"basic"> | BridgeAction<"test", {
//          testInput: 'awesome' | 'stuff';
//      }> | BridgeAction<"cool", {
//          coolInput: true;
//          stuff: 'awesome';
//      }>

type ExtractBasicFromApplyActions = ExtractFromBridgeActions<ApplyCustomList, 'basic'>;
//   ^? type ExtractBasicFromApplyActions = {
//          type: "basic";
//      }

type ExtractTestFromApplyActions = ExtractFromBridgeActions<ApplyCustomList, 'test'>;
//   ^? type ExtractTestFromApplyActions = {
//          testInput: 'awesome' | 'stuff';
//      } & BridgeActionType<"test">

type ExtractCoolFromApplyActions = ExtractFromBridgeActions<ApplyCustomList, 'cool'>;
//   ^? type ExtractCoolFromApplyActions = {
//          coolInput: true;
//          stuff: 'awesome';
//      } & BridgeActionType<"cool">

type ApplyCustomListKeys = keyof ApplyCustomList;
//   ^? type ApplyCustomListKeys = "type"

const testCustomList = <T extends ApplyCustomList>(input: T) => input;
const testBasic = testCustomList({ type: 'basic' });
//     ^? const testBasic: {
//            type: "basic";
//        }

const testAwesome1 = testCustomList({ type: 'test', testInput: 'awesome' });
//     ^? const testAwesome1: {
//            type: "test";
//            testInput: "awesome";
//        }
const testAwesome2 = testCustomList({ type: 'test', testInput: 'stuff' });

const testCool = testCustomList({ type: 'cool', coolInput: true, stuff: 'awesome' });
//     ^? const testCool: {
//            type: "cool";
//            coolInput: true;
//            stuff: "awesome";
//        }

type BasicCustomDeps = CustomBridgeActionDeps<BasicAction, {}>;
//   ^? type BasicCustomDeps = {
//          basic: {};
//      }

type TestCustomDeps = CustomBridgeActionDeps<TestAction, { testInput: 'awesome' | 'stuff' }>;
//   ^? type TestCustomDeps = {
//          test: {
//              testInput: 'awesome' | 'stuff';
//          };
//      }

type CoolCustomDeps = CustomBridgeActionDeps<CoolAction, { coolInput: true, stuff: 'awesome' }>;
//   ^? type CoolCustomDeps = {
//          cool: {
//              coolInput: true;
//              stuff: 'awesome';
//          };
//      }

type CustomDeps2 = BasicCustomDeps & TestCustomDeps & CoolCustomDeps;

type ApplyCustomList2 = ApplyCustomBridgeActions<ActionsList, CustomDeps2>;
//   ^? type ApplyCustomList2 = BridgeActionType<"basic"> | BridgeAction<"test", {
//          testInput: 'awesome' | 'stuff';
//      }> | BridgeAction<"cool", {
//          coolInput: true;
//          stuff: 'awesome';
//      }>

type ExtractBasicFromCustomActions = ExtractFromBridgeActions<ApplyCustomList2, 'basic'>;
//   ^? type ExtractBasicFromCustomActions = {
//          type: "basic";
//      }

type ExtractTestFromCustomActions = ExtractFromBridgeActions<ApplyCustomList2, 'test'>;
//   ^? type ExtractTestFromCustomActions = {
//          testInput: 'awesome' | 'stuff';
//      } & BridgeActionType<"test">

type ExtractCoolFromCustomActions = ExtractFromBridgeActions<ApplyCustomList2, 'cool'>;
//   ^? type ExtractCoolFromCustomActions = {
//          coolInput: true;
//          stuff: 'awesome';
//      } & BridgeActionType<"cool">

type ApplyCustomList2Check1 = ApplyCustomList2 extends ApplyCustomList ? true : false;
//   ^? type ApplyCustomList2Check1 = true

type ApplyCustomList2Check2 = ApplyCustomList extends ApplyCustomList2 ? true : false;
//   ^? type ApplyCustomList2Check2 = true
