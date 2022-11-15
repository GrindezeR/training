export type ExerciseType = { id: string; name: string; count: number };
const initialState: ExerciseType[] = [];

export const exerciseReducer = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case 'SET-EXERCISE-COUNT':
      return state.map(exercise =>
        exercise.id === action.id
          ? { ...exercise, count: action.count }
          : exercise
      );
    case 'SET-EXERCISE-DATA':
      return action.data;
    default:
      return state;
  }
};

type ActionTypes =
  | ReturnType<typeof setExerciseCountAC>
  | ReturnType<typeof setExerciseDataAC>;

export const setExerciseCountAC = (data: ExerciseType) => {
  return { type: 'SET-EXERCISE-COUNT', ...data } as const;
};

export const setExerciseDataAC = (data: ExerciseType[]) => {
  return { type: 'SET-EXERCISE-DATA', data } as const;
};
