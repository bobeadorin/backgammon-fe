/* eslint-disable @typescript-eslint/no-explicit-any */

declare global {
  interface Object {
    isEqual(obj2: object): boolean;
  }
}

function isEqual(obj1: object, obj2: object): boolean {
  const obj1Entries = Object.keys(obj1);
  const obj2Entries = Object.keys(obj2);

  if (obj1Entries.length !== obj2Entries.length) return false;

  obj1Entries.sort();
  obj2Entries.sort();

  for (const key of obj1Entries) {
    const secondObjectValue = (obj2 as any)[key];
    const firstObjectValue = (obj1 as any)[key];

    if (typeof secondObjectValue !== typeof firstObjectValue) return false;
    else if (typeof secondObjectValue === "object") {
      const areObjectsEqual = isEqual(firstObjectValue, secondObjectValue);
      if (!areObjectsEqual) return false;
    } else {
      if (firstObjectValue !== secondObjectValue) return false;
    }
  }

  return true;
}

//Global Extension method for comparing objects
Object.defineProperty(Object.prototype, "isEqual", {
  value: function (obj2: any) {
    return isEqual(this, obj2);
  },
  enumerable: false,
  writable: true,
  configurable: true,
});
