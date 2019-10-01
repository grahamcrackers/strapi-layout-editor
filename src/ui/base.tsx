import React, { createElement, FC, ReactHTML, ClassAttributes, ReactNode, HTMLAttributes } from 'react';

// type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
// type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

// type NonFunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? never : K }[keyof T];
// type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;

// interface Part {
//     id: number;
//     name: string;
//     subparts: Part[];
//     updatePart(newName: string): void;
// }

// type T40 = FunctionPropertyNames<Part>; // "updatePart"
// type T41 = NonFunctionPropertyNames<Part>; // "id" | "name" | "subparts"
// type T42 = FunctionProperties<Part>; // { updatePart(newName: string): void }
// type T43 = NonFunctionProperties<Part>; // { id: number, name: string, subparts: Part[] }

type CreateElement = Parameters<typeof createElement>;

interface CreateElementProps {
    type: CreateElement[0];
    props?: CreateElement[1];
    children?: CreateElement[2];
}

// Extracts the return type of a function type
// type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
// type Spread<T extends any[]> = (...args: T) => T;

// type CreateElementParameters = Parameters<typeof createElement>;
// type CreateElementReturnType = ReturnType<typeof createElement>;

// function tuple<T extends any[]>(...args: T): T {
//     return args;
// }

// (...args: Parameters<typeof createElement>) => ReturnType<typeof createElement>
// export const Base: CreateElement = (...args) => {
//     return createElement(args[0], args[1], args[2]);
// };

// // type Parameters<T> = T extends (...args: infer T) => any ? T : never;
// const x = (a: number) => 5;
// type Params = Parameters<typeof x>;
// const a: Params = ['should-not-work']; // works, but shouldn't
// function t(...args: Params) {} // does not work, but should work
