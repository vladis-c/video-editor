import {
  CommonActions,
  createNavigationContainerRef,
  NavigatorScreenParams,
  StackActions,
} from '@react-navigation/native';

// Navigators types
export const MAIN_NAV = {
  TABS_NAV: 'TabsNav',
} as const;
export type MainNavPages = ObjectValues<typeof MAIN_NAV>;

export const TABS_NAV = {
  SELECT: 'Select',
  COMPRESS: 'Compress',
  TRIM: 'Trim',
} as const;
export type TabsNavPages = ObjectValues<typeof TABS_NAV>;

// NavigatorScreenParams lists types
export type MainNavParamList = {
  [MAIN_NAV.TABS_NAV]: NavigatorScreenParams<TabNavParamList>;
};

export type TabNavParamList = {
  [TABS_NAV.SELECT]: undefined;
  [TABS_NAV.COMPRESS]: undefined;
  [TABS_NAV.TRIM]: undefined;
};

// Navigation Props as screen props

// Navigation props with useNavigation hook

// Param Props

// navigation outside React Components
const navigationRef = createNavigationContainerRef();

const navigate = <Name extends keyof MainNavParamList>(
  name: Name,
  params: MainNavParamList[Name],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.navigate(name, params));
  }
};

const goBack = () => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
};

const replace = <Name extends keyof MainNavParamList>(
  name: Name,
  params: MainNavParamList[Name],
) => {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.replace(name, params));
  }
};

const clear = <Name extends keyof MainNavParamList>(name: Name) =>
  navigationRef.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name}],
    }),
  );

const navigation = {navigate, replace, clear, goBack, navigationRef};

export default navigation;
