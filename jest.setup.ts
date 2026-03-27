import "@testing-library/jest-dom";
import React from "react";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return React.createElement("img", props);
  },
}));

if (!global.crypto) {
  Object.defineProperty(global, "crypto", {
    value: {
      randomUUID: () => "test-uuid",
    },
  });
} else if (!global.crypto.randomUUID) {
  Object.defineProperty(global.crypto, "randomUUID", {
    value: () => "test-uuid",
  });
}
