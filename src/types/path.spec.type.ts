import {
  ExtPath,
  MatchPartial,
  MatchPath,
  MergePathMatch,
  Path,
  PathMatch,
  PathOpaqueSymbolType,
} from './path';

type Root = Path<'/'>;
//   ^? type Root = "/" & OpaqueID<"Path", typeof OpaqueSymbol>

type SettingsRoot = Path<'/settings'>;
//   ^? type SettingsRoot = "/settings" & OpaqueID<"Path", typeof OpaqueSymbol>

type SettingsAccount = Path<'/settings/account'>;
//   ^? type SettingsAccount = "/settings/account" & OpaqueID<"Path", typeof OpaqueSymbol>

type Settings = ExtPath<'/settings/:name'>;
//   ^? type Settings = "/settings/:name" & OpaqueID<"Path" | "Extensible", typeof OpaqueSymbol>

type Slot = ExtPath<'/:id'>;
//   ^? type Slot = "/:id" & OpaqueID<"Path" | "Extensible", typeof OpaqueSymbol>

type Comments = ExtPath<'/:id/comments'>;
//   ^? type Comments = "/:id/comments" & OpaqueID<"Path" | "Extensible", typeof OpaqueSymbol>

type CustomSettings = ExtPath<'/settings/:name/:id'>;
//   ^? type CustomSettings = "/settings/:name/:id" & OpaqueID<"Path" | "Extensible", typeof OpaqueSymbol>

type MatchSlot1 = MatchPartial<'/', Slot>;
//   ^? type MatchSlot1 = "/" & OpaqueID<{
//          id: "";
//      }, typeof PathOpaqueSymbol>

type MatchSlot2 = MatchPartial<'/whatever', Slot>;
//   ^? type MatchSlot2 = "/whatever" & OpaqueID<{
//          id: "whatever";
//      }, typeof PathOpaqueSymbol>

type MatchSlot3 = MatchPartial<'/whatever/else', Slot>;
//   ^? type MatchSlot3 = never

type MatchComments1 = MatchPartial<'/', Comments>;
//   ^? type MatchComments1 = never

type MatchComments2 = MatchPartial<'/whatever', Comments>;
//   ^? type MatchComments2 = never

type MatchComments3 = MatchPartial<'/whatever/else', Comments>;
//   ^? type MatchComments3 = never

type MatchComments4 = MatchPartial<'/whatever/comments', Comments>;
//   ^? type MatchComments4 = "/:id/comments" & OpaqueID<{
//          id: "whatever";
//      }, typeof PathOpaqueSymbol>

type MatchComments4Test = MatchComments4[PathOpaqueSymbolType]['id'];
//   ^? type MatchComments4Test = "whatever"

type MatchPartialSettingsRoot0 = MatchPartial<'/', SettingsRoot>;
//   ^? type MatchPartialSettingsRoot0 = never

type MatchPartialSettingsRoot1 = MatchPartial<'/settings', SettingsRoot>;
//   ^? type MatchPartialSettingsRoot1 = "/settings"

type MatchPartialSettingsRoot2 = MatchPartial<'/settings/stuff', SettingsRoot>;
//   ^? type MatchPartialSettingsRoot2 = never

type MatchPartialSettingsAccount0 = MatchPartial<'/', SettingsAccount>;
//   ^? type MatchPartialSettingsAccount0 = never

type MatchPartialSettingsAccount1 = MatchPartial<'/settings', SettingsAccount>;
//   ^? type MatchPartialSettingsAccount1 = never

type MatchPartialSettingsAccount2 = MatchPartial<'/settings/stuff', SettingsAccount>;
//   ^? type MatchPartialSettingsAccount2 = never

type MatchPartialSettingsAccount3 = MatchPartial<'/settings/account', SettingsAccount>;
//   ^? type MatchPartialSettingsAccount3 = "/account"

type MatchPartialSettings0 = MatchPartial<'/', Settings>;
//   ^? type MatchPartialSettings0 = never

type MatchPartialSettings1 = MatchPartial<'/settings', Settings>;
//   ^? type MatchPartialSettings1 = never

type MatchPartialSettings2 = MatchPartial<'/settings/stuff', Settings>;
//   ^? type MatchPartialSettings2 = "/stuff" & OpaqueID<{
//          name: "stuff";
//      }, typeof PathOpaqueSymbol>

type MatchPartialCustomSettings1 = MatchPartial<'/settings', CustomSettings>;
//   ^? type MatchPartialCustomSettings1 = never

type MatchPartialCustomSettings2 = MatchPartial<'/settings/stuff', CustomSettings>;
//   ^? type MatchPartialCustomSettings2 = never

type MatchPartialCustomSettings3 = MatchPartial<'/settings/stuff/thing', CustomSettings>;
//   ^? type MatchPartialCustomSettings3 = string & OpaqueID<{
//          name: "stuff";
//      }, typeof PathOpaqueSymbol>

type Paths = Root | Settings;
//   ^? type Paths = Root | Settings

type RootTest = MatchPath<'/', Paths>;
//   ^? type RootTest = "/"

type SettingsTest1 = MatchPath<'/settings', Paths>;
//   ^? type SettingsTest1 = never

type SettingsTest2 = MatchPath<'/settings/whatever', Paths>;
//   ^? type SettingsTest2 = "/whatever" & OpaqueID<{
//          name: "whatever";
//      }, typeof PathOpaqueSymbol>

type PM1 = PathMatch<'/settings/:id', 'id', '25'>;
//   ^? type PM1 = "/settings/:id" & OpaqueID<{
//          id: "25";
//      }, typeof PathOpaqueSymbol>

type PM2 = PathMatch<'/:name', 'name', 'dude'>;
//   ^? type PM2 = "/:name" & OpaqueID<{
//          name: "dude";
//      }, typeof PathOpaqueSymbol>

type PM3 = PathMatch<'/:surname', 'name', 'dudeson'>;
//   ^? type PM3 = "/:surname" & OpaqueID<{
//          name: "dudeson";
//      }, typeof PathOpaqueSymbol>

type PM12 = MergePathMatch<PM1, PM2>;
//   ^? type PM12 = string & OpaqueID<Flat<{
//          id: "25";
//      } & {
//          name: "dude";
//      }>, typeof PathOpaqueSymbol>

type PM123 = MergePathMatch<PM12, PM3>;
//   ^? type PM123 = string & OpaqueID<never, typeof PathOpaqueSymbol>
