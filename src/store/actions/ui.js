import { UI_START_LOADING, UI_STOP_LOADING } from '../actionTypes';

export const uiStartLoading = (loadingType) => ({
  type: UI_START_LOADING,
  loadingType,
});

export const uiStopLoading = (loadingType) => ({
  type: UI_STOP_LOADING,
  loadingType,
});
