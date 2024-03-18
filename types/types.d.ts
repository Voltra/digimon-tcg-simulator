export type BooleanKeys<T> = ({
    [K in keyof T]: T[K] extends boolean ? K : never;
})[keyof T];
export type BooleanPropertiesOf<T> = {
    [K in BooleanKeys<T>]: boolean;
};
export type NonEmptyArr<T> = [T, ...T[]];
export type TwoOrMoreArr<T> = [T, T, ...T[]];
export type ValuesOf<T> = T[keyof T];
